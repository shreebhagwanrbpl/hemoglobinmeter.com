export default function ServiceCard({
  icon,
  title,
  description,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="h-full bg-white rounded-[30px] p-8 border border-teal-100 shadow-[0_15px_40px_rgba(15,118,110,0.08)] animate-pulse flex flex-col justify-between">
        <div>
          <div className="w-16 h-16 rounded-[22px] bg-slate-200 mb-6"></div>
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-11/12"></div>
            <div className="h-4 bg-slate-200 rounded w-8/12"></div>
          </div>
        </div>
        <div className="h-1 w-12 rounded-full bg-slate-200 mt-6"></div>
      </div>
    );
  }

  return (
    <div className="group h-full flex flex-col justify-between rounded-[30px] border border-teal-100 bg-white p-8 shadow-[0_15px_40px_rgba(15,118,110,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,118,110,0.18)]">
      <div>
        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#14B8A6] text-white shadow-lg shadow-teal-200 transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>

        {/* Title */}
        <h3 className="mb-4 text-2xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
          {title}
        </h3>

        {/* Description */}
        <p className="leading-7 text-slate-600">
          {description}
        </p>
      </div>

      {/* Bottom Accent Line (pinned to bottom) */}
      <div className="mt-8 h-1 w-12 rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] transition-all duration-300 group-hover:w-20" />
    </div>
  );
}
