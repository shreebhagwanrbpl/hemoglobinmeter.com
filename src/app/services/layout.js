import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Biomedical & Laboratory Services",
  description: "Get trusted biomedical services, laboratory analyzer technical support, and medical equipment maintenance from Raj Biosis across India.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: `Biomedical & Laboratory Services | ${SITE_NAME}`,
    description: "Get trusted biomedical services, laboratory analyzer technical support, and medical equipment maintenance from Raj Biosis across India.",
    url: `${SITE_URL}/services`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Biomedical & Laboratory Services | ${SITE_NAME}`,
    description: "Get trusted biomedical services, laboratory analyzer technical support, and medical equipment maintenance from Raj Biosis across India.",
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
