"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);
  const [contactInfo, setContactInfo] =
    useState([]);

  const [submitting, setSubmitting] =
    useState(false);
  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const currentDistrict =
    pathParts.length > 0
      ? pathParts[0]
      : null;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

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

    if (!form.message.trim()) {
      return toast.error(
        "Message is required"
      );
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "centralbiomedicals",
          "contactQueries"
        ),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success(
        "Message submitted successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "districts",
            currentDistrict
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [currentDistrict]);
  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);



  const phone =
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const hours =
    contactInfo.find(
      (x) => x.label === "Working Hours"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const mapAddress = encodeURIComponent(
    dynamicAddress
  );
  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">

          <div className="grid lg:grid-cols-2 gap-12">

            <div>
              <div className="h-12 w-64 bg-slate-200 rounded animate-pulse mb-8" />

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-slate-200 rounded-3xl animate-pulse mb-6"
                />
              ))}
            </div>

            <div className="bg-white p-10 rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-5"
                />
              ))}
            </div>

          </div>

        </div>
      </section>
    );
  }
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with Central Biomedicals for premium diagnostic and biomedical solutions."
      />

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-14">

          {/* Left Info */}
          <div>

            {/* Badge */}
            <span
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
    font-semibold
    text-[#0F766E]
    shadow-sm
    mb-5
    "
            >
              Contact Information
            </span>



            {/* Title */}
            <h2
              className="
    section-title
    bg-gradient-to-r
    from-[#0F766E]
    via-[#0D9488]
    to-[#14B8A6]
    bg-clip-text
    text-transparent
    "
            >
              Let’s Start a Conversation
            </h2>



            {/* Description */}
            <p className="section-subtitle text-slate-600">
              Reach out to us for healthcare consultation,
              biomedical products, and advanced diagnostic support.
            </p>




            {/* Contact Cards */}
            <div className="mt-10 space-y-6">


              {/* Phone */}
              <div
                className="
      group
      flex
      items-start
      gap-5
      rounded-[28px]
      border
      border-teal-100
      bg-white
      p-6
      shadow-[0_10px_30px_rgba(15,118,110,0.08)]
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_20px_45px_rgba(15,118,110,0.15)]
      "
              >

                <div
                  className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-[#0F766E]
        to-[#14B8A6]
        text-white
        shadow-lg
        shadow-teal-200
        transition
        group-hover:scale-110
        "
                >
                  <Phone size={24} />
                </div>


                <div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    Phone Number
                  </h4>

                  <p className="mt-2 text-slate-600">
                    {phone}
                  </p>
                </div>


              </div>





              {/* Email */}
              <div
                className="
      group
      flex
      items-start
      gap-5
      rounded-[28px]
      border
      border-teal-100
      bg-white
      p-6
      shadow-[0_10px_30px_rgba(15,118,110,0.08)]
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_20px_45px_rgba(15,118,110,0.15)]
      "
              >

                <div
                  className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-[#0F766E]
        to-[#14B8A6]
        text-white
        shadow-lg
        shadow-teal-200
        transition
        group-hover:scale-110
        "
                >
                  <Mail size={24} />
                </div>


                <div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    Email Address
                  </h4>

                  <p className="mt-2 break-all text-slate-600">
                    {email}
                  </p>
                </div>


              </div>





              {/* Address */}
              <div
                className="
      group
      flex
      items-start
      gap-5
      rounded-[28px]
      border
      border-teal-100
      bg-white
      p-6
      shadow-[0_10px_30px_rgba(15,118,110,0.08)]
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_20px_45px_rgba(15,118,110,0.15)]
      "
              >

                <div
                  className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-[#0F766E]
        to-[#14B8A6]
        text-white
        shadow-lg
        shadow-teal-200
        transition
        group-hover:scale-110
        "
                >
                  <MapPin size={24} />
                </div>


                <div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    Office Address
                  </h4>

                  <p className="mt-2 leading-7 text-slate-600">
                    {dynamicAddress}
                  </p>
                </div>


              </div>





              {/* Working Hours */}
              <div
                className="
      group
      flex
      items-start
      gap-5
      rounded-[28px]
      border
      border-teal-100
      bg-white
      p-6
      shadow-[0_10px_30px_rgba(15,118,110,0.08)]
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_20px_45px_rgba(15,118,110,0.15)]
      "
              >

                <div
                  className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-[#0F766E]
        to-[#14B8A6]
        text-white
        shadow-lg
        shadow-teal-200
        transition
        group-hover:scale-110
        "
                >
                  <Clock3 size={24} />
                </div>


                <div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    Working Hours
                  </h4>

                  <p className="mt-2 text-slate-600">
                    {hours}
                  </p>
                </div>


              </div>


            </div>


          </div>

          {/* Right Form */}
          <div
            className="
  rounded-[40px]
  border
  border-teal-100
  bg-white/90
  p-8
  shadow-[0_25px_70px_rgba(15,118,110,0.12)]
  backdrop-blur-xl
  lg:p-10
"
          >

            {/* Heading */}
            <h3
              className="
    bg-gradient-to-r
    from-[#0F766E]
    via-[#0D9488]
    to-[#14B8A6]
    bg-clip-text
    text-3xl
    font-bold
    text-transparent
    "
            >
              Send Us Message
            </h3>


            <p className="mt-3 text-slate-600">
              Fill out the form and our team will contact you soon.
            </p>



            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >


              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="
      w-full
      rounded-2xl
      border
      border-teal-100
      bg-white
      px-5
      py-4
      text-slate-700
      outline-none
      transition-all
      focus:border-[#0F766E]
      focus:ring-4
      focus:ring-teal-100
      "
              />



              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="
      w-full
      rounded-2xl
      border
      border-teal-100
      bg-white
      px-5
      py-4
      text-slate-700
      outline-none
      transition-all
      focus:border-[#0F766E]
      focus:ring-4
      focus:ring-teal-100
      "
              />



              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="
      w-full
      rounded-2xl
      border
      border-teal-100
      bg-white
      px-5
      py-4
      text-slate-700
      outline-none
      transition-all
      focus:border-[#0F766E]
      focus:ring-4
      focus:ring-teal-100
      "
              />



              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="
      w-full
      rounded-2xl
      border
      border-teal-100
      bg-white
      px-5
      py-4
      text-slate-700
      outline-none
      transition-all
      focus:border-[#0F766E]
      focus:ring-4
      focus:ring-teal-100
      "
              />



              <textarea
                rows={5}
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="
      w-full
      resize-none
      rounded-2xl
      border
      border-teal-100
      bg-white
      px-5
      py-4
      text-slate-700
      outline-none
      transition-all
      focus:border-[#0F766E]
      focus:ring-4
      focus:ring-teal-100
      "
              />



              <button
                type="submit"
                disabled={submitting}
                className="
      group
      flex
      w-full
      items-center
      justify-center
      rounded-2xl
      bg-gradient-to-r
      from-[#0F766E]
      via-[#0D9488]
      to-[#14B8A6]
      py-4
      font-semibold
      text-white
      shadow-lg
      shadow-teal-200
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-teal-300
      disabled:cursor-not-allowed
      disabled:opacity-70
      "
              >

                {submitting
                  ? "Submitting..."
                  : "Send Message"}

              </button>


            </form>

          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="rounded-[40px] overflow-hidden border border-slate-100 card-shadow">

            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}