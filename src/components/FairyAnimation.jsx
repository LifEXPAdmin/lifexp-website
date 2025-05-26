import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// Optionally import a sound effect MP3/WAV file into your project, e.g. /public/fairy-chime.mp3

export default function FairyAnimation({ onFinish }) {
  const controls = useAnimation();
  const audioRef = useRef();

  useEffect(() => {
    controls.start({
      left: "100vw",
      rotate: [0, 360, 0],
      opacity: [1, 1, 0],
      transition: {
        left: { duration: 1.7, ease: "easeInOut" },
        rotate: { duration: 1.2, repeat: 2 },
        opacity: { delay: 1.3, duration: 0.35 },
      },
    });
    // Play sound if available
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [controls]);

  return (
    <>
      <motion.div
        initial={{ left: -100, top: 90, rotate: 0, opacity: 0 }}
        animate={controls}
        style={{
          position: "fixed",
          top: 90,
          zIndex: 9999,
          pointerEvents: "none",
        }}
        onAnimationComplete={onFinish}
      >
        {/* --- Custom Fairy SVG: colorful, sparkly, animated --- */}
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
          {/* Sparkle trails */}
          <circle cx="16" cy="46" r="1.5" fill="#e1bee7">
            <animate attributeName="r" values="1.5;2.5;1.5" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="48" cy="48" r="1.1" fill="#80deea">
            <animate attributeName="r" values="1.1;2.2;1.1" dur="1s" repeatCount="indefinite" />
          </circle>
        </svg>
      </motion.div>
      {/* --- Fairy Chime --- */}
      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
