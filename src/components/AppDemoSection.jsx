import React from "react";

export default function AppDemoSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-[60vh] bg-gradient-to-tr from-blue-100 via-purple-100 to-blue-200 py-12 px-4 md:py-16 relative"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0 md:mr-8">
        <div className="w-full max-w-lg bg-white/50 rounded-3xl shadow-lg p-6 sm:p-10 border border-white/40 backdrop-blur">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-blue-700 text-center md:text-left">
            See LifEXP In Action
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-md mb-6 text-center md:text-left">
            Set your quests, level up your real-life skills, and unlock communities—all in one beautiful, motivating app.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
      <div className="shadow-2xl rounded-3xl overflow-visible max-w-[320px] w-full flex items-center justify-center">
  <img
    src="/screenshots/lifexp-home-screenshot.png"
    alt="LifEXP App Demo"
    className="w-full h-auto"
    draggable="false"
    style={{ background: "transparent" }}
  />
</div>

      </div>
    </section>
  );
}