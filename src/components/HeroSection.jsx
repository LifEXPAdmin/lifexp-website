import React, { useState } from "react";
import FairyAnimation from "./FairyAnimation";

export default function HeroSection() {
  const [showFairy, setShowFairy] = useState(false);

  const handleGetStarted = () => {
    setShowFairy(true);
    setTimeout(() => {
      // Scroll to the feature section smoothly
      const featureSection = document.getElementById("feature-section");
      if (featureSection) {
        featureSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 1200); // Start scroll about when fairy is halfway
    setTimeout(() => setShowFairy(false), 1800); // Remove fairy after animation
  };

  return (
    <section
      id="hero-section"
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 md:px-0 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-400 text-center relative"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md shadow-2xl rounded-3xl px-6 sm:px-12 py-12 md:py-16 border border-white/40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4 md:mb-6 leading-tight drop-shadow">
          Hello, LifEXP!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-blue-900 mb-6 max-w-2xl mx-auto">
          Gamify your life. Level up every day.
        </p>
        <button
          className="px-7 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition text-lg md:text-xl"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
      {showFairy && <FairyAnimation onFinish={() => setShowFairy(false)} />}
    </section>
  );
}
