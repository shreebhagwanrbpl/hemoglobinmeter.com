"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const phone =
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };
  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#F0FDFA] via-white to-[#ECFEFF]">

      {/* Background Glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-200/30 blur-[140px]" />

      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-200/30 blur-[140px]" />


      <div className="container-custom relative z-10 py-16">


        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">


          {/* Brand */}
          <div>

            <h2 className="text-3xl font-bold">

              <span className="bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
                Central
              </span>

              <span className="text-slate-900">
                {" "}Biomedicals
              </span>

            </h2>


            <p className="mt-5 max-w-xs leading-7 text-slate-600">
              Delivering trusted diagnostic and biomedical solutions with
              innovation, quality, and precision healthcare support.
            </p>


            <div className="mt-7 flex gap-3">


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-lg shadow-teal-200 transition hover:-translate-y-1">

                <Phone size={18} />

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-lg shadow-teal-200 transition hover:-translate-y-1">

                <Mail size={18} />

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-lg shadow-teal-200 transition hover:-translate-y-1">

                <MapPin size={18} />

              </div>


            </div>


          </div>



          {/* Quick Links */}
          <div>

            <h3 className="mb-6 text-lg font-bold text-slate-900">
              Quick Links
            </h3>


            <div className="space-y-4 text-slate-600">


              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Services", "/services"],
                ["Products", "/items"],
                ["Contact", "/contact"]
              ].map(([name, path]) => (

                <Link
                  key={name}
                  href={makeLink(path)}
                  className="block transition hover:translate-x-1 hover:text-[#0F766E]"
                >
                  {name}
                </Link>

              ))}


            </div>

          </div>




          {/* Services */}
          <div>

            <h3 className="mb-6 text-lg font-bold text-slate-900">
              Services
            </h3>


            <div className="space-y-4 text-slate-600">

              <p className="hover:text-[#0F766E]">
                Diagnostic Equipment
              </p>

              <p className="hover:text-[#0F766E]">
                Laboratory Solutions
              </p>

              <p className="hover:text-[#0F766E]">
                Biomedical Instruments
              </p>

              <p className="hover:text-[#0F766E]">
                AMC & Maintenance
              </p>

              <p className="hover:text-[#0F766E]">
                Installation Support
              </p>


            </div>

          </div>





          {/* Contact */}
          <div>


            <h3 className="mb-6 text-lg font-bold text-slate-900">
              Contact Info
            </h3>



            <div className="space-y-5">


              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-[#0F766E]">
                  <MapPin size={20} />
                </div>

                <p className="text-sm leading-7 text-slate-600">
                  {dynamicAddress}
                </p>

              </div>



              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-[#0F766E]">
                  <Phone size={18} />
                </div>

                <p className="text-slate-600">
                  {phone}
                </p>

              </div>




              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-[#0F766E]">
                  <Mail size={18} />
                </div>

                <p className="break-all text-slate-600">
                  {email}
                </p>

              </div>


            </div>


          </div>



        </div>




        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-teal-100 pt-8 text-sm text-slate-500 md:flex-row">


          <p>
            © 2026
            <span className="font-semibold text-[#0F766E]">
              {" "}Central Biomedicals
            </span>
            . All Rights Reserved.
          </p>


          <p>
            Designed with ❤️ for Modern Healthcare.
          </p>


        </div>


      </div>


    </footer>
  );
}