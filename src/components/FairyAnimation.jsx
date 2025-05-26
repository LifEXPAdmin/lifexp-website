import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FairyAnimation({ onFinish }) {
  const audioRef = useRef();

  useEffect(() => {
    // Play chime as soon as fairy appears
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    }
  }, []);

  // Magic S-curve path: left to right with little swoops!
  const path = [
    "M -60 60 Q 120 40, 240 90 Q 360 20, 480 60 Q 600 90, 750 40"
  ];

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
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* The visible path for debugging — remove/comment out in prod */}
          {/* <path d={path[0]} stroke="#ece9fc" strokeWidth={2} fill="none" /> */}
        </motion.g>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [1, 1, 0],
          }}
          transition={{
            opacity: { delay: 1.7, duration: 0.3 }
          }}
        >
          <motion.g
            initial={{ x: -60, y: 60 }}
            animate={{ x: 750, y: 40 }}
            transition={{
              duration: 2,
              ease: [0.7, 0.02, 0.34, 0.99],
              onComplete: onFinish
            }}
          >
            {/* Animate with motionPath for beeline! */}
            <motion.g
              animate={{
                // Animate along S path
                translateX: [0, 120, 240, 360, 480, 600, 750],
                translateY: [0, -20, 30, -40, 0, 30, 0],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
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
        </motion.g>
      </motion.svg>
      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
