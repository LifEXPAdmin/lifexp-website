import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection() {
  const featureRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      featureRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: featureRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="feature-section"
      ref={featureRef}
      className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-bl from-blue-50 via-purple-100 to-blue-100 px-4 py-12 md:py-20 relative"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md shadow-xl rounded-3xl px-4 sm:px-10 py-10 md:py-14 border border-white/30">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-blue-700 text-center">
          Why LifEXP?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-800 max-w-xl text-center mb-8">
          Track your quests, earn XP, and join a thriving community that celebrates real growth. Your life’s journey deserves its own epic.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-center items-center">
          <FeatureCard title="Main Questlines" emoji="🗺" />
          <FeatureCard title="Level Up" emoji="⭐" />
          <FeatureCard title="Astra the Guide" emoji="🧚" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, emoji }) {
  return (
    <div className="bg-white/60 p-6 rounded-xl shadow-md flex flex-col items-center w-full max-w-xs sm:w-56 border border-white/40">
      <span className="text-3xl mb-2">{emoji}</span>
      <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">{title}</h3>
    </div>
  );
}
