"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import LanyardBadge from "./LanyardBadge";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
            01 — Tentang
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Lanyard Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <LanyardBadge />
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-8">
              Halo, saya
              <br />
              <span className="text-neutral-400">Muhammad Bagir.</span>
            </h2>

            <div className="space-y-4 text-neutral-500 font-light leading-relaxed">
              <p>
                Fresh graduate Sarjana Sistem Informasi dari STMIK Palangkaraya
                (2021–2025) dengan IPK 3.49. Saya memiliki ketertarikan di
                bidang pengembangan web, pengelolaan data,desain grafis, dan administrasi
                berbasis teknologi.
              </p>
              <p>
                Selama studi, saya terbiasa membangun sistem dari sisi backend
                maupun frontend, serta memahami kebutuhan operasional di
                lingkungan kerja melalui pengalaman magang di instansi
                pemerintah.
              </p>
              <p>
                Saya adalah pribadi yang adaptif dan teliti — nyaman bekerja
                baik dalam lingkungan yang dinamis maupun terstruktur, dan
                selalu siap belajar hal baru.
              </p>
            </div>

            {/* Education */}
            <div className="mt-10 pt-10 border-t border-neutral-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-start gap-6"
              >
                <span className="text-xs tracking-[0.15em] uppercase text-neutral-400 mt-1 shrink-0">
                  Pendidikan
                </span>
                <div>
                  <div className="text-neutral-900 font-light">
                    S1 Sistem Informasi
                  </div>
                  <div className="text-neutral-500 text-sm font-light mt-0.5">
                    STMIK Palangkaraya · 2021 – 2025 · IPK 3.49
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