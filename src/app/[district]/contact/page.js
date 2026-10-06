import ContactPage from "@/app/contact/page";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `${SITE_URL}/${district}/contact`;
  const title = `Contact Raj Biosis in ${districtName} | Get a Quote`;
  const description = `Contact Raj Biosis in ${districtName} about biomedical equipment, diagnostic products, reagents, consumables and other product requirements.`;

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

  return <div className="site5-static"><ContactPage city={city} /></div>;
}
