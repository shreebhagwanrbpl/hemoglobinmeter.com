"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchHomeData } from "@/lib/data-fetcher";

// Helper to safely parse ONLY dynamic media from home document
function parseMediaFromDoc(data) {
  if (!data) return [];
  const list = [];
  const seenUrls = new Set();

  const addMediaItem = (url, type, id) => {
    if (!url || typeof url !== "string") return;
    const cleanUrl = url.trim();
    if (
      !cleanUrl ||
      cleanUrl === "/homebanner.png" ||
      seenUrls.has(cleanUrl)
    ) {
      return;
    }
    seenUrls.add(cleanUrl);

    const isVideo =
      type === "video" ||
      /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(cleanUrl);

    list.push({
      id: id || `media-${list.length}-${Date.now()}`,
      type: isVideo ? "video" : "image",
      url: cleanUrl,
    });
  };

  // 1. Array of media objects
  if (Array.isArray(data.media) && data.media.length > 0) {
    data.media.forEach((item, idx) => {
      if (typeof item === "string") {
        addMediaItem(item, null, `media-${idx}`);
      } else if (item && item.url) {
        addMediaItem(item.url, item.type, item.id || `media-${idx}`);
      }
    });
  }

  // 2. Array of images
  if (Array.isArray(data.images) && data.images.length > 0) {
    data.images.forEach((url, idx) => {
      addMediaItem(url, "image", `img-${idx}`);
    });
  }

  // 3. Single image fallbacks
  if (data.imageUrl) addMediaItem(data.imageUrl, "image", "img-url");
  if (data.image) addMediaItem(data.image, "image", "img-main");

  // 4. Array of videos
  if (Array.isArray(data.videos) && data.videos.length > 0) {
    data.videos.forEach((vUrl, idx) => {
      addMediaItem(vUrl, "video", `vid-${idx}`);
    });
  }

  // 5. Single video fallback
  if (data.videoUrl) addMediaItem(data.videoUrl, "video", "vid-url");

  return list;
}

