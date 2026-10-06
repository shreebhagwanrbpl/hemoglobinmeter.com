import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Contact Us",
  description: "Contact Raj Biosis to discuss biomedical equipment, diagnostic products, reagents, consumables and other catalogue requirements.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Contact Raj Biosis to discuss biomedical equipment, diagnostic products, reagents, consumables and other catalogue requirements.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${SITE_NAME}`,
    description: "Contact Raj Biosis to discuss biomedical equipment, diagnostic products, reagents, consumables and other catalogue requirements.",
  },
};

export default function ContactLayout({ children }) {
  return children;
}
