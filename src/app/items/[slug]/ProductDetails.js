"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { usePathname } from "next/navigation";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
} from "react-icons/fa";

import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
export default function ProductDetails({ slug }) {
    const [product, setProduct] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedMedia, setSelectedMedia] = useState("image");
    const [showShare, setShowShare] = useState(false);

    const shareRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] =
        useState(false);
    const pathname = usePathname();

    const pathParts = pathname
        .split("/")
        .filter(Boolean);

    const city =
        pathParts.length > 1
            ? pathParts[0]
            : "India";

    const cityName =
        city.charAt(0).toUpperCase() +
        city.slice(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {

                // NORMAL PRODUCTS
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "pages",
                        "products"
                    )
                );

                let allProducts = [];

                if (snap.exists()) {
                    allProducts = (snap.data().products || []).map((item) => ({
                        ...item,
                        slug:
                            item.slug ||
                            item.productSlug ||
                            makeSlug(item.title),
                    }));
                }

                // CATEGORY PRODUCTS
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

                categorySnap.forEach((docSnap) => {
                    const data = docSnap.data();

                    if (data.products?.length) {
                        allProducts.push(
                            ...(data.products || []).map((item) => ({
                                ...item,
                                slug:
                                    item.slug ||
                                    item.productSlug ||
                                    makeSlug(item.title),
                            }))
                        );
                    }
                });

                const found = allProducts.find(
                    (p) => p.slug === slug
                );
                console.log("URL SLUG:", slug);

                allProducts.forEach((p) => {
                    console.log("PRODUCT:", p.title);
                    console.log("PRODUCT SLUG:", p.slug);
                });
                console.log("SLUG FROM URL:", slug);
                console.log(
                    "TOTAL PRODUCTS:",
                    allProducts.length
                );
                console.log(
                    "FOUND PRODUCT:",
                    found
                );

                setProduct(found || null);

                if (found) {

                    if (
                        found.images?.length > 0
                    ) {
                        setSelectedImage(
                            found.images[0]
                        );
                    } else {
                        setSelectedImage(
                            found.image || ""
                        );
                    }

                    setSelectedMedia("image");
                }

            } catch (error) {
                console.error(error);
            }
        };

        loadProduct();
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            return toast.error(
                "Name is required"
            );
        }

        if (!emailRegex.test(form.email)) {
            return toast.error(
                "Enter valid email"
            );
        }

        if (!phoneRegex.test(form.phone)) {
            return toast.error(
                "Enter valid mobile number"
            );
        }

        try {
            setSubmitting(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "centralbiomedicals",
                    "productQueries"
                ),
                {
                    ...form,
                    productName: product.title,
                    productSlug: product.slug,
                    brand: product.brand || "",
                    model: product.model || "",
                    createdAt: new Date(),
                }
            );

            toast.success(
                "Your enquiry has been submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(
                "Something went wrong"
            );
        } finally {
            setSubmitting(false);
        }
    };
    const productSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image ? [product.image] : [],
            description:
                product.desc ||
                product.description ||
                product.title,
            brand: {
                "@type": "Brand",
                name: product.brand || "Central Biomedicals",
            },
        }
        : null;

    const faqSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: `What is ${product.title} used for?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${product.title} is used in hospitals, pathology labs and diagnostic centres.`,
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide installation support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, installation and technical support are available.",
                    },
                },
            ],
        }
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied");
        setShowShare(false);
    };

    const handleWhatsapp = () => {
        const shareText = `🔬 ${product?.title}

${product?.desc}

🌐 ${window.location.href}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
        );
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,
            "_blank"
        );
    };

    const handleInstagram = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Instagram direct sharing available nahi hai. Link copied.");
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: product.title,
                text: product.desc,
                url: window.location.href,
            });
        } else {
            setShowShare(!showShare);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);
    }, []);

    if (!product) {
        return (
            <section className="py-10 md:py-20 bg-slate-50">
                <div className="container-custom">

                    <div className="grid lg:grid-cols-2 gap-12">

                        <div className="h-[420px] md:h-[520px] rounded-[36px] bg-slate-200 animate-pulse" />

                        <div>
                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl animate-pulse mb-8" />

                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 bg-slate-200 rounded-lg animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                    <div className="mt-16 grid lg:grid-cols-[600px_1fr] gap-8">

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-4"
                                />
                            ))}
                        </div>

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-60 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </section>
        );
    }
    return (
        <section className="py-10 md:py-20 bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <div className="container-custom">
                <div className="mb-6 text-sm text-slate-500">
                    Home / Products / {product.title}
                </div>
                {/* Top Section */}

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}

                    <div className="relative h-[340px] sm:h-[420px] md:h-[500px] lg:h-[580px] rounded-[24px] md:rounded-[36px] overflow-hidden border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-cyan-50 shadow-[0_25px_80px_rgba(15,118,110,0.15)]">

                        {selectedMedia === "video" && product.video ? (

                            <video
                                controls
                                autoPlay
                                className="w-full h-full object-contain p-6"
                            >
                                <source
                                    src={product.video}
                                    type="video/mp4"
                                />
                            </video>

                        ) : (

                            <>
                                {!imageLoaded && (
                                    <div className="absolute inset-0 bg-teal-100 animate-pulse" />
                                )}

                                <Image
                                    src={selectedImage || product.image}
                                    alt={product.title}
                                    fill
                                    priority
                                    onLoad={() => setImageLoaded(true)}
                                    className={`object-contain p-4 transition duration-500 ${imageLoaded
                                        ? "opacity-100"
                                        : "opacity-0"
                                        }`}
                                />

                            </>

                        )}

                    </div>


                    {/* Media Thumbnails */}

                    <div className="flex flex-wrap gap-3 mt-5">


                        {(product.images?.length
                            ? product.images
                            : [product.image]
                        ).map((img, index) => (

                            <button
                                key={index}
                                onClick={() => {
                                    setSelectedImage(img);
                                    setSelectedMedia("image");
                                }}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedMedia === "image" &&
                                    selectedImage === img
                                    ? "border-[#0F766E] shadow-lg shadow-teal-200 scale-105"
                                    : "border-teal-100 hover:border-teal-300"
                                    }`}
                            >

                                <Image
                                    src={img}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />

                            </button>

                        ))}



                        {/* Video Button */}

                        {product.video && (

                            <button
                                onClick={() => setSelectedMedia("video")}
                                className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${selectedMedia === "video"
                                    ? "border-[#0F766E] bg-teal-50 text-[#0F766E] shadow-lg shadow-teal-200"
                                    : "border-teal-100 hover:bg-teal-50"
                                    }`}
                            >

                                <FaPlay size={20} />

                                <span className="text-xs mt-1">
                                    Video
                                </span>

                            </button>

                        )}



                        {/* PDF Button */}

                        {product.pdf && (

                            <a
                                href={product.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-20 h-20 rounded-xl border-2 border-teal-100 bg-white flex flex-col items-center justify-center hover:bg-teal-50 hover:border-[#0F766E] transition-all duration-300"
                            >

                                <span className="text-2xl">
                                    📄
                                </span>

                                <span className="text-xs text-slate-600">
                                    PDF
                                </span>

                            </a>

                        )}


                    </div>

                    {/* Product Details */}

                    <div>

                        <div className="flex justify-between items-start gap-4 relative">

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
                                {product.title}
                            </h1>


                            {/* Share Button */}

                            <div
                                ref={shareRef}
                                className="relative shrink-0"
                            >

                                <button
                                    onClick={handleNativeShare}
                                    className="w-12 h-12 rounded-full border border-teal-100 bg-white text-[#0F766E] shadow-lg shadow-teal-100 flex items-center justify-center transition-all duration-300 hover:bg-teal-50 hover:scale-110"
                                >
                                    <FaShareAlt size={18} />
                                </button>



                                {showShare && (

                                    <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,118,110,0.15)] border border-teal-100 p-2 z-50">


                                        <button
                                            onClick={handleCopy}
                                            className="w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition"
                                        >

                                            <FaLink />
                                            Copy Link

                                        </button>



                                        <button
                                            onClick={handleWhatsapp}
                                            className="w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 text-slate-700 hover:bg-teal-50 transition"
                                        >

                                            <FaWhatsapp className="text-green-600" />
                                            WhatsApp

                                        </button>



                                        <button
                                            onClick={handleFacebook}
                                            className="w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 text-slate-700 hover:bg-teal-50 transition"
                                        >

                                            <FaFacebook className="text-blue-600" />
                                            Facebook

                                        </button>



                                        <button
                                            onClick={handleInstagram}
                                            className="w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 text-slate-700 hover:bg-teal-50 transition"
                                        >

                                            <FaInstagram className="text-pink-600" />
                                            Instagram

                                        </button>


                                    </div>

                                )}

                            </div>


                        </div>





                        {/* Product Information Card */}

                        <div className="mt-6 md:mt-8 rounded-[24px] md:rounded-[30px] border border-teal-100 bg-white p-5 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(15,118,110,0.12)]">


                            <div className="grid gap-4 sm:grid-cols-2">


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
                                        Capacity
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {product.capacity || "N/A"}
                                    </p>
                                </div>



                                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                                    <p className="text-xs uppercase text-teal-600">
                                        Throughput
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {product.throughput || "N/A"}
                                    </p>
                                </div>



                                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                                    <p className="text-xs uppercase text-teal-600">
                                        Usage
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {product.usage || "N/A"}
                                    </p>
                                </div>



                                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                                    <p className="text-xs uppercase text-teal-600">
                                        Automation
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {product.automation || "N/A"}
                                    </p>
                                </div>



                                <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                                    <p className="text-xs uppercase text-teal-600">
                                        Availability
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {product.availability || "N/A"}
                                    </p>
                                </div>


                            </div>


                        </div>


                    </div>

                </div>

                {/* Description + Form */}

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] gap-6 md:gap-8">

                        {/* Quote Form */}

                        <div className="rounded-[24px] md:rounded-[32px] border border-teal-100 bg-white p-5 sm:p-6 md:p-8 shadow-[0_25px_70px_rgba(15,118,110,0.12)] h-fit lg:sticky lg:top-24">


                            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent mb-2">
                                Request A Quote
                            </h2>



                            <p className="text-slate-600 mb-8">
                                Product:
                                <span className="font-semibold ml-2 text-[#0F766E]">
                                    {product.title}
                                </span>
                            </p>



                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >


                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl md:rounded-2xl border border-teal-100 bg-teal-50/40 px-4 md:px-5 py-3 md:py-4 text-slate-700 outline-none transition-all focus:border-[#0F766E] focus:ring-4 focus:ring-teal-100"
                                />



                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl md:rounded-2xl border border-teal-100 bg-teal-50/40 px-4 md:px-5 py-3 md:py-4 text-slate-700 outline-none transition-all focus:border-[#0F766E] focus:ring-4 focus:ring-teal-100"
                                />



                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    maxLength={10}
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value.replace(/\D/g, ""),
                                        })
                                    }
                                    className="w-full rounded-2xl border border-teal-100 bg-teal-50/40 px-5 py-4 text-slate-700 outline-none transition-all focus:border-[#0F766E] focus:ring-4 focus:ring-teal-100"
                                />



                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full rounded-2xl bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] py-4 font-semibold text-white shadow-lg shadow-teal-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-300 disabled:opacity-70"
                                >

                                    {submitting
                                        ? "Submitting..."
                                        : "Get Quote"}

                                </button>


                            </form>


                        </div>

                        {/* Description */}

                        <div className="rounded-[24px] md:rounded-[32px] border border-teal-100 bg-white p-5 sm:p-6 md:p-10 shadow-[0_25px_70px_rgba(15,118,110,0.12)]">


                            {/* Title */}

                            <h3 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
                                Product Description
                            </h3>



                            {/* Description */}

                            <p className="text-slate-600 leading-7 md:leading-9 text-base md:text-lg">
                                {product.desc ||
                                    product.description ||
                                    "No description available."}
                            </p>





                            {/* Specifications Table */}

                            <div className="mt-10 overflow-x-auto rounded-2xl border border-teal-100">

                                <table className="w-full overflow-hidden border-collapse">


                                    <tbody>


                                        <tr className="border-b border-teal-100 hover:bg-teal-50 transition">

                                            <td className="p-4 font-semibold text-[#0F766E] bg-teal-50/40">
                                                Brand
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {product.brand || "N/A"}
                                            </td>

                                        </tr>




                                        <tr className="border-b border-teal-100 hover:bg-teal-50 transition">

                                            <td className="p-4 font-semibold text-[#0F766E] bg-teal-50/40">
                                                Model
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {product.model || "N/A"}
                                            </td>

                                        </tr>




                                        <tr className="border-b border-teal-100 hover:bg-teal-50 transition">

                                            <td className="p-4 font-semibold text-[#0F766E] bg-teal-50/40">
                                                Usage
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {product.usage || "N/A"}
                                            </td>

                                        </tr>




                                        <tr className="border-b border-teal-100 hover:bg-teal-50 transition">

                                            <td className="p-4 font-semibold text-[#0F766E] bg-teal-50/40">
                                                Automation
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {product.automation || "N/A"}
                                            </td>

                                        </tr>




                                        <tr className="border-b border-teal-100 hover:bg-teal-50 transition">

                                            <td className="p-4 font-semibold text-[#0F766E] bg-teal-50/40">
                                                Capacity
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {product.capacity || "N/A"}
                                            </td>

                                        </tr>




                                        <tr className="hover:bg-teal-50 transition">

                                            <td className="p-4 font-semibold text-[#0F766E] bg-teal-50/40">
                                                Throughput
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {product.throughput || "N/A"}
                                            </td>

                                        </tr>



                                    </tbody>


                                </table>


                            </div>



                            {/* SEO Content */}

                            <div className="mt-12 rounded-[32px] border border-teal-100 bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/40 p-6 md:p-10 shadow-[0_20px_60px_rgba(15,118,110,0.10)]">


                                {/* Section 1 */}

                                <div>

                                    <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
                                        Why Choose Central Biomedicals in {cityName}?
                                    </h3>


                                    <p className="leading-8 text-slate-600">
                                        Central Biomedicals is a trusted supplier and distributor of {product.title} in {cityName}. We provide high-quality biomedical and laboratory equipment for hospitals, pathology laboratories, diagnostic centres and healthcare facilities.
                                    </p>

                                </div>





                                {/* SEO Blocks */}

                                {[
                                    {
                                        title: `Features of ${product.title}`,
                                        desc: `${product.title} offers reliable performance, accurate results, easy operation, long service life and efficient workflow for laboratories and hospitals.`,
                                    },

                                    {
                                        title: `Applications of ${product.title}`,
                                        desc: `Widely used in hospitals, pathology labs, diagnostic centres, blood banks, research institutes and healthcare facilities.`,
                                    },

                                    {
                                        title: `${product.title} Supplier in ${cityName}`,
                                        desc: `Central Biomedicals supplies ${product.title} in ${cityName} with technical support, installation assistance and customer service for hospitals and laboratories.`,
                                    },

                                    {
                                        title: `${product.title} Dealer in ${cityName}`,
                                        desc: `Central Biomedicals is a trusted dealer of ${product.title} in ${cityName}. We supply biomedical equipment, laboratory instruments, diagnostic analyzers and healthcare devices to hospitals, pathology labs and research centres.`,
                                    },

                                    {
                                        title: `${product.title} Distributor in ${cityName}`,
                                        desc: `Looking for a reliable distributor of ${product.title} in ${cityName}? We provide installation support, product guidance, maintenance assistance and fast delivery.`,
                                    },

                                    {
                                        title: `Buy ${product.title} in ${cityName}`,
                                        desc: `Buy high quality ${product.title} in ${cityName} at competitive prices. Contact Central Biomedicals for the latest quotation and product availability.`,
                                    },

                                    {
                                        title: `${product.title} Price in ${cityName}`,
                                        desc: `The price of ${product.title} depends on brand, model, specifications and features. Contact our team for the latest pricing, availability and delivery details.`,
                                    },

                                ].map((item, index) => (

                                    <div
                                        key={index}
                                        className="mt-8 rounded-2xl border border-teal-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >

                                        <h3 className="mb-4 text-xl md:text-2xl font-bold text-slate-900 transition-colors hover:text-[#0F766E]">
                                            {item.title}
                                        </h3>


                                        <p className="leading-8 text-slate-600">
                                            {item.desc}
                                        </p>


                                        <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6]" />

                                    </div>

                                ))}


                            </div>

                            {/* FAQ Section */}

                            <div className="mt-12 rounded-[32px] border border-teal-100 bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/40 p-6 md:p-10 shadow-[0_20px_60px_rgba(15,118,110,0.10)]">


                                {/* Heading */}

                                <h3 className="mb-8 text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
                                    Frequently Asked Questions
                                </h3>



                                <div className="space-y-5">


                                    {[
                                        {
                                            question: `What is ${product.title} used for in ${cityName}?`,
                                            answer: `${product.title} is commonly used in hospitals, pathology laboratories and diagnostic centres.`,
                                        },

                                        {
                                            question: `What is the price of ${product.title} in ${cityName}?`,
                                            answer: `Pricing depends on specifications, brand and model. Contact us for a quote.`,
                                        },

                                        {
                                            question: `Are you an authorized supplier of ${product.title}?`,
                                            answer: `We supply genuine biomedical and laboratory equipment from trusted brands.`,
                                        },

                                        {
                                            question: `Can hospitals in ${cityName} order this product?`,
                                            answer: `Yes, hospitals, pathology laboratories, diagnostic centres and healthcare facilities can order this product.`,
                                        },

                                        {
                                            question: `Do you provide installation support?`,
                                            answer: `Yes, installation and technical support are available depending on the product.`,
                                        },

                                        {
                                            question: `Can I request a quotation?`,
                                            answer: `Yes, you can submit the enquiry form on this page to receive pricing and product information.`,
                                        },

                                        {
                                            question: `Do you provide warranty?`,
                                            answer: `Warranty depends on the manufacturer and product model.`,
                                        },

                                        {
                                            question: `Do you deliver across India?`,
                                            answer: `Yes, we supply products across India with safe packaging and logistics support.`,
                                        },

                                        {
                                            question: `How can I contact Central Biomedicals?`,
                                            answer: `You can fill out the enquiry form or contact our team directly for product details and quotations.`,
                                        },

                                    ].map((faq, index) => (

                                        <div
                                            key={index}
                                            className="
        group
        rounded-2xl
        border
        border-teal-100
        bg-white
        p-5
        md:p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        "
                                        >


                                            <h4
                                                className="
          flex
          items-start
          gap-3
          text-lg
          font-semibold
          text-slate-900
          transition-colors
          duration-300
          group-hover:text-[#0F766E]
          "
                                            >

                                                <span
                                                    className="
            mt-1
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#0F766E]
            to-[#14B8A6]
            text-xs
            text-white
            "
                                                >
                                                    ?
                                                </span>

                                                {faq.question}

                                            </h4>



                                            <p className="mt-3 leading-7 text-slate-600 pl-9">
                                                {faq.answer}
                                            </p>



                                        </div>

                                    ))}


                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section >
    );
}