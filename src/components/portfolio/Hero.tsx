"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const resumePath = `/Muhammad Bagir-resume-${locale}.pdf`;

  // Skills/metadata yang tampil di strip atas — sesuaikan sesukamu
const metaTags = [
  "Web Development",
  "Data Analytics",
  "Data Visualization",
  "Database Admin",
  "Visual Design",
  "Open to Work",
];

  return (
    <section
      id="home"
      className="relative lg:min-h-screen flex flex-col overflow-hidden bg-white dark:bg-neutral-950"
>
      {/* ── 1. TOP STRIP ─────────────────────────────────────────── */}
      {/*
        pt-16 (64px) memberi ruang di bawah navbar fixed.
        Sesuaikan nilainya dengan tinggi navbar-mu (misal pt-[72px] atau pt-20).
      */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-start gap-3 px-5 pt-20 pb-5 border-b border-neutral-200 dark:border-neutral-800"
      >
        {/* Available pulse */}
        <span className="mt-[3px] w-[6px] h-[6px] flex-shrink-0 bg-emerald-400 rounded-full animate-pulse" />

        {/* Dense metadata — mirip referensi */}
        <p className="text-[10px] leading-[1.7] tracking-[0.12em] uppercase text-neutral-500 dark:text-neutral-500">
          {t("available")}
          &nbsp;&nbsp;
          {metaTags.map((tag, i) => (
            <span key={i}>
              {tag}
              {i < metaTags.length - 1 && (
                <span className="mx-2 text-neutral-300 dark:text-neutral-700">·</span>
              )}
            </span>
          ))}
        </p>
      </motion.div>

      {/* ── 2. MID SECTION: huge name ────────────────────────────── */}
      <div className="flex flex-col py-10 lg:flex-1 lg:justify-end">

        {/* ── HUGE TYPOGRAPHY BLOCK ──────────────────────────────── */}
        {/*
          overflow-hidden di sini agar teks yang lebih besar dari viewport
          tidak menambah horizontal scrollbar, tapi tetap "mentok" ke kanan.
          Ganti ke overflow-visible kalau mau teks beneran bleeding keluar section.
        */}
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="select-none"
          >
            <h1
              className="
                font-medium leading-[0.85] tracking-tighter
                text-neutral-800 dark:text-neutral-100
                uppercase whitespace-nowrap
                pl-1
              "
              style={{ fontSize: "clamp(60px, 16vw, 280px)" }}
            >
              Muhammad
            </h1>
            <h1
              className="
                font-light leading-[0.85] tracking-tighter
                text-neutral-300 dark:text-neutral-700
                uppercase whitespace-nowrap
                pl-1
              "
              style={{ fontSize: "clamp(60px, 16vw, 280px)" }}
            >
              Bagir
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ── 3. BOTTOM BAR: subtitle + CTA ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="
          relative z-20 flex flex-col sm:flex-row
          items-start sm:items-center justify-between
          gap-5 px-5 py-5
          border-t border-neutral-200 dark:border-neutral-800
        "
      >
        {/* Subtitle */}
        <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[28ch]">
          {t("subtitle")}
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="
              group flex items-center gap-2
              px-5 py-2.5
              bg-neutral-900 dark:bg-neutral-100
              text-white dark:text-neutral-900
              text-[10px] tracking-[0.2em] uppercase
              hover:bg-neutral-700 dark:hover:bg-neutral-300
              transition-colors duration-200
            "
          >
            {t("cta_projects")}
            <ArrowDown
              size={12}
              className="group-hover:translate-y-0.5 transition-transform duration-200"
            />
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="
              px-5 py-2.5
              border border-neutral-200 dark:border-neutral-800
              text-neutral-700 dark:text-neutral-300
              text-[10px] tracking-[0.2em] uppercase
              hover:border-neutral-900 hover:text-neutral-900
              dark:hover:border-neutral-100 dark:hover:text-neutral-100
              transition-colors duration-200
            "
          >
            {t("cta_contact")}
          </a>

          <a
            href={resumePath}
            download
            className="
              flex items-center gap-2
              px-5 py-2.5
              border border-neutral-200 dark:border-neutral-800
              text-neutral-700 dark:text-neutral-300
              text-[10px] tracking-[0.2em] uppercase
              hover:border-neutral-900 hover:text-neutral-900
              dark:hover:border-neutral-100 dark:hover:text-neutral-100
              transition-colors duration-200
            "
          >
            {t("cta_resume")}
            <Download size={12} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}