"use client";

import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  Settings2,
  BadgeCheck,
  Headphones,
  Target,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ServicesPage({ city = "" }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "hemoglobinmetercom",
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="site5-static">
      {/* =====================================================
          PAGE BANNER
      ====================================================== */}
      <PageBanner
        title={
          city
            ? `Laboratory Equipment Services in ${city}`
            : "Our Biomedical Services"
        }
        subtitle={
          city
            ? `Delivering trusted biomedical, laboratory, and diagnostic services in ${city} with precision, reliability, and healthcare-focused support.`
            : "Delivering trusted biomedical, laboratory, and diagnostic services with precision, reliability, and healthcare-focused support."
        }
      />

      {/* =====================================================
          SERVICES INTRO + GRID
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] py-20 sm:py-24 lg:py-28">

        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-28 top-20 h-96 w-96 rounded-full bg-teal-200/30 blur-[130px]" />

        <div className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-[130px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge={
              city
                ? `What We Offer in ${city}`
                : "What We Offer"
            }
            title={
              city
                ? `Complete Biomedical Services for Healthcare Facilities in ${city}`
                : "Complete Biomedical Services for Modern Healthcare"
            }
            description={
              city
                ? `Our services are designed to support laboratories, hospitals, diagnostic centres, clinics, and healthcare professionals in ${city} with dependable equipment solutions and practical technical assistance.`
                : "Our services are designed to support laboratories, hospitals, diagnostic centres, clinics, and healthcare professionals with dependable equipment solutions and practical technical assistance."
            }
            center
          />

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="leading-8 text-slate-600">
              From selecting the right laboratory equipment to ongoing
              technical support, we focus on making biomedical technology
              easier to understand, implement, and operate. Our approach
              combines product knowledge, healthcare requirements, and
              customer-focused assistance.
            </p>
          </div>

          {/* Services Grid */}
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="
                      animate-pulse
                      rounded-[30px]
                      border
                      border-teal-100
                      bg-white
                      p-10
                      shadow-[0_15px_40px_rgba(15,118,110,0.08)]
                    "
                >
                  <div className="mb-8 h-20 w-20 rounded-3xl bg-teal-100" />

                  <div className="mb-6 h-8 rounded bg-teal-100" />

                  <div className="space-y-3">
                    <div className="h-4 rounded bg-teal-100" />
                    <div className="h-4 w-11/12 rounded bg-teal-100" />
                    <div className="h-4 w-8/12 rounded bg-teal-100" />
                  </div>
                </div>
              ))
              : services.length > 0
                ? services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={icons[index % icons.length]}
                    title={service.title}
                    description={service.desc}
                  />
                ))
                : (
                  <div className="col-span-full rounded-3xl border border-teal-100 bg-white p-10 text-center shadow-sm">
                    <p className="text-slate-500">
                      Our services are being updated. Please contact us
                      for more information.
                    </p>
                  </div>
                )}

          </div>

        </div>
      </section>

      {/* =====================================================
          WHY OUR SERVICES
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">

        <div className="container-custom">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Left Content */}
            <div>

              <SectionTitle
                badge="Why Laboratory Equipment Services"
                title={
                  city
                    ? `Support Built Around Healthcare Needs in ${city}`
                    : "Support Built Around Real Healthcare Needs"
                }
                description="We understand that biomedical equipment is only one part of a successful laboratory or healthcare setup. Reliable support, practical guidance, and timely assistance are equally important."
              />

              <div className="mt-8 space-y-5">

                {[
                  {
                    icon: BadgeCheck,
                    title: "Quality-Focused Solutions",
                    desc: "We focus on dependable biomedical and diagnostic solutions suited to modern healthcare environments.",
                  },
                  {
                    icon: Settings2,
                    title: "Practical Technical Guidance",
                    desc: "Our approach helps customers understand equipment capabilities, applications, and operational requirements.",
                  },
                  {
                    icon: Headphones,
                    title: "Responsive Customer Support",
                    desc: "We remain focused on helping customers with product-related queries and service requirements.",
                  },
                  {
                    icon: Target,
                    title: "Application-Oriented Approach",
                    desc: "Solutions are considered around the actual laboratory workflow and healthcare application.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="
                        group
                        flex
                        gap-4
                        rounded-2xl
                        border
                        border-teal-100
                        bg-gradient-to-r
                        from-white
                        to-teal-50/60
                        p-5
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-lg
                      "
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white shadow-md">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">

              <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-slate-950 via-teal-950 to-cyan-900 p-8 shadow-[0_30px_80px_rgba(15,118,110,0.22)] sm:p-10 lg:p-12">

                {/* Decorative Circles */}
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />

                <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-teal-400/20 blur-3xl" />

                <div className="relative z-10">

                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-cyan-300 backdrop-blur-md">
                    <Microscope size={32} />
                  </div>

                  <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                    Reliable Technology.
                    <br />
                    Practical Support.
                  </h3>

                  <p className="mt-5 leading-8 text-slate-300">
                    Healthcare facilities need more than equipment.
                    They need dependable solutions that fit their
                    workflow, application, and operational requirements.
                    Our services are built around that principle.
                  </p>

                  <div className="mt-8 space-y-4">

                    {[
                      "Laboratory-focused solutions",
                      "Diagnostic equipment support",
                      "Healthcare technology guidance",
                      "Customer-focused assistance",
                    ].map((text, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-400/20 text-teal-300">
                          <CheckCircle2 size={17} />
                        </div>

                        <span className="text-sm text-slate-200">
                          {text}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          SERVICE CAPABILITIES
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0FDFA] via-white to-[#ECFEFF] py-20 sm:py-24 lg:py-28">

        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-teal-200/20 blur-[120px]" />

        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-cyan-200/20 blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Our Capabilities"
            title="Services That Support Every Stage"
            description="Our service approach covers the important stages involved in selecting, implementing, and maintaining biomedical and diagnostic solutions."
            center
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: Microscope,
                title: "Equipment Selection",
                desc: "Helping identify equipment based on application, laboratory requirements, capacity, and workflow.",
              },
              {
                icon: FlaskConical,
                title: "Diagnostic Solutions",
                desc: "Supporting modern diagnostic environments with suitable laboratory technologies and systems.",
              },
              {
                icon: Wrench,
                title: "Technical Assistance",
                desc: "Providing practical assistance related to biomedical equipment and operational requirements.",
              },
              {
                icon: Activity,
                title: "Performance Focus",
                desc: "Keeping reliability, consistency, and efficient healthcare workflows at the centre of our approach.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    rounded-[28px]
                    border
                    border-teal-100
                    bg-white
                    p-7
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-[0_20px_50px_rgba(15,118,110,0.12)]
                  "
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.desc}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          WORKING PROCESS
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">

        <div className="container-custom">

          <SectionTitle
            badge="How We Work"
            title="A Simple & Professional Service Process"
            description="We follow a streamlined approach to understand requirements, recommend suitable solutions, and provide dependable support."
            center
          />

          <div className="relative mt-14 grid gap-7 lg:grid-cols-3">

            {/* Connecting Line */}
            <div className="absolute left-[16.66%] right-[16.66%] top-16 hidden h-px bg-gradient-to-r from-teal-200 via-cyan-300 to-teal-200 lg:block" />

            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We understand your laboratory, diagnostic, or healthcare requirements and identify the key application needs.",
              },
              {
                step: "02",
                title: "Solution Planning",
                desc: "Based on the requirements, we help identify suitable equipment and practical biomedical solutions.",
              },
              {
                step: "03",
                title: "Support",
                desc: "We remain focused on customer assistance and ongoing equipment-related requirements after selection.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  z-10
                  rounded-[30px]
                  border
                  border-teal-100
                  bg-white
                  p-8
                  shadow-[0_15px_40px_rgba(15,118,110,0.07)]
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_25px_60px_rgba(15,118,110,0.14)]
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-500 text-xl font-bold text-white shadow-lg">
                  {item.step}
                </div>

                <h3 className="mt-7 text-2xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-teal-700">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.desc}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-gradient-to-r from-teal-700 to-cyan-500 transition-all duration-300 group-hover:w-24" />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE STATS
      ====================================================== */}
      <section className="bg-slate-950 py-16 sm:py-20">

        <div className="container-custom">

          <div className="mb-10 text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Our Commitment
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Focused on Better Healthcare Support
            </h2>

          </div>

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
          FINAL CTA
      ====================================================== */}
      <CTASection />
    </div>
  );
}