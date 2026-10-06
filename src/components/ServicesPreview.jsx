"use client";
import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview({ city = "" }) {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Product Discovery",
      description:
        "Find suitable devices and systems by application, specification, category or intended workflow.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Specification Assistance",
      description:
        "Compare practical requirements such as capacity, parameters, configuration and intended use before requesting a quotation.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Order Coordination",
      description:
        "Get help compiling multi-item requirements and coordinating product enquiries with the appropriate team.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] section-padding">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-teal-200/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-200/30 blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Title */}
        <SectionTitle
          badge={city ? `Sourcing Services in ${city}` : "Biomedical Sourcing Services"}
          title={city ? `Support for Product Sourcing in ${city}` : "Support for Biomedical Product Sourcing"}
          description={
            city
              ? `Helping healthcare buyers in ${city} navigate a mixed biomedical catalogue, from instruments and test systems to reagents, consumables and related supplies.`
              : "Helping buyers navigate a mixed biomedical catalogue, from instruments and test systems to reagents, consumables and related supplies."
          }
          center
        />

        {/* 3 Equal Height Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
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
              className="h-full flex"
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
