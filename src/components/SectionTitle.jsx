export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""
        } max-w-3xl`}
    >

      {/* Badge */}
      {badge && (
        <div
          className="
      inline-flex
      items-center
      rounded-full
      border
      border-teal-200
      bg-gradient-to-r
      from-teal-50
      via-cyan-50
      to-emerald-50
      px-5
      py-2
      text-sm
      font-semibold
      text-[#0F766E]
      shadow-sm
      mb-5
      "
        >
          {badge}
        </div>
      )}


      {/* Title */}
      <h2
        className="
    bg-gradient-to-r
    from-[#0F766E]
    via-[#0D9488]
    to-[#14B8A6]
    bg-clip-text
    text-transparent
    section-title
    "
      >
        {title}
      </h2>


      {/* Description */}
      <p className="section-subtitle text-slate-600">
        {description}
      </p>


    </div>
  );
}
