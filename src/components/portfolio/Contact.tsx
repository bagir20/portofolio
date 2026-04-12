"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, ArrowUpRight, Github, Linkedin, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Pesan dari ${form.name}`);
    const body = encodeURIComponent(
      `Nama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`
    );

    const a = document.createElement("a");
    a.href = `mailto:mdbagir20@gmail.com?subject=${subject}&body=${body}`;
    a.click();

    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
            05 — Kontak
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 mb-6">
              Tertarik untuk
              <br />
              <span className="text-neutral-400">terhubung?</span>
            </h2>
            <p className="text-neutral-500 font-light leading-relaxed mb-10 max-w-md">
              Sebagai fresh graduate, saya terbuka untuk peluang kerja, magang, maupun proyek kolaborasi.
              Jangan ragu menghubungi saya melalui email atau sosial media di bawah.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center">
                  <Mail size={16} className="text-neutral-400" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 tracking-wide uppercase mb-0.5">
                    Email
                  </div>
                  <a
                    href="mailto:mdbagir20@gmail.com"
                    className="text-sm text-neutral-900 font-light hover:text-neutral-500 transition-colors"
                  >
                    mdbagir20@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center">
                  <MapPin size={16} className="text-neutral-400" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 tracking-wide uppercase mb-0.5">
                    Lokasi
                  </div>
                  <span className="text-sm text-neutral-900 font-light">
                    Indonesia
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
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
                  className="group flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-900 transition-colors tracking-wide"
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
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="text-xs tracking-[0.1em] uppercase text-neutral-400 block mb-2"
                >
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-neutral-200 focus:border-neutral-900 outline-none py-3 text-sm text-neutral-900 font-light transition-colors placeholder:text-neutral-300"
                  placeholder="Nama Anda"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-xs tracking-[0.1em] uppercase text-neutral-400 block mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-neutral-200 focus:border-neutral-900 outline-none py-3 text-sm text-neutral-900 font-light transition-colors placeholder:text-neutral-300"
                  placeholder="email@anda.com"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="text-xs tracking-[0.1em] uppercase text-neutral-400 block mb-2"
                >
                  Pesan
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-neutral-200 focus:border-neutral-900 outline-none py-3 text-sm text-neutral-900 font-light transition-colors resize-none placeholder:text-neutral-300"
                  placeholder="Ceritakan tentang proyek Anda..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex items-center gap-3 px-8 py-3 bg-neutral-900 text-white text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 transition-all duration-300"
              >
                {status === "sent" ? (
                  <>
                    App Email Terbuka
                    <CheckCircle size={14} className="text-green-400" />
                  </>
                ) : (
                  <>
                    Kirim Pesan
                    <Mail size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {status === "sent" && (
                <p className="text-xs text-neutral-400 font-light">
                  Silakan selesaikan pengiriman di aplikasi email Anda.
                </p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-neutral-400 font-light">
            © 2026 Muhammad Bagir. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-neutral-400 font-light">
            Dirancang & dibangun dengan hati.
          </p>
        </motion.div>
      </div>
    </section>
  );
}