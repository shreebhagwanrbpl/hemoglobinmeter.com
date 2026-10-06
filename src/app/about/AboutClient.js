"use client";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import {
  Microscope,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Settings2,
  Headphones,
  BadgeCheck,
  Target,
  Eye,
  ArrowRight,
  Truck,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function AboutClient({ city = "" }) {
  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";
  const makeLink = (path) => (districtSlug ? `/${districtSlug}${path}` : path);

  const bannerFeatures = [
    {
      icon: <ShieldCheck size={15} />,
      text: "Verified Biomedical Suppliers",
    },
    {
      icon: <Microscope size={15} />,
      text: "Multi-Category Catalogue",
    },
    {
      icon: <Truck size={15} />,
      text: "Pan-India Logistics",
    },
    {
      icon: <Headphones size={15} />,
      text: "Dedicated Sourcing Desk",
    },
  ];

  return (
    <div className="site5-static">
      {/* =====================================================
          PAGE BANNER (Rich & Upgraded)
      ====================================================== */}
      <PageBanner
        badge={city ? `Biomedical Supply Desk • ${city}` : "About Raj Biosis & Biomedical Desk"}
        title={
          city
            ? `About Our Biomedical Catalogue in ${city}`
            : "About Our Biomedical Product Catalogue"
        }
        subtitle={
          city
            ? `A comprehensive biomedical resource connecting hospitals, clinics, diagnostic centers, and laboratory facilities in ${city} with trusted healthcare equipment and diagnostic supplies.`
            : "A specialized biomedical product resource connecting healthcare professionals, laboratories, and institutions with verified equipment, diagnostic analyzers, reagents, and consumables."
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: city ? `About (${city})` : "About Us" },
        ]}
        features={bannerFeatures}
      />

      {/* =====================================================
          ABOUT INTRO & STATIC SHOWCASE
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] py-16 sm:py-20 lg:py-24">
        {/* Background Glows */}
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-teal-200/30 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-[130px]" />

        <div className="container-custom relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Static Image Showcase */}
          <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
            <div className="overflow-hidden rounded-[32px] border border-teal-100 bg-white p-2.5 shadow-[0_25px_70px_rgba(15,118,110,0.12)] sm:p-3.5">
              <div className="relative h-[340px] w-full overflow-hidden rounded-[26px] sm:h-[420px] lg:h-[460px]">
                <Image
                  src="/about.png"
                  alt="Biomedical products across multiple categories"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-5 left-4 rounded-2xl border border-teal-100 bg-white/95 px-5 py-3.5 shadow-[0_15px_40px_rgba(15,118,110,0.15)] backdrop-blur-xl sm:left-6 sm:px-6 sm:py-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white shadow-md">
                  <BadgeCheck size={24} />
                </div>
                <div>
                  <h3 className="bg-gradient-to-r from-teal-700 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                    10+ Years
                  </h3>
                  <p className="text-xs font-medium text-slate-600 sm:text-sm">
                    Biomedical Expertise
                  </p>
                </div>
              </div>
            </div>

            {/* Top-Right Floating Pill */}
            <div className="absolute -right-3 top-6 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_15px_35px_rgba(15,118,110,0.12)] backdrop-blur-xl sm:flex">
              <div className="rounded-xl bg-teal-50 p-2 text-teal-700">
                <Microscope size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Laboratory Systems
                </p>
                <p className="text-[11px] text-slate-500">
                  Precision Diagnostic Tools
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-4 lg:mt-0">
            <SectionTitle
              badge={city ? `Who We Are in ${city}` : "Who We Are"}
              title={
                city
                  ? `Dedicated Biomedical Sourcing Resource in ${city}`
                  : "A Structured Catalogue for Biomedical Requirements"
              }
              description={
                city
                  ? `We support healthcare professionals, laboratories, clinics, and hospitals in ${city} with reliable diagnostic instruments, reagents, and biomedical supplies.`
                  : "Raj Biosis brings together comprehensive product information for buyers seeking standalone instruments, routine consumables, diagnostic analyzers, or bulk institutional equipment."
              }
            />

            <div className="mt-6 space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
              <p>
                Our catalogue is curated for ease of product discovery. We assist clinical and diagnostic institutions in exploring a wide selection of biomedical equipment, diagnostic systems, test kits, reagents, and consumables under one single desk.
              </p>
              <p>
                From single-item procurement to recurring bulk laboratory supplies, our team assists buyers across {city ? city : "India"} with specifications, comparative datasheets, and transparent quotations.
              </p>
            </div>

            {/* Feature Points Grid */}
            <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-2xl border border-teal-100 bg-white p-4.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-semibold text-slate-900">
                  Category Variety
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  Well-organized biomedical groups allowing quick comparison and selection.
                </p>
              </div>

              <div className="rounded-2xl border border-teal-100 bg-white p-4.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white">
                  <Headphones size={20} />
                </div>
                <h4 className="font-semibold text-slate-900">
                  Buyer Communication
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  Responsive support and technical clarification during equipment selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          KEY METRICS / STATS
      ====================================================== */}
      <section className="bg-slate-950 py-14 sm:py-16">
        <div className="container-custom">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-cyan-300 sm:text-4xl">
                10+
              </h3>
              <p className="mt-1.5 text-xs text-slate-300 sm:text-sm">
                Years of Experience
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-teal-300 sm:text-4xl">
                800+
              </h3>
              <p className="mt-1.5 text-xs text-slate-300 sm:text-sm">
                Products & Reagents
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-emerald-300 sm:text-4xl">
                100%
              </h3>
              <p className="mt-1.5 text-xs text-slate-300 sm:text-sm">
                Quality Assured
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-cyan-300 sm:text-4xl">
                Pan-India
              </h3>
              <p className="mt-1.5 text-xs text-slate-300 sm:text-sm">
                Distribution Network
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE PROVIDE / PRODUCT PORTFOLIO
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-custom">
          <SectionTitle
            badge="Our Expertise"
            title={
              city
                ? `Biomedical Product Portfolio in ${city}`
                : "Comprehensive Biomedical Portfolio"
            }
            description="Our catalogue spans across high-precision laboratory instruments, automated diagnostic analyzers, point-of-care test kits, consumables, and hospital supplies."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white shadow-md">
                <Microscope size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Laboratory Equipment
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Centrifuges, spectrophotometers, incubators, and testing devices built for operational dependability.
              </p>
            </div>

            <div className="group rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-blue-500 text-white shadow-md">
                <FlaskConical size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Diagnostic Systems
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clinical chemistry analyzers, hematology instruments, and diagnostic test platforms.
              </p>
            </div>

            <div className="group rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-md">
                <Stethoscope size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Healthcare Supplies
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Essential diagnostic test strips, reagents, consumables, and hospital monitoring gear.
              </p>
            </div>

            <div className="group rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white shadow-md">
                <Settings2 size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Laboratory Automation
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Automated equipment to boost sample processing speed and diagnostic accuracy.
              </p>
            </div>

            <div className="group rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-blue-500 text-white shadow-md">
                <Target size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Precision & Quality
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Strict quality control ensuring reproducible results for clinical diagnostic workflows.
              </p>
            </div>

            <div className="group rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-md">
                <Headphones size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Technical Consultation
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Expert support for quotation requests, instrument compatibility, and setup guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION & VISION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#ECFEFF] to-white py-16 sm:py-20">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Mission */}
            <div className="rounded-[28px] border border-teal-100 bg-white p-7 shadow-[0_15px_45px_rgba(15,118,110,0.06)] sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="mt-3.5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                To equip healthcare providers, diagnostic laboratories, and medical facilities with premium biomedical equipment and dependable consumables that enhance diagnostic speed, precision, and healthcare outcomes.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                We strive to establish long-term partnerships through clear product information, genuine supply chains, and transparent customer service.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-[28px] border border-cyan-100 bg-white p-7 shadow-[0_15px_45px_rgba(8,145,178,0.06)] sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-blue-500 text-white">
                <Eye size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="mt-3.5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                To be India&apos;s most trusted biomedical sourcing and distribution desk, bridging the gap between cutting-edge medical technologies and healthcare institutions nationwide.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                We are dedicated to expanding biomedical access, improving diagnostic turnaround, and providing consistent supply assurance across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
      ====================================================== */}
      <section className="bg-gradient-to-r from-teal-800 via-cyan-700 to-teal-800 py-14 sm:py-16">
        <div className="container-custom">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Healthcare Technology & Procurement
              </p>
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                Ready to Source Biomedical Instruments or Supplies?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50 sm:text-base sm:leading-7">
                Explore our full product catalogue or connect directly with our sourcing team for rapid quotes and technical assistance{city ? ` in ${city}` : ""}.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={makeLink("/items")}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-50"
              >
                Browse Catalogue
                <ArrowRight size={16} />
              </Link>
              <Link
                href={makeLink("/contact")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/70 hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
