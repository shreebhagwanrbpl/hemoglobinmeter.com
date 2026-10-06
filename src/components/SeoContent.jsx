export default function SeoContent({ city = "" }) {
    const location = city || "India";

    const isLocal = city && city !== "India";
    const faqData = isLocal 
      ? [
          {
            q: `Do you deliver and install medical equipment in ${city}?`,
            a: `Yes! Raj Biosis provides direct delivery, setup support, and technical installation for diagnostic analyzers and laboratory equipment in ${city} and neighboring districts.`
          },
          {
            q: `What is the estimated delivery time for orders in ${city}?`,
            a: `Standard delivery to ${city} typically takes 3 to 5 business days, depending on instrument availability and shipping logistics.`
          },
          {
            q: `How can healthcare labs in ${city} get a quotation?`,
            a: `Pathology labs, clinics, and hospitals in ${city} can request a quick quotation by submitting our online contact form or contacting our sales support team.`
          },
          {
            q: `Do you offer local maintenance and service contracts (AMC) in ${city}?`,
            a: `Yes, we offer comprehensive AMC and CMC services, calibration, and on-call technical repair services for our installed laboratory devices in ${city}.`
          }
        ]
      : [
          {
            q: "Can I enquire about more than one biomedical product at once?",
            a: "Yes. A single enquiry can include several categories or product types, along with quantities and preferred specifications."
          },
          {
            q: "What kinds of items can I find in the catalogue?",
            a: "The catalogue can cover instruments, diagnostic kits, reagents, consumables, monitoring products, laboratory accessories and other biomedical items, subject to the published inventory."
          },
          {
            q: "Can you help me understand product specifications?",
            a: "Product enquiries can include questions about parameters, capacity, configuration, application and other selection details. Any service arrangement depends on the item and location."
          },
          {
            q: "Who can use this product catalogue?",
            a: "Hospitals, laboratories, clinics, educational or research facilities, dealers and other organisations sourcing biomedical products can use the catalogue for enquiries."
          }
        ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0FDFA] to-[#ECFEFF] py-20">

            {/* Background Glow */}
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-teal-200/30 blur-[120px]" />

            <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-cyan-200/30 blur-[120px]" />


            <div className="container-custom relative z-10">


                {/* Heading */}
                <h2 className="max-w-4xl text-4xl font-bold leading-tight lg:text-5xl">

                    <span className="bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
                        Biomedical Product Sourcing in
                    </span>

                    <span className="text-slate-900">
                        {" "}in {location}
                    </span>

                </h2>



                {/* Content */}
                <div className="mt-10 space-y-6 text-lg leading-8 text-slate-600">


                    <p className="rounded-3xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl">

                        Raj Biosis provides a multi-category biomedical catalogue for organisations in {location}. The range can include laboratory instruments, diagnostic products, reagents, test systems, consumables, monitoring devices and related healthcare supplies.

                    </p>



                    <p className="rounded-3xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl">

                        The catalogue is intended for different purchasing situations, including laboratory setup, replacement of existing equipment, routine supply needs, department expansion and mixed-item procurement. Product selection can be based on application and specification rather than one fixed product family.

                    </p>



                    <p className="rounded-3xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl">

                        For equipment and supplies that require closer review, buyers can share their intended use, preferred specifications or required quantities. This helps turn a broad catalogue search into a more relevant enquiry.

                    </p>



                    <p className="rounded-3xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl">

                        The website supports enquiries from multiple locations and is designed for buyers looking for individual products as well as broader biomedical requirements.

                    </p>


                </div>




                {/* FAQ Section */}

                <div className="mt-20">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />

                    <h2 className="text-3xl font-bold lg:text-4xl">

                        <span className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-clip-text text-transparent">
                            Common Catalogue Questions
                        </span>

                    </h2>



                    <div className="mt-10 space-y-6">

                        {faqData.map((item, index) => (
                            <div key={index} className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                                <h3 className="text-xl font-semibold text-slate-900">
                                    {item.q}
                                </h3>
                                <p className="mt-3 leading-7 text-slate-600">
                                    {item.a}
                                </p>
                            </div>
                        ))}

                    </div>


                </div>


            </div>

        </section>
    );
}
