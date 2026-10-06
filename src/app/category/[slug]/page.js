import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "@/app/items/ProductsClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { isTopicallyRelevant } from "@/lib/seo-safety";
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
  
  // Find the category matching the slug
  const categoryName = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  ).find((cat) => makeSlug(cat) === slug);

  if (!categoryName || !isTopicallyRelevant(categoryName)) {
    return {
      title: "Category Not Found | " + SITE_NAME,
      robots: { index: false, follow: false }
    };
  }

  const title = `${categoryName} Products & Catalogue | ${SITE_NAME}`;
  const description = `Explore the ${categoryName} listings available through ${SITE_NAME} and enquire about specifications, quantities and product requirements.`;
  const url = `${SITE_URL}/category/${slug}`;

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

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const allProducts = await fetchFullCatalog();

  const categoryName = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  ).find((cat) => makeSlug(cat) === slug);

  if (!categoryName || !isTopicallyRelevant(categoryName)) {
    notFound();
  }

  // Filter products by this category
  const filteredProducts = allProducts.filter((p) => p.category === categoryName);

  return (
    <ProductsClient
      initialProducts={filteredProducts}
      city="India"
    />
  );
}
