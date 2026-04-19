"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("experience");

  const experiences = [
    {
      year: "2025",
      role: t("edu_degree.role"),
      company: "STMIK Palangka Raya",
      description: t("edu_degree.desc"),
      tags: t.raw("edu_degree.tags") as string[],
    },
    {
      year: "2024",
      role: t("intern_dlh.role"),
      company: "DLH Kota Palangka Raya",
      description: t("intern_dlh.desc"),
      tags: t.raw("intern_dlh.tags") as string[],
    },
    {
      year: "2021",
      role: t("smk.role"),
      company: "SMKN-1 Pulang Pisau",
      description: t("smk.desc"),
      tags: t.raw("smk.tags") as string[],
    },
    {
      year: "2020",
      role: t("intern_bigprint.role"),
      company: "Bigprint",
      description: t("intern_bigprint.desc"),
      tags: t.raw("intern_bigprint.tags") as string[],
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-white dark:bg-neutral-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter text-neutral-900 dark:text-neutral-100 mb-6 leading-[0.9]">
            {t("heading")}
            <br />
            <span className="text-neutral-300 dark:text-neutral-700">{t("heading_accent")}</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-md">
            {t("description")}
          </p>
        </motion.div>

        {/* ── Timeline Layout ── */}
        <div className="relative">
          {/* Garis Vertikal Timeline */}
          <div className="absolute left-0 md:left-24 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="relative pl-10 md:pl-32 group"
              >
                {/* Titik Timeline */}
                <div className="absolute left-0 md:left-24 top-2 -translate-x-1/2 flex items-center justify-center">
                  <div className="w-3 h-3 bg-neutral-900 dark:bg-neutral-100 rounded-full border-2 border-white dark:border-neutral-950 group-hover:scale-125 transition-transform duration-300" />
                </div>

                {/* Tahun (Di dalam kolom Timeline) */}
                <div className="absolute left-0 md:left-24 top-6 -translate-x-1/2">
                  <span className="md:hidden text-[10px] font-mono font-medium tracking-wider text-neutral-400 dark:text-neutral-500">
                    {exp.year}
                  </span>
                </div>

                {/* Tahun Desktop (Muncul di samping garis) */}
                <div className="hidden md:block absolute left-0 top-0 w-20 text-right pr-6">
                  <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                    {exp.year}
                  </span>
                </div>

                {/* Konten Detail (Tipografi Berani) */}
                <div className="pb-4">
                  {/* Nama Perusahaan (Label kecil di atas) */}
                  <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500 font-medium block mb-2">
                    {exp.company}
                  </span>

                  {/* Role (Tipografi Besar/Menjulang) */}
                  <h3 className="text-2xl md:text-4xl font-extralight tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight mb-6 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {exp.role}
                  </h3>

                  {/* Deskripsi */}
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-6 max-w-xl">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 border border-neutral-100 dark:border-neutral-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}