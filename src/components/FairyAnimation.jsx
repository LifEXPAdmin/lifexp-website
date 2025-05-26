import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

// Fairy with animated wings, sparkling wand, and magic dust trail!
export default function FairyAnimation({ onFinish }) {
  const audioRef = useRef();
  const [sparkles, setSparkles] = useState([]);
  const fairyX = useMotionValue(-60);
  const fairyY = useMotionValue(60);

  const flyLength = typeof window !== "undefined" ? window.innerWidth + 100 : 900;
  const DURATION = 2.6; // total fairy animation duration in seconds

  useEffect(() => {
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    }
  }, []);

  // Emit dust sparkles as the fairy moves
  useAnimationFrame((t) => {
    const progress = Math.min(t / (DURATION * 1000), 1);
    const pathX = -60 + (flyLength + 60) * progress;
    const yPath =
      60 +
      50 * Math.sin(progress * Math.PI * 1.5) -
      15 * Math.sin(progress * Math.PI * 3);
    fairyX.set(pathX);
    fairyY.set(yPath);

    // Emit a new sparkle every ~25ms (very fine dust trail)
    if (Math.random() < 0.35) {
      setSparkles((prev) => [
        ...prev,
        {
          id: Math.random() + "" + t,
          x: pathX - 8,
          y: yPath + 14,
          angle: Math.random() * 90 - 45,
          drift: Math.random() * 24 - 12,
          size: 2 + Math.random() * 2.2,
          opacity: 0.55 + Math.random() * 0.35,
          lifetime: 0,
        },
      ]);
    }
  });

  // Animate and remove old sparkles
  useEffect(() => {
    if (sparkles.length === 0) return;
    const anim = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((sp) => ({ ...sp, lifetime: sp.lifetime + 60 }))
          .filter((sp) => sp.lifetime < 680) // sparkle fade out time
      );
    }, 60);
    return () => clearInterval(anim);
  }, [sparkles.length]);

  return (
    <>
      <svg
        width={flyLength}
        height="170"
        style={{
          position: "fixed",
          left: 0,
          top: 90,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        {/* Particle fairy dust */}
        {sparkles.map((sp) => (
          <circle
            key={sp.id}
            cx={sp.x + sp.lifetime * sp.drift * 0.0028}
            cy={sp.y + sp.lifetime * 0.07 + Math.sin(sp.lifetime / 100 + sp.angle) * 2.5}
            r={sp.size * (1 - sp.lifetime / 600)}
            fill="#fffbe7"
            opacity={sp.opacity * (1 - sp.lifetime / 600)}
            style={{
              filter:
                "drop-shadow(0 0 3px #fffbe7) drop-shadow(0 0 10px #b3e5fc60)",
            }}
          />
        ))}
        {/* Fairy */}
        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 1, 0] }}
          transition={{ duration: DURATION + 0.5, times: [0, 0.85, 0.97, 1] }}
        >
          <motion.g
            style={{
              x: fairyX,
              y: fairyY,
            }}
            animate={{
              x: flyLength + 60,
              y: 40,
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              onComplete: onFinish,
            }}
          >
            {/* --- Animated Fairy SVG --- */}
            <svg width="62" height="70" viewBox="0 0 62 70" fill="none">
              {/* Animated Left wing */}
              <g>
                <ellipse id="lwing"
                  cx="18"
                  cy="34"
                  rx="18"
                  ry="29"
                  fill="url(#wingL)"
                  opacity="0.44"
                >
                  <animate attributeName="transform"
                    type="rotate"
                    values="1 18 34; -8 18 34; 1 18 34"
                    dur="0.65s" repeatCount="indefinite" />
                </ellipse>
              </g>
              {/* Animated Right wing */}
              <g>
                <ellipse id="rwing"
                  cx="44"
                  cy="32"
                  rx="18"
                  ry="29"
                  fill="url(#wingR)"
                  opacity="0.44"
                >
                  <animate attributeName="transform"
                    type="rotate"
                    values="-1 44 32; 8 44 32; -1 44 32"
                    dur="0.68s" repeatCount="indefinite" />
                </ellipse>
              </g>
              {/* Wing veins */}
              <path d="M16,34 Q29,36 44,32" stroke="#a2c4ff" strokeWidth="1.3" opacity="0.3" />
              <path d="M18,20 Q28,35 44,45" stroke="#a2c4ff" strokeWidth="1.1" opacity="0.22" />
              <path d="M18,50 Q32,42 48,44" stroke="#a2c4ff" strokeWidth="0.9" opacity="0.19" />

              {/* Dress with sparkles */}
              <ellipse
                cx="32"
                cy="48"
                rx="11"
                ry="18"
                fill="url(#dressGradient)"
              />
              <circle cx="32" cy="56" r="1.5" fill="#fffbe7" opacity="0.6" />
              <circle cx="27" cy="49" r="1" fill="#fffbe7" opacity="0.4" />
              <circle cx="35" cy="50" r="0.9" fill="#b3e5fc" opacity="0.36" />

              {/* Body */}
              <rect
                x="29"
                y="37"
                width="6"
                height="16"
                rx="3"
                fill="#ffe082"
              />
              {/* Head (with pointed fairy ears) */}
              <ellipse cx="32" cy="29" rx="6.1" ry="6.7" fill="#ffd54f" />
              <ellipse cx="25.8" cy="28.7" rx="1.3" ry="2.2" fill="#ffd54f" transform="rotate(-18 25.8 28.7)" opacity="0.6" />
              <ellipse cx="38.3" cy="28.7" rx="1.3" ry="2.2" fill="#ffd54f" transform="rotate(18 38.3 28.7)" opacity="0.6" />
              {/* Hair */}
              <ellipse cx="32" cy="27" rx="5" ry="3.4" fill="#b39ddb" />
              <ellipse cx="29.5" cy="26.7" rx="1.5" ry="0.7" fill="#9575cd" />
              <ellipse cx="34.5" cy="26.7" rx="1.5" ry="0.7" fill="#9575cd" />
              {/* Face */}
              <ellipse cx="32" cy="29.9" rx="1.5" ry="1" fill="#fffde7" opacity="0.7" />
              <ellipse cx="30.6" cy="31.2" rx="0.28" ry="0.4" fill="#916c20" />
              <ellipse cx="33.4" cy="31.2" rx="0.28" ry="0.4" fill="#916c20" />
              <ellipse cx="32" cy="32.5" rx="0.7" ry="0.25" fill="#916c20" opacity="0.7" />
              {/* Left arm */}
              <rect x="25.2" y="41" width="7" height="2" rx="1" transform="rotate(-18 25.2 41)" fill="#ffe082" />
              {/* Right arm with wand */}
              <rect x="35" y="41" width="7" height="2" rx="1" transform="rotate(18 35 41)" fill="#ffe082" />
              {/* Animated Wand */}
              <g>
                <rect x="41.7" y="42.3" width="2.2" height="12" rx="1.1" fill="#fffde7" transform="rotate(-10 41.7 42.3)" />
                {/* Pulsing sparkle star */}
                <g>
                  <circle cx="42.7" cy="41" r="2.1" fill="#fff59d">
                    <animate attributeName="r" values="2.1;2.6;1.9;2.1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.6;1" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                  {/* star lines */}
                  <line x1="42.7" y1="36.5" x2="42.7" y2="39" stroke="#fffbe7" strokeWidth="1.1" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite" />
                  </line>
                  <line x1="42.7" y1="43" x2="42.7" y2="45" stroke="#fffbe7" strokeWidth="1.1" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite" />
                  </line>
                  <line x1="40" y1="41" x2="41.9" y2="41" stroke="#fffbe7" strokeWidth="1.1" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite" />
                  </line>
                  <line x1="43.4" y1="41" x2="45.4" y2="41" stroke="#fffbe7" strokeWidth="1.1" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite" />
                  </line>
                </g>
              </g>
              {/* Legs/feet */}
              <rect x="29.5" y="59" width="2" height="9" rx="1" fill="#fdd835" transform="rotate(-10 29.5 59)" />
              <rect x="33.2" y="59" width="2" height="9" rx="1" fill="#fdd835" transform="rotate(10 33.2 59)" />
              {/* GLOWS */}
              <ellipse cx="32" cy="45" rx="13" ry="4.5" fill="url(#glowShadow)" opacity="0.19" />
              <defs>
                <radialGradient id="wingL" cx="0.5" cy="0.5" r="1" fx="0.32" fy="0.3" gradientTransform="rotate(12 .5 .5)">
                  <stop stopColor="#b2e5fa" stopOpacity="0.54" />
                  <stop offset="1" stopColor="#fff6c1" stopOpacity="0.10" />
                </radialGradient>
                <radialGradient id="wingR" cx="0.5" cy="0.5" r="1" fx="0.7" fy="0.5">
                  <stop stopColor="#e3eaff" stopOpacity="0.42" />
                  <stop offset="1" stopColor="#fff6c1" stopOpacity="0.05" />
                </radialGradient>
                <linearGradient id="dressGradient" x1="32" y1="34" x2="32" y2="66" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#e1bee7" />
                  <stop offset="1" stopColor="#fffbe7" stopOpacity="0.91" />
                </linearGradient>
                <radialGradient id="glowShadow" cx="0.5" cy="0.5" r="0.7">
                  <stop stopColor="#fffbe7" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#b3e5fc" stopOpacity="0.04" />
                </radialGradient>
              </defs>
            </svg>
          </motion.g>
        </motion.g>
      </svg>
      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
