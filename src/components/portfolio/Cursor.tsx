"use client";

import { useEffect, useRef, useSyncExternalStore, useState } from "react";
import { useTheme } from "next-themes";

function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth >= 1024,
    () => true
  );
}

export default function Cursor() {
  const isDesktop = useIsDesktop();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const arrowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const strokeColor = isDark ? "#e5e5e5" : "#111";
  const fillColor = isDark ? "#0a0a0a" : "#ffffff";
  
  // Warna biru khas agency
  const touchColor = isDark ? "rgba(96, 165, 250, 0.3)" : "rgba(59, 130, 246, 0.3)";

  useEffect(() => {
    if (!isDesktop) return;

    // ── PERBAIKAN 1: HAPUS KURSOR BAWAHAN DI SEMUA ELEMEN SECARA AGRESIF ──
    document.body.style.cursor = "none";
    
    // Override css global untuk memastikan jari pointing tidak pernah muncul
    const styleId = "custom-cursor-style-fix";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        *, *::before, *::after {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    const animate = () => {
      if (arrowRef.current) {
        arrowRef.current.style.left = `${mouse.current.x}px`;
        arrowRef.current.style.top = `${mouse.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // ── PERBAIKAN 2: LOGIKA DETEKSI YANG LEBIH TANGGUH ──
    // Fungsi ini akan terus naik ke elemen parent sampai menemukan tag link/button
    const getInteractiveParent = (el: HTMLElement | null): HTMLElement | null => {
      let current = el;
      while (current) {
        const tag = current.tagName;
        if (tag === "A" || tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
          return current;
        }
        current = current.parentElement;
      }
      return null;
    };

    let isCurrentlyHovering = false;

    const onOver = (e: MouseEvent) => {
      // Cek apakah elemen yang disentuh atau parent-nya adalah elemen interaktif
      const interactiveEl = getInteractiveParent(e.target as HTMLElement);
      
      if (interactiveEl) {
        // Cegah efek touch berulang kali jika masih di dalam area yang sama
        if (isCurrentlyHovering) return;
        isCurrentlyHovering = true;

        if (arrowRef.current) {
          arrowRef.current.style.transform = "translate(-30%, -10%) scale(1.2) rotate(45deg)";
        }

        // ── LOGIK EFEK TOUCH OVERLAY BIRU ──
        const blob = document.createElement("div");
        blob.style.position = "fixed";
        blob.style.width = "80px"; // Diperbesar sedikit agar lebih terasa
        blob.style.height = "80px";
        blob.style.borderRadius = "50%";
        blob.style.backgroundColor = touchColor;
        blob.style.pointerEvents = "none";
        blob.style.zIndex = "9997";
        blob.style.transform = "translate(-50%, -50%) scale(0)";
        blob.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease";
        
        // Posisikan tepat di ujung tajam segitiga
        blob.style.left = `${e.clientX + 6}px`;
        blob.style.top = `${e.clientY - 2}px`;

        document.body.appendChild(blob);

        requestAnimationFrame(() => {
          blob.style.transform = "translate(-50%, -50%) scale(1)";
          blob.style.opacity = "0";
        });

        setTimeout(() => {
          blob.remove();
        }, 600);
      }
    };

    const onOut = (e: MouseEvent) => {
      const interactiveEl = getInteractiveParent(e.target as HTMLElement);
      
      if (interactiveEl) {
        isCurrentlyHovering = false; // Reset status saat keluar dari elemen
        if (arrowRef.current) {
          arrowRef.current.style.transform = "translate(-30%, -10%) scale(1) rotate(0deg)";
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
      
      // Hapus style agresif saat komponen dimatikan (misal di mobile)
      const styleEl = document.getElementById(styleId);
      if (styleEl) styleEl.remove();
      
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isDesktop, touchColor]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={arrowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,   
          height: 20,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-30%, -10%) scale(1) rotate(0deg)",
          transition: "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
          willChange: "left, top, transform",
        }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path 
            d="M2 2L2 18L7.5 12.5L13 14.5L2 2Z" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}