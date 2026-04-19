"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

// Variasi animasi untuk efek teks berantakan/glitch
// FIX: Mengubah tipe ease menjadi tuple [number, number, number, number]
const textVariants = {
  hidden: { opacity: 0, y: 40, skewY: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      delay: 0.5 + i * 0.2, // Dipercepat agar tidak terlalu lama kosong
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const resumePath = `/Muhammad Bagir-resume-${locale}.pdf`;

  const lines = [
    { text: "Muhammad", className: "" },
    { text: "Bagir", className: "text-neutral-400 dark:text-neutral-600" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950"
    >
      {/* Garis dekoratif tipis di pojok (Menggantikan lingkaran template) */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-neutral-200 dark:border-neutral-800" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-neutral-200 dark:border-neutral-800" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Available badge - Diposisikan di kiri atas untuk kesan editorial */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-16 md:mb-24"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">
            {t("available")}
          </span>
        </motion.div>

        {/* Layout Utama: Teks Besar di Kiri, Detail di Kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Kolom Kiri: Tipografi Besar */}
          <div className="lg:col-span-9 space-y-2">
            {lines.map((line, i) => (
              <motion.h1
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className={`text-[15vw] md:text-[12vw] lg:text-[10vw] font-extralight leading-[0.85] tracking-tighter ${line.className}`}
              >
                {line.text.split("").map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + (i * 0.2) + (index * 0.03), duration: 0.1 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
            ))}
          </div>

          {/* Kolom Kanan: Subtitle & CTA (Vertikal rapi) */}
          <div className="lg:col-span-3 pb-4 md:pb-8 space-y-8 lg:border-l lg:border-neutral-200 lg:dark:border-neutral-800 lg:pl-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col gap-3 w-full"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group w-full text-left px-5 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-[11px] tracking-[0.15em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-colors duration-300 flex items-center justify-between"
              >
                {t("cta_projects")}
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-left px-5 py-3 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] tracking-[0.15em] uppercase hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-neutral-100 dark:hover:text-neutral-100 transition-colors duration-300"
              >
                {t("cta_contact")}
              </a>

              <a
                href={resumePath}
                download
                className="w-full text-left flex items-center justify-between px-5 py-3 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] tracking-[0.15em] uppercase hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-neutral-100 dark:hover:text-neutral-100 transition-colors duration-300"
              >
                {t("cta_resume")}
                <Download size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Diposisikan statis di bawah kanan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 right-8 flex items-center gap-3 text-neutral-400 dark:text-neutral-600 mr-8"
      >
        <div className="w-px h-8 bg-neutral-300 dark:bg-neutral-700" />
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}