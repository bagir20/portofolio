"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { ArrowUpRight, Github, X, ChevronLeft, ChevronRight, Images, KeyRound, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface AuthAccount {
  role: string;
  username: string;
  password: string;
}

interface GalleryCaption {
  title: string;
  desc: string;
  step: string;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("projects");

  const projects = [
    {
      title: "Wanpicture",
      description: t("wanpicture.desc"),
      tags: ["Next.js", "TypeScript", "Tailwind", "WhatsApp API"],
      category: t("cat_web_app"),
      year: "2026",
      image: "/images/projects/wanpicture/wanpicture.png",
      link: "https://wanpicture.art",
      github: "https://github.com/bagir20/wanpicture",
      gallery: null,
      galleryInfo: null,
      isPublished: true,
    },
    {
      title: "POS Caffeshop",
      description: t("pos_caffe.desc"),
      tags: ["React", "Node.js", "Express", "PostgreSQL"],
      category: t("cat_web_app"),
      year: "2026",
      image: "/images/projects/pos-caffe/pos-caffe.png",
      link: "https://bagir-pos-caffe.vercel.app",
      github: "https://github.com/bagir20/pos-caffeshop",
      gallery: null,
      galleryInfo: null,
      auth: [
        { role: "Barista", username: "barista", password: "1234" },
        { role: "Manager", username: "manager", password: "5678" },
      ] as AuthAccount[],
    },
    {
      title: "Stockflow Inventory",
      description: t("stockflow.desc"),
      tags: ["React", "Node.js", "Express", "PostgreSQL"],
      category: t("cat_web_app"),
      year: "2026",
      image: "/images/projects/stockflow/sf-cover.png",
      link: "https://stockflow-inventory-system-psi.vercel.app/",
      github: "https://github.com/bagir20/stockflow-inventory-system",
      gallery: null,
      galleryInfo: null,
      auth: [
        { role: "Admin", username: "admin@stockflow.com", password: "password123" },
      ] as AuthAccount[],
    },
    {
      title: "Sistem Bank Sampah",
      description: t("bank_sampah.desc"),
      tags: ["CodeIgniter", "PHP", "MySQL", "Bootstrap"],
      category: t("cat_web_app"),
      year: "2025",
      image: "/images/projects/bank-sampah/project1.png",
      link: "#",
      github: "https://github.com/bagir20/bank-sampah",
      gallery: [
        "/images/projects/bank-sampah/project1.png",
        "/images/projects/bank-sampah/project1ss2.png",
        "/images/projects/bank-sampah/project1ss3.png",
        "/images/projects/bank-sampah/project1ss4.png",
        "/images/projects/bank-sampah/project1ss5.png",
      ],
      galleryInfo: null,
    },
    {
      title: "Laporan Lapangan",
      description: t("laporan_lapangan.desc"),
      tags: ["Laravel", "PHP", "MySQL", "Tailwind"],
      category: t("cat_web_app"),
      year: "2026",
      image: "/images/projects/laporan-lapangan/petugas1.png",
      link: "#",
      github: "https://github.com/bagir20/laporan-lapangan",
      gallery: [
        "/images/projects/laporan-lapangan/petugas1.png",
        "/images/projects/laporan-lapangan/laporan.png",
        "/images/projects/laporan-lapangan/adminpanel.png",
        "/images/projects/laporan-lapangan/laporanadmin.png",
        "/images/projects/laporan-lapangan/detaillaporan.png",
      ],
      galleryInfo: null,
    },
    {
      title: "Retail Sales Analysis",
      description: t("retail_analysis.desc"),
      tags: ["Python", "Pandas", "Seaborn", "SQL", "Power BI", "Statsmodels"],
      category: t("cat_data_analyst"),
      year: "2025",
      image: "/images/projects/data-analysis/powerbi-dashboard.png",
      link: "#",
      github: "https://github.com/bagir20/data-analyst-portfolio/tree/main/01_superstore",
      gallery: [
        "/images/projects/data-analysis/eda-category-sales.png",
        "/images/projects/data-analysis/eda-yearly-trend.png",
        "/images/projects/data-analysis/rfm-segmentation.png",
        "/images/projects/data-analysis/demand-forecast.png",
        "/images/projects/data-analysis/sql-top-products.png",
        "/images/projects/data-analysis/powerbi-dashboard.png",
      ],
      galleryInfo: [
        { title: t("retail_analysis.slide1_title"), desc: t("retail_analysis.slide1_desc"), step: t("retail_analysis.slide1_step") },
        { title: t("retail_analysis.slide2_title"), desc: t("retail_analysis.slide2_desc"), step: t("retail_analysis.slide2_step") },
        { title: t("retail_analysis.slide3_title"), desc: t("retail_analysis.slide3_desc"), step: t("retail_analysis.slide3_step") },
        { title: t("retail_analysis.slide4_title"), desc: t("retail_analysis.slide4_desc"), step: t("retail_analysis.slide4_step") },
        { title: t("retail_analysis.slide5_title"), desc: t("retail_analysis.slide5_desc"), step: t("retail_analysis.slide5_step") },
        { title: t("retail_analysis.slide6_title"), desc: t("retail_analysis.slide6_desc"), step: t("retail_analysis.slide6_step") },
      ] as GalleryCaption[],
    },
    {
      title: "Food Estate Analysis",
      description: t("food_estate.desc"),
      tags: ["MySQL", "Python", "Pandas", "Power BI"],
      category: t("cat_data_analyst"),
      year: "2025",
      image: "/images/projects/food-estate/food-estate-dashboard.jpg",
      link: "#",
      github: "https://github.com/bagir20/data-analyst-portfolio/tree/main/02_food_estate",
      gallery: [
        "/images/projects/food-estate/food-estate-dashboard.jpg",
        "/images/projects/food-estate/scatter-plot.png",
        "/images/projects/food-estate/line-chart.png",
        "/images/projects/food-estate/sql-query.png",
        "/images/projects/food-estate/pandas-dataframe.png",
      ],
      galleryInfo: [
        { title: t("food_estate.slide1_title"), desc: t("food_estate.slide1_desc"), step: t("food_estate.slide1_step") },
        { title: t("food_estate.slide2_title"), desc: t("food_estate.slide2_desc"), step: t("food_estate.slide2_step") },
        { title: t("food_estate.slide3_title"), desc: t("food_estate.slide3_desc"), step: t("food_estate.slide3_step") },
        { title: t("food_estate.slide4_title"), desc: t("food_estate.slide4_desc"), step: t("food_estate.slide4_step") },
        { title: t("food_estate.slide5_title"), desc: t("food_estate.slide5_desc"), step: t("food_estate.slide5_step") },
      ] as GalleryCaption[],
    },
    {
      title: "Violed Poster",
      description: "",
      tags: ["Photoshop"],
      category: t("cat_graphic_design"),
      year: "2025",
      image: "/images/projects/photshop/violed/poster.png",
      link: "#",
      github: "",
      gallery: ["/images/projects/photshop/violed/poster.png"],
      galleryInfo: null,
    },
    {
      title: "Idul Adha",
      description: "",
      tags: ["Photoshop"],
      category: t("cat_graphic_design"),
      year: "2025",
      image: "/images/projects/photshop/idul-adha/poster.png",
      link: "#",
      github: "",
      gallery: [
        "/images/projects/photshop/idul-adha/poster.png",
        "/images/projects/photshop/idul-adha/rawadha.png",
      ],
      galleryInfo: null,
    },
    {
  title: "Produktif 2AM",
  description: "",
  tags: ["Canva", "Social Media", "Health & Lifestyle"],
  category: t("cat_graphic_design"),
  year: "2025",
  image: "/images/projects/canva/produktif2AM/cover.png",
  link: "#",
  github: "",
  gallery: [
    "/images/projects/canva/produktif2AM/cover.png",
    "/images/projects/canva/produktif2AM/1.png",
    "/images/projects/canva/produktif2AM/2.png",
    "/images/projects/canva/produktif2AM/3.png",
    "/images/projects/canva/produktif2AM/4.png",
  ],
  galleryInfo: null,
},
  ];