export default function HeroSection({ city }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [btn1Text, setBtn1Text] = useState("");
  const [btn2Text, setBtn2Text] = useState("");
  // Purely dynamic media list - NO static images attached
  const [mediaList, setMediaList] = useState([]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const timerRef = useRef(null);

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) =>
    districtSlug ? `/${districtSlug}${path}` : path;

  // Load purely dynamic content and media from database
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await fetchHomeData();
        if (!isMounted || !data) return;

        if (data.title?.trim()) setTitle(data.title.trim());
        if (data.description?.trim()) setDescription(data.description.trim());
        if (data.button1Text?.trim()) setBtn1Text(data.button1Text.trim());
        if (data.button2Text?.trim()) setBtn2Text(data.button2Text.trim());

        const parsedMedia = parseMediaFromDoc(data);
        setMediaList(parsedMedia);
      } catch (err) {
        console.error("HeroSection data loading error:", err);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Carousel Auto-play Logic (Only if > 1 slide)
  const isCarousel = mediaList.length > 1;

  const nextSlide = useCallback(() => {
    if (!isCarousel) return;
    setSlideDirection(1);
    setActiveSlideIndex((prev) => (prev + 1) % mediaList.length);
  }, [isCarousel, mediaList.length]);

  const prevSlide = useCallback(() => {
    if (!isCarousel) return;
    setSlideDirection(-1);
    setActiveSlideIndex(
      (prev) => (prev - 1 + mediaList.length) % mediaList.length
    );
  }, [isCarousel, mediaList.length]);

  const goToSlide = (index) => {
    if (index === activeSlideIndex) return;
    setSlideDirection(index > activeSlideIndex ? 1 : -1);
    setActiveSlideIndex(index);
  };

  useEffect(() => {
    if (!isCarousel || isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCarousel, isPaused, nextSlide]);

  // Adjust active index if mediaList shrinks
  useEffect(() => {
    if (activeSlideIndex >= mediaList.length && mediaList.length > 0) {
      setActiveSlideIndex(mediaList.length - 1);
    }
  }, [mediaList.length, activeSlideIndex]);

  const hasDynamicMedia = mediaList.length > 0;
  const currentMedia = hasDynamicMedia ? mediaList[activeSlideIndex] || mediaList[0] : null;

  return (
    <section
      className="relative overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Responsive Height Container */}
      <div className="relative min-h-[460px] w-full sm:min-h-[500px] md:min-h-[540px] lg:min-h-[570px] xl:min-h-[600px]">
        {/* Background Layer: Dynamic Media OR High-Tech Dark Gradient Backdrop */}
        <div className="absolute inset-0 overflow-hidden">
          {hasDynamicMedia ? (
            <AnimatePresence initial={false} custom={slideDirection} mode="sync">
              <motion.div
                key={currentMedia?.url || activeSlideIndex}
                custom={slideDirection}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 h-full w-full"
              >
                {currentMedia?.type === "video" ? (
                  <video
                    src={currentMedia.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <img
                    src={currentMedia?.url}
                    alt={title || "Biomedical Equipment"}
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            // High-Tech Biomedical Dark Gradient Pattern (when no image uploaded)
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(20, 184, 166, 0.35) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>
          )}

          {/* Background Gradient Overlays - Clean & Vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" />
          <div className="absolute inset-0 bg-teal-950/10 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-[110px]" />
        <div className="pointer-events-none absolute -top-20 left-1/3 h-64 w-64 rounded-full bg-teal-400/15 blur-[110px]" />

        {/* Hero Foreground Content */}
        <div className="relative z-10 mx-auto flex min-h-[460px] max-w-[1500px] items-center px-6 py-8 sm:min-h-[500px] sm:px-8 sm:py-10 md:min-h-[540px] lg:min-h-[570px] lg:px-12 lg:py-12 xl:min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="w-full max-w-[950px]"
          >
            {/* Category / Feature Badge */}
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md sm:text-sm">
              <ShieldCheck size={16} className="text-cyan-300 shrink-0" />
              <span>Biomedical Product Discovery & Sourcing</span>
            </div>

            {/* Main Heading */}
            {title && (
              <h1 className="max-w-[950px] text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                {title}
                {city && (
                  <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-2xl font-semibold text-transparent sm:text-4xl lg:text-[46px] block sm:inline drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {" "}in {city}
                  </span>
                )}
              </h1>
            )}

            {/* Subtitle / Description */}
            {description && (
              <p className="mt-3.5 max-w-2xl text-sm leading-6 text-slate-100 sm:text-base sm:leading-7 line-clamp-3 sm:line-clamp-none drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                {description}
                {city && !description.toLowerCase().includes(city.toLowerCase())
                  ? ` Sourcing instruments and supplies across ${city}.`
                  : ""}
              </p>
            )}

            {/* Action Buttons (Static Routes) */}
            {(btn1Text || btn2Text) && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                {btn1Text && (
                  <Link href={makeLink("/items")}>
                    <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-[0_10px_30px_rgba(20,184,166,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(20,184,166,0.45)]">
                      {btn1Text} <ArrowRight size={17} />
                    </span>
                  </Link>
                )}
                {btn2Text && (
                  <Link href={makeLink("/contact")}>
                    <span className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/20">
                      {btn2Text}
                    </span>
                  </Link>
                )}
              </div>
            )}

            {/* Trust Highlights */}
            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3.5">
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                <h3 className="text-xl font-bold text-cyan-300">25+</h3>
                <p className="text-xs text-slate-200">Product Groups</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                <h3 className="text-xl font-bold text-teal-300">800+</h3>
                <p className="text-xs text-slate-200">Catalogue Items</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                <h3 className="text-xl font-bold text-emerald-300">24/7</h3>
                <p className="text-xs text-slate-200">Sourcing Support</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel Interactive Controls (Rendered ONLY when > 1 dynamic slide) */}
        {isCarousel && (
          <div className="absolute inset-x-0 bottom-4 z-20 mx-auto flex max-w-[1500px] items-center justify-between px-6 sm:px-8 lg:px-12">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-3.5 py-1.5 backdrop-blur-md">
              {mediaList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`h-2 transition-all duration-300 rounded-full ${activeSlideIndex === idx
                    ? "w-7 bg-gradient-to-r from-teal-400 to-cyan-300 shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}

              <span className="ml-1.5 text-xs font-mono font-medium text-slate-300">
                0{activeSlideIndex + 1} / 0{mediaList.length}
              </span>
            </div>

            {/* Arrows Navigation */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-slate-950/50 text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/20 active:scale-95 shadow-md"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-slate-950/50 text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/20 active:scale-95 shadow-md"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
