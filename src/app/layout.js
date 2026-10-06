import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SITE_URL, SITE_NAME, defaultKeywords, defaultDescription } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Biomedical & Laboratory Equipment Supplier in India | Raj Biosis",
    template: `%s | ${SITE_NAME}`
  },

  description: defaultDescription,

  keywords: defaultKeywords,

  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Biomedical & Laboratory Equipment Supplier in India | Raj Biosis",
    description: defaultDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  alternates: {
    canonical: SITE_URL,
  },
};

export default async function RootLayout({
  children,
}) {
  let contactData = null;
  try {
    contactData = await fetchContactData();
  } catch (e) {
    // ignore
  }

  const info = contactData?.contactInfo || [];
  const getContactField = (labels) => {
    const normalized = labels.map((l) => l.toLowerCase().trim());
    const found = info.find(
      (x) => x && x.label && normalized.includes(x.label.toLowerCase().trim())
    );
    if (!found || !found.value) return "";
    if (Array.isArray(found.value)) {
      return found.value[0] || "";
    }
    return String(found.value);
  };

  const address = getContactField(["address", "office address", "location"]);
  const phone = getContactField(["phone", "phone number", "contact number", "mobile", "mobile no"]);
  const email = getContactField(["email", "email address", "email for reply", "mail"]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": defaultDescription,
    ...(address ? {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address,
        "addressCountry": "IN"
      }
    } : {}),
    ...((phone || email) ? {
      "contactPoint": [
        {
          "@type": "ContactPoint",
          ...(phone ? { "telephone": phone } : {}),
          "contactType": "sales & customer support",
          ...(email ? { "email": email } : {}),
          "areaServed": "IN"
        }
      ]
    } : {})
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
