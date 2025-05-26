import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

// Detailed Fairy SVG based on your Instagram fairy
function FairySVG({ wingFlap = 0, wandGlow = 1 }) {
  return (
    <svg width="60" height="74" viewBox="0 0 64 74" fill="none">
      {/* Wings (split "X" shape) */}
      <g>
        {/* Left Top */}
        <ellipse
          cx="18"
          cy="30"
          rx="9"
          ry="18"
          fill="#98eaff"
          opacity="0.75"
          transform={`rotate(-25 18 30) scale(${1 + 0.08 * wingFlap} 1)`}
        />
        {/* Right Top */}
        <ellipse
          cx="46"
          cy="30"
          rx="9"
          ry="18"
          fill="#b3d0ff"
          opacity="0.7"
          transform={`rotate(25 46 30) scale(${1 + 0.08 * wingFlap} 1)`}
        />
        {/* Left Bottom */}
        <ellipse
          cx="18"
          cy="48"
          rx="8"
          ry="14"
          fill="#b3f2e9"
          opacity="0.68"
          transform={`rotate(20 18 48) scale(${1 - 0.08 * wingFlap} 1)`}
        />
        {/* Right Bottom */}
        <ellipse
          cx="46"
          cy="48"
          rx="8"
          ry="14"
          fill="#afe1fc"
          opacity="0.68"
          transform={`rotate(-20 46 48) scale(${1 - 0.08 * wingFlap} 1)`}
        />
      </g>
      {/* Glow behind wand */}
      <circle
        cx="16"
        cy="20"
        r={6 + 4 * wandGlow}
        fill="#fffbe7"
        opacity="0.75"
        filter="url(#glow)"
      />
      {/* Wand */}
      <rect x="14.5" y="21" width="3.2" height="19" rx="1.2" fill="#895D14" />
      {/* Wand orb */}
      <circle
        cx="16"
        cy="20"
        r="5"
        fill="#fffa9a"
        stroke="#fff7e7"
        strokeWidth="2"
        opacity={0.9}
        filter="url(#glow)"
      />
      {/* Head */}
      <ellipse cx="32" cy="23.5" rx="7" ry="7.5" fill="#f8b45c" />
      {/* Ears */}
      <ellipse cx="42.5" cy="27.5" rx="3" ry="6" fill="#f8b45c" transform="rotate(18 42.5 27.5)" />
      <ellipse cx="21.5" cy="27.5" rx="3" ry="6" fill="#f8b45c" transform="rotate(-18 21.5 27.5)" />
      {/* Hair */}
      <path
        d="M24,24 Q24,12 32,12 Q40,12 40,24 Q42,32 32,32 Q22,32 24,24Z"
        fill="#ffb347"
      />
      <path
        d="M26,31 Q23,35 24,41 Q30,40 31,35 Q30,31 26,31Z"
        fill="#ffb347"
      />
      <path
        d="M38,31 Q41,35 40,41 Q34,40 33,35 Q34,31 38,31Z"
        fill="#ffb347"
      />
      {/* Face: eyes, smile, nose */}
      <ellipse cx="29.3" cy="26" rx="1" ry="1.4" fill="#593c28" />
      <ellipse cx="34.7" cy="26" rx="1" ry="1.4" fill="#593c28" />
      <path d="M30.8 28.4 Q32 29.7 33.2 28.4" stroke="#6c4425" strokeWidth="1" fill="none" />
      <ellipse cx="32" cy="27.7" rx="0.45" ry="0.8" fill="#dd9c55" />
      {/* Body/dress */}
      <ellipse cx="32" cy="50" rx="10" ry="15" fill="#328254" />
      {/* Belt */}
      <rect x="22" y="58" width="20" height="5" rx="2.5" fill="#a87b29" />
      <ellipse cx="32" cy="60.5" rx="3.5" ry="2" fill="#ffe082" stroke="#a87b29" strokeWidth="1" />
      {/* Star on dress */}
      <polygon
        points="32,41 33.4,45 37.7,45 34.5,47.5 35.6,51.5 32,49 28.4,51.5 29.5,47.5 26.3,45 30.6,45"
        fill="#ffe082"
        opacity="0.9"
      />
      {/* Arm Left (holds wand) */}
      <rect x="11" y="34" width="8" height="7" rx="4" fill="#f8b45c" transform="rotate(-18 15 37.5)" />
      {/* Arm Right */}
      <rect x="43" y="38" width="8" height="7" rx="4" fill="#f8b45c" transform="rotate(20 47 41.5)" />
      {/* Hand on wand */}
      <ellipse cx="16" cy="43" rx="3" ry="2.2" fill="#f8b45c" />
      {/* Hand right */}
      <ellipse cx="51.5" cy="44.5" rx="2.2" ry="2" fill="#f8b45c" />
      {/* SVG filter for glow */}
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export default function FairyAnimation({ onFinish }) {
  const audioRef = useRef();
  const [sparkles, setSparkles] = useState([]);
  const fairyX = useMotionValue(-60);
  const fairyY = useMotionValue(70);
  const [wingFlap, setWingFlap] = useState(0);
  const [wandGlow, setWandGlow] = useState(1);

  // Animation settings
  const flyLength = typeof window !== "undefined" ? window.innerWidth + 100 : 900;
  const DURATION = 2.6; // seconds

  // Animate wings and wand glow
  useEffect(() => {
    let mounted = true;
    let t = 0;
    function flap() {
      setWingFlap(Math.sin(t * 8) * 0.7);
      setWandGlow(1 + Math.sin(t * 6) * 0.35);
      if (mounted) {
        t += 0.033;
        requestAnimationFrame(flap);
      }
    }
    flap();
    return () => { mounted = false; };
  }, []);

  // Play sound
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    }
  }, []);

  // Animate fairy flight and sparkle trail
  useAnimationFrame((t) => {
    const progress = Math.min(t / (DURATION * 1000), 1);
    const pathX = -60 + (flyLength + 60) * progress;
    // Arc, ensure fairy stays visible
    const yCenter = 75;
    const ySwing = 32;
    const yPath =
      yCenter +
      ySwing * Math.sin(progress * Math.PI * 1.5) -
      10 * Math.sin(progress * Math.PI * 3);
    fairyX.set(pathX);
    fairyY.set(yPath);

    // Dense, small dots for pixie dust
    for (let i = 0; i < 2; i++) {
      if (Math.random() < 0.8) {
        setSparkles((prev) => [
          ...prev,
          {
            id: Math.random() + "" + t + i,
            x: pathX - 8 + Math.random() * 2,
            y: yPath + 15 + Math.random() * 2,
            drift: Math.random() * 26 - 13,
            size: 1.3 + Math.random() * 1,
            opacity: 0.36 + Math.random() * 0.5,
            color: ["#fffbe7", "#e6f7ff", "#ffe082", "#b3e5fc"][Math.floor(Math.random() * 4)],
            lifetime: 0,
          },
        ]);
      }
    }
  });

  // Fade out sparkles
  useEffect(() => {
    if (sparkles.length === 0) return;
    const anim = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((sp) => ({ ...sp, lifetime: sp.lifetime + 60 }))
          .filter((sp) => sp.lifetime < 800)
      );
    }, 60);
    return () => clearInterval(anim);
  }, [sparkles.length]);

  return (
    <>
      <svg
        width={flyLength}
        height="190"
        style={{
          position: "fixed",
          left: 0,
          top: 60,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        {/* Pixie dust sparkles */}
        {sparkles.map((sp) => (
          <motion.circle
            key={sp.id}
            cx={sp.x + sp.lifetime * sp.drift * 0.0018}
            cy={sp.y + sp.lifetime * 0.13}
            r={sp.size * (1 - sp.lifetime / 850)}
            fill={sp.color}
            opacity={sp.opacity * (1 - sp.lifetime / 800)}
            style={{
              filter:
                "drop-shadow(0 0 3px #fffbe7) drop-shadow(0 0 9px #b3e5fc88)",
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
              y: 70,
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              onComplete: onFinish,
            }}
          >
            <FairySVG wingFlap={wingFlap} wandGlow={wandGlow} />
          </motion.g>
        </motion.g>
      </svg>
      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
