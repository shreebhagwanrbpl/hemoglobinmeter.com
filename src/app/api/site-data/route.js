import { NextResponse } from "next/server";
import {
  adminFetch,
} from "@/lib/admin-api";
import {
  WEBSITE_ID,
  COMPANY_ID,
  normalizeWebsiteId,
  isVisibleForWebsite,
} from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const headers = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

function response(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers,
  });
}

function unwrap(responseBody) {
  return (
    responseBody?.data ??
    responseBody?.page ??
    responseBody?.result ??
    responseBody
  );
}

function unwrapDistricts(responseBody) {
  const value =
    responseBody?.data?.districts ??
    responseBody?.districts ??
    responseBody?.data ??
    responseBody;

  if (!Array.isArray(value)) return [];

  return value.map((item, index) => {
    const d = item?.data || item || {};
    return {
      ...d,
      id: d?.id || d?.slug || `dist-${index}`,
      slug: d?.slug || d?.id || d?.district || d?.name || `dist-${index}`,
    };
  });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const websiteId = searchParams.get("websiteId") || WEBSITE_ID;
    const companyId = searchParams.get("companyId") || COMPANY_ID;

    // District list
    if (
      searchParams.get("districts") === "1" ||
      searchParams.get("type") === "districts" ||
      searchParams.get("pageType") === "districts"
    ) {
      try {
        const result = await adminFetch(
          "/api/site-data",
          {},
          {
            collection: `websites/${websiteId}/districts`,
            websiteId,
            companyId,
          },
          5000
        );
        return response(unwrapDistricts(result));
      } catch {
        return response([]);
      }
    }

    // Collection queries (e.g. products, categories, etc.)
    const rawCollection = searchParams.get("collection");
    if (rawCollection) {
      let collPath = rawCollection;
      if (rawCollection === "products") {
        collPath = `websites/${websiteId}/products`;
      } else if (rawCollection === "categories") {
        collPath = `websites/${websiteId}/categories`;
      }

      const result = await adminFetch(
        "/api/site-data",
        {},
        {
          collection: collPath,
          websiteId,
          companyId,
        },
        8000
      );

      const value = unwrap(result);

      if (Array.isArray(value)) {
        return response(
          value.map((item) => item?.data || item).filter((item) =>
            isVisibleForWebsite(item, websiteId)
          )
        );
      }

      return response(value);
    }

    // Path queries (e.g. __website__/pages/home or websites/hemoglobinmetercom/pages/home)
    let rawPath = searchParams.get("path") || "";
    if (rawPath) {
      let cleanPath = rawPath;
      if (cleanPath.startsWith("__website__/")) {
        cleanPath = cleanPath.replace("__website__/", `websites/${websiteId}/`);
      } else if (!cleanPath.startsWith("websites/")) {
        cleanPath = `websites/${websiteId}/${cleanPath}`;
      }

      const result = await adminFetch(
        "/api/site-data",
        {},
        {
          path: cleanPath,
          websiteId,
          companyId,
        },
        5000
      );

      return response(unwrap(result));
    }

    // Page type query (e.g. type=home, type=contact, type=services)
    const pageType = searchParams.get("type") || searchParams.get("pageType");
    if (pageType) {
      if (pageType === "district") {
        const district = searchParams.get("district") || "";
        try {
          const result = await adminFetch(
            "/api/site-data",
            {},
            {
              path: `websites/${companyId}/${websiteId}/districts/${district}`,
              websiteId,
              companyId,
            },
            8000
          );
          const val = unwrap(result);
          if (val && Object.keys(val).length > 0) {
            return response(val);
          }
        } catch {}

        const result = await adminFetch(
          "/api/site-data",
          {},
          {
            path: `websites/${websiteId}/districts/${district}`,
            websiteId,
            companyId,
          },
          8000
        );
        return response(unwrap(result));
      }

      // Try websites/companyId/websiteId/pages/pageType
      try {
        const result = await adminFetch(
          "/api/site-data",
          {},
          {
            path: `websites/${companyId}/${websiteId}/pages/${pageType}`,
            websiteId,
            companyId,
          },
          8000
        );
        const val = unwrap(result);
        if (val && Object.keys(val).length > 0) {
          return response(val);
        }
      } catch {}

      // Try websites/websiteId/pages/pageType
      try {
        const result = await adminFetch(
          "/api/site-data",
          {},
          {
            path: `websites/${websiteId}/pages/${pageType}`,
            websiteId,
            companyId,
          },
          8000
        );
        const val = unwrap(result);
        if (val && Object.keys(val).length > 0) {
          return response(val);
        }
      } catch {}

      // Try type query
      const result = await adminFetch(
        "/api/site-data",
        {},
        {
          type: pageType,
          pageType,
          websiteId,
          companyId,
        },
        8000
      );
      return response(unwrap(result));
    }

    return response(null);
  } catch (error) {
    console.error("[site-data] Admin API error:", error?.message);

    return response(
      {
        ok: false,
        error: error?.message || "Failed to fetch site data",
      },
      500
    );
  }
}
