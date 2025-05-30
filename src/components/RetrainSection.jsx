// src/components/RetrainSection.jsx
import React from "react";
import { FaRobot, FaUserGraduate, FaUsers } from "react-icons/fa";

export default function RetrainSection() {
  return (
    <section
      id="retrain-section"
      className="flex flex-col items-center justify-center min-h-[40vh] bg-white/60 px-4 py-14 md:py-20 relative"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-3xl bg-white/70 rounded-3xl shadow-lg border border-blue-100 p-8 md:p-12 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-3 text-center">
          Retrain for a Future-Proof Career
        </h2>
        <p className="text-base md:text-lg text-gray-700 text-center max-w-2xl mb-8">
          Don’t let AI or automation set you back. LifEXP offers step-by-step questlines designed to help you <b>retrain after job loss</b>—pivoting into thriving new roles, from tech support and remote work to creative entrepreneurship.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <RetrainCard
            icon={<FaRobot size={28} className="text-blue-500" />}
            label="Career Change Quests"
            desc="Structured, guided paths to build new, in-demand skills—even if you're starting from scratch."
          />
          <RetrainCard
            icon={<FaUsers size={28} className="text-purple-600" />}
            label="Peer Support"
            desc="Join exclusive communities of others retraining after AI or automation—grow together, swap tips, and stay motivated."
          />
          <RetrainCard
            icon={<FaUserGraduate size={28} className="text-green-600" />}
            label="Expert Guidance"
            desc="Quests, challenges, and daily tips tailored to help you actually land a new job."
          />
        </div>
      </div>
    </section>
  );
}

function RetrainCard({ icon, label, desc }) {
  return (
    <div className="flex flex-col items-center bg-blue-50/70 rounded-xl p-5 shadow text-blue-800 w-64 border border-blue-100">
      <div className="mb-2">{icon}</div>
      <div className="font-bold mb-1">{label}</div>
      <div className="text-blue-900 text-sm">{desc}</div>
    </div>
  );
}