  const categories = useMemo(
    () => [t("cat_web_app"), t("cat_data_analyst"), t("cat_graphic_design")],
    [t]
  );

  const categoryGroups = useMemo(
    () =>
      categories.map((cat) => ({
        key: cat,
        projects: projects.filter((p) => p.category === cat),
      })),
    [categories, projects]
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedGallery, setSelectedGallery] = useState<{
    images: string[];
    captions: GalleryCaption[] | null;
    isPoster?: boolean;
  } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [authModal, setAuthModal] = useState<{
    title: string;
    link: string;
    accounts: AuthAccount[];
  } | null>(null);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cat = entry.target.getAttribute("data-category");
            if (cat) setActiveCategory(cat);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    categories.forEach((cat) => {
      const el = sectionRefs.current[cat];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  const scrollToSection = useCallback((key: string) => {
    setActiveCategory(key);
    const el = sectionRefs.current[key];
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const scrollCategory = useCallback((key: string, direction: "left" | "right") => {
    const el = scrollRefs.current[key];
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -400 : 400, behavior: "smooth" });
  }, []);

  const openGallery = (galleryImages: string[], galleryCaptions: GalleryCaption[] | null = null, isPoster = false) => {
    setSelectedGallery({ images: galleryImages, captions: galleryCaptions, isPoster });
    setCurrentImageIndex(0);
  };

  const closeGallery = () => setSelectedGallery(null);

  const nextImage = () => {
    if (!selectedGallery) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedGallery.images.length);
  };

  const prevImage = () => {
    if (!selectedGallery) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedGallery.images.length) % selectedGallery.images.length);
  };

  const handleLiveClick = (project: (typeof projects)[0]) => {
    if (project.auth) {
      setAuthModal({ title: project.title, link: project.link, accounts: project.auth });
    } else {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    document.body.style.overflow = selectedGallery || authModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedGallery, authModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeGallery();
        setAuthModal(null);
      }
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGallery]);

  const currentCaption = selectedGallery?.captions?.[currentImageIndex] ?? null;

  return (
    <section id="projects" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900 relative" ref={ref}>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
            {t("label")}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <h2 className="text-6xl md:text-8xl font-light uppercase tracking-tighter text-neutral-900 dark:text-neutral-100 leading-[0.85]">
            {t("heading")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToSection(cat)}
                className={`px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:border-neutral-100 dark:text-neutral-900"
                    : "bg-transparent text-neutral-500 border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Horizontal Scroll per Kategori ── */}
        <div className="space-y-20 md:space-y-28">
          {categoryGroups.map((group, groupIdx) => {
            const isGraphicDesign = group.key === t("cat_graphic_design");

            return (
              <motion.div
                key={group.key}
                ref={(el) => { sectionRefs.current[group.key] = el; }}
                data-category={group.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: groupIdx * 0.15 }}
              >
                {/* Kategori Label + Arrow */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-900 dark:text-neutral-100">
                      {group.key}
                    </span>
                    <span className="w-8 h-px bg-neutral-300 dark:bg-neutral-700" />
                    <span className="text-[10px] font-medium tracking-wider text-neutral-400 dark:text-neutral-500">
                      {group.projects.length} {group.projects.length === 1 ? "project" : "projects"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollCategory(group.key, "left")}
                      className="p-2.5 border border-neutral-200 dark:border-neutral-700 rounded-full text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 dark:hover:text-neutral-100 dark:hover:border-neutral-100 transition-all duration-300"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => scrollCategory(group.key, "right")}
                      className="p-2.5 border border-neutral-200 dark:border-neutral-700 rounded-full text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 dark:hover:text-neutral-100 dark:hover:border-neutral-100 transition-all duration-300"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Scroll Container */}
                <div
                  ref={(el) => { scrollRefs.current[group.key] = el; }}
                  className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
                >
                  {group.projects.map((project) => (
                    <div
                      key={project.title}
                      className={`flex-none snap-start group ${
                        isGraphicDesign ? "w-[280px] md:w-[320px]" : "w-[380px] md:w-[480px]"
                      }`}
                    >
{/* ── Card Image ── */}
<div
  className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer ${
    isGraphicDesign ? "" : "aspect-[1915/928]"
  }`}
  onClick={() => {
    if (project.gallery) openGallery(project.gallery, project.galleryInfo ?? null, isGraphicDesign);
    else if (project.link && project.link !== "#") handleLiveClick(project);
  }}
>
  {isGraphicDesign ? (
    <Image
      src={project.image}
      alt={project.title}
      width={0}
      height={0}
      sizes="(max-width: 768px) 280px, 320px"
      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
    />
  ) : (
    <Image
      src={project.image}
      alt={project.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      sizes="(max-width: 768px) 380px, 480px"
    />
  )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                        {project.gallery && (
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <div className="bg-black/60 backdrop-blur-sm p-2 rounded-full border border-white/10">
                              <Images size={14} className="text-white" />
                            </div>
                          </div>
                        )}

                        <div className="absolute top-3 left-3 z-20">
                          {project.isPublished ? (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full">
                              <Globe size={10} className="text-white" />
                              <span className="text-[8px] font-bold tracking-wider uppercase text-white">Live</span>
                            </div>
                          ) : project.auth ? (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full">
                              <KeyRound size={10} className="text-white" />
                              <span className="text-[8px] font-bold tracking-wider uppercase text-white">Demo</span>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {/* ── Card Info ── */}
                      <div className="mt-4 px-0.5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-medium tracking-[0.15em] text-neutral-400 dark:text-neutral-500">
                            {project.year}
                          </span>
                        </div>

                        <h3
                          className={`font-extralight tracking-tighter text-neutral-900 dark:text-neutral-100 leading-[0.95] mb-2 ${
                            isGraphicDesign ? "text-xl md:text-2xl" : "text-xl md:text-3xl"
                          }`}
                        >
                          {project.title}
                        </h3>

                        {project.description && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-3 line-clamp-2">
                            {project.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
                              aria-label="GitHub"
                            >
                              <Github size={15} />
                            </a>
                          )}
                          {project.link && project.link !== "#" ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLiveClick(project);
                              }}
                              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 flex items-center gap-1.5"
                            >
                              <ArrowUpRight size={15} />
                              <span className="text-[9px] font-medium tracking-[0.15em] uppercase">Live</span>
                            </button>
                          ) : project.gallery ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openGallery(project.gallery!, project.galleryInfo ?? null, isGraphicDesign);
                              }}
                              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 flex items-center gap-1.5"
                            >
                              <Images size={15} />
                              <span className="text-[9px] font-medium tracking-[0.15em] uppercase">View</span>
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex-none w-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========== Gallery Modal ========== */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full bg-transparent ${
                currentCaption
                  ? "max-w-5xl h-[85vh] flex flex-col"
                  : selectedGallery.isPoster
                    ? "max-w-3xl h-[85vh] aspect-[3/4]"
                    : "max-w-5xl max-h-[90vh] aspect-video"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGallery}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2 z-50"
                aria-label={t("aria_close")}
              >
                <X size={32} />
              </button>

              <div
                className={`relative w-full bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 shadow-2xl ${
                  currentCaption ? "flex-1 min-h-0" : "h-full"
                }`}
              >
                <Image
                  src={selectedGallery.images[currentImageIndex]}
                  alt={currentCaption?.title ?? `Screenshot ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {currentCaption && (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="mt-3 px-2 pb-1"
                >
                  <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-lg border border-neutral-200 dark:border-neutral-800 px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                        {currentCaption.step}
                      </span>
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                        {currentImageIndex + 1} / {selectedGallery.images.length}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1.5 leading-snug">
                      {currentCaption.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                      {currentCaption.desc}
                    </p>
                  </div>
                </motion.div>
              )}

              {selectedGallery?.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/60 hover:bg-neutral-900/80 text-white rounded-full backdrop-blur-md border border-white/20 hover:border-white/40 transition-all shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/60 hover:bg-neutral-900/80 text-white rounded-full backdrop-blur-md border border-white/20 hover:border-white/40 transition-all shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {!currentCaption && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                      {currentImageIndex + 1} / {selectedGallery.images.length}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== Auth Modal ========== */}
      <AnimatePresence>
        {authModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setAuthModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                    <KeyRound size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-normal text-neutral-900 dark:text-neutral-100">
                      {t("auth_title")}
                    </h3>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      {authModal.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAuthModal(null)}
                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors p-1"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 pt-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light mb-5">
                  {t("auth_desc")}
                </p>

                <div className="space-y-3">
                  {authModal.accounts.map((acc, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        idx === 0
                          ? "border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50"
                          : "border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                      }`}
                    >
                      <div className="text-xs font-medium text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-3">
                        {acc.role}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400 dark:text-neutral-500 text-xs">{t("auth_username")}</span>
                          <code className="font-mono text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                            {acc.username}
                          </code>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400 dark:text-neutral-500 text-xs">{t("auth_password")}</span>
                          <code className="font-mono text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                            {acc.password}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-2">
                <a
                  href={authModal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setAuthModal(null)}
                  className="block w-full text-center px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-colors duration-300 rounded"
                >
                  {t("auth_btn")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}