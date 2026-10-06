"use client";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Laboratory Procurement Team",
      role: "Diagnostic Facility",
      review:
        "The catalogue helped us narrow a mixed requirement list before we sent the final enquiry.",
    },
    {
      name: "Amit Sharma",
      role: "Lab Director",
      review:
        "Having specifications and product categories together made our purchasing discussion more organised.",
    },
    {
      name: "Neha Verma",
      role: "Research Head",
      review:
        "We could review several biomedical requirements from one place instead of treating each item as a separate search.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] section-padding">

      {/* Background Glow */}
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-teal-200/30 blur-[120px]" />

      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-200/30 blur-[120px]" />


      <div className="container-custom relative z-10">


        <SectionTitle
          badge="Testimonials"
          title="Buyer Perspectives"
          description="Examples of how different organisations can use a multi-category biomedical catalogue."
          center
        />



        <div className="mt-16 grid gap-8 lg:grid-cols-3">


          {reviews.map((item, index) => (

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
          rounded-[32px]
          border
          border-teal-100
          bg-white/80
          p-8
          shadow-[0_15px_40px_rgba(15,118,110,0.08)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[0_25px_60px_rgba(15,118,110,0.18)]
          "
            >


              {/* Stars */}
              <div className="
            mb-5
            flex
            gap-1
            text-xl
            text-amber-400
          ">
                ★★★★★
              </div>



              {/* Review */}
              <p className="
            leading-8
            text-slate-600
            italic
          ">
                "{item.review}"
              </p>



              {/* Divider */}
              <div className="
            my-6
            h-px
            bg-gradient-to-r
            from-teal-100
            via-cyan-100
            to-transparent
          "/>



              {/* User */}
              <div>

                <h4 className="
              text-lg
              font-semibold
              text-slate-900
              transition-colors
              duration-300
              group-hover:text-[#0F766E]
            ">
                  {item.name}
                </h4>


                <p className="
              mt-1
              text-slate-500
            ">
                  {item.role}
                </p>


              </div>


              {/* Accent */}
              <div className="
            mt-6
            h-1
            w-12
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


    </section>
  );
}
