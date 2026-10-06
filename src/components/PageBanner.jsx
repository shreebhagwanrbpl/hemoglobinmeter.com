"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

export default function PageBanner({
  title,
  subtitle,
  badge = "Biomedical Product Catalogue",
  breadcrumbs = [],
  features = [],
  children,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0FDFA] via-white to-[#ECFEFF] py-20 lg:py-28">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-teal-200/35 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-200/35 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-100/30 blur-[140px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Optional Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-5 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 sm:text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-teal-700"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-teal-800">
                      {crumb.label}
                    </span>
                  )}
                  {idx < breadcrumbs.length - 1 && (
                    <ChevronRight size={14} className="text-slate-400" />
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Badge */}
          {badge && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/90 px-5 py-2 text-xs font-semibold text-[#0F766E] shadow-sm backdrop-blur-sm sm:text-sm">
              <Sparkles size={14} className="text-teal-600" />
              <span>{badge}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {subtitle}
            </p>
          )}

          {/* Optional Feature Pills */}
          {features.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-xl border border-teal-100 bg-white/80 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md transition-all hover:border-teal-300 hover:bg-white"
                >
                  {item.icon && <span className="text-teal-600">{item.icon}</span>}
                  <span>{item.text || item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Extra Children Slot */}
          {children && <div className="mt-8">{children}</div>}

          {/* Bottom Gradient Line */}
          <div className="mx-auto mt-10 h-1 w-32 rounded-full bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
}
