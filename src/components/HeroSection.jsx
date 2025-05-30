import React, { useState } from "react";
import FairyAnimation from "./FairyAnimation";

export default function HeroSection() {
  const [showFairy, setShowFairy] = useState(false);

  // Called after the fairy finishes flying
  const handleFairyFinish = () => {
    setShowFairy(false);
    // Scroll to the feature section smoothly
    const feature = document.getElementById("feature-section");
    if (feature) {
      feature.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 md:px-0 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-400 text-center relative"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md shadow-2xl rounded-3xl px-6 sm:px-12 py-12 md:py-16 border border-white/40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4 md:mb-6 leading-tight drop-shadow">
          Level Up, Retrain, and Belong—No Matter What Life Throws Your Way
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-blue-900 mb-6 max-w-2xl mx-auto">
          Lost your job to AI? Ready for a new adventure? LifEXP helps you retrain for future-proof careers, grow real skills, and unlock supportive communities with every quest. <b>Rebuild, grow, and connect—one quest at a time.</b>
        </p>
        <button
          className="px-7 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition text-lg md:text-xl"
          onClick={() => setShowFairy(true)}
          disabled={showFairy}
        >
          Get Started
        </button>
      </div>
      {showFairy && <FairyAnimation onFinish={handleFairyFinish} />}
    </section>
  );
}
