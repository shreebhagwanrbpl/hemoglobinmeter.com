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
            a: `Pathology labs, clinics, and hospitals in ${city} can request a quick quotation by submitting our online contact form, emailing us at rajbiosis@yahoo.in, or calling our sales support team.`
          },
          {
            q: `Do you offer local maintenance and service contracts (AMC) in ${city}?`,
            a: `Yes, we offer comprehensive AMC and CMC services, calibration, and on-call technical repair services for our installed laboratory devices in ${city}.`
          }
        ]
      : [
          {
            q: "Do you supply biomedical equipment across India?",
            a: "Yes, we supply biomedical and laboratory equipment across multiple districts and cities throughout India."
          },
          {
            q: "Which laboratory instruments do you provide?",
            a: "We provide CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Urine Analyzers and other diagnostic equipment."
          },
          {
            q: "Do you provide installation support?",
            a: "Yes, installation assistance and technical support are available depending on location and equipment type."
          },
          {
            q: "Who can purchase biomedical equipment?",
            a: "Hospitals, pathology labs, diagnostic centres, research laboratories and healthcare facilities can purchase equipment from us."
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
                        Biomedical Equipment Supplier
                    </span>

                    <span className="text-slate-900">
                        {" "}in {location}
                    </span>

                </h2>



                {/* Content */}
                <div className="mt-10 space-y-6 text-lg leading-8 text-slate-600">


                    <p className="rounded-3xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl">

                        Raj Biosis is a trusted supplier of biomedical and
                        laboratory equipment in {location}. We provide CBC Machines,
                        Hematology Analyzers, Biochemistry Analyzers, Urine Analyzers,
                        ELISA Readers and diagnostic instruments for hospitals,
                        pathology labs and healthcare facilities.

                    </p>



                    <p className="rounded-3xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl">

                        Our mission is to provide reliable and high-quality laboratory
                        equipment to healthcare professionals across India. We work
                        with diagnostic centres, hospitals, research laboratories and
                        medical institutions to deliver advanced biomedical solutions.

                    </p>



                    <p className="rounded-3xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl">

                        We offer installation assistance, product guidance and
                        technical support for a wide range of laboratory instruments.
                        Whether you are setting up a new diagnostic laboratory or
                        upgrading existing equipment, our team can help you select the
                        right solution.

                    </p>



                    <p className="rounded-3xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-xl">

                        Raj Biosis supplies equipment across multiple
                        districts and cities, helping healthcare providers improve
                        testing efficiency and diagnostic accuracy.

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
                            Frequently Asked Questions
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