import AboutClient from "./AboutClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "About Us | Biomedical Supplier & Distributor",
  description:
    "Learn more about Raj Biosis, a trusted partner and distributor of diagnostic analyzers, medical laboratory machines, and biomedical healthcare systems in India.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Us | Raj Biosis",
    description:
      "Learn more about Raj Biosis, a trusted partner and distributor of diagnostic analyzers, medical laboratory machines, and biomedical healthcare systems in India.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Raj Biosis",
    description:
      "Learn more about Raj Biosis, a trusted partner and distributor of diagnostic analyzers, medical laboratory machines, and biomedical healthcare systems in India.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}