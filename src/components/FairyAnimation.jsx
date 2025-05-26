import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NUM_SPARKLES = 10;
const SPARKLE_INTERVAL = 250; // ms between sparkles (adjust for more/less)
const FLY_TIME = 2.8; // seconds for fairy animation

// Generate random sparkle attributes
function randomSparkleProps() {
  return {
    dx: Math.random() * 20 - 10,
    dy: Math.random() * 10 - 5,
    rotate: Math.random() * 120 - 60,
    scale: 0.7 + Math.random() * 0.8,
    duration: 0.85 + Math.random() * 0.45
  };
}

export default function FairyAnimation({ onFinish }) {
  const [sparkles, setSparkles] = useState([]);
  const audioRef = useRef();
  const flyLength = typeof window !== "undefined" ? window.innerWidth + 100 : 900;
  const fairyPath = [ -60, 120, 280, 410, 580, flyLength ];

  useEffect(() => {
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    }
    // Sparkle emission
    let sparkleIdx = 0;
    let running = true;
    function emitSparkle() {
      if (!running || sparkleIdx >= NUM_SPARKLES) return;
      const progress = sparkleIdx / NUM_SPARKLES;
      // Fairy's position along the X path at this progress
      const x =
        fairyPath[0] +
        (fairyPath[fairyPath.length - 1] - fairyPath[0]) * progress;
      setSparkles((sp) => [
        ...sp,
        { id: Math.random(), x, ...randomSparkleProps() }
      ]);
      sparkleIdx += 1;
      setTimeout(emitSparkle, SPARKLE_INTERVAL);
    }
    emitSparkle();
    return () => {
      running = false;
    };
  }, []);

  // Remove sparkles after they're done
  useEffect(() => {
    if (sparkles.length > 0) {
      const cleanup = setTimeout(() => setSparkles([]), 1800);
      return () => clearTimeout(cleanup);
    }
  }, [sparkles]);

  return (
    <>
      <motion.svg
        width={flyLength}
        height="160"
        style={{
          position: "fixed",
          left: 0,
          top: 90,
          zIndex: 9999,
          pointerEvents: "none"
        }}
      >
        {/* Sparkles */}
        {sparkles.map((sp, i) => (
          <motion.g
            key={sp.id}
            initial={{
              opacity: 0.85,
              x: sp.x,
              y: 45 + sp.dy,
              scale: sp.scale,
              rotate: sp.rotate
            }}
            animate={{
              opacity: 0,
              y: 45 + sp.dy + 35 + Math.random() * 10,
              scale: sp.scale * 1.45
            }}
            transition={{
              duration: sp.duration,
              ease: "easeOut"
            }}
          >
            {/* Star-shaped sparkle */}
            <polygon
              points="8,0 10,6 16,6.5 11.5,10.5 13,17 8,13.5 3,17 4.5,10.5 0,6.5 6,6"
              fill="#fffde7"
              opacity="0.85"
              style={{ filter: "drop-shadow(0 0 4px #fffbe7)" }}
            />
            <polygon
              points="8,3 9,7 13,7.3 10,9.5 11,13 8,11 5,13 6,9.5 3,7.3 7,7"
              fill="#b3e5fc"
              opacity="0.65"
            />
          </motion.g>
        ))}
        {/* Fairy */}
        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 1, 0] }}
          transition={{ duration: FLY_TIME + 0.5, times: [0, 0.85, 0.97, 1] }}
        >
          <motion.g
            initial={{ x: -60, y: 60 }}
            animate={{
              x: fairyPath,
              y: [60, 30, 0, 35, 20, 40]
            }}
            transition={{
              duration: FLY_TIME,
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
