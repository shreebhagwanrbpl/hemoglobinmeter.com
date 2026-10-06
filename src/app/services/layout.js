import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Biomedical Product Enquiry Support",
  description: "Explore product research and enquiry assistance for biomedical equipment, diagnostic products, laboratory supplies and related items across India.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: `Biomedical Product Enquiry Support | ${SITE_NAME}`,
    description: "Explore product research and enquiry assistance for biomedical equipment, diagnostic products, laboratory supplies and related items across India.",
    url: `${SITE_URL}/services`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Biomedical Product Enquiry Support | ${SITE_NAME}`,
    description: "Explore product research and enquiry assistance for biomedical equipment, diagnostic products, laboratory supplies and related items across India.",
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
