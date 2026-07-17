import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Central Biomedicals"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] section-padding">

        {/* Background Glow */}
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-teal-200/30 blur-[120px]" />

        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-cyan-200/30 blur-[120px]" />


        <div className="container-custom relative z-10 grid items-center gap-16 lg:grid-cols-2">


          {/* Left Image */}
          <div className="relative">


            <div
              className="
        overflow-hidden
        rounded-[40px]
        border
        border-teal-100
        bg-gradient-to-br
        from-teal-50
        via-white
        to-cyan-50
        p-8
        shadow-[0_25px_70px_rgba(15,118,110,0.15)]
        lg:p-10
        "
            >

              <Image
                src={DDS}
                alt="About"
                width={1200}
                height={900}
                className="
          h-[500px]
          w-full
          object-contain
          transition-transform
          duration-700
          hover:scale-105
          lg:h-[600px]
          "
              />

            </div>



            {/* Floating Card */}
            <div
              className="
        absolute
        bottom-8
        left-8
        hidden
        rounded-[26px]
        border
        border-teal-100
        bg-white/95
        p-6
        shadow-[0_20px_50px_rgba(15,118,110,0.18)]
        backdrop-blur-xl
        lg:block
        "
            >

              <h3
                className="
          bg-gradient-to-r
          from-[#0F766E]
          to-[#14B8A6]
          bg-clip-text
          text-4xl
          font-bold
          text-transparent
          "
              >
                10+
              </h3>

              <p className="mt-1 text-slate-600">
                Years of Excellence
              </p>

            </div>


          </div>




          {/* Right Content */}
          <div>


            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
            />



            <p className="mt-8 leading-8 text-slate-600">

              At Central Biomedicals, we are committed to delivering premium-quality
              healthcare and biomedical technologies designed to improve diagnostics,
              laboratory performance, and medical efficiency.

            </p>



            <p className="mt-5 leading-8 text-slate-600">

              Our mission is to empower healthcare professionals with trusted
              equipment, expert consultation, and innovative biomedical support.

            </p>





            {/* Feature Points */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">


              <div
                className="
          group
          rounded-2xl
          border
          border-teal-100
          bg-white
          p-5
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
          "
              >

                <div
                  className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-[#0F766E]
            to-[#14B8A6]
            text-white
            "
                >
                  ✓
                </div>


                <h4 className="text-lg font-semibold text-slate-900">
                  Premium Equipment
                </h4>


                <p className="mt-2 text-slate-500">
                  High-end diagnostic technologies.
                </p>


              </div>





              <div
                className="
          group
          rounded-2xl
          border
          border-teal-100
          bg-white
          p-5
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
          "
              >

                <div
                  className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-[#0F766E]
            to-[#14B8A6]
            text-white
            "
                >
                  ✓
                </div>


                <h4 className="text-lg font-semibold text-slate-900">
                  Expert Support
                </h4>


                <p className="mt-2 text-slate-500">
                  Trusted healthcare consultation.
                </p>


              </div>


            </div>


          </div>


        </div>

      </section>
    </>
  );
}