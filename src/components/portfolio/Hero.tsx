"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  // Otomatis menyesuaikan CV berdasarkan bahasa yang aktif
  const resumePath = `/Muhammad Bagir-resume-${locale}.pdf`;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Decorative circles */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 border border-neutral-200/50 dark:border-neutral-700/50 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/5 w-40 h-40 border border-neutral-200/30 dark:border-neutral-700/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-neutral-200 dark:border-neutral-700 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400">
            {t("available")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-6"
        >
          Muhammad
          <br />
          <span className="text-neutral-400 dark:text-neutral-600">Bagir</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8 }}
          className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-light max-w-md mx-auto mb-12 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group px-8 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-colors duration-300"
          >
            {t("cta_projects")}
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs tracking-[0.15em] uppercase hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-neutral-100 dark:hover:text-neutral-100 transition-colors duration-300"
          >
            {t("cta_contact")}
          </a>

           {/* Tombol CV */}
          <a
            href={resumePath}
            download
            className="flex items-center gap-2 px-8 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs tracking-[0.15em] uppercase hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-neutral-100 dark:hover:text-neutral-100 transition-colors duration-300"
          >
            <Download size={14} />
            {t("cta_resume")} {/* Akan otomatis render "Unduh CV · ID" atau "Download CV · EN" */}
          </a>
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-neutral-400 dark:text-neutral-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}