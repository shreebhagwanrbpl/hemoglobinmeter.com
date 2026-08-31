"use client";

import Image from "next/image";
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
} from "lucide-react";

export default function AboutClient({ city = "" }) {
  return (
    <div className="site5-static">
      {/* =====================================================
          PAGE BANNER
      ====================================================== */}
      <PageBanner
        title={
          city ? `About Our Laboratory Equipment Network in ${city}` : "About Our Laboratory Equipment Network"
        }
        subtitle={
          city
            ? `Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision in ${city}.`
            : "Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
        }
      />

      {/* =====================================================
          ABOUT INTRO
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] py-20 sm:py-24 lg:py-28">

        {/* Background Glows */}
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-teal-200/30 blur-[130px]" />

        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-[130px]" />

        <div className="container-custom relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* Image */}
          <div className="relative">

            <div
              className="
                overflow-hidden
                rounded-[38px]
                border
                border-teal-100
                bg-white
                p-3
                shadow-[0_30px_80px_rgba(15,118,110,0.16)]
                sm:p-4
              "
            >
              <Image
                src="/about.png"
                alt="Biomedical laboratory and healthcare equipment"
                width={1400}
                height={1000}
                priority
                className="
                  h-[430px]
                  w-full
                  rounded-[30px]
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-[1.03]
                  sm:h-[520px]
                  lg:h-[590px]
                "
              />
            </div>

            {/* Experience Card */}
            <div
              className="
                absolute
                -bottom-7
                left-5
                rounded-3xl
                border
                border-teal-100
                bg-white/95
                px-6
                py-5
                shadow-[0_20px_55px_rgba(15,118,110,0.18)]
                backdrop-blur-xl
                sm:left-8
              "
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white shadow-lg">
                  <BadgeCheck size={27} />
                </div>

                <div>
                  <h3 className="bg-gradient-to-r from-teal-700 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
                    10+
                  </h3>

                  <p className="text-sm font-medium text-slate-600">
                    Years of Excellence
                  </p>
                </div>
              </div>
            </div>

            {/* Small Floating Card */}
            <div
              className="
                absolute
                -right-4
                top-8
                hidden
                items-center
                gap-3
                rounded-2xl
                border
                border-white/70
                bg-white/90
                px-5
                py-4
                shadow-[0_15px_45px_rgba(15,118,110,0.15)]
                backdrop-blur-xl
                lg:flex
              "
            >
              <div className="rounded-xl bg-teal-50 p-2.5 text-teal-700">
                <Microscope size={22} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Biomedical Solutions
                </p>

                <p className="text-xs text-slate-500">
                  Diagnostic & Laboratory
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>

            <SectionTitle
              badge={city ? `Who We Are in ${city}` : "Who We Are"}
              title={
                city
                  ? `A Reliable Partner for Biomedical & Diagnostic Solutions in ${city}`
                  : "A Reliable Partner for Biomedical & Diagnostic Solutions"
              }
              description={
                city
                  ? `We support healthcare professionals, laboratories, hospitals, and diagnostic facilities in ${city} with dependable biomedical equipment and modern laboratory technologies.`
                  : "We support healthcare professionals, laboratories, hospitals, and diagnostic facilities with dependable biomedical equipment and modern laboratory technologies."
              }
            />

            <div className="mt-8 space-y-5 text-[16px] leading-8 text-slate-600">

              <p>
                At Raj Biosis, we are focused on making advanced biomedical
                and diagnostic technologies more accessible to healthcare
                professionals. Our solutions are selected with an emphasis on
                dependable performance, practical usability, and modern
                laboratory requirements.
              </p>

              <p>
                From diagnostic analyzers and laboratory instruments to
                specialized healthcare equipment, we help organizations find
                solutions that fit their operational requirements and support
                efficient day-to-day laboratory workflows
                {city ? ` in ${city}` : " across India"}.
              </p>

              <p>
                Our approach combines product knowledge, responsive
                consultation, and customer-focused support to help laboratories
                and healthcare facilities make informed equipment decisions.
              </p>

            </div>

            {/* Feature Points */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white">
                  <ShieldCheck size={21} />
                </div>

                <h4 className="font-semibold text-slate-900">
                  Quality Focused
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Solutions selected with reliability, usability, and
                  healthcare requirements in mind.
                </p>
              </div>

              <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white">
                  <Headphones size={21} />
                </div>

                <h4 className="font-semibold text-slate-900">
                  Customer Support
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Practical guidance and responsive support throughout the
                  equipment selection process.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="container-custom">

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-cyan-300">
                10+
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Years Experience
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-teal-300">
                500+
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Products Delivered
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-emerald-300">
                100%
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Quality Focus
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-sm">
              <h3 className="text-4xl font-bold text-cyan-300">
                Pan India
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Service Reach
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHAT WE PROVIDE
      ====================================================== */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="container-custom">

          <SectionTitle
            badge="Our Expertise"
            title={
              city
                ? `Biomedical Solutions Designed for Modern Healthcare in ${city}`
                : "Biomedical Solutions Designed for Modern Healthcare"
            }
            description="Our product portfolio covers a wide range of laboratory and diagnostic requirements, helping healthcare facilities build efficient and dependable workflows."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Card 1 */}
            <div className="group rounded-3xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white shadow-lg">
                <Microscope size={26} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Laboratory Equipment
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Modern laboratory instruments designed to support accurate,
                efficient, and dependable laboratory operations.
              </p>

            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-500 text-white shadow-lg">
                <FlaskConical size={26} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Diagnostic Systems
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Diagnostic technologies and analyzers supporting modern
                healthcare laboratories and testing environments.
              </p>

            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-lg">
                <Stethoscope size={26} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Healthcare Equipment
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Practical healthcare equipment solutions for hospitals,
                clinics, laboratories, and diagnostic facilities.
              </p>

            </div>

            {/* Card 4 */}
            <div className="group rounded-3xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white shadow-lg">
                <Settings2 size={26} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Laboratory Automation
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Technology-driven solutions that help laboratories improve
                workflow efficiency and operational consistency.
              </p>

            </div>

            {/* Card 5 */}
            <div className="group rounded-3xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-500 text-white shadow-lg">
                <Target size={26} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Precision & Efficiency
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Solutions focused on dependable results, practical operation,
                and efficient laboratory performance.
              </p>

            </div>

            {/* Card 6 */}
            <div className="group rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-lg">
                <Headphones size={26} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Consultation & Support
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Product guidance and responsive support to help customers
                choose solutions suited to their specific requirements.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION / VISION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#ECFEFF] to-white py-20 sm:py-24">

        <div className="container-custom">

          <div className="grid gap-7 lg:grid-cols-2">

            {/* Mission */}
            <div className="rounded-[32px] border border-teal-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,118,110,0.08)] sm:p-10">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white">
                <Target size={27} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Our Mission
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Our mission is to provide healthcare organizations with
                dependable biomedical and diagnostic technologies that help
                improve laboratory efficiency, support accurate diagnostics,
                and contribute to better healthcare operations.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                We aim to build long-term customer relationships through
                product knowledge, transparent communication, and
                service-oriented support.
              </p>

            </div>

            {/* Vision */}
            <div className="rounded-[32px] border border-cyan-100 bg-white p-8 shadow-[0_20px_60px_rgba(8,145,178,0.08)] sm:p-10">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-500 text-white">
                <Eye size={27} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Our Vision
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Our vision is to become a dependable name in biomedical and
                laboratory solutions by connecting healthcare facilities with
                modern technologies and practical equipment solutions.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                We continuously focus on evolving healthcare requirements,
                emerging laboratory technologies, and solutions that create
                meaningful value for our customers.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-custom">

          <SectionTitle
            badge="Why Labs Partner With Our Team"
            title="Built Around Quality, Trust & Healthcare Needs"
            description="We focus on making the process of finding and adopting biomedical equipment simple, practical, and reliable."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <ShieldCheck className="mb-5 text-teal-600" size={30} />

              <h4 className="font-bold text-slate-900">
                Reliable Solutions
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Equipment solutions selected around practical healthcare
                requirements.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <Microscope className="mb-5 text-cyan-600" size={30} />

              <h4 className="font-bold text-slate-900">
                Product Knowledge
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Detailed understanding of laboratory and diagnostic equipment.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <BadgeCheck className="mb-5 text-emerald-600" size={30} />

              <h4 className="font-bold text-slate-900">
                Quality Focus
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Focus on dependable products and efficient healthcare
                workflows.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <Headphones className="mb-5 text-teal-600" size={30} />

              <h4 className="font-bold text-slate-900">
                Customer Support
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Responsive guidance from product selection through
                implementation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-gradient-to-r from-teal-800 via-cyan-700 to-teal-800 py-16 sm:py-20">
        <div className="container-custom">

          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-3xl">

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Healthcare Technology
              </p>

              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                Looking for the Right Biomedical Equipment?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-teal-50">
                Explore our diagnostic and laboratory equipment portfolio or
                connect with us to discuss your specific healthcare
                requirements
                {city ? ` in ${city}` : ""}.
              </p>

            </div>

            <a
              href={city ? `/${city.toLowerCase().replace(/\s+/g, "-")}/contact` : "/contact"}
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                bg-white
                px-7
                py-3.5
                font-semibold
                text-teal-800
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-cyan-50
              "
            >
              Contact Us
              <ArrowRight size={18} />
            </a>

          </div>

        </div>
      </section>
    </div>
  );
}
