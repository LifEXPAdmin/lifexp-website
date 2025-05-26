import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FairyAnimation({ onFinish }) {
  const audioRef = useRef();

  useEffect(() => {
    // Play the chime as soon as the fairy appears
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    }
  }, []);

  // Custom bee-line path (subtle S curve)
  return (
    <>
      <motion.svg
        width="820"
        height="150"
        style={{
          position: "fixed",
          left: 0,
          top: 90,
          zIndex: 9999,
          pointerEvents: "none"
        }}
      >
        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 1, 0] }}
          transition={{ duration: 3.8, times: [0, 0.6, 0.95, 1] }}
        >
          <motion.g
            initial={{ x: -60, y: 60 }}
            animate={{
              x: [ -60, 120, 240, 360, 480, 600, 750 ],
              y: [ 60, 30, 80, 10, 70, 40, 40 ]
            }}
            transition={{
              duration: 4,  // SLOWER!
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
              {/* Sparkle trails */}
              <circle cx="16" cy="46" r="1.5" fill="#e1bee7">
                <animate attributeName="r" values="1.5;2.5;1.5" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="48" cy="48" r="1.1" fill="#80deea">
                <animate attributeName="r" values="1.1;2.2;1.1" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
          </motion.g>
        </motion.g>
      </motion.svg>
      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
