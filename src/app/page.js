import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Biomedical Product Catalogue & Sourcing Desk | Raj Biosis",
  description: "Raj Biosis brings together biomedical devices, laboratory supplies, diagnostic systems, reagents, consumables and healthcare equipment for organisations sourcing products across India.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Biomedical Product Catalogue & Sourcing Desk | Raj Biosis",
    description: "Raj Biosis brings together biomedical devices, laboratory supplies, diagnostic systems, reagents, consumables and healthcare equipment for organisations sourcing products across India.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biomedical Product Catalogue & Sourcing Desk | Raj Biosis",
    description: "Raj Biosis brings together biomedical devices, laboratory supplies, diagnostic systems, reagents, consumables and healthcare equipment for organisations sourcing products across India.",
  }
};

export default function Home({ city = "" }) {
  return (
    <div className="site5-static">
      <HeroSection city={city} />
      <TrustedBrands city={city} />
      <WhyChooseUs city={city} />
      <StatsSection city={city} />
      <ServicesPreview city={city} />
      <SeoContent city={city} />
      <Testimonials city={city} />
      <CTASection city={city} />
    </div>
  );
}
