"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description:
        "Modern biomedical and diagnostic equipment for accurate healthcare solutions.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description:
        "Reliable and certified diagnostic systems with premium quality standards.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description:
        "Delivering healthcare-driven biomedical solutions with precision and care.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description:
        "Professional consultation and technical support for all medical needs.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] section-padding">

      {/* Background Glow */}
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-teal-200/30 blur-[120px]" />

      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-200/30 blur-[120px]" />


      <div className="container-custom relative z-10">


        {/* Section Title */}
        <SectionTitle
          badge="Why Labs Partner With Our Team"
          title="Trusted Biomedical Excellence"
          description="We deliver innovative diagnostic technologies and biomedical solutions with precision, trust, and unmatched service quality."
          center
        />


        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">


          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="
          group
          rounded-[28px]
          border
          border-teal-100
          bg-white/90
          p-8
          shadow-[0_15px_40px_rgba(15,118,110,0.08)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-teal-300
          hover:shadow-[0_25px_60px_rgba(15,118,110,0.18)]
          "
            >


              {/* Icon */}
              <div
                className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#0F766E]
            via-[#0D9488]
            to-[#14B8A6]
            text-white
            shadow-lg
            shadow-teal-200
            transition-all
            duration-300
            group-hover:scale-110
            "
              >
                {item.icon}
              </div>



              {/* Title */}
              <h3
                className="
            mb-4
            text-xl
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
            leading-7
            text-slate-600
          ">
                {item.description}
              </p>



              {/* Bottom Accent */}
              <div
                className="
            mt-6
            h-1
            w-10
            rounded-full
            bg-gradient-to-r
            from-[#0F766E]
            to-[#14B8A6]
            transition-all
            duration-300
            group-hover:w-20
            "
              />


            </motion.div>

          ))}


        </div>


      </div>


    </section>
  );
}