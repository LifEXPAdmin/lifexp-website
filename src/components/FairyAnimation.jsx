import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Helper: Create glitter trail positions based on fairy's path
const trailSegments = [
  { dx: 0, dy: 0 },
  { dx: 90, dy: 15 },
  { dx: 180, dy: 40 },
  { dx: 280, dy: 0 },
  { dx: 410, dy: 35 },
  { dx: 580, dy: 20 },
  { dx: 740, dy: 30 }
];

export default function FairyAnimation({ onFinish }) {
  const audioRef = useRef();
  const flyLength = typeof window !== "undefined" ? window.innerWidth + 100 : 900;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    }
  }, []);

  return (
    <>
      <motion.svg
        width={flyLength}
        height="150"
        style={{
          position: "fixed",
          left: 0,
          top: 90,
          zIndex: 9999,
          pointerEvents: "none"
        }}
      >
        {/* Glitter Trail */}
        {trailSegments.map((seg, i) => (
          <motion.circle
            key={i}
            cx={seg.dx}
            cy={seg.dy + 25 + (i % 2 === 0 ? -10 : 10)}
            r={Math.max(1.5, 3 - i * 0.3)}
            fill={i % 2 === 0 ? "#fffde7" : "#b3e5fc"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              delay: 0.2 + i * 0.15,
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: trailSegments.length * 0.1 - i * 0.08
            }}
          />
        ))}

        {/* Fairy */}
        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.8, 0.98, 1] }}
        >
          <motion.g
            initial={{ x: -60, y: 60 }}
            animate={{
              x: [ -60, 120, 280, 410, 580, flyLength ],
              y: [ 60, 30, 0, 35, 20, 40 ]
            }}
            transition={{
              duration: 4.2,
              ease: "easeInOut",
              onComplete: onFinish
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
      </motion.svg>
      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
