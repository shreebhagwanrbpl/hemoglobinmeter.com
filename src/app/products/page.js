import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "@/app/items/ProductsClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Biomedical Product Catalogue",
  description:
    "Explore a broad catalogue of biomedical products including instruments, diagnostic items, reagents, kits, consumables and related healthcare supplies.",

  alternates: {
    canonical: `${SITE_URL}/products`,
  },

  openGraph: {
    title: `Biomedical Product Catalogue | ${SITE_NAME}`,
    description:
      "Explore a broad catalogue of biomedical products including instruments, diagnostic items, reagents, kits, consumables and related healthcare supplies.",
    url: `${SITE_URL}/products`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default async function ProductsPage({
  district = null,
  city = null,
}) {
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
      district={district}
      city={city}
    />
  );
}
