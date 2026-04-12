"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Web Development",
    skills: [
      "HTML & CSS",
      "JavaScript",
      "PHP",
      "React.js",
      "Next.js",
      "Node.js & Express.js",
      "Laravel",
      "CodeIgniter 4",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    title: "Tools & Deployment",
    skills: [
      "Supabase",
      "Prisma",
      "Vercel",
      "Git & GitHub",
      "Canva",
      "Adobe Photoshop",
    ],
  },
  {
    title: "Administrasi & Data",
    skills: [
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft PowerPoint",
      "Analisis Data Dasar",
      "Python (Dasar)",
      "Kearsipan Digital (SRIKANDI)",
      "Manajemen Dokumen",
    ],
  },
  {
    title: "AI Tools",
    skills: [
      "ChatGPT",
      "Claude",
      "Gemini",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
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
            02 — Keahlian
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
            Kemampuan yang
            <br />
            <span className="text-neutral-400">saya miliki.</span>
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed">
            Kombinasi kemampuan teknis dan administratif yang saya kembangkan
            selama studi dan pengalaman kerja — siap diterapkan dalam lingkungan
            profesional.
          </p>
        </motion.div>

        {/* Skills Grid — 2 kolom atas, 2 kolom bawah */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.15 }}
            >
              <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-neutral-900 mb-8 pb-3 border-b border-neutral-200">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + catIndex * 0.15 + skillIndex * 0.06,
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0" />
                    <span className="text-sm text-neutral-600 font-light">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}