"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export default function CTASection({ city }) {

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-[#F0FDFA] via-white to-[#ECFEFF]">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[42px] border border-teal-300/30 bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#14B8A6] p-8 lg:p-20 shadow-[0_30px_80px_rgba(15,118,110,0.35)]"
        >

          {/* Glow Effects */}
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[120px]" />

          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-300/20 blur-[140px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_45%)]" />

          <div className="relative z-10 grid items-center gap-14 lg:grid-cols-2">

            {/* Left Side */}
            <div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-xl">
                <PhoneCall size={16} />
                Start a Product Enquiry
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-6xl">
                Looking for Several
                <br />
                <span className="bg-gradient-to-r from-cyan-100 via-white to-teal-100 bg-clip-text text-transparent">
                  Biomedical Items?
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-teal-50">
                Share the categories, product names, quantities or specifications you are working with. Our team can use that information to prepare a more focused product enquiry.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">

                <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
                  <h3 className="text-3xl font-bold text-white">
                    10+
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    Product Range
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
                  <h3 className="text-3xl font-bold text-white">
                    500+
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    Product Enquiries
                  </p>
                </div>

              </div>

            </div>

            {/* Contact Card */}
            <div className="flex lg:justify-end">

              <div className="relative w-full max-w-md overflow-hidden rounded-[34px] border border-white/20 bg-white/95 p-8 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.18)]">

                {/* Card Glow */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-100 blur-3xl opacity-60" />

                <div className="relative">

                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#14B8A6] text-white shadow-lg">
                    <PhoneCall size={30} />
                  </div>

                  <h3 className="text-3xl font-bold text-slate-900">
                    Discuss Your Requirement
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    Tell us what you need across instruments, kits, reagents, consumables or other biomedical supplies and we can guide the enquiry.
                  </p>

                  <div className="mt-8 flex flex-col gap-4">

                    <Link
                      href={makeLink("/contact")}
                      className="block w-full"
                    >
                      <button
                        className="
      group
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-2xl
      bg-gradient-to-r
      from-[#0F766E]
      via-[#0D9488]
      to-[#14B8A6]
      px-6
      py-4
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      "
                      >
                        Send Requirement

                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />

                      </button>
                    </Link>


                    <a
                      href="tel:+919876543210"
                      className="
    block
    w-full
    rounded-2xl
    border-2
    border-[#0F766E]
    bg-white
    px-6
    py-4
    text-center
    font-semibold
    text-[#0F766E]
    transition-all
    duration-300
    hover:bg-[#F0FDFA]
    hover:shadow-lg
    "
                    >
                      Call the Team
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
