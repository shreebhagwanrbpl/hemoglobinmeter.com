export default function SeoContent({ city = "" }) {
    const location = city || "India";

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

                        Central Biomedicals is a trusted supplier of biomedical and
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

                        Central Biomedicals supplies equipment across multiple
                        districts and cities, helping healthcare providers improve
                        testing efficiency and diagnostic accuracy.

                    </p>


                </div>




                {/* FAQ Section */}

                <div className="mt-20">


                    <h2 className="text-3xl font-bold lg:text-4xl">

                        <span className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </span>

                    </h2>



                    <div className="mt-10 space-y-6">



                        <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Do you supply biomedical equipment across India?
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Yes, we supply biomedical and laboratory equipment
                                across multiple districts and cities.
                            </p>

                        </div>




                        <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Which laboratory instruments do you provide?
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                We provide CBC Machines, Hematology Analyzers,
                                Biochemistry Analyzers, ELISA Readers, Urine
                                Analyzers and other diagnostic equipment.
                            </p>

                        </div>




                        <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Do you provide installation support?
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Yes, installation assistance and technical support
                                are available depending on location and equipment
                                type.
                            </p>

                        </div>




                        <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Who can purchase biomedical equipment?
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Hospitals, pathology labs, diagnostic centres,
                                research laboratories and healthcare facilities can
                                purchase equipment from us.
                            </p>

                        </div>



                    </div>


                </div>


            </div>

        </section>
    );
}