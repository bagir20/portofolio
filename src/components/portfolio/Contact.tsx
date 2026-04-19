"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, ArrowUpRight, Github, Linkedin, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t("email_subject")} ${form.name}`);
    const body = encodeURIComponent(
      `${t("email_body_name")} ${form.name}\n${t("email_body_email")} ${form.email}\n\n${t("email_body_message")}\n${form.message}`
    );
    const a = document.createElement("a");
    a.href = `mailto:mdbagir20@gmail.com?subject=${subject}&body=${body}`;
    a.click();
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    // Hapus padding bawah section secara manual di sini
    <section id="contact" className="pt-24 md:pt-32 bg-white dark:bg-neutral-950 overflow-x-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
            {t("label")}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
              {t("heading")}
              <br />
              <span className="text-neutral-400 dark:text-neutral-600">{t("heading_accent")}</span>
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-10 max-w-md">
              {t("description")}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                  <Mail size={16} className="text-neutral-400 dark:text-neutral-500" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wide uppercase mb-0.5">Email</div>
                  <a href="mailto:mdbagir20@gmail.com" className="text-sm text-neutral-900 dark:text-neutral-100 font-light hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors">
                    mdbagir20@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                  <MapPin size={16} className="text-neutral-400 dark:text-neutral-500" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wide uppercase mb-0.5">{t("location_label")}</div>
                  <span className="text-sm text-neutral-900 dark:text-neutral-100 font-light">Indonesia</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              {[
                { name: "GitHub", href: "https://github.com/bagir20/", icon: Github },
                { name: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-bagir-3a0b31352", icon: Linkedin },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors tracking-wide"
                >
                  <social.icon size={14} className="group-hover:scale-110 transition-transform" />
                  {social.name}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-xs tracking-[0.1em] uppercase text-neutral-400 dark:text-neutral-500 block mb-2">{t("field_name")}</label>
                <input type="text" name="name" id="name" required value={form.name} onChange={handleChange}
                  className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-neutral-100 outline-none py-3 text-sm text-neutral-900 dark:text-neutral-100 font-light transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
                  placeholder={t("placeholder_name")} />
              </div>

              <div>
                <label htmlFor="email" className="text-xs tracking-[0.1em] uppercase text-neutral-400 dark:text-neutral-500 block mb-2">{t("field_email")}</label>
                <input type="email" name="email" id="email" required value={form.email} onChange={handleChange}
                  className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-neutral-100 outline-none py-3 text-sm text-neutral-900 dark:text-neutral-100 font-light transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
                  placeholder={t("placeholder_email")} />
              </div>

              <div>
                <label htmlFor="message" className="text-xs tracking-[0.1em] uppercase text-neutral-400 dark:text-neutral-500 block mb-2">{t("field_message")}</label>
                <textarea name="message" id="message" required rows={5} value={form.message} onChange={handleChange}
                  className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-neutral-100 outline-none py-3 text-sm text-neutral-900 dark:text-neutral-100 font-light transition-colors resize-none placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
                  placeholder={t("placeholder_message")} />
              </div>

              <button
                type="submit"
                className="group flex items-center gap-3 px-8 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-all duration-300"
              >
                {status === "sent" ? (
                  <>{t("btn_sent")} <CheckCircle size={14} className="text-green-400 dark:text-green-500" /></>
                ) : (
                  <>{t("btn_send")} <Mail size={14} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

              {status === "sent" && (
                <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light">{t("sent_note")}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

           {/* ── Area Bawah: Copyright lalu Teks Raksasa ── */}
      {/* Wrapper ini WAJIB menggunakan left-1/2 supaya bisa keluar dari max-w-6xl di Mobile */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">
        {/* Copyright */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-10 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light tracking-wide"
          >
            {t("footer_copy")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light tracking-wide"
          >
            {t("footer_made")}
          </motion.p>
        </div>

        {/* Teks THANK YOU! yang Menghantam Lantai */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full leading-[0.8] select-none"
        >
          <h2 
            className="whitespace-nowrap font-black tracking-tighter text-neutral-900 dark:text-neutral-100
                       text-[20vw] sm:text-[18vw] md:text-[18vw] lg:text-[15vw]"
          >
            THANK YOU!
          </h2>
        </motion.div>
      </div>
    </section>
  );
}