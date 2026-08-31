import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { fetchFullCatalog } from "@/lib/data-fetcher";
import { SITE_URL } from "@/lib/seo";
import { shouldIndexProduct, isTopicallyRelevant } from "@/lib/seo-safety";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default async function sitemap() {
  const now = new Date();

  const urls = [
    {
      url: SITE_URL,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/items`,
      lastModified: now,
    },
  ];

  try {
    // District pages only.
    // Do NOT generate /district/items/product for every product here:
    // 11k products x many districts can create millions of sitemap URLs.
    const districtSnap = await getDocs(
      collection(
        db,
        "websites",
        "hemoglobinmetercom",
        "districts"
      )
    );

    for (const districtDoc of districtSnap.docs) {
      const district = districtDoc.data();
      const slug = district.slug;

      if (!slug) continue;

      urls.push(
        {
          url: `${SITE_URL}/${slug}`,
          lastModified: now,
        },
        {
          url: `${SITE_URL}/${slug}/about`,
          lastModified: now,
        },
        {
          url: `${SITE_URL}/${slug}/services`,
          lastModified: now,
        },
        {
          url: `${SITE_URL}/${slug}/contact`,
          lastModified: now,
        },
        {
          url: `${SITE_URL}/${slug}/items`,
          lastModified: now,
        }
      );
    }

    const products = await fetchFullCatalog();

    // 1. Categories Sitemaps
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    );
    for (const category of uniqueCategories) {
      if (!isTopicallyRelevant(category)) continue;
      urls.push({
        url: `${SITE_URL}/category/${makeSlug(category)}`,
        lastModified: now,
      });
    }

    // 2. Brands Sitemaps
    const uniqueBrands = Array.from(
      new Set(products.map((p) => p.brand).filter(Boolean))
    );
    for (const brand of uniqueBrands) {
      if (/^\d+(\.\d+)?$/.test(brand)) continue; // ignore dummy numerical brands
      urls.push({
        url: `${SITE_URL}/brand/${makeSlug(brand)}`,
        lastModified: now,
      });
    }

    // 3. Products Sitemaps
    // Apply Quality Gate: Only include topically relevant products
    for (const product of products) {
      if (!product?.slug) continue;
      if (!shouldIndexProduct(product)) continue;

      urls.push({
        url: `${SITE_URL}/items/${product.slug}`,
        lastModified: now,
      });
    }
  } catch (error) {
    console.error("Sitemap Error:", error);
  }

  return urls;
}
