import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

// For a true emitter, we’ll track the fairy’s current position:
export default function FairyAnimation({ onFinish }) {
  const audioRef = useRef();
  const [sparkles, setSparkles] = useState([]);
  const fairyX = useMotionValue(-60);
  const fairyY = useMotionValue(60);

  // Fairy flies off the right edge
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
    // t is ms since component mount
    const progress = Math.min(t / (DURATION * 1000), 1);
    const pathX = -60 + (flyLength + 60) * progress;
    // This y path matches your "bee line"
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
          x: pathX - 6,
          y: yPath + 7,
          angle: Math.random() * 90 - 45,
          drift: Math.random() * 24 - 12,
          size: 2 + Math.random() * 2.2,
          opacity: 0.55 + Math.random() * 0.35,
          lifetime: 0, // will be updated
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
          .filter((sp) => sp.lifetime < 620) // 620ms = fade out time
      );
    }, 60);
    return () => clearInterval(anim);
  }, [sparkles.length]);

  return (
    <>
      <svg
        width={flyLength}
        height="160"
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
            cx={sp.x + sp.lifetime * sp.drift * 0.0025}
            cy={sp.y + sp.lifetime * 0.06 + Math.sin(sp.lifetime / 100 + sp.angle) * 2.5}
            r={sp.size * (1 - sp.lifetime / 600)}
            fill="#fffbe7"
            opacity={sp.opacity * (1 - sp.lifetime / 600)}
            style={{
              filter:
                "drop-shadow(0 0 2px #fffbe7) drop-shadow(0 0 8px #b3e5fc60)",
            }}
          />
        ))}
        {/* Fairy */}
        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 1, 0] }}
          transition={{ duration: DURATION + 0.45, times: [0, 0.85, 0.98, 1] }}
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
            {/* Fairy SVG */}
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
              {/* Wings */}
              <ellipse cx="20" cy="32" rx="12" ry="22" fill="#c8f5e6" opacity="0.7"/>
              <ellipse cx="44" cy="32" rx="12" ry="22" fill="#b6d0ff" opacity="0.7"/>
              {/* Body */}
              <ellipse cx="32" cy="40" rx="6" ry="16" fill="#ffe082" />
              {/* Head */}
              <circle cx="32" cy="24" r="7" fill="#ffd54f" />
              {/* Wand/sparkle */}
              <rect x="30.5" y="12" width="3" height="16" rx="1.2" fill="#fffde7"/>
              <circle cx="32" cy="12" r="3" fill="#fff59d" />
            </svg>
          </motion.g>
        </motion.g>
      </svg>
      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
