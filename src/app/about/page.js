import AboutClient from "./AboutClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "About Us | Biomedical Supplier & Distributor",
  description:
    "See how Raj Biosis presents a multi-category biomedical catalogue for equipment, diagnostic products, laboratory supplies and related healthcare items in India.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Us | Raj Biosis",
    description:
      "See how Raj Biosis presents a multi-category biomedical catalogue for equipment, diagnostic products, laboratory supplies and related healthcare items in India.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Raj Biosis",
    description:
      "See how Raj Biosis presents a multi-category biomedical catalogue for equipment, diagnostic products, laboratory supplies and related healthcare items in India.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
