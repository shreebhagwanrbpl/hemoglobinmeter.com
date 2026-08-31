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
  title: "Biomedical & Laboratory Equipment Distributor | Raj Biosis",
  description: "Raj Biosis is a leading supplier and distributor of medical laboratory machines, cbc counters, biochemistry analyzers, and advanced diagnostic equipment in India.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Biomedical & Laboratory Equipment Distributor | Raj Biosis",
    description: "Raj Biosis is a leading supplier and distributor of medical laboratory machines, cbc counters, biochemistry analyzers, and advanced diagnostic equipment in India.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biomedical & Laboratory Equipment Distributor | Raj Biosis",
    description: "Raj Biosis is a leading supplier and distributor of medical laboratory machines, cbc counters, biochemistry analyzers, and advanced diagnostic equipment in India.",
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