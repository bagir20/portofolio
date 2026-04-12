"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Sarjana Komputer — Sistem Informasi",
    company: "STMIK Palangka Raya",
    period: "2021 — 2025",
    description:
      "Menempuh pendidikan strata satu dengan fokus pada pengembangan sistem informasi. Selama perkuliahan, aktif membangun berbagai proyek aplikasi web dari konsep hingga deployment — mulai dari sistem informasi instansi, platform e-commerce, hingga alat manajemen inventaris. Pengalaman ini menjadi fondasi dalam memahami keseluruhan siklus pengembangan perangkat lunak, mulai dari analisis kebutuhan, perancangan basis data, hingga pengujian dan implementasi.",
    tags: ["Sistem Informasi", "Web Development", "Database", "Software Engineering"],
  },
  {
    role: "Magang — Administrative Intern",
    company: "DLH Kota Palangka Raya",
    period: "2024",
    description:
      "Menjalani magang di Dinas Lingkungan Hidup Kota Palangka Raya, bertanggung jawab dalam pengelolaan data administratif dan pendukung operasional kantor. Pengalaman ini melatih kemampuan dalam pengelolaan dokumen, koordinasi antar bidang, serta pemahaman terhadap alur kerja instansi pemerintah — keterampilan yang mendukung dalam membangun sistem informasi yang sesuai dengan kebutuhan pengguna di lapangan.",
    tags: ["Administrasi", "Pengelolaan Data", "Instansi Pemerintah"],
  },
  {
    role: "Multimedia — Jurusan Multimedia",
    company: "SMKN-1 Pulang Pisau",
    period: "2018 — 2021",
    description:
      "Memulai perjalanan di dunia teknologi dari jurusan Multimedia di SMKN-1 Pulang Pisau. Mempelajari dasar-dasar desain grafis, produksi konten visual, dan pengolahan media digital. Pengalaman ini menjadi pintu masuk yang membentuk ketertarikan terhadap dunia kreatif dan teknologi, serta menjadi landasan dalam memahami aspek visual dalam setiap produk digital yang saya bangun.",
    tags: ["Desain Grafis", "Produksi Visual", "Media Digital"],
  },
  {
    role: "Magang — Digital Printing",
    company: "Bigprint",
    period: "2020",
    description:
      "Mendapatkan pengalaman kerja pertama di Bigprint, sebuah usaha digital printing. Terlibat langsung dalam proses produksi desain cetak, mulai dari penerimaan brief klien, penyesuaian file desain, hingga quality control hasil cetakan. Pengalaman ini mengajarkan pentingnya ketelitian, komunikasi dengan klien, dan pengerjaan tugas secara profesional dengan tenggat waktu yang ketat.",
    tags: ["Desain Cetak", "Brief Klien", "Quality Control"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-24 md:py-32 bg-neutral-50/50"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
            04 — Pengalaman
          </span>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-4">
            Perjalanan
            <br />
            <span className="text-neutral-400">pendidikan & profesional saya.</span>
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed">
            Dari SMKN hingga perguruan tinggi, berikut pengalaman yang membentuk
            kemampuan saya hari ini.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-neutral-200" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
                  <div className="w-2 h-2 bg-neutral-900 rounded-full" />
                </div>

                {/* Content */}
                <div className="group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h3 className="text-lg font-normal text-neutral-900">
                      {exp.role}
                    </h3>
                    <span className="text-neutral-300 hidden sm:inline">
                      di
                    </span>
                    <span className="text-sm text-neutral-500 font-light">
                      {exp.company}
                    </span>
                  </div>

                  <span className="text-xs text-neutral-400 tracking-wide mb-4 block">
                    {exp.period}
                  </span>

                  <p className="text-sm text-neutral-500 font-light leading-relaxed mb-4 max-w-2xl">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] tracking-[0.1em] uppercase bg-white text-neutral-500 border border-neutral-200"
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
