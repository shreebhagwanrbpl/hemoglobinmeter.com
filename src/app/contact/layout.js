import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Contact Us",
  description: "Contact Raj Biosis for premium diagnostic laboratory analyzers, biochemistry machines, reagents, and get a quick product quotation.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Contact Raj Biosis for premium diagnostic laboratory analyzers, biochemistry machines, reagents, and get a quick product quotation.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${SITE_NAME}`,
    description: "Contact Raj Biosis for premium diagnostic laboratory analyzers, biochemistry machines, reagents, and get a quick product quotation.",
  },
};

export default function ContactLayout({ children }) {
  return children;
}
