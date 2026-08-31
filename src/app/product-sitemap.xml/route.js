import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { SITE_URL } from "@/lib/seo";
import { shouldIndexProduct } from "@/lib/seo-safety";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const products = await fetchFullCatalog();
    const lastModified = new Date().toISOString();

    const body = products
      .filter((product) => product?.slug && shouldIndexProduct(product))
      .map(
        (product) => `
  <url>
    <loc>${escapeXml(`${SITE_URL}/items/${product.slug}`)}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Product sitemap error:", error);

    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        status: 500,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      }
    );
  }
}
