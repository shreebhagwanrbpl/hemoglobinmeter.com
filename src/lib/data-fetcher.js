import { db } from "./firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

// Simple in-memory cache for Firestore documents and catalog
const docCache = {};
let catalogPromise = null;

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Fetch a single document and cache its promise/data.
 */
export async function fetchDocCached(path) {
  if (docCache[path]) {
    return docCache[path];
  }

  if (!docCache[path + "_promise"]) {
    docCache[path + "_promise"] = (async () => {
      try {
        const parts = path.split("/");
        const docRef = doc(db, ...parts);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();
          docCache[path] = data;
          return data;
        }

        return null;
      } catch (err) {
        console.error(`Error fetching doc at ${path}:`, err);

        delete docCache[path + "_promise"];

        throw err;
      }
    })();
  }

  return docCache[path + "_promise"];
}

/**
 * Fetch and process the entire products catalog.
 *
 * IMPORTANT:
 * Categories/subcategories are intentionally processed
 * sequentially instead of Promise.all() to keep build memory usage low.
 */
export async function fetchFullCatalog() {
  if (catalogPromise) {
    return catalogPromise;
  }

  catalogPromise = (async () => {
    const startTime = performance.now();

    try {
      // 1. Fetch categories
      const categorySnap = await getDocs(
        collection(
          db,
          "websites",
          "hemoglobinmetercom",
          "pages",
          "categoryproducts",
          "categories"
        )
      );

      const allProducts = [];

      /*
       * IMPORTANT:
       * Do NOT use Promise.all() here.
       *
       * Processing every category/subcategory simultaneously can
       * create a large memory spike during Next.js production build.
       */
      for (const categoryDoc of categorySnap.docs) {
        const data = categoryDoc.data();
        const categoryName = data.category || categoryDoc.id;

        try {
          const subcategoriesCol = collection(
            db,
            "websites",
            "hemoglobinmetercom",
            "pages",
            "categoryproducts",
            "categories",
            categoryDoc.id,
            "subcategories"
          );

          const subcategoriesSnap = await getDocs(subcategoriesCol);

          // Process one subcategory at a time
          for (const subDoc of subcategoriesSnap.docs) {
            const subData = subDoc.data();
            const subCategoryName =
              subData.subCategory || subDoc.id;

            const products = Array.isArray(subData.products)
              ? subData.products
              : [];

            for (let index = 0; index < products.length; index++) {
              const item = products[index];

              if (item?.isPublished === false) {
                continue;
              }

              allProducts.push({
                ...item,
                uid: `${categoryDoc.id}-${subDoc.id}-${index}`,
                category: categoryName,
                subCategory: subCategoryName,
                slug: item.slug || makeSlug(item.title),
              });
            }
          }
        } catch (subErr) {
          console.error(
            `Error fetching subcategories for category ${categoryDoc.id}:`,
            subErr
          );
        }

        // Fallback direct category products
        if (Array.isArray(data.products) && data.products.length > 0) {
          for (let index = 0; index < data.products.length; index++) {
            const item = data.products[index];

            if (item?.isPublished === false) {
              continue;
            }

            allProducts.push({
              ...item,
              uid: `${categoryDoc.id}-direct-${index}`,
              category: categoryName,
              subCategory: item.subCategory || categoryName,
              slug: item.slug || makeSlug(item.title),
            });
          }
        }
      }

      // 2. Fetch old legacy products
      try {
        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "hemoglobinmetercom",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {
          const oldData = oldSnap.data();

          const oldProducts = Array.isArray(oldData.products)
            ? oldData.products
            : [];

          for (let index = 0; index < oldProducts.length; index++) {
            const item = oldProducts[index];

            if (item?.isPublished === false) {
              continue;
            }

            allProducts.push({
              ...item,
              uid: `other-${index}`,
              category: "Other Products",
              subCategory:
                item.subCategory || "Other Products",
              slug: item.slug || makeSlug(item.title),
            });
          }
        }
      } catch (oldErr) {
        console.error(
          "Error fetching legacy products:",
          oldErr
        );
      }

      const duration = performance.now() - startTime;

      console.log(
        `[data-fetcher] Raw Firestore fetchFullCatalog completed in ${duration.toFixed(
          2
        )}ms`
      );

      console.log(
        `[data-fetcher] Total products loaded: ${allProducts.length}`
      );

      return allProducts;
    } catch (err) {
      console.error(
        "Error fetching full catalog:",
        err
      );

      // Clear cache promise on error to allow retries
      catalogPromise = null;

      throw err;
    }
  })();

  return catalogPromise;
}

/**
 * Helpers for cached document retrieval across pages
 */
export async function fetchHomeData() {
  return fetchDocCached(
    "websites/hemoglobinmetercom/pages/home"
  );
}

export async function fetchContactData() {
  return fetchDocCached(
    "websites/hemoglobinmetercom/pages/contact"
  );
}

export async function fetchServicesData() {
  return fetchDocCached(
    "websites/hemoglobinmetercom/pages/services"
  );
}

export async function fetchDistrictData(district) {
  if (!district) return null;

  return fetchDocCached(
    `websites/hemoglobinmetercom/districts/${district}`
  );
}