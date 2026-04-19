"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("skills");

  const skillCategories = [
    {
      title: "Web Development",
      layout: "default",
      skills: [
        { name: "React.js", size: "lg" },
        { name: "Next.js", size: "lg" },
        { name: "TypeScript", size: "md" },
        { name: "Node.js", size: "md" },
        { name: "Tailwind CSS", size: "md" },
        { name: "Laravel", size: "sm" },
        { name: "PHP", size: "sm" },
        { name: "MySQL", size: "sm" },
        { name: "PostgreSQL", size: "sm" },
        { name: "CodeIgniter 4", size: "sm" },
        { name: "HTML & CSS", size: "sm" },
        { name: "Express.js", size: "sm" },
      ],
    },
    {
      title: "Data Analysis",
      layout: "inverted",
      skills: [
        { name: "Python", size: "lg" },
        { name: "Power BI", size: "lg" },
        { name: "Pandas", size: "md" },
        { name: "SQL", size: "md" },
        { name: "Seaborn", size: "sm" },
        { name: "Statsmodels", size: "sm" },
      ],
    },
    {
      title: "Graphic Design",
      layout: "default",
      skills: [
        { name: "Photoshop", size: "lg" },
        { name: "Canva", size: "md" },
      ],
    },
    {
      title: "Tools & Deployment",
      layout: "inverted",
      skills: [
        { name: "Git & GitHub", size: "lg" },
        { name: "Vercel", size: "md" },
        { name: "Supabase", size: "md" },
        { name: "Prisma", size: "sm" },
        { name: "WhatsApp API", size: "sm" },
      ],
    },
    {
      title: t("cat_admin"),
      layout: "default",
      skills: [
        { name: t("skill_data_analysis"), size: "lg" },
        { name: "Microsoft Excel", size: "md" },
        { name: "Microsoft Word", size: "sm" },
        { name: "Microsoft PowerPoint", size: "sm" },
        { name: t("skill_digital_archive"), size: "sm" },
        { name: t("skill_doc_management"), size: "sm" },
      ],
    },
    {
      title: "AI Tools",
      layout: "inverted",
      skills: [
        { name: "ChatGPT", size: "lg" },
        { name: "Claude", size: "md" },
        { name: "Gemini", size: "sm" },
      ],
    },
  ];

  const getSizeClass = (size: string) => {
    switch (size) {
      case "lg": return "text-base md:text-xl font-normal";
      case "md": return "text-xs md:text-base font-light";
      case "sm": return "text-[11px] md:text-sm font-light text-neutral-400 dark:text-neutral-500";
      default: return "text-sm font-light";
    }
  };

  return (
    <section id="skills" className="py-24 md:py-32 bg-white dark:bg-neutral-950" ref={ref}>
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
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-7xl font-extralight tracking-tighter text-neutral-900 dark:text-neutral-100 mb-4 leading-[0.9]">
            {t("heading")}
            <br />
            <span className="text-neutral-300 dark:text-neutral-700">{t("heading_accent")}</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-lg text-sm md:text-base">
            {t("description")}
          </p>
        </motion.div>

        {/* Grid 2 Kolom di SEMUA UKURAN LAYAR (Mengisi ruang kosong mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-12 lg:gap-y-20">
          {skillCategories.map((category, catIndex) => {
            const splitIndex = category.skills.findIndex(s => s.name === "");
            const topSkills = splitIndex !== -1 ? category.skills.slice(0, splitIndex) : category.skills;
            const bottomSkills = splitIndex !== -1 ? category.skills.slice(splitIndex + 1) : [];

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + catIndex * 0.1 }}
                className="space-y-3 md:space-y-6"
              >
                <div className="space-y-1.5 md:space-y-2">
                  {category.layout === "default" && (
                    <h3 className="text-[7px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-600 mb-2 md:mb-4">
                      {category.title}
                    </h3>
                  )}
                  {topSkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    >
                      <span className={`${getSizeClass(skill.size)} text-neutral-800 dark:text-neutral-200 block leading-tight break-words`}>
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {category.layout === "inverted" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="py-4 md:py-6 border-t border-neutral-100 dark:border-neutral-800/50 my-2 md:my-4"
                  >
                    <h3 className="text-[7px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-600">
                      {category.title}
                    </h3>
                  </motion.div>
                )}

                {bottomSkills.length > 0 && (
                  <div className="space-y-1.5 md:space-y-2 pt-1 md:pt-2">
                    {bottomSkills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -15 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                      >
                        <span className={`${getSizeClass(skill.size)} text-neutral-800 dark:text-neutral-200 block leading-tight break-words`}>
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}