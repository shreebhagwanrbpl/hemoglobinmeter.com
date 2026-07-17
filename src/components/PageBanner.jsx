"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0FDFA] via-white to-[#ECFEFF] py-28 lg:py-36">

      {/* Background Glow */}
      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-teal-200/30 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-[120px]" />


      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-4xl text-center"
        >


          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-5 py-2 text-sm font-semibold text-[#0F766E] shadow-sm">
            Biomedical Excellence
          </div>


          {/* Title */}
          <h1 className="text-5xl font-bold leading-tight text-slate-900 lg:text-7xl">

            <span className="bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
              {title}
            </span>

          </h1>


          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">

            {subtitle}

          </p>


          {/* Bottom Gradient Line */}
          <div className="mx-auto mt-10 h-1 w-32 rounded-full bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-cyan-400" />


        </motion.div>

      </div>

    </section>
  );
}