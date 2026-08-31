import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "@/app/items/ProductsClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const allProducts = await fetchFullCatalog();
  
  // Find the brand matching the slug
  const brandName = Array.from(
    new Set(allProducts.map((p) => p.brand).filter(Boolean))
  ).find((b) => makeSlug(b) === slug);

  // Note: Only index brands that have products published and are non-empty numeric brand issues
  if (!brandName || /^\d+(\.\d+)?$/.test(brandName)) {
    return {
      title: "Brand Not Found | " + SITE_NAME,
      robots: { index: false, follow: false }
    };
  }

  const title = `${brandName} Laboratory Equipment Distributor | ${SITE_NAME}`;
  const description = `Discover premium biomedical and diagnostic equipment from ${brandName} distributed by ${SITE_NAME}. Contact us for price lists and models.`;
  const url = `${SITE_URL}/brand/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const allProducts = await fetchFullCatalog();

  const brandName = Array.from(
    new Set(allProducts.map((p) => p.brand).filter(Boolean))
  ).find((b) => makeSlug(b) === slug);

  if (!brandName || /^\d+(\.\d+)?$/.test(brandName)) {
    notFound();
  }

  // Filter products by this brand
  const filteredProducts = allProducts.filter((p) => p.brand === brandName);

  return (
    <ProductsClient
      initialProducts={filteredProducts}
      city="India"
    />
  );
}
