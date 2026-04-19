"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanyardBadge from "./LanyardBadge";

/* ─── Pixel canvas background ─────────────────────────────────────────────── */
function PixelBackground({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bounds, setBounds] = useState({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateBounds = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionRect = containerRef.current.closest("section")?.getBoundingClientRect();
      
      if (!sectionRect) return;

      setBounds({
        left: rect.left - sectionRect.left - 40, // Tambah padding 40px
        top: rect.top - sectionRect.top - 40,
        width: rect.width + 80,
        height: rect.height + 80,
      });
    };

    // Delay sedikit untuk memastikan layout sudah benar-benar stabil
    const timeout = setTimeout(updateBounds, 100);
    
    const ro = new ResizeObserver(updateBounds);
    ro.observe(containerRef.current);

    return () => {
      clearTimeout(timeout);
      ro.disconnect();
    };
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cvs: HTMLCanvasElement = canvas;
    const c2d: CanvasRenderingContext2D = ctx;

    const CELL = 28;
    let animFrame: number = 0;
    let numbers: { col: number; row: number; val: number }[] = [];

    const isDark = () => document.documentElement.classList.contains("dark");

    function buildPixelMap(cols: number, rows: number) {
      const grid: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

      // Seeds di tengah area canvas
      const seeds = [
        { cx: Math.floor(cols * 0.5), cy: Math.floor(rows * 0.5) },
        { cx: Math.floor(cols * 0.3), cy: Math.floor(rows * 0.3) },
        { cx: Math.floor(cols * 0.7), cy: Math.floor(rows * 0.7) },
      ];

      for (const seed of seeds) {
        const stack: [number, number][] = [[seed.cx, seed.cy]];
        const visited = new Set<string>();
        const size = Math.floor(cols * rows * 0.08);

        while (stack.length && visited.size < size) {
          const idx = Math.floor(Math.random() * stack.length);
          const [c, r] = stack.splice(idx, 1)[0];
          const key = `${c},${r}`;
          if (visited.has(key)) continue;
          if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
          visited.add(key);
          grid[r][c] = true;

          const dirs = [
            [1, 0], [-1, 0], [0, 1], [0, -1],
            [1, 1], [-1, -1], [1, -1], [-1, 1],
          ];
          for (const [dc, dr] of dirs) {
            if (Math.random() < 0.65) stack.push([c + dc, r + dr]);
          }
        }
      }
      return grid;
    }

    function buildNumbers(grid: boolean[][], cols: number, rows: number) {
      const result: { col: number; row: number; val: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c]) continue;
          let count = 0;
          for (let dr = -1; dr <= 1; dr++)
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc]) count++;
            }
          if (count > 0 && Math.random() < 0.55) result.push({ col: c, row: r, val: count });
        }
      }
      return result;
    }

    function draw() {
      const W = cvs.width;
      const H = cvs.height;
      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;

      const dark = isDark();
      const filled = dark ? "#f5f5f3" : "#111111";
      const numColor = dark ? "#4a4a4a" : "#9a9a96";
      const borderColor = dark ? "#1e1e1e" : "#d0d0cc";

      c2d.clearRect(0, 0, W, H);

      const grid = buildPixelMap(cols, rows);
      numbers = buildNumbers(grid, cols, rows);

      // 1. Gambar grid garis tipis di SELURUH section
      c2d.strokeStyle = borderColor;
      c2d.lineWidth = 0.3;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          c2d.strokeRect(c * CELL + 0.15, r * CELL + 0.15, CELL - 0.3, CELL - 0.3);
        }
      }

      // 2. Gambar angka di SELURUH section
      c2d.font = `10px monospace`;
      c2d.textAlign = "center";
      c2d.textBaseline = "middle";
      c2d.fillStyle = numColor;
      for (const { col, row, val } of numbers) {
        c2d.fillText(String(val), col * CELL + CELL / 2, row * CELL + CELL / 2);
      }

      // 3. HARD CLIPPING: Gunakan posisi real dari elemen Lanyard sebagai tembok absolut
      if (bounds.width > 0 && bounds.height > 0) {
        c2d.save();
        c2d.beginPath();
        // Menggambar kotak berdasarkan posisi aktual Lanyard di layar
        c2d.rect(bounds.left, bounds.top, bounds.width, bounds.height);
        c2d.clip();

        // 4. Gambar kotak pixel solid HANYA di dalam kotak Lanyard
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (!grid[r][c]) continue;
            c2d.fillStyle = filled;
            c2d.fillRect(c * CELL, r * CELL, CELL, CELL);
          }
        }
        c2d.restore(); // Keluar dari tembok clip
      }
    }

    function resize() {
      const parent = cvs.parentElement;
      if (!parent) return;
      cvs.width = parent.offsetWidth;
      cvs.height = parent.offsetHeight;
      draw();
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(cvs.parentElement ?? cvs);

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
      observer.disconnect();
    };
  }, [bounds]); // Render ulang canvas jika posisi Lanyard berubah (saat resize)

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />
  );
}

/* ─── About section ────────────────────────────────────────────────────────── */
export default function About() {
  const ref = useRef(null);
  const lanyardRef = useRef<HTMLDivElement>(null); // Ref untuk memantau posisi Lanyard
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-white dark:bg-neutral-950 overflow-hidden"
      ref={ref}
    >
      <PixelBackground containerRef={lanyardRef} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
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
            ref={lanyardRef} // Tempelkan ref di sini
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
                  <div className="text-neutral-900 dark:text-neutral-100 font-light">{t("edu_degree")}</div>
                  <div className="text-neutral-500 dark:text-neutral-400 text-sm font-light mt-0.5">{t("edu_detail")}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}