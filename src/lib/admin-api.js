import "server-only";

import {
  WEBSITE_ID,
  COMPANY_ID,
} from "./catalog-utils";

export const ADMIN_API_BASE_URL = (
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  "https://admin.rajbiosis.app"
).replace(/\/+$/, "");

// In-memory caching & deduplication to ensure lightning-fast responses
let cachedCatalog = null;
let catalogCachedAt = 0;
let pendingCatalogPromise = null;
const CATALOG_CACHE_TTL = 3 * 60 * 1000; // 3 minutes

function buildUrl(pathname, params = {}) {
  const path = String(pathname || "");
  const url = new URL(
    `${ADMIN_API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
  );

  const query = {
    websiteId: WEBSITE_ID,
    companyId: COMPANY_ID,
    ...params,
  };

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

export async function adminFetch(pathname, options = {}, params = {}, timeoutMs = 25000) {
  const url = buildUrl(pathname, params);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url.toString(), {
      ...options,
      signal: options.signal || controller.signal,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
    });

    const text = await response.text();
    let body = null;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }

    if (!response.ok || body?.success === false || body?.ok === false) {
      const message =
        typeof body === "string"
          ? body
          : JSON.stringify(body);

      throw new Error(`Admin API ${response.status}: ${message}`);
    }

    return body;
  } finally {
    clearTimeout(timer);
  }
}

export async function postAdminQuery(endpoint, payload = {}) {
  return adminFetch(
    endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        websiteId: WEBSITE_ID,
        companyId: COMPANY_ID,
      }),
    },
    {},
    15000
  );
}

async function doFetchCatalogFromAdmin() {
  // Strategy 1: Fetch products collection for website
  try {
    const res = await adminFetch(
      "/api/site-data",
      {},
      {
        collection: `websites/${WEBSITE_ID}/products`,
      },
      30000
    );

    const raw = res?.data ?? res?.products ?? res;
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map((item) => item?.data || item);
    }
  } catch (err) {
    console.warn("[admin-api] Error fetching website products collection:", err?.message);
  }

  // Strategy 2: Fallback to company-level products collection
  try {
    const res = await adminFetch(
      "/api/site-data",
      {},
      {
        collection: `companies/${COMPANY_ID}/products`,
      },
      30000
    );

    const raw = res?.data ?? res?.products ?? res;
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map((item) => item?.data || item);
    }
  } catch (err) {
    console.warn("[admin-api] Error fetching company products collection:", err?.message);
  }

  // Strategy 3: Fallback to /api/catalog
  try {
    const response = await adminFetch("/api/catalog", {}, {}, 10000);
    const products =
      response?.products ??
      response?.data?.products ??
      response?.data ??
      response;

    if (Array.isArray(products) && products.length > 0) {
      return products.map((item) => item?.data || item);
    }
  } catch (err) {
    console.warn("[admin-api] Error fetching /api/catalog:", err?.message);
  }

  return [];
}

export async function fetchCatalogFromAdmin() {
  const now = Date.now();
  if (cachedCatalog && Array.isArray(cachedCatalog) && cachedCatalog.length > 0 && now - catalogCachedAt < CATALOG_CACHE_TTL) {
    return cachedCatalog;
  }

  if (pendingCatalogPromise) {
    return pendingCatalogPromise;
  }

  pendingCatalogPromise = doFetchCatalogFromAdmin()
    .then((products) => {
      if (Array.isArray(products) && products.length > 0) {
        cachedCatalog = products;
        catalogCachedAt = Date.now();
      }
      return products;
    })
    .finally(() => {
      pendingCatalogPromise = null;
    });

  return pendingCatalogPromise;
}
