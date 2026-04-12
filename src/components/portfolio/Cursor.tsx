"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

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
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);

  useEffect(() => {
    if (!isDesktop) return;

    document.body.style.cursor = "none";

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const isInteractive = (el: HTMLElement) =>
      el.tagName === "A" ||
      el.tagName === "BUTTON" ||
      el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      !!el.closest("a") ||
      !!el.closest("button");

    const onOver = (e: MouseEvent) => {
      if (!isInteractive(e.target as HTMLElement)) return;
      isHovering.current = true;
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(0)";
      if (ringRef.current) {
        ringRef.current.style.width = "52px";
        ringRef.current.style.height = "52px";
        ringRef.current.style.opacity = "0.6";
        ringRef.current.style.background = "rgba(17,17,17,0.05)";
      }
    };

    const onOut = (e: MouseEvent) => {
      if (!isInteractive(e.target as HTMLElement)) return;
      isHovering.current = false;
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.opacity = "0.35";
        ringRef.current.style.background = "transparent";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          background: "#111",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s ease, opacity 0.2s ease",
          willChange: "left, top",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: "1.5px solid #111",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          opacity: 0.35,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease, background 0.25s ease",
          willChange: "left, top",
        }}
      />
    </>
  );
}