import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Main Questlines",
    emoji: "🗺️",
    desc: "Step-by-step real-life adventures. Achieve goals like changing careers, learning new skills, and transforming habits with structured, rewarding guidance."
  },
  {
    title: "Level Up",
    emoji: "⭐",
    desc: "Earn XP and coins for every achievement—big or small. Progress, unlock rewards, and see your growth visually through the Skill Tree. Your daily efforts finally count!"
  },
  {
    title: "Astra the Guide",
    emoji: "🧚",
    desc: "Your friendly AI fairy mentor. Astra gives tips, celebrates milestones, and keeps you motivated along your journey—always there to help you win IRL."
  },
  {
    title: "Verified Communities",
    emoji: "🌟",
    desc: "Unlock exclusive clubs and support circles after completing Questlines. Connect with real achievers, share wins, and get inspired to keep growing."
  }
];

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
      className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-bl from-blue-50 via-purple-100 to-blue-100 px-4 py-16 md:py-24 relative"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl px-4 sm:px-10 py-12 md:py-16 border border-white/30">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-blue-700 text-center drop-shadow">
          What Makes LifEXP Different?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-800 max-w-2xl text-center mb-10">
          Discover a new way to gamify your life! LifEXP turns goals into quests, rewards your progress, and surrounds you with a community that’s as ambitious as you are.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-stretch">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, emoji, desc }) {
  return (
    <div className="group bg-white/90 p-6 rounded-xl shadow-lg flex flex-col items-center border border-blue-100 transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 cursor-pointer">
      <span className="text-4xl mb-3 drop-shadow-sm transition-all group-hover:scale-110">{emoji}</span>
      <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2 text-center">{title}</h3>
      <p className="text-gray-700 text-center text-base">{desc}</p>
    </div>
  );
}
