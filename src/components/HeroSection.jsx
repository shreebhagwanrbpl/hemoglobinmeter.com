"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "hemoglobinmetercom", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">

      {/* =========================
          HERO BANNER
      ========================== */}
      <div className="relative min-h-[560px] w-full sm:min-h-[590px] lg:min-h-[610px]">

        {/* Background Image */}
        <Image
          src="/homebanner.png"
          alt="Biomedical Laboratory and Medical Equipment"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Main Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/5" />

        {/* Slight Overall Overlay */}
        <div className="absolute inset-0 bg-blue-950/5" />

        {/* Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/60 to-transparent" />

        {/* =========================
            HERO CONTENT
        ========================== */}
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1500px] items-center px-6 py-12 sm:min-h-[590px] sm:px-8 sm:py-14 lg:min-h-[610px] lg:px-12">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              ease: "easeOut",
            }}
            className="w-full max-w-[950px]"
          >

            {/* =========================
                BADGE
            ========================== */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md">
              <ShieldCheck
                size={18}
                className="text-cyan-300"
              />

              Trusted Biomedical Systems
            </div>

            {/* =========================
                TITLE
            ========================== */}
            <h1
              className="
                max-w-[950px]
                text-4xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[64px]
                xl:text-[72px]
              "
            >
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-14 w-[85%] rounded-xl bg-white/20" />
                  <div className="h-14 w-[65%] rounded-xl bg-white/20" />
                </div>
              ) : (
                <>
                  {heroData.title}

                  {city && (
                    <>
                      {" "}
                      <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl lg:text-5xl">
                        in {city}
                      </span>
                    </>
                  )}
                </>
              )}
            </h1>

            {/* =========================
                DESCRIPTION
            ========================== */}
            {loading ? (
              <div className="mt-5 max-w-2xl animate-pulse space-y-2">
                <div className="h-4 w-full rounded bg-white/20" />
                <div className="h-4 w-[90%] rounded bg-white/20" />
              </div>
            ) : (
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                {heroData.description}

                {city && (
                  <>
                    {" "}
                    across{" "}
                    <strong className="font-semibold text-cyan-300">
                      {city}
                    </strong>
                  </>
                )}
              </p>
            )}

            {/* =========================
                BUTTONS
            ========================== */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              {loading ? (
                <>
                  <div className="h-12 w-44 animate-pulse rounded-xl bg-white/20" />
                  <div className="h-12 w-36 animate-pulse rounded-xl bg-white/20" />
                </>
              ) : (
                <>
                  <Link href={makeLink("/items")}>
                    <button
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-teal-500
                        via-cyan-500
                        to-emerald-500
                        px-7
                        py-3
                        font-semibold
                        text-white
                        shadow-[0_10px_35px_rgba(20,184,166,0.35)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-[0_15px_45px_rgba(20,184,166,0.5)]
                      "
                    >
                      {heroData.button1Text || "Explore Products"}

                      <ArrowRight size={18} />
                    </button>
                  </Link>

                  <Link href={makeLink("/contact")}>
                    <button
                      className="
                        rounded-xl
                        border
                        border-white/40
                        bg-white/10
                        px-7
                        py-3
                        font-semibold
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-white/60
                        hover:bg-white/20
                      "
                    >
                      {heroData.button2Text || "Contact Us"}
                    </button>
                  </Link>
                </>
              )}

            </div>

            {/* =========================
                STATS
            ========================== */}
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">

              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-cyan-300">
                  10+
                </h3>

                <p className="text-xs text-slate-200 sm:text-sm">
                  Years Experience
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-teal-300">
                  500+
                </h3>

                <p className="text-xs text-slate-200 sm:text-sm">
                  Products Delivered
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-emerald-300">
                  100%
                </h3>

                <p className="text-xs text-slate-200 sm:text-sm">
                  Quality Assurance
                </p>
              </div>

            </div>

          </motion.div>

        </div>

        {/* =========================
            DECORATIVE GLOWS
        ========================== */}
        <div className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-[110px]" />

        <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-[110px]" />

      </div>

    </section>
  );
}