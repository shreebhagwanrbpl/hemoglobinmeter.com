"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] section-padding">

      {/* Background Glow */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal-200/30 blur-[120px]" />

      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-[130px]" />


      <div className="container-custom relative z-10">


        <div className="
      rounded-[40px]
      border
      border-teal-100
      bg-white/90
      p-10
      shadow-[0_25px_70px_rgba(15,118,110,0.12)]
      backdrop-blur-xl
      lg:p-16
    ">


          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">


            {stats.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
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
                className="group text-center"
              >


                {/* Icon */}
                <div
                  className="
              mx-auto
              mb-6
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-[24px]
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



                {/* Number */}
                <h3
                  className="
              text-4xl
              font-bold
              bg-gradient-to-r
              from-[#0F766E]
              via-[#0D9488]
              to-[#14B8A6]
              bg-clip-text
              text-transparent
              lg:text-5xl
              "
                >
                  {item.number}
                </h3>



                {/* Label */}
                <p className="
              mt-3
              text-lg
              text-slate-600
            ">
                  {item.label}
                </p>


                {/* Bottom Line */}
                <div className="
              mx-auto
              mt-5
              h-1
              w-10
              rounded-full
              bg-gradient-to-r
              from-[#0F766E]
              to-[#14B8A6]
              transition-all
              duration-300
              group-hover:w-20
            "/>


              </motion.div>

            ))}


          </div>


        </div>


      </div>


    </section>
  );
}