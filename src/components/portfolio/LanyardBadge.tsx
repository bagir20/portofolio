"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// ─── Spring Physics Helpers ────────────────────────────────────────────────────

interface SpringState {
  current: number;
  velocity: number;
}

function createSpring(initial = 0): SpringState {
  return { current: initial, velocity: 0 };
}

function updateSpring(
  spring: SpringState,
  target: number,
  stiffness: number,
  damping: number
): SpringState {
  const force = (target - spring.current) * stiffness;
  spring.velocity += force;
  spring.velocity *= damping;
  spring.current += spring.velocity;
  return spring;
}

// ─── Static QR-style decoration (no re-render flicker) ──────────────────────────

const QR_DOTS = [
  [0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2],
  [0,4],[0,5],[0,6],[1,4],[1,6],[2,4],[2,5],[2,6],
  [4,0],[4,1],[4,2],[5,0],[5,2],[6,0],[6,1],[6,2],
  [4,4],[5,5],[6,6],
];

function QrDecoration() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 4px)",
      gap: "2px",
      opacity: 0.25,
    }}>
      {Array.from({ length: 49 }, (_, i) => {
        const row = Math.floor(i / 7);
        const col = i % 7;
        const isFilled = QR_DOTS.some(([r, c]) => r === row && c === col);
        return (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              backgroundColor: isFilled ? "rgba(255,255,255,0.9)" : "transparent",
              borderRadius: 0.5,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LanyardBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Physics springs for lanyard swing (rotation Z) and card tilt (X/Y)
  const swingSpring = useRef<SpringState>(createSpring(0));
  const tiltXSpring = useRef<SpringState>(createSpring(0));
  const tiltYSpring = useRef<SpringState>(createSpring(0));
  const mousePos = useRef({ x: 0, y: 0, active: false });
  const animFrameRef = useRef<number>(0);

  // Applied values (updated each frame for smoothness)
  const [swingRotation, setSwingRotation] = useState(0);
  const [cardTiltX, setCardTiltX] = useState(0);
  const [cardTiltY, setCardTiltY] = useState(0);

  // ─── Mouse tracking ──────────────────────────────────────────────────────

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mousePos.current = {
      x: e.clientX - centerX,
      y: e.clientY - centerY,
      active: true,
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current.active = false;
    setIsHovered(false);
  }, []);

  // ─── Animation loop ──────────────────────────────────────────────────────

  useEffect(() => {
    const STIFFNESS = 0.04;
    const DAMPING = 0.88;
    const MAX_SWING = 18;
    const MAX_TILT = 10;

    const animate = () => {
      const { x, y, active } = mousePos.current;

      if (active) {
        const swingTarget = Math.max(-MAX_SWING, Math.min(MAX_SWING, (x / 400) * MAX_SWING));
        const tiltYTarget = Math.max(-MAX_TILT, Math.min(MAX_TILT, (x / 300) * MAX_TILT));
        const tiltXTarget = Math.max(-MAX_TILT, Math.min(MAX_TILT, (-y / 300) * MAX_TILT));

        swingSpring.current = updateSpring(swingSpring.current, swingTarget, STIFFNESS, DAMPING);
        tiltXSpring.current = updateSpring(tiltXSpring.current, tiltXTarget, STIFFNESS * 1.2, DAMPING);
        tiltYSpring.current = updateSpring(tiltYSpring.current, tiltYTarget, STIFFNESS * 1.2, DAMPING);
      } else {
        swingSpring.current = updateSpring(swingSpring.current, 0, STIFFNESS * 0.6, DAMPING);
        tiltXSpring.current = updateSpring(tiltXSpring.current, 0, STIFFNESS * 0.6, DAMPING);
        tiltYSpring.current = updateSpring(tiltYSpring.current, 0, STIFFNESS * 0.6, DAMPING);
      }

      setSwingRotation(swingSpring.current.current);
      setCardTiltX(tiltXSpring.current.current);
      setCardTiltY(tiltYSpring.current.current);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ─── Click handler ───────────────────────────────────────────────────────

  const handleCardClick = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // ─── Styles ──────────────────────────────────────────────────────────────

  const cardFace: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: 260,
    height: 440,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "#fafafa",
    // Hanya shadow yang di-adjust berdasarkan tema background website
    boxShadow: isHovered
      ? isDark
        ? "0 25px 60px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)"
        : "0 25px 60px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)"
      : isDark
        ? "0 15px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)"
        : "0 15px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.4s ease",
    transformStyle: "preserve-3d",
  };

  const holographicBg: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(135deg, #fafafa 0%, #e8e8e8 25%, #f0f0f0 50%, #dcdcdc 75%, #f5f5f5 100%)",
    backgroundSize: "400% 400%",
    animation: "holographic-shift 4s ease-in-out infinite",
  };

  const holographicOverlay: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
    backgroundSize: "200% 200%",
    animation: "shimmer 3s ease-in-out infinite",
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        perspective: 1200,
      }}
    >
      {/* ── Anchor Point ─────────────────────────────────────────────── */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#202760", // Warna biru utama
          boxShadow: "0 2px 8px rgba(59, 130, 246, 0.5), 0 0 12px rgba(59, 130, 246, 0.2)", // Shadow biru yang menyala
          position: "relative",
          zIndex: 10,
        }}
      />

      {/* ── Swinging Group (rope + clip + card) ──────────────────────── */}
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transformOrigin: "top center",
          transform: `rotate(${swingRotation}deg)`,
          willChange: "transform",
        }}
      >
        {/* ── Rope ──────────────────────────────────────────────────── */}
        <div
          style={{
            width: 2,
            height: 55,
            background: "linear-gradient(to bottom, #333, #555, #333)",
            borderRadius: 1,
            transform: `skewX(${swingRotation * 0.1}deg)`,
            transition: "transform 0.1s linear",
          }}
        />

        {/* ── Metallic Clip ─────────────────────────────────────────── */}
        <div
          style={{
            width: 24,
            height: 16,
            background: "linear-gradient(180deg, #bbb 0%, #888 40%, #999 60%, #777 100%)",
            borderRadius: "0 0 3px 3px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
            position: "relative",
          }}
        >
          {/* Clip ring */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: "50%",
              transform: "translateX(-50%)",
              width: 14,
              height: 8,
              borderTop: "2px solid #999",
              borderLeft: "2px solid #999",
              borderRight: "2px solid #999",
              borderRadius: "7px 7px 0 0",
            }}
          />
        </div>

        {/* ── 3D Card Container ─────────────────────────────────────── */}
        <div
          onClick={handleCardClick}
          style={{
            marginTop: 4,
            perspective: 1000,
          }}
        >
          <motion.div
            animate={{
              rotateY: isFlipped ? 180 : 0,
              rotateX: cardTiltX,
            }}
            transition={{
              rotateY: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
              rotateX: { type: "tween", duration: 0 },
            }}
            style={{
              transformStyle: "preserve-3d",
              position: "relative",
              width: 260,
              height: 440,
            }}
          >
            {/* ── FRONT FACE ─────────────────────────────────────── */}
            <div style={cardFace}>
              {/* Top Bar */}
              <div
                style={{
                  height: 32,
                  backgroundColor: "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 14px",
                }}
              >
                <span
                  style={{
                    fontSize: 7,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                  }}
                >
                  Personal Portfolio
                </span>
                <span
                  style={{
                    fontSize: 7,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 400,
                  }}
                >
                  Est. 2025
                </span>
              </div>

              {/* Photo Section */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 210,
                  overflow: "hidden",
                  backgroundColor: "#eee",
                }}
              >
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(100%)",
                    transition: "filter 0.7s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.filter = "grayscale(0%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.filter = "grayscale(100%)";
                  }}
                />
                {/* Name Badge Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4), transparent)",
                    padding: "20px 14px 12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#fff",
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                    }}
                  >
                    M. Bagir
                  </div>
                  <div
                    style={{
                      fontSize: 8,
                      color: "rgba(255,255,255,0.6)",
                      marginTop: 3,
                      letterSpacing: "0.04em",
                      fontWeight: 300,
                    }}
                  >
                    Sistem Informasi ↗
                  </div>
                </div>
              </div>

              {/* Accent Band */}
              <div
                style={{
                  height: 52,
                  backgroundColor: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 14px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        opacity: 0.4,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 7,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.45)",
                        fontWeight: 500,
                      }}
                    >
                      SI Graduate
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#fff",
                      fontWeight: 300,
                      marginTop: 2,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Muhammad Bagir
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: "rgba(255,255,255,0.15)",
                    fontWeight: 300,
                    lineHeight: 1,
                    fontFamily: "monospace",
                  }}
                >
                  MB
                </div>
              </div>

              {/* Footer Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 76,
                  backgroundColor: "#111",
                  padding: "10px 14px 12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* QR Pattern (Dikembalikan ke warna putih asli) */}
                <QrDecoration />
                {/* Subtitle + ID */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontSize: 6.5,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.03em",
                      fontWeight: 400,
                    }}
                  >
                    Lulusan Sistem Informasi · 2025
                  </span>
                  <span
                    style={{
                      fontSize: 6.5,
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.08em",
                      fontWeight: 500,
                      fontFamily: "monospace",
                    }}
                  >
                    ID: MB-SI-25
                  </span>
                </div>
              </div>
            </div>

            {/* ── BACK FACE ────────────────────────────────────────── */}
            <div
              style={{
                ...cardFace,
                transform: "rotateY(180deg)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* Holographic gradient background */}
              <div style={holographicBg} />
              <div style={holographicOverlay} />

              {/* Content overlay */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: 30,
                }}
              >
                {/* Decorative circles */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.25)",
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  Verified
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(0,0,0,0.12)",
                    fontWeight: 300,
                    letterSpacing: "0.04em",
                  }}
                >
                  Digital Identity Card
                </div>

                {/* Thin divider */}
                <div
                  style={{
                    width: 40,
                    height: 1,
                    backgroundColor: "rgba(0,0,0,0.08)",
                    margin: "16px 0",
                  }}
                />

                <div
                  style={{
                    fontSize: 7,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.15)",
                    fontWeight: 400,
                  }}
                >
                  © 2025 Portfolio
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Flip hint (Hanya teks ini yang berubah warna) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            style={{
              marginTop: 24,
              fontSize: 8,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
              fontWeight: 400,
            }}
          >
            Click to flip
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}