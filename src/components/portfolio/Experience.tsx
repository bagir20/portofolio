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
      role: t("edu_degree.role"),
      company: "STMIK Palangka Raya",
      period: "2021 — 2025",
      description: t("edu_degree.desc"),
      tags: t.raw("edu_degree.tags") as string[],
    },
    {
      role: t("intern_dlh.role"),
      company: "DLH Kota Palangka Raya",
      period: "2024",
      description: t("intern_dlh.desc"),
      tags: t.raw("intern_dlh.tags") as string[],
    },
    {
      role: t("smk.role"),
      company: "SMKN-1 Pulang Pisau",
      period: "2018 — 2021",
      description: t("smk.desc"),
      tags: t.raw("smk.tags") as string[],
    },
    {
      role: t("intern_bigprint.role"),
      company: "Bigprint",
      period: "2020",
      description: t("intern_bigprint.desc"),
      tags: t.raw("intern_bigprint.tags") as string[],
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-neutral-50/50 dark:bg-neutral-900" ref={ref}>
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
          className="mb-16 max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
            {t("heading")}
            <br />
            <span className="text-neutral-400 dark:text-neutral-600">{t("heading_accent")}</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700" />
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative pl-8 md:pl-20"
              >
                <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
                  <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
                </div>

                <div className="group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h3 className="text-lg font-normal text-neutral-900 dark:text-neutral-100">
                      {exp.role}
                    </h3>
                    <span className="text-neutral-300 dark:text-neutral-600 hidden sm:inline">
                      {t("at")}
                    </span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-light">
                      {exp.company}
                    </span>
                  </div>

                  <span className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wide mb-4 block">
                    {exp.period}
                  </span>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-4 max-w-2xl">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] tracking-[0.1em] uppercase bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
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