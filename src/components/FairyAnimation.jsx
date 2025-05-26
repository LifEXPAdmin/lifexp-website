// src/components/FairyAnimation.jsx
import React from "react";
import { motion } from "framer-motion";

export default function FairyAnimation({ onFinish }) {
  return (
    <motion.div
      initial={{ left: -100, top: 80, opacity: 0 }}
      animate={{ left: "100vw", opacity: [1, 1, 0] }}
      transition={{ left: { duration: 1.6, ease: "easeInOut" }, opacity: { delay: 1.2, duration: 0.4 } }}
      style={{
        position: "fixed",
        top: 80,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      onAnimationComplete={onFinish}
    >
      {/* Fairy SVG */}
      <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="20" fill="rgba(180,200,255,0.3)" />
        <ellipse cx="32" cy="32" rx="11" ry="18" fill="#b2e5fa" />
        <ellipse cx="36" cy="26" rx="4" ry="12" fill="#fff6c1" opacity="0.8" />
        <circle cx="32" cy="32" r="7" fill="#90caf9" />
        {/* Add sparkle trails */}
        <circle cx="14" cy="36" r="2" fill="#fff9c4" />
        <circle cx="20" cy="42" r="1.2" fill="#b3e5fc" />
      </svg>
    </motion.div>
  );
}
