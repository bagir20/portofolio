"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import LanyardBadge from "./LanyardBadge";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("about");

  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-neutral-950" ref={ref}>
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

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <LanyardBadge />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-8">
              {t("greeting")}
              <br />
              <span className="text-neutral-400 dark:text-neutral-600">Muhammad Bagir.</span>
            </h2>

            <div className="space-y-4 text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>

            <div className="mt-10 pt-10 border-t border-neutral-100 dark:border-neutral-800">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-start gap-6"
              >
                <span className="text-xs tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500 mt-1 shrink-0">
                  {t("edu_label")}
                </span>
                <div>
                  <div className="text-neutral-900 dark:text-neutral-100 font-light">
                    {t("edu_degree")}
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400 text-sm font-light mt-0.5">
                    {t("edu_detail")}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}