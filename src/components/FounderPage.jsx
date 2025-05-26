// src/components/FounderPage.jsx

import React from "react";

export default function FounderPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 via-purple-100 to-blue-100 px-4 py-20">
      <div className="max-w-2xl w-full bg-white/50 backdrop-blur-lg shadow-2xl rounded-3xl p-10 mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
          Meet the Founder
        </h1>
        <div className="mb-6 flex justify-center">
             <img
             src="/founder.jpg"
             alt="Andrew McCuen"
             className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
             />
            </div>

        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          Hi, I’m <span className="font-semibold">Andrew McCuen</span>—the founder of LifEXP, a plumber, parent, and someone who’s spent years searching for purpose and real-life growth.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          I started this journey because, like so many, I struggled with traditional productivity tools that felt cold, overwhelming, and never really changed my habits.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          After years in the trades, raising three kids, and constantly pushing myself to improve, I realized there had to be a better way to turn life goals into step-by-step progress.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          So I built LifEXP—a platform that gamifies real-world growth with quests, skill trees, and a supportive community. My vision is to help anyone, from busy parents to young adults and lifelong learners, unlock their true potential—one quest at a time.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          This isn’t just an app. It’s the tool I wish I’d had my whole life. And I’m building it for all of us who want a sense of progress, accountability, and a little fun along the way.
        </p>
      </div>
    </section>
  );
}
