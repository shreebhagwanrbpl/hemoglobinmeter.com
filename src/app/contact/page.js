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

export default function ContactPage({ city = "" }) {
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

  const displayCity = city || (currentDistrict
    ? currentDistrict
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "");

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
          "hemoglobinmetercom",
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
            "hemoglobinmetercom",
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
            "hemoglobinmetercom",
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



  const getContactField = (labels, defaultValue) => {
    const normalized = labels.map((l) => l.toLowerCase().trim());
    const found = contactInfo.find(
      (x) => x && x.label && normalized.includes(x.label.toLowerCase().trim())
    );
    return found ? found.value : defaultValue;
  };

  const phone = getContactField(
    ["phone", "phone number", "contact number"],
    "+91 9983123469\n+91 9983333489"
  );

  const email = getContactField(
    ["email", "email address", "email for reply"],
    "rajbiosis@yahoo.in"
  );

  const address = getContactField(
    ["address", "office address"],
    "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021"
  );

  const hours = getContactField(
    ["working hours", "hours"],
    "Mon - Sat (10AM - 6PM)"
  );

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const phoneNumbers = phone ? String(phone).split(/[\n,]+/).map(num => num.trim()).filter(Boolean) : [];

  const mapAddress = encodeURIComponent(
    dynamicAddress
  );
  if (loading) {
    return (
      <div className="site5-static">
<section className="section-padding bg-slate-50">
        <div className="container-custom grid lg:grid-cols-2 gap-14">

          <div className="space-y-6">
            <div className="h-10 w-48 bg-slate-200 rounded-full animate-pulse mb-8" />
            <div className="h-14 w-full bg-slate-200 rounded-2xl animate-pulse mb-4" />
            <div className="h-20 w-full bg-slate-200 rounded-2xl animate-pulse mb-8" />

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
      </section>
      </div>
    );
  }
  return (
    <div className="site5-static">
      {/* Banner */}
      <PageBanner
        title={displayCity ? `Contact Us in ${displayCity}` : "Contact Us"}
        subtitle={displayCity ? `Connect with our laboratory equipment team in ${displayCity} for premium diagnostic and biomedical solutions.` : "Connect with our laboratory equipment team for premium diagnostic and biomedical solutions."}
      />

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-14">

          {/* Left Info */}
          <div>


            {/* Badge */}
            <span className="inline-block bg-teal-50 border border-teal-100 text-teal-700 px-5 py-2 rounded-full font-semibold mb-5">
              {displayCity ? `Contact Information in ${displayCity}` : "Contact Information"}
            </span>




            <h2 className="section-title text-[#2D1B21]">
              Let’s Start a Conversation{displayCity ? ` in ${displayCity}` : ""}
            </h2>




            <p className="section-subtitle text-[#6B4A54]">
              Reach out to us for
              healthcare consultation,
              biomedical products, and
              advanced diagnostic support.
            </p>





            {/* Contact Cards */}
            <div className="space-y-6 mt-10">



              {/* Phone */}
              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-200 hover:shadow-[0_15px_40px_rgba(13,148,136,0.06)] transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Phone size={24} />
                </div>


                <div>
                  <h4 className="font-semibold text-lg text-slate-900">
                    Contact Number
                  </h4>

                  <div className="space-y-1 mt-2">
                    {phoneNumbers.map((num, i) => (
                      <p key={i} className="text-slate-600">
                        <a href={`tel:${num}`} className="hover:text-[#0F766E] transition">
                          {num}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>

              </div>





              {/* Email */}
              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-200 hover:shadow-[0_15px_40px_rgba(13,148,136,0.06)] transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Mail size={24} />
                </div>


                <div>
                  <h4 className="font-semibold text-lg text-slate-900">
                    Email for Reply
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {email}
                  </p>
                </div>

              </div>





              {/* Address */}
              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-200 hover:shadow-[0_15px_40px_rgba(13,148,136,0.06)] transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <MapPin size={24} />
                </div>


                <div>
                  <h4 className="font-semibold text-lg text-slate-900">
                    Office Address
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {dynamicAddress}
                  </p>
                </div>

              </div>





              {/* Working Hours */}
              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-200 hover:shadow-[0_15px_40px_rgba(13,148,136,0.06)] transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Clock3 size={24} />
                </div>


                <div>
                  <h4 className="font-semibold text-lg text-slate-900">
                    Working Hours
                  </h4>

                  <p className="text-slate-600 mt-2">
                    {hours}
                  </p>
                </div>

              </div>



            </div>


          </div>

          {/* Right Form */}
          <div className="bg-white rounded-[40px] p-8 lg:p-10 border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">


            <h3 className="text-3xl font-bold text-slate-900">
              Request Laboratory Assistance
            </h3>



            <p className="text-slate-600 mt-3">
              Fill out the form and our
              team will contact you soon.
            </p>



            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >



              <input
                type="text"
                name="name"
                placeholder="Name of Contact"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition"
              />



              <input
                type="email"
                name="email"
                placeholder="Email for Reply"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition"
              />



              <input
                type="tel"
                name="phone"
                placeholder="Contact Number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition"
              />



              <input
                type="text"
                name="subject"
                placeholder="Equipment Requirement"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition"
              />



              <textarea
                rows={5}
                name="message"
                placeholder="Explain your laboratory requirement"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition resize-none"
              />



              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-teal-100/50 transition-all duration-300 shadow-md disabled:opacity-70"
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
    </div>
  );
}