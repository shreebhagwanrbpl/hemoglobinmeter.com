"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
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
          doc(db, "websites", "centralbiomedicals", "pages", "home")
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
    <section className="gradient-bg overflow-hidden">
      <div className="container-custom min-h-[85vh] py-20 lg:py-0 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-100 via-cyan-100 to-emerald-100 px-5 py-2.5 text-sm font-semibold text-teal-700 shadow-md shadow-teal-100 mb-7">
            <ShieldCheck
              size={18}
              className="text-teal-600"
            />
            Trusted Biomedical Systems
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 w-[80%] rounded-xl bg-teal-100"></div>
                <div className="h-12 w-[60%] rounded-xl bg-teal-100"></div>
                <div className="h-12 w-[70%] rounded-xl bg-teal-100"></div>
              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />

                    <span className="bg-gradient-to-r from-teal-700 via-cyan-600 to-emerald-500 bg-clip-text text-2xl font-semibold text-transparent lg:text-4xl">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="mt-7 animate-pulse space-y-3">
              <div className="h-4 w-full rounded bg-teal-100"></div>
              <div className="h-4 w-[90%] rounded bg-teal-100"></div>
              <div className="h-4 w-[75%] rounded bg-teal-100"></div>
            </div>
          ) : (
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              {heroData.description}
              {city && (
                <>
                  {" "}
                  across{" "}
                  <strong className="font-semibold text-teal-700">
                    {city}
                  </strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {loading ? (
              <>
                <div className="h-12 w-44 animate-pulse rounded-xl bg-teal-100"></div>
                <div className="h-12 w-36 animate-pulse rounded-xl bg-teal-100"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/services")}>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 via-cyan-600 to-emerald-500 px-7 py-3 font-semibold text-white shadow-lg shadow-teal-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-300">
                    {heroData.button1Text || "Explore Services"}
                    <ArrowRight size={18} />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="rounded-xl border-2 border-teal-600 bg-white px-7 py-3 font-semibold text-teal-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:shadow-md">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">

            <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="bg-gradient-to-r from-teal-700 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
                10+
              </h3>
              <p className="mt-1 text-slate-600">
                Years Experience
              </p>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-cyan-50 px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="bg-gradient-to-r from-teal-700 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
                500+
              </h3>
              <p className="mt-1 text-slate-600">
                Products Delivered
              </p>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-emerald-50 px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="bg-gradient-to-r from-teal-700 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
                100%
              </h3>
              <p className="mt-1 text-slate-600">
                Quality Assurance
              </p>
            </div>

          </div>

        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          {/* Main Image */}
          <div className="overflow-hidden rounded-[40px] border border-teal-100 bg-gradient-to-br from-white via-teal-50 to-cyan-50 p-4 shadow-[0_25px_60px_rgba(13,148,136,0.18)]">

            <Image
              src={CBG}
              alt="Central Biomedical"
              width={1200}
              height={900}
              className="h-[350px] w-full rounded-[30px] object-cover object-[20%_center] transition-all duration-700 hover:scale-105 sm:h-[450px] lg:h-[550px]"
            />

          </div>

          {/* Decorative Gradient Blur */}
          <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-gradient-to-br from-teal-300/30 to-cyan-300/20 blur-3xl"></div>

          <div className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-gradient-to-br from-emerald-300/20 to-teal-300/20 blur-3xl"></div>

          {/* Floating Card 1 */}
          <div
            className="absolute -left-10 top-10 hidden items-center gap-4 rounded-3xl border border-teal-100 bg-white/90 backdrop-blur-xl px-5 py-4 shadow-[0_15px_40px_rgba(13,148,136,0.18)] lg:flex"
            style={{ marginTop: "-27px" }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 p-3 text-white shadow-lg">
              <Microscope size={22} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">
                Modern Labs
              </h4>

              <p className="text-sm text-slate-600">
                Precision Equipment
              </p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -right-8 bottom-10 hidden items-center gap-4 rounded-3xl border border-teal-100 bg-white/90 backdrop-blur-xl px-5 py-4 shadow-[0_15px_40px_rgba(13,148,136,0.18)] lg:flex">

            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-3 text-white shadow-lg">
              <BadgeCheck size={22} />
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">
                Trusted Quality
              </h4>

              <p className="text-sm text-slate-600">
                Certified Solutions
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}