"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categorySearch, setCategorySearch] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");
  const [loading, setLoading] = useState(true);



  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [pendingScroll, setPendingScroll] =
    useState(null);

  const [loadedImages, setLoadedImages] =
    useState({});

  const [showTopButton, setShowTopButton] =
    useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const district =
    pathParts[0] === "items"
      ? null
      : pathParts[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {

          const data = categoryDoc.data();

          const categoryProducts =
            (data.products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${index}`,
                category:
                  data.category ||
                  categoryDoc.id,
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...categoryProducts
          );

        });

        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {

          const oldProducts =
            (oldSnap.data().products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category:
                  "Other Products",
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...oldProducts
          );

        }
        console.log("ALL PRODUCTS", allProducts);
        setProducts(allProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.category}
      `
        .toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);

  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);

  const sortedGroupedProducts =
    useMemo(() => {

      const entries =
        Object.entries(
          groupedProducts
        );

      entries.sort(([a], [b]) => {

        if (
          a === "Other Products"
        )
          return 1;

        if (
          b === "Other Products"
        )
          return -1;

        return a.localeCompare(b);

      });

      return Object.fromEntries(
        entries
      );

    }, [groupedProducts]);
  const categories =
    Object.keys(groupedProducts);

  const toggleCategory = (category) => {
    if (openedCategory === category) {
      setOpenedCategory("");
      return;
    }

    setOpenedCategory(category);
  };

  const scrollToProduct = (
    slug,
    category
  ) => {
    setOpenedCategory(category);
    setActiveCategory(category);
    setPendingScroll(slug);
  };

  useEffect(() => {
    if (!pendingScroll) return;

    const timer = setTimeout(() => {
      const el =
        document.getElementById(
          pendingScroll
        );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setPendingScroll(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [openedCategory, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover high-quality diagnostic and biomedical technologies tailored for laboratories, healthcare institutions, and modern diagnostics."
            center
          />
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mt-6 lg:mt-10 px-4 lg:px-0 relative">
          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) =>
              setProductSearch(e.target.value)
            }
            className="w-full h-16 pl-14 pr-5 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 mt-8 lg:mt-16 items-start px-4 lg:px-0">
          <aside
            className="
  lg:sticky
  lg:top-24
  self-start
  rounded-3xl
  border
  border-teal-100
  bg-white/90
  p-4
  shadow-[0_20px_50px_rgba(15,118,110,0.12)]
  backdrop-blur-xl
  lg:p-6
  "
          >

            {/* Heading */}
            <h3
              className="
    mb-6
    text-2xl
    font-bold
    bg-gradient-to-r
    from-[#0F766E]
    via-[#0D9488]
    to-[#14B8A6]
    bg-clip-text
    text-transparent
    "
            >
              Categories
            </h3>


            <div className="space-y-3">

              {Object.keys(sortedGroupedProducts)
                .filter((category) =>
                  category
                    .toLowerCase()
                    .includes(categorySearch.toLowerCase())
                )
                .map((category) => (

                  <div
                    key={category}
                    className="
          overflow-hidden
          rounded-2xl
          border
          border-teal-100
          bg-white
          "
                  >

                    <button
                      onClick={() =>
                        toggleCategory(category)
                      }
                      className={`
            flex
            w-full
            items-center
            justify-between
            px-5
            py-4
            transition-all
            duration-300

            ${activeCategory === category
                          ? "bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] text-white shadow-lg shadow-teal-200"
                          : "bg-white text-slate-700 hover:bg-teal-50"
                        }
            `}
                    >

                      <span className="flex items-center gap-3">

                        {openedCategory === category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        <span className="font-medium">
                          {category}
                        </span>

                      </span>


                      <span
                        className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-bold

              ${activeCategory === category
                            ? "bg-white/20 text-white"
                            : "bg-teal-50 text-[#0F766E]"
                          }
              `}
                      >
                        {
                          groupedProducts[
                            category
                          ].length
                        }
                      </span>


                    </button>



                    {/* Products */}
                    <div
                      className={`
            overflow-y-auto
            transition-all
            duration-300
            custom-scrollbar

            ${openedCategory === category
                          ? "max-h-72"
                          : "max-h-0 overflow-hidden"
                        }
            `}
                    >

                      {groupedProducts[
                        category
                      ].map((item) => (

                        <button
                          key={item.uid}
                          onClick={() =>
                            scrollToProduct(
                              item.slug,
                              category
                            )
                          }
                          className="
                block
                w-full
                border-t
                border-teal-50
                px-6
                py-3
                text-left
                text-sm
                text-slate-600
                transition-all
                duration-300
                hover:bg-teal-50
                hover:pl-8
                hover:text-[#0F766E]
                "
                        >

                          {item.title}

                        </button>

                      ))}

                    </div>


                  </div>

                ))}


            </div>


          </aside>



          {/* ==========================
                RIGHT SIDE START
            ========================== */}

          <div className="space-y-16">
            {filteredProducts.length === 0 ? (

              <div
                className="
  rounded-[32px]
  border
  border-teal-100
  bg-white/90
  p-10
  text-center
  shadow-[0_25px_70px_rgba(15,118,110,0.12)]
  backdrop-blur-xl
  lg:p-16
  "
              >


                {/* Icon */}
                <div
                  className="
    mx-auto
    mb-6
    flex
    h-24
    w-24
    items-center
    justify-center
    rounded-full
    bg-gradient-to-br
    from-[#0F766E]
    via-[#0D9488]
    to-[#14B8A6]
    text-5xl
    shadow-lg
    shadow-teal-200
    "
                >
                  🔍
                </div>



                {/* Title */}
                <h2
                  className="
    text-2xl
    font-bold
    text-slate-900
    lg:text-4xl
    "
                >
                  Product Not Found
                </h2>



                {/* Description */}
                <p
                  className="
    mx-auto
    mt-4
    max-w-xl
    leading-7
    text-slate-600
    "
                >

                  We couldn't find any products matching

                  <span
                    className="
      mx-1
      font-semibold
      text-[#0F766E]
      "
                  >
                    "{productSearch}"
                  </span>

                  .
                  Please try another keyword or browse categories.

                </p>




                {/* Button */}
                <button
                  onClick={() => setProductSearch("")}
                  className="
    mt-8
    rounded-xl
    bg-gradient-to-r
    from-[#0F766E]
    via-[#0D9488]
    to-[#14B8A6]
    px-8
    py-3
    font-semibold
    text-white
    shadow-lg
    shadow-teal-200
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
    hover:shadow-teal-300
    "
                >
                  View All Products
                </button>


              </div>

            ) : (

              Object.entries(groupedProducts).map(
                ([category, list]) => (

                  <section
                    key={category}
                    id={category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  >

                    {/* Category Header */}

                    <div
                      className="
  mb-6
  flex
  flex-col
  gap-3
  border-b
  border-teal-100
  pb-4
  lg:mb-8
  lg:flex-row
  lg:items-center
  lg:justify-between
  lg:pb-5
  "
                    >

                      {/* Category Title */}
                      <h2
                        className="
    text-3xl
    font-bold
    bg-gradient-to-r
    from-[#0F766E]
    via-[#0D9488]
    to-[#14B8A6]
    bg-clip-text
    text-transparent
    "
                      >
                        {category}
                      </h2>


                      {/* Product Count */}
                      <span
                        className="
    inline-flex
    w-fit
    items-center
    rounded-full
    border
    border-teal-100
    bg-gradient-to-r
    from-teal-50
    to-cyan-50
    px-4
    py-2
    text-sm
    font-semibold
    text-[#0F766E]
    "
                      >
                        {list.length} Products
                      </span>


                    </div>

                    {/* Product List */}

                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.uid}
                          id={product.slug}
                          className="
      group
      rounded-[30px]
      border
      border-teal-100
      bg-white
      p-8
      shadow-[0_15px_40px_rgba(15,118,110,0.08)]
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_25px_60px_rgba(15,118,110,0.18)]
      "
                        >

                          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[240px_1fr_180px] lg:gap-8">


                            {/* Image */}

                            <div
                              className="
          relative
          h-[180px]
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-teal-50
          via-white
          to-cyan-50
          sm:h-[220px]
          "
                            >

                              {!loadedImages[product.uid] && (
                                <div className="absolute inset-0 animate-pulse bg-teal-100" />
                              )}


                              <img
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.jpg"
                                }
                                alt={product.title}
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [product.uid]: true,
                                  }))
                                }
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                                className={`
              h-full
              w-full
              object-contain
              p-5
              transition
              duration-500
              group-hover:scale-105
              ${loadedImages[product.uid]
                                    ? "opacity-100"
                                    : "opacity-0"
                                  }
            `}
                              />

                            </div>



                            {/* Content */}

                            <div>


                              <h3
                                className="
            text-2xl
            font-bold
            text-slate-900
            transition-colors
            group-hover:text-[#0F766E]
            "
                              >
                                {product.title}
                              </h3>


                              <p className="mt-4 leading-8 text-slate-600">

                                {product.description ||
                                  product.desc ||
                                  "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}

                              </p>




                              {/* Details */}

                              <div className="mt-6 grid gap-4 md:grid-cols-2">


                                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">

                                  <p className="text-xs uppercase text-teal-600">
                                    Brand
                                  </p>

                                  <p className="mt-1 font-semibold text-slate-900">
                                    {product.brand || "N/A"}
                                  </p>

                                </div>



                                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">

                                  <p className="text-xs uppercase text-teal-600">
                                    Model
                                  </p>

                                  <p className="mt-1 font-semibold text-slate-900">
                                    {product.model || "N/A"}
                                  </p>

                                </div>



                                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">

                                  <p className="text-xs uppercase text-teal-600">
                                    Instrument
                                  </p>

                                  <p className="mt-1 font-semibold text-slate-900">
                                    {product.instrument || "N/A"}
                                  </p>

                                </div>



                                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">

                                  <p className="text-xs uppercase text-teal-600">
                                    Category
                                  </p>

                                  <p className="mt-1 font-semibold text-slate-900">
                                    {product.category}
                                  </p>

                                </div>


                              </div>


                            </div>




                            {/* Button */}

                            <div className="flex justify-center lg:justify-end">


                              <Link
                                href={
                                  district
                                    ? `/${district}/items/${product.slug}`
                                    : `/items/${product.slug}`
                                }
                                className="
            rounded-2xl
            bg-gradient-to-r
            from-[#0F766E]
            via-[#0D9488]
            to-[#14B8A6]
            px-8
            py-4
            font-semibold
            !text-white
            shadow-lg
            shadow-teal-200
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-teal-300
            "
                              >
                                Get Quote
                              </Link>


                            </div>


                          </div>


                        </div>


                      ))}

                    </div>

                  </section>

                ))
            )}

          </div>

        </div>

      </section>

      {/* Why Choose Products */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] section-padding">

        {/* Background Glow */}
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-teal-200/30 blur-[120px]" />

        <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-200/30 blur-[120px]" />


        <div className="container-custom relative z-10">


          <SectionTitle
            badge="Why Our Products"
            title="Trusted Quality & Innovation"
            description="We provide biomedical products designed for performance, reliability, and healthcare excellence."
            center
          />



          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">


            {[
              {
                icon: <ShieldCheck size={30} />,
                title: "Certified Quality",
              },
              {
                icon: <Truck size={30} />,
                title: "Fast Delivery",
              },
              {
                icon: <BadgeCheck size={30} />,
                title: "Trusted Support",
              },
              {
                icon: <PackageCheck size={30} />,
                title: "Premium Equipment",
              },
            ].map((item, index) => (


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
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="
          group
          rounded-[30px]
          border
          border-teal-100
          bg-white/90
          p-8
          text-center
          shadow-[0_15px_40px_rgba(15,118,110,0.08)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[0_25px_60px_rgba(15,118,110,0.18)]
          "
              >


                {/* Icon */}
                <div
                  className="
            mx-auto
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[22px]
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



                {/* Title */}
                <h3
                  className="
            text-xl
            font-semibold
            text-slate-900
            transition-colors
            duration-300
            group-hover:text-[#0F766E]
            "
                >
                  {item.title}
                </h3>



                {/* Accent */}
                <div
                  className="
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
            "
                />


              </motion.div>


            ))}


          </div>


        </div>


      </section>

      {/* CTA */}

      <CTASection />

      {/* Back To Top */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="
  fixed
  bottom-8
  right-8
  z-50
  flex
  h-14
  w-14
  items-center
  justify-center
  rounded-full
  bg-gradient-to-br
  from-[#0F766E]
  via-[#0D9488]
  to-[#14B8A6]
  text-white
  shadow-xl
  shadow-teal-300/40
  transition-all
  duration-300
  hover:-translate-y-1
  hover:scale-110
  hover:shadow-2xl
  hover:shadow-teal-400/50
  "
        >

          <ChevronUp size={24} />

        </button>

      )}

    </>

  );

}