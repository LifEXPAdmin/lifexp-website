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
      <svg width="62" height="80" viewBox="0 0 62 80" fill="none">
  {/* Insect-style Fantasy Wings (with animated flutter) */}
  <g>
    {/* Left wing */}
    <ellipse
      cx="18"
      cy="36"
      rx="15"
      ry="32"
      fill="url(#wingL)"
      opacity="0.36"
    >
      <animate attributeName="transform"
        type="rotate"
        values="4 18 36; -12 18 36; 4 18 36"
        dur="0.55s" repeatCount="indefinite" />
    </ellipse>
    {/* Right wing */}
    <ellipse
      cx="44"
      cy="36"
      rx="15"
      ry="32"
      fill="url(#wingR)"
      opacity="0.36"
    >
      <animate attributeName="transform"
        type="rotate"
        values="-4 44 36; 12 44 36; -4 44 36"
        dur="0.55s" repeatCount="indefinite" />
    </ellipse>
    {/* Decorative veins */}
    <path d="M18,36 Q31,44 44,36" stroke="#c5b3ff" strokeWidth="1" opacity="0.22" />
    <path d="M18,36 Q32,24 44,36" stroke="#c5b3ff" strokeWidth="1" opacity="0.14" />
  </g>
  {/* Dust swirl by the feet */}
  <ellipse cx="32" cy="71" rx="10" ry="2.3" fill="#b2f2fa" opacity="0.17" />
  <ellipse cx="32" cy="71" rx="5" ry="1.1" fill="#b3e5fc" opacity="0.22" />
  {/* Lower body/legs */}
  <rect x="28" y="59" width="1.7" height="11" rx="0.8" fill="#fdd835" transform="rotate(-12 28 59)" />
  <rect x="32.2" y="60" width="1.7" height="10" rx="0.8" fill="#fdd835" transform="rotate(6 32.2 60)" />
  {/* Hips & shorts */}
  <ellipse cx="30.8" cy="57.8" rx="2.4" ry="1.2" fill="#b3e5fc" />
  <ellipse cx="33.1" cy="58.1" rx="2.3" ry="1.1" fill="#b2f2fa" />
  {/* Dress */}
  <ellipse
    cx="32"
    cy="49"
    rx="8.2"
    ry="14"
    fill="url(#dressGradient2)"
    opacity="0.93"
  />
  {/* Dress hem sparkles */}
  <circle cx="32" cy="62" r="1.1" fill="#fffbe7" opacity="0.5" />
  <circle cx="27.7" cy="58" r="0.8" fill="#fffbe7" opacity="0.35" />
  <circle cx="35.3" cy="60" r="0.7" fill="#b3e5fc" opacity="0.26" />
  {/* Torso */}
  <ellipse
    cx="32"
    cy="42"
    rx="3.5"
    ry="6.2"
    fill="#ffe082"
  />
  {/* Head */}
  <ellipse cx="32" cy="32.5" rx="5.2" ry="5.8" fill="#ffd54f" />
  {/* Pointy Ears */}
  <ellipse cx="25.4" cy="33.2" rx="1.6" ry="2.2" fill="#b3e5fc" transform="rotate(-16 25.4 33.2)" opacity="0.8" />
  <ellipse cx="38.5" cy="33.2" rx="1.6" ry="2.2" fill="#b3e5fc" transform="rotate(16 38.5 33.2)" opacity="0.8" />
  {/* Hair - pixie style, mint/blue */}
  <ellipse cx="32" cy="28.4" rx="4.6" ry="2.8" fill="#69f0ae" />
  <ellipse cx="28.5" cy="29" rx="1.2" ry="0.5" fill="#00bfae" />
  <ellipse cx="35.4" cy="29" rx="1.3" ry="0.5" fill="#00bfae" />
  {/* Face */}
  <ellipse cx="32" cy="34" rx="1.7" ry="1.2" fill="#fffde7" opacity="0.9" />
  <ellipse cx="30.5" cy="35.5" rx="0.35" ry="0.6" fill="#333" />
  <ellipse cx="33.5" cy="35.5" rx="0.35" ry="0.6" fill="#333" />
  <ellipse cx="32" cy="37.1" rx="0.7" ry="0.26" fill="#ad53bc" opacity="0.7" />
  {/* Left arm (bent) */}
  <rect x="25.5" y="42" width="7" height="1.2" rx="0.6" transform="rotate(-14 25.5 42)" fill="#ffe082" />
  {/* Right arm with star wand */}
  <rect x="34.5" y="42" width="7" height="1.2" rx="0.6" transform="rotate(16 34.5 42)" fill="#ffe082" />
  {/* Star wand (with animated twinkle) */}
  <g>
    <rect x="41.7" y="42.8" width="1.3" height="10" rx="0.66" fill="#fffde7" transform="rotate(-8 41.7 42.8)" />
    <polygon points="42.7,42 44.3,43 43,43.5 43.7,44.7 42.7,44 41.7,44.7 42.4,43.5 41.1,43 42.7,42"
      fill="#fff59d" opacity="0.85">
      <animate attributeName="opacity" values="0.85;0.3;0.85" dur="0.7s" repeatCount="indefinite" />
      <animateTransform attributeName="transform" type="scale" values="1;1.5;1" begin="0.3s" dur="0.7s" repeatCount="indefinite" additive="sum" />
    </polygon>
  </g>
  {/* Toe tips */}
  <ellipse cx="29" cy="70" rx="0.8" ry="0.34" fill="#ad53bc" opacity="0.7" />
  <ellipse cx="34.5" cy="70" rx="0.8" ry="0.34" fill="#ad53bc" opacity="0.7" />
  {/* Glow */}
  <ellipse cx="32" cy="58" rx="10" ry="2.3" fill="#b2f2fa" opacity="0.13" />
  <defs>
    <radialGradient id="wingL" cx="0.5" cy="0.5" r="1">
      <stop stopColor="#b2e5fa" stopOpacity="0.52" />
      <stop offset="1" stopColor="#fff6c1" stopOpacity="0.08" />
    </radialGradient>
    <radialGradient id="wingR" cx="0.5" cy="0.5" r="1">
      <stop stopColor="#e3eaff" stopOpacity="0.39" />
      <stop offset="1" stopColor="#fff6c1" stopOpacity="0.05" />
    </radialGradient>
    <linearGradient id="dressGradient2" x1="32" y1="34" x2="32" y2="70" gradientUnits="userSpaceOnUse">
      <stop stopColor="#ea80fc" />
      <stop offset="1" stopColor="#fffbe7" stopOpacity="0.82" />
    </linearGradient>
  </defs>
</svg>

      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
