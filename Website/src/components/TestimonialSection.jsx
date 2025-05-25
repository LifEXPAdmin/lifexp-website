import React from "react";

const testimonials = [
  {
    quote: "LifEXP has helped me turn my goals into daily action—leveling up has never felt this rewarding!",
    name: "Alex P.",
    title: "Beta Tester",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    quote: "Joining a verified community after finishing my questline was the boost I needed. Highly recommended.",
    name: "Jamie L.",
    title: "Early User",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    quote: "Astra the fairy is like a coach in my pocket! LifEXP is a game-changer for real life.",
    name: "Sam T.",
    title: "Productivity Nerd",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  }
];

export default function TestimonialSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[55vh] bg-gradient-to-b from-blue-100 via-purple-100 to-blue-50 py-16 px-4"
      style={{ backdropFilter: "blur(2px)" }}>
      <div className="w-full max-w-3xl bg-white/40 rounded-3xl shadow-2xl px-6 sm:px-10 py-10 md:py-14 border border-white/30 backdrop-blur-md mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-blue-700 text-center drop-shadow">
          What People Are Saying
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-1 bg-white/60 rounded-2xl p-6 shadow-md border border-white/50 flex flex-col items-center"
            >
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-2 border-blue-200 shadow" />
              <blockquote className="text-base sm:text-lg text-blue-900 italic text-center mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="text-blue-700 font-semibold">{t.name}</div>
              <div className="text-xs text-blue-400">{t.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
