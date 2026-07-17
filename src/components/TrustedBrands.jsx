"use client";
import { motion } from "framer-motion";
export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="relative overflow-hidden border-y border-teal-100 bg-gradient-to-b from-[#F0FDFA] via-white to-[#ECFEFF] py-16">

      {/* Background Glow */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-teal-200/30 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cyan-200/30 blur-[120px]" />


      <div className="container-custom relative z-10">


        {/* Heading */}
        <p className="
      mb-10
      text-center
      text-base
      font-semibold
      text-[#0F766E]
    ">
          Trusted by Healthcare &
          <br className="sm:hidden" />
          Biomedical Organizations
        </p>



        {/* Brands */}
        <div className="
      grid
      grid-cols-2
      items-center
      gap-6
      md:grid-cols-3
      lg:grid-cols-5
    ">


          {brands.map((brand, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              className="
          group
          rounded-2xl
          border
          border-teal-100
          bg-white/90
          p-6
          text-center
          font-semibold
          text-slate-700
          shadow-[0_10px_30px_rgba(15,118,110,0.08)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-teal-300
          hover:text-[#0F766E]
          hover:shadow-[0_20px_45px_rgba(15,118,110,0.15)]
          "
            >

              <div className="
            transition-all
            duration-300
            group-hover:scale-105
          ">
                {brand}
              </div>


            </motion.div>

          ))}


        </div>


      </div>


    </section>
  );
}