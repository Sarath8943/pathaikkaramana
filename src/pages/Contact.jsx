import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ContactFuter from "../components/Futures/ContactFuter";
import emailjs from "emailjs-com";

export const Contact = () => {
  const { t } = useTranslation();
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("");

    emailjs
      .sendForm(
        "service_x7s6mol",
        "template_fqjdkdc",
        form.current,
        "XAidoY-DowX4rbrNy",
      )
      .then(
        () => {
          form.current.reset();
          setStatusMessage(t("contact_section.status.success"));
          setIsSending(false);
        },
        () => {
          setStatusMessage(t("contact_section.status.error"));
          setIsSending(false);
        },
      );
  };

  return (
    <section className="min-h-screen  bg-slate-50 py-12 px-4 font-sans flex flex-wrap justify-center items-start gap-8">
      <div className="flex-1 min-w-80 max-w-170.5 p-2">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.32688086088!2d76.2238356!3d10.9757656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cb413d80630b%3A0xe212260281b3158c!2sPathaikkara%20Mana!5e0!3m2!1sen!2sin!4v1700000000000"
          className="w-full h-132 rounded-xl shadow-md border-0"
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-75 max-w-125 bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-[#a0521c] mb-6">
          {t("contact_section.contactTitle")}
        </h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder={t("contact_section.placeholders.name")}
            required
            className="w-full h-12 px-5 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-[#a0521c] transition-all shadow-inner"
          />

          <input
            type="tel"
            name="user_mobile"
            placeholder={t("contact_section.placeholders.mobile")}
            pattern="[0-9]{10}"
            required
            className="w-full h-12 px-5 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-[#a0521c] transition-all shadow-inner"
          />

          <input
            type="email"
            name="user_email"
            placeholder={t("contact_section.placeholders.email")}
            required
            className="w-full h-12 px-5 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-[#a0521c] transition-all shadow-inner"
          />

          <textarea
            name="message"
            rows="5"
            placeholder={t("contact_section.placeholders.message")}
            required
            className="w-full p-5 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#a0521c] transition-all shadow-inner resize-none"
          />

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 bg-[#a0521c] text-white font-semibold rounded-full shadow-md hover:bg-[#864317] active:scale-95 transition-all disabled:bg-gray-400"
          >
            {isSending
              ? t("contact_section.button.sending")
              : t("contact_section.button.submit")}
          </button>
        </form>

        {statusMessage && (
          <p
            className={`mt-4 text-center font-medium ${statusMessage.includes("✅") ? "text-green-600" : "text-red-600"}`}
          >
            {statusMessage}
          </p>
        )}
      </div>

      <div className="w-full">
        <ContactFuter />
      </div>
    </section>
  );
};

export default Contact;
