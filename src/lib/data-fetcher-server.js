import "server-only";

import { cache } from "react";

import {
  COMPANY_ID,
  WEBSITE_ID,
  makeSlug,
  isItemVisibleOnWebsite,
  isVisibleForWebsite,
} from "./catalog-utils";

import {
  adminFetch,
  fetchCatalogFromAdmin,
} from "./admin-api";

function unwrap(value) {
  return (
    value?.data ??
    value?.page ??
    value?.result ??
    value
  );
}

function normalizeProduct(
  product = {},
  index = 0
) {
  const title =
    product.title ||
    product.name ||
    product.productName ||
    "Biomedical Equipment";

  const images =
    Array.isArray(product.images) &&
    product.images.length
      ? product.images
      : product.image
        ? [product.image]
        : product.imageUrl
          ? [product.imageUrl]
          : product.imgUrl
            ? [product.imgUrl]
            : [];

  const id =
    product.id ||
    product.uid ||
    product.productId ||
    `${makeSlug(title) || "product"}-${index}`;

  return {
    ...product,

    id,
    productId:
      product.productId || id,
    uid:
      product.uid || id,

    title,
    name: title,

    slug:
      product.slug ||
      makeSlug(title),

    desc:
      product.desc ??
      product.description ??
      "",

    description:
      product.description ??
      product.desc ??
      "",

    category:
      product.category ||
      "Diagnostic & Laboratory Equipment",

    categoryId:
      product.categoryId ||
      product.categoryID ||
      makeSlug(
        product.category ||
        "diagnostic"
      ),

    subCategory:
      product.subCategory ||
      product.subcategory ||
      product.category ||
      "General",

    subcategoryId:
      product.subcategoryId ||
      product.subCategoryId ||
      makeSlug(
        product.subCategory ||
        product.subcategory ||
        product.category ||
        "general"
      ),

    companyId:
      product.companyId ||
      COMPANY_ID,

    images,

    image:
      images[0] ||
      product.image ||
      "",

    video:
      product.video || "",

    pdf:
      product.pdf || "",

    brand:
      product.brand || "",

    model:
      product.model || "",

    capacity:
      product.capacity || "",

    throughput:
      product.throughput || "",

    instrument:
      product.instrument || "",

    usage:
      product.usage || "",

    parameters:
      product.parameters || "",

    automation:
      product.automation || "",

    availability:
      product.availability || "",

    size:
      product.size || "",

    isPublished:
      product.isPublished !== false,
  };
}

export async function fetchFullCatalog({
  companyId = COMPANY_ID,
  websiteId = WEBSITE_ID,
} = {}) {
  const raw = await fetchCatalogFromAdmin();

  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .filter((item) =>
      isItemVisibleOnWebsite(
        item,
        websiteId
      )
    )
    .map(normalizeProduct);
}

export const fetchWebsitePage = cache(
  async (
    pageType,
    websiteId = WEBSITE_ID
  ) => {
    // Strategy 1: websites/${COMPANY_ID}/${websiteId}/pages/${pageType}
    try {
      const response = await adminFetch(
        "/api/site-data",
        {},
        {
          path: `websites/${COMPANY_ID}/${websiteId}/pages/${pageType}`,
          websiteId,
          companyId: COMPANY_ID,
        },
        8000
      );

      const unwrapped = unwrap(response);
      if (unwrapped && Object.keys(unwrapped).length > 0) {
        return unwrapped;
      }
    } catch (e) {
      console.warn(`[data-fetcher] Error fetching websites/${COMPANY_ID}/${websiteId}/pages/${pageType}:`, e?.message);
    }

    // Strategy 2: exact path query websites/${websiteId}/pages/${pageType}
    try {
      const response = await adminFetch(
        "/api/site-data",
        {},
        {
          path: `websites/${websiteId}/pages/${pageType}`,
          websiteId,
          companyId: COMPANY_ID,
        },
        8000
      );

      const unwrapped = unwrap(response);
      if (unwrapped && Object.keys(unwrapped).length > 0) {
        return unwrapped;
      }
    } catch (e) {
      console.warn(`[data-fetcher] Error fetching page path websites/${websiteId}/pages/${pageType}:`, e?.message);
    }

    // Strategy 3: type parameter query
    try {
      const response = await adminFetch(
        "/api/site-data",
        {},
        {
          type: pageType,
          pageType,
          websiteId,
          companyId: COMPANY_ID,
        },
        8000
      );

      return unwrap(response);
    } catch (e) {
      console.warn(`[data-fetcher] Error fetching page type ${pageType}:`, e?.message);
    }

    return null;
  }
);

