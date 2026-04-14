"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Github, X, ChevronLeft, ChevronRight, Images, KeyRound } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Tipe data untuk kredensial
interface AuthAccount {
  role: string;
  username: string;
  password: string;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("projects");

  const projects = [
    {
      title: "POS Caffeshop",
      description: t("pos_caffe.desc"),
      tags: ["React", "Node.js", "Express", "PostgreSQL"],
      category: t("cat_product"),
      year: "2026",
      image: "/images/projects/pos-caffe/pos-caffe.png",
      link: "https://bagir-pos-caffe.vercel.app",
      github: "https://github.com/bagir20/pos-caffeshop",
      gallery: null,
      // Tambahkan auth di sini
      auth: [
        { role: "Barista", username: "barista", password: "1234" },
        { role: "Manager", username: "manager", password: "5678" },
      ] as AuthAccount[],
    },
    {
      title: "Stockflow Inventory",
      description: t("stockflow.desc"),
      tags: ["React", "Node.js", "Express", "PostgreSQL"],
      category: t("cat_product"),
      year: "2026",
      image: "/images/projects/stockflow/sf-cover.png",
      link: "https://stockflow-inventory-system-psi.vercel.app/",
      github: "https://github.com/bagir20/stockflow-inventory-system",
      gallery: null,
      // Tambahkan auth di sini
      auth: [
        { role: "Admin", username: "admin@stockflow.com", password: "password123" },
      ] as AuthAccount[],
    },
    {
      title: "Sistem Bank Sampah",
      description: t("bank_sampah.desc"),
      tags: ["CodeIgniter", "PHP", "MySQL", "Bootstrap"],
      category: t("cat_si"),
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
    },
    {
      title: "Wanpicture",
      description: t("wanpicture.desc"),
      tags: ["Next.js", "TypeScript", "Tailwind", "WhatsApp API"],
      category: t("cat_product"),
      year: "2026",
      image: "/images/projects/wanpicture/wanpicture.png",
      link: "https://wanpicture.art",
      github: "https://github.com/bagir20/wanpicture",
      gallery: null,
    },
    {
      title: "Laporan Lapangan",
      description: t("laporan_lapangan.desc"),
      tags: ["Laravel", "PHP", "MySQL", "Tailwind"],
      category: t("cat_si"),
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
    },
  ];

  const categories = [t("filter_all"), t("cat_si"), t("cat_product")];

  const [activeCategory, setActiveCategory] = useState(t("filter_all"));
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State baru untuk Modal Auth
  const [authModal, setAuthModal] = useState<{
    title: string;
    link: string;
    accounts: AuthAccount[];
  } | null>(null);

  const filteredProjects =
    activeCategory === t("filter_all")
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const openGallery = (galleryImages: string[]) => {
    setSelectedGallery(galleryImages);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => setSelectedGallery(null);

  const nextImage = () => {
    if (!selectedGallery) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedGallery.length);
  };

  const prevImage = () => {
    if (!selectedGallery) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedGallery.length) % selectedGallery.length);
  };

  // Fungsi baru untuk handle klik Live Demo
  const handleLiveClick = (project: typeof projects[0]) => {
    if (project.auth) {
      setAuthModal({
        title: project.title,
        link: project.link,
        accounts: project.auth,
      });
    } else {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  // Lock scroll jika modal auth terbuka
  useEffect(() => {
    document.body.style.overflow = (selectedGallery || authModal) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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

  return (
    <section id="projects" className="py-24 md:py-32 bg-white dark:bg-neutral-950 relative" ref={ref}>
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
              {t("heading")}
              <br />
              <span className="text-neutral-400 dark:text-neutral-600">{t("heading_accent")}</span>
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-md">
              {t("description")}
            </p>
          </div>

          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-[0.1em] uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group relative border border-neutral-100 hover:border-neutral-300 dark:border-neutral-900 dark:hover:border-neutral-800 transition-colors duration-500 bg-white dark:bg-neutral-950"
            >
              <div
                className={`aspect-[1915/928] bg-neutral-50 dark:bg-neutral-800 overflow-hidden relative ${project.gallery ? "cursor-zoom-in" : ""}`}
                onClick={() => project.gallery && openGallery(project.gallery)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {project.gallery && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Images size={24} className="text-neutral-900 dark:text-neutral-100" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 dark:bg-white/0 dark:group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 tracking-wide">
                    {project.category} — {project.year}
                  </span>
                  <div className="flex gap-3 items-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={16} />
                    </a>
                    
                    {/* MODIF: Jika ada link, cek apakah punya auth atau tidak */}
                    {project.link && project.link !== "#" ? (
                      <button
                        onClick={() => handleLiveClick(project)}
                        className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        aria-label={t("aria_live")}
                      >
                        <ArrowUpRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => project.gallery && openGallery(project.gallery)}
                        className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        aria-label={t("aria_gallery")}
                      >
                        <Images size={16} />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-light text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                    {project.title}
                  </h3>
                  {/* Ikon Kecil Penanda Ada Auth */}
                  {project.auth && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-full">
                      <KeyRound size={10} className="text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[9px] font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Demo</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] tracking-[0.1em] uppercase bg-neutral-50 text-neutral-500 border border-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ========== 1. Gallery Modal (Gambar) ========== */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] aspect-video bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGallery}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2 z-50"
                aria-label={t("aria_close")}
              >
                <X size={32} />
              </button>

              <div className="relative w-full h-full bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 shadow-2xl">
                <Image
                  src={selectedGallery[currentImageIndex]}
                  alt={`Screenshot ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {selectedGallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                    {currentImageIndex + 1} / {selectedGallery.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== 2. Auth Modal (Kredensial Demo) ========== */}
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
              {/* Header */}
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

              {/* Body Credentials */}
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

              {/* Footer CTA */}
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