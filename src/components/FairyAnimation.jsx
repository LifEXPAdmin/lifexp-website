import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

// --- Fairy SVG (as you provided, full and unchanged) ---
function FairySVG({ wingFlap = 0, wandGlow = 1 }) {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
      {/* Wings (split "X" shape) */}
      <g>
        {/* Left Top */}
        <ellipse
          cx="18"
          cy="26"
          rx="9"
          ry="18"
          fill="#98eaff"
          opacity="0.75"
          transform={`rotate(-25 18 26) scale(${1 + 0.08 * wingFlap} 1)`}
        />
        {/* Right Top */}
        <ellipse
          cx="46"
          cy="26"
          rx="9"
          ry="18"
          fill="#b3d0ff"
          opacity="0.7"
          transform={`rotate(25 46 26) scale(${1 + 0.08 * wingFlap} 1)`}
        />
        {/* Left Bottom */}
        <ellipse
          cx="18"
          cy="42"
          rx="8"
          ry="14"
          fill="#b3f2e9"
          opacity="0.68"
          transform={`rotate(20 18 42) scale(${1 - 0.08 * wingFlap} 1)`}
        />
        {/* Right Bottom */}
        <ellipse
          cx="46"
          cy="42"
          rx="8"
          ry="14"
          fill="#afe1fc"
          opacity="0.68"
          transform={`rotate(-20 46 42) scale(${1 - 0.08 * wingFlap} 1)`}
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
      {/* Face */}
      <ellipse cx="32" cy="27" rx="6" ry="4.2" fill="#f3a14b" />
      {/* Eyes */}
      <ellipse cx="29.3" cy="26" rx="1" ry="1.4" fill="#593c28" />
      <ellipse cx="34.7" cy="26" rx="1" ry="1.4" fill="#593c28" />
      {/* Smile */}
      <path d="M30.8 28.4 Q32 29.7 33.2 28.4" stroke="#6c4425" strokeWidth="1" fill="none" />
      {/* Nose */}
      <ellipse cx="32" cy="27.7" rx="0.45" ry="0.8" fill="#dd9c55" />
      {/* Hair (orange, covers ears, curved) */}
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
      {/* Body/dress */}
      <ellipse cx="32" cy="46" rx="10" ry="14" fill="#328254" />
      {/* Belt */}
      <rect x="22" y="50" width="20" height="5" rx="2.5" fill="#a87b29" />
      {/* Belt buckle */}
      <ellipse cx="32" cy="52.5" rx="3.5" ry="2" fill="#ffe082" stroke="#a87b29" strokeWidth="1" />
      {/* Star on dress */}
      <polygon
        points="32,37 33.4,41 37.7,41 34.5,43.5 35.6,47.5 32,45 28.4,47.5 29.5,43.5 26.3,41 30.6,41"
        fill="#ffe082"
        opacity="0.9"
      />
      {/* Arm Left (holds wand) */}
      <rect x="11" y="30" width="8" height="7" rx="4" fill="#f8b45c" transform="rotate(-18 15 34)" />
      {/* Arm Right */}
      <rect x="43" y="34" width="8" height="7" rx="4" fill="#f8b45c" transform="rotate(20 47 37.5)" />
      {/* Hand on wand */}
      <ellipse cx="16" cy="39" rx="3" ry="2.2" fill="#f8b45c" />
      {/* Hand right */}
      <ellipse cx="51.5" cy="40.5" rx="2.2" ry="2" fill="#f8b45c" />
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

// --- Fairy Animation ---
export default function FairyAnimation({ onFinish }) {
  const audioRef = useRef();
  const [particles, setParticles] = useState([]);
  const fairyX = useMotionValue(-60);
  const fairyY = useMotionValue(60);
  const [wingFlap, setWingFlap] = useState(0);
  const [wandGlow, setWandGlow] = useState(1);

  // Animation settings
  const flyLength = typeof window !== "undefined" ? window.innerWidth + 100 : 900;
  const DURATION = 2.6;

  // Wing and wand animation
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

  // Sound
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    }
  }, []);

  // Fairy flight path and fairy dust
  useAnimationFrame((t) => {
    const progress = Math.min(t / (DURATION * 1000), 1);
    const pathX = -60 + (flyLength + 60) * progress;
    const yPath =
      60 +
      50 * Math.sin(progress * Math.PI * 1.5) -
      15 * Math.sin(progress * Math.PI * 3);

    fairyX.set(pathX);
    fairyY.set(yPath);

    // Fairy Dust - emit more, smaller magical particles
    let newParticles = [];
    for (let i = 0; i < 3; i++) {
      const kind = Math.random() < 0.17 ? "star" : "dot"; // Mostly dots, some stars
      const color = [
        "#fffbe7", "#e6f7ff", "#ffe082", "#b3e5fc", "#d1c4e9", "#f8bbd0"
      ][Math.floor(Math.random() * 6)];
      newParticles.push({
        id: Math.random() + "_" + t + "_" + i,
        x: pathX - 8 + Math.random() * 4,
        y: yPath + 14 + Math.random() * 8,
        drift: Math.random() * 20 - 10,
        size: kind === "star" ? 2.2 + Math.random() * 1.4 : 1 + Math.random() * 1.1,
        opacity: 0.48 + Math.random() * 0.52,
        color,
        lifetime: 0,
        kind,
        spin: Math.random() * 180,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  });

  // Particle animation & cleanup
  useEffect(() => {
    if (particles.length === 0) return;
    const anim = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((sp) => ({ ...sp, lifetime: sp.lifetime + 40 }))
          .filter((sp) => sp.lifetime < 720)
      );
    }, 40);
    return () => clearInterval(anim);
  }, [particles.length]);

  return (
    <>
      <svg
        width={flyLength}
        height="300"
        style={{
          position: "fixed",
          left: 0,
          top: 40,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        {/* Fairy Dust Particles */}
        {particles.map((sp) =>
          sp.kind === "star" ? (
            <motion.polygon
              key={sp.id}
              points="2,0 2.6,1.6 4,2 2.6,2.4 2,4 1.4,2.4 0,2 1.4,1.6"
              fill={sp.color}
              opacity={sp.opacity * (1 - sp.lifetime / 700)}
              style={{
                transform: `translate(${sp.x + sp.lifetime * sp.drift * 0.0025}px,${sp.y +
                  sp.lifetime * 0.09}px) scale(${sp.size * (1 - sp.lifetime / 700) * 0.6}) rotate(${sp.spin +
                  sp.lifetime * 0.24}deg)`,
                filter: "drop-shadow(0 0 6px #fffbe7) drop-shadow(0 0 12px #b3e5fc80)",
              }}
            />
          ) : (
            <motion.circle
              key={sp.id}
              cx={sp.x + sp.lifetime * sp.drift * 0.0025}
              cy={sp.y + sp.lifetime * 0.09}
              r={sp.size * (1 - sp.lifetime / 700)}
              fill={sp.color}
              opacity={sp.opacity * (1 - sp.lifetime / 700)}
              style={{
                filter: "drop-shadow(0 0 4px #fffbe7) drop-shadow(0 0 8px #b3e5fc80)",
              }}
            />
          )
        )}
        {/* Fairy Group */}
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
            <FairySVG wingFlap={wingFlap} wandGlow={wandGlow} />
          </motion.g>
        </motion.g>
      </svg>
      <audio ref={audioRef} src="/fairy-chime.mp3" preload="auto" />
    </>
  );
}
