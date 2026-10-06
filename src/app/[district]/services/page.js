import ServicesPage from "@/app/services/page";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `${SITE_URL}/${district}/services`;
  const title = `Biomedical Product Support in ${districtName} | Raj Biosis`;
  const description = `Raise product and procurement enquiries in ${districtName} for biomedical equipment, diagnostic products, reagents, consumables and related supplies.`;

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

  return <div className="site5-static"><ServicesPage city={city} /></div>;
}
