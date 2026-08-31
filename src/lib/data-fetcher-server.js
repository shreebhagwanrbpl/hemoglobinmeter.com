import { fetchFullCatalog as fetchFullCatalogRaw } from "./data-fetcher";
import { cache } from "react";

let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
let catalogPromise = null;

const CACHE_TTL = 3600 * 1000;

async function getCachedCatalog() {
  const now = Date.now();

  if (
    cachedCatalog &&
    now - cachedCatalogTimestamp < CACHE_TTL
  ) {
    console.log(
      `[data-fetcher-server] Serving catalog from server memory cache (${(
        (now - cachedCatalogTimestamp) /
        1000
      ).toFixed(1)}s old)`
    );

    return cachedCatalog;
  }

  // Prevent multiple simultaneous catalog fetches
  if (catalogPromise) {
    console.log(
      "[data-fetcher-server] Waiting for existing catalog fetch..."
    );

    return catalogPromise;
  }

  console.log(
    "[data-fetcher-server] Server memory cache miss or expired. Fetching raw catalog from Firestore..."
  );

  catalogPromise = (async () => {
    try {
      const data = await fetchFullCatalogRaw();

      cachedCatalog = data;
      cachedCatalogTimestamp = Date.now();

      return data;
    } catch (error) {
      cachedCatalog = null;
      cachedCatalogTimestamp = 0;
      throw error;
    } finally {
      catalogPromise = null;
    }
  })();

  return catalogPromise;
}

export const fetchFullCatalog = cache(async () => {
  const start = performance.now();

  const products = await getCachedCatalog();

  const end = performance.now();

  console.log(
    `[data-fetcher-server] fetchFullCatalog took ${(
      end - start
    ).toFixed(2)}ms`
  );

  return products;
});