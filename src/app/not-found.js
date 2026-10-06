import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export default function NotFound() {
  return (
    <>
      <PageBanner
        title="404 - Page Not Found"
        subtitle="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      />
      <section className="section-padding bg-white text-center">
        <div className="container-custom max-w-xl mx-auto">
          <div className="w-24 h-24 mx-auto rounded-full bg-teal-50 flex items-center justify-center text-5xl mb-8">
            🔍
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-600 mb-8 leading-7">
            This page is not available. Continue to the product catalogue to explore biomedical equipment, diagnostic items, supplies and related products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="primary-btn flex justify-center items-center">
              Go to Home
            </Link>
            <Link href="/items" className="secondary-btn flex justify-center items-center">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
