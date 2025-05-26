import React from "react";

const updates = [
  {
    date: "May 25, 2025",
    title: "Website Public Beta Launched",
    desc: "LifEXP website is live! Users can now join the waitlist and view our roadmap.",
    emoji: "🚀",
  },
  {
    date: "May 24, 2025",
    title: "Founder Story Page",
    desc: "Added a dedicated page with the founder’s personal journey and mission.",
    emoji: "👨‍💻",
  },
  {
    date: "May 23, 2025",
    title: "Social Links & Favicon",
    desc: "Integrated social links, favicon, and open graph image for rich sharing.",
    emoji: "🔗",
  },
  {
    date: "May 20, 2025",
    title: "Onboarding Waitlist",
    desc: "Waitlist form added so users can sign up for early access!",
    emoji: "📋",
  },
];

const roadmap = [
  { title: "Mobile App (iOS/Android)", desc: "Coming soon!", emoji: "📱" },
  { title: "User Profiles", desc: "Personalize your journey", emoji: "🧑‍🎨" },
  { title: "Verified Communities", desc: "Unlock exclusive groups after questlines", emoji: "🔒" },
  { title: "Skill Tree Visualizations", desc: "Track your growth visually", emoji: "🌳" },
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-0 bg-gradient-to-b from-blue-100 via-purple-100 to-blue-200 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Updates & Roadmap</h1>
      
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Recent Updates</h2>
        <ol className="relative border-l-4 border-blue-300">
          {updates.map((u, i) => (
            <li key={i} className="mb-8 ml-6">
              <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-blue-400 text-2xl shadow">{u.emoji}</span>
              <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-4">
                <span className="block text-xs text-gray-400 mb-1">{u.date}</span>
                <h3 className="text-lg font-bold text-blue-800">{u.title}</h3>
                <p className="text-gray-700">{u.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      
      <section className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Coming Soon</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {roadmap.map((r, i) => (
            <div key={i} className="bg-white bg-opacity-80 rounded-xl shadow p-5 flex items-center gap-4">
              <span className="text-3xl">{r.emoji}</span>
              <div>
                <div className="font-bold text-blue-800">{r.title}</div>
                <div className="text-gray-700">{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