export const fetchDocCached = cache(
  async (path) => {
    const parts = String(
      path || ""
    )
      .split("/")
      .filter(Boolean);

    if (
      parts[0] === "__website__" &&
      parts[1] === "pages" &&
      parts[2]
    ) {
      return fetchWebsitePage(
        parts[2]
      );
    }

    if (
      parts[0] === "__website__" &&
      parts[1] === "districts" &&
      parts[2]
    ) {
      return fetchDistrictData(
        parts[2]
      );
    }

    if (
      parts[0] === "pages" &&
      parts[1]
    ) {
      return fetchWebsitePage(
        parts[1]
      );
    }

    if (
      parts[0] === "districts" &&
      parts[1]
    ) {
      return fetchDistrictData(
        parts[1]
      );
    }

    if (
      parts[0] === "websites" &&
      parts[2] === "pages" &&
      parts[3]
    ) {
      return fetchWebsitePage(parts[3], parts[1]);
    }

    if (
      parts[0] === "websites" &&
      parts[2] === "districts" &&
      parts[3]
    ) {
      return fetchDistrictData(parts[3], parts[1]);
    }

    // Direct path query fallback
    try {
      const response = await adminFetch(
        "/api/site-data",
        {},
        {
          path,
          websiteId: WEBSITE_ID,
          companyId: COMPANY_ID,
        },
        5000
      );
      return unwrap(response);
    } catch {
      return null;
    }
  }
);

export async function fetchHomeData() {
  return fetchWebsitePage("home");
}

export async function fetchContactData() {
  return fetchWebsitePage("contact");
}

export async function fetchServicesData() {
  return fetchWebsitePage("services");
}

export const fetchDistrictData = cache(
  async (
    district,
    websiteId = WEBSITE_ID
  ) => {
    if (!district) return null;

    try {
      const response = await adminFetch(
        "/api/site-data",
        {},
        {
          path: `websites/${websiteId}/districts/${district}`,
          websiteId,
          companyId: COMPANY_ID,
        },
        5000
      );
      const unwrapped = unwrap(response);
      if (unwrapped && Object.keys(unwrapped).length > 0) {
        return unwrapped;
      }
    } catch {
      // ignore
    }

    try {
      const response = await adminFetch(
        "/api/site-data",
        {},
        {
          type: "district",
          pageType: "district",
          district,
          websiteId,
          companyId: COMPANY_ID,
        },
        5000
      );
      return unwrap(response);
    } catch {
      return null;
    }
  }
);

export const fetchDistricts = cache(
  async ({
    companyId = COMPANY_ID,
    websiteId = WEBSITE_ID,
  } = {}) => {
    try {
      const response = await adminFetch(
        "/api/site-data",
        {},
        {
          collection: `websites/${websiteId}/districts`,
          websiteId,
          companyId,
        },
        5000
      );

      const districts =
        response?.data?.districts ??
        response?.districts ??
        response?.data ??
        response;

      if (Array.isArray(districts) && districts.length > 0) {
        return districts.map((district, index) => ({
          ...(district?.data || district || {}),
          id:
            district?.id ||
            district?.slug ||
            `dist-${index}`,
          slug:
            district?.slug ||
            district?.id ||
            makeSlug(
              district?.district ||
              district?.name ||
              `dist-${index}`
            ),
        }));
      }
    } catch {
      // ignore
    }

    return [];
  }
);

export const fetchActiveDistricts = fetchDistricts;
export const fetchAllDistricts = fetchDistricts;

export async function fetchCategoriesTree({
  companyId = COMPANY_ID,
  websiteId = WEBSITE_ID,
} = {}) {
  try {
    const response = await adminFetch(
      "/api/site-data",
      {},
      {
        collection: `websites/${websiteId}/categories`,
        websiteId,
        companyId,
      },
      5000
    );

    const raw =
      response?.categories ??
      response?.data?.categories ??
      response?.data ??
      response;

    if (Array.isArray(raw) && raw.length > 0) {
      return raw
        .map((cat) => cat?.data || cat)
        .filter((category) => isItemVisibleOnWebsite(category, websiteId));
    }
  } catch (error) {
    console.warn(
      "Admin category collection failed; deriving categories from products:",
      error?.message
    );
  }

  const products = await fetchFullCatalog({
    companyId,
    websiteId,
  });

  const categoryMap = new Map();

  for (const product of products) {
    const categoryId =
      product.categoryId ||
      makeSlug(
        product.category ||
        "general"
      );

    const categoryName =
      product.category ||
      categoryId;

    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, {
        id: categoryId,
        name: categoryName,
        category: categoryName,
        slug: makeSlug(categoryName),
        products: [],
        subcategories: new Map(),
      });
    }

    const category = categoryMap.get(categoryId);
    category.products.push(product);

    const subcategoryId =
      product.subcategoryId ||
      makeSlug(
        product.subCategory ||
        "general"
      );

    const subcategoryName =
      product.subCategory ||
      subcategoryId;

    if (!category.subcategories.has(subcategoryId)) {
      category.subcategories.set(subcategoryId, {
        id: subcategoryId,
        name: subcategoryName,
        subCategory: subcategoryName,
        slug: makeSlug(subcategoryName),
        products: [],
        productsCount: 0,
      });
    }

    const subcategory = category.subcategories.get(subcategoryId);
    subcategory.products.push(product);
    subcategory.productsCount += 1;
  }

  return Array.from(categoryMap.values()).map((category) => ({
    ...category,
    subcategories: Array.from(category.subcategories.values()),
    totalProductsCount: category.products.length,
  }));
}

export async function fetchCatalogCategories(options = {}) {
  const categories = await fetchCategoriesTree(options);

  return categories.map(
    (category) =>
      category.name ||
      category.category ||
      category.id
  );
}
