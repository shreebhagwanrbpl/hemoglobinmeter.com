"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { fetchFullCatalog, fetchContactData, fetchDistrictData } from "@/lib/data-fetcher";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [categories, setCategories] = useState([]);

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
    let isMounted = true;
    const loadContact = async () => {
      try {
        const data = await fetchContactData();
        if (isMounted && data) {
          setContactInfo(data.contactInfo || []);
        }
      } catch (err) {
        console.error("Footer contact data error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadContact();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!district) return;
    let isMounted = true;

    const loadDistrict = async () => {
      try {
        const data = await fetchDistrictData(district);
        if (isMounted && data) {
          setDistrictData(data);
        }
      } catch (err) {
        console.error("Footer district data error:", err);
      }
    };

    loadDistrict();
    return () => {
      isMounted = false;
    };
  }, [district]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const catalog = await fetchFullCatalog();
        const uniqueCategories = Array.from(
          new Set(catalog.map((item) => item.category).filter(Boolean))
        );
        setCategories(uniqueCategories.slice(0, 7));
      } catch (err) {
        console.error("Error loading categories in footer:", err);
      }
    };
    loadCategories();
  }, []);

  const getContactField = (labels, defaultValue = "") => {
    const normalized = labels.map((l) => l.toLowerCase().trim());
    const found = contactInfo.find(
      (x) => x && x.label && normalized.includes(x.label.toLowerCase().trim())
    );
    if (!found || !found.value) return defaultValue;
    if (Array.isArray(found.value)) {
      return found.value.join("\n");
    }
    return found.value;
  };

  const phone = getContactField(
    ["phone", "phone number", "contact number", "mobile", "mobile no", "contact"],
    ""
  );

  const email = getContactField(
    ["email", "email address", "email for reply", "mail"],
    ""
  );

  const address = getContactField(
    ["address", "office address", "location"],
    ""
  );

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const phoneNumbers = phone ? String(phone).split(/[\n,]+/).map(num => num.trim()).filter(Boolean) : [];

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
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container-custom py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">


          {/* Brand */}
          <div>

            <h2 className="text-2xl font-bold text-[#0F766E]">
              Raj
              <span className="text-slate-900">
                {" "}Biosis
              </span>
            </h2>


            <p className="mt-5 text-slate-600 leading-7">
              A multi-category biomedical product catalogue covering equipment, diagnostic products, laboratory supplies, reagents, consumables and related healthcare items.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/rajbiosispvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition shadow-sm"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.instagram.com/rajbiosisindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition shadow-sm"
              >
                <FaInstagram size={18} />
              </a>
            </div>

          </div>



          {/* Quick Links */}
          <div className="w-fit">

            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Quick Links
            </h3>


            <div className="flex w-fit flex-col gap-3 text-slate-600">

              <Link
                href={makeLink("/")}
                className="hover:text-[#0F766E] transition"
              >
                Home
              </Link>


              <Link
                href={makeLink("/about")}
                className="hover:text-[#0F766E] transition"
              >
                About
              </Link>


              <Link
                href={makeLink("/services")}
                className="hover:text-[#0F766E] transition"
              >
                Services
              </Link>


              <Link
                href={makeLink("/items")}
                className="hover:text-[#0F766E] transition"
              >
                Products
              </Link>


              <Link
                href={makeLink("/contact")}
                className="hover:text-[#0F766E] transition"
              >
                Contact
              </Link>

            </div>

          </div>



          {/* Categories */}
          <div className="w-fit">

            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Our Categories
            </h3>

            <div className="flex w-fit flex-col gap-3 text-slate-600">

              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={makeLink(
                    `/items#${cat.replace(/\s+/g, "-").toLowerCase()}`
                  )}
                  className="w-fit hover:text-[#0F766E] transition text-left"
                >
                  {cat}
                </Link>
              ))}

              {categories.length === 0 && (
                <>
                  <p>Diagnostic Products</p>
                  <p>Laboratory Products</p>
                  <p>Biomedical Items</p>
                  <p>Product Assistance</p>
                </>
              )}

            </div>

          </div>





          {/* Contact */}
          <div>

            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Contact Info
            </h3>


            <div className="space-y-4 text-slate-600">

              {dynamicAddress && (
                <div className="flex items-start gap-4">
                  <div className="
      w-12
      h-12
      rounded-2xl
      bg-teal-50
      flex
      items-center
      justify-center
      flex-shrink-0
    ">
                    <MapPin
                      size={24}
                      className="text-[#0F766E]"
                    />
                  </div>

                  <p className="leading-7 pt-2">
                    {dynamicAddress}
                  </p>
                </div>
              )}

              {phoneNumbers.length > 0 && (
                <div className="flex flex-col gap-2">
                  {phoneNumbers.map((num, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Phone
                        size={18}
                        className="text-[#0F766E] flex-shrink-0"
                      />
                      <a href={`tel:${num}`} className="hover:text-[#0F766E] transition">
                        {num}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {email && (
                <div className="flex items-center gap-3">
                  <Mail
                    size={18}
                    className="text-[#0F766E]"
                  />

                  <p>
                    <a href={`mailto:${email}`} className="hover:text-[#0F766E] transition">
                      {email}
                    </a>
                  </p>
                </div>
              )}

            </div>


          </div>


        </div>




        {/* Bottom */}
        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">


          <p>
            © 2026 Raj Biosis.
            All rights reserved.
          </p>


          <p className="mt-3 md:mt-0">
            Built for practical biomedical product discovery.
          </p>


        </div>


      </div>
    </footer>
  );
}
