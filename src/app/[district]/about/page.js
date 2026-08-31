import AboutClient from "@/app/about/AboutClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `${SITE_URL}/${district}/about`;
  const title = `About Our Laboratory Equipment Network in ${districtName} | Biomedical Supplier`;
  const description = `Learn more about Raj Biosis in ${districtName}, a trusted partner and distributor of diagnostic analyzers, medical laboratory machines, and biomedical healthcare systems.`;

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

  return <div className="site5-static"><AboutClient city={city} /></div>;
}