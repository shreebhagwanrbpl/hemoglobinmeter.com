import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Premium Biomedical & Diagnostic Equipment",
  description:
    "Browse our dynamic catalog of premium diagnostic technologies, cbc counters, biochemistry analyzers, and laboratory equipment from Raj Biosis.",

  alternates: {
    canonical: `${SITE_URL}/items`,
  },

  openGraph: {
    title: `Premium Biomedical & Diagnostic Equipment | ${SITE_NAME}`,
    description:
      "Browse our dynamic catalog of premium diagnostic technologies, cbc counters, biochemistry analyzers, and laboratory equipment from Raj Biosis.",
    url: `${SITE_URL}/items`,
    siteName: SITE_NAME,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `Premium Biomedical & Diagnostic Equipment | ${SITE_NAME}`,
    description:
      "Browse our dynamic catalog of premium diagnostic technologies, cbc counters, biochemistry analyzers, and laboratory equipment from Raj Biosis.",
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