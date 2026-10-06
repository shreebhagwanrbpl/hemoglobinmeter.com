import ProductsPage from "@/app/items/page";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `${SITE_URL}/${district}/items`;
  const title = `Biomedical & Diagnostic Equipment in ${districtName} | Raj Biosis`;
  const description = `Explore biomedical product categories and listings for buyers in ${districtName}, covering equipment, diagnostic items, laboratory supplies and related products.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <ProductsPage city={city} />;
}
