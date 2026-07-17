"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ServicesPage() {
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
            "centralbiomedicals",
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
    <>
      {/* Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Delivering trusted biomedical and diagnostic services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] section-padding">

        {/* Background Glow */}
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-teal-200/30 blur-[120px]" />

        <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-200/30 blur-[120px]" />


        <div className="container-custom relative z-10">


          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description="We provide innovative healthcare and biomedical solutions tailored to modern diagnostics and laboratory excellence."
            center
          />



          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">


            {loading

              ? Array.from({ length: 6 }).map((_, index) => (

                <div
                  key={index}
                  className="
            rounded-[30px]
            border
            border-teal-100
            bg-white
            p-10
            shadow-[0_15px_40px_rgba(15,118,110,0.08)]
            animate-pulse
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


              : services.map((service, index) => (

                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.desc}
                />

              ))}


          </div>


        </div>


      </section>

      {/* Working Process */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0FDFA] via-white to-[#ECFEFF] section-padding">

        {/* Background Glow */}
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal-200/30 blur-[120px]" />

        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-cyan-200/30 blur-[120px]" />


        <div className="container-custom relative z-10">


          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to ensure reliable biomedical and healthcare solutions."
            center
          />



          <div className="mt-16 grid gap-8 lg:grid-cols-3">


            {[
              {
                step: "01",
                title: "Consultation",
                desc:
                  "Understanding healthcare requirements and diagnostics needs.",
              },
              {
                step: "02",
                title: "Implementation",
                desc:
                  "Delivering biomedical equipment and technical setup.",
              },
              {
                step: "03",
                title: "Support",
                desc:
                  "Providing maintenance and healthcare assistance.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="
          group
          relative
          rounded-[30px]
          border
          border-teal-100
          bg-white/90
          p-8
          shadow-[0_15px_40px_rgba(15,118,110,0.08)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[0_25px_60px_rgba(15,118,110,0.18)]
          "
              >


                {/* Step Number */}

                <div
                  className="
            text-6xl
            font-bold
            bg-gradient-to-r
            from-[#0F766E]
            via-[#0D9488]
            to-[#14B8A6]
            bg-clip-text
            text-transparent
            opacity-20
            transition-all
            duration-300
            group-hover:opacity-40
            "
                >
                  {item.step}
                </div>



                {/* Title */}

                <h3
                  className="
            mt-5
            text-2xl
            font-semibold
            text-slate-900
            transition-colors
            duration-300
            group-hover:text-[#0F766E]
            "
                >
                  {item.title}
                </h3>



                {/* Description */}

                <p className="
            mt-4
            leading-7
            text-slate-600
          ">
                  {item.desc}
                </p>



                {/* Bottom Accent */}

                <div
                  className="
            mt-6
            h-1
            w-12
            rounded-full
            bg-gradient-to-r
            from-[#0F766E]
            to-[#14B8A6]
            transition-all
            duration-300
            group-hover:w-24
            "
                />


              </div>

            ))}


          </div>


        </div>


      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}