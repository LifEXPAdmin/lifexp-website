import React from "react";

// Example updates (replace with your own milestones!)
const updates = [
  {
    date: "May 2025",
    title: "Website & Waitlist Launched",
    description: "Published the first version of LifEXP's site, added waitlist signups, and began collecting early interest.",
    complete: true
  },
  {
    date: "June 2025",
    title: "Core App Demo",
    description: "Major MVP features in testing: daily quests, XP/coin system, skill tree, and fairy guide animation.",
    complete: false
  },
  {
    date: "Q3 2025",
    title: "Beta Launch",
    description: "Inviting first users to test the app and community features. Feedback directly shapes development!",
    complete: false
  },
  {
    date: "Future",
    title: "Post-Quest Communities & Shop",
    description: "Unlockable verified communities and avatar/fairy shop coming soon. Stay tuned for even more gamified features.",
    complete: false
  }
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-blue-100 via-purple-100 to-indigo-200 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-10 text-center">
        Updates & Roadmap
      </h1>
      <div className="max-w-2xl w-full">
        <ol className="relative border-l-4 border-blue-400">
          {updates.map((item, idx) => (
            <li key={idx} className="mb-10 ml-6">
              <span className={`absolute flex items-center justify-center w-8 h-8 bg-white border-4 ${item.complete ? "border-green-400" : "border-blue-400"} rounded-full -left-5`}>
                {item.complete ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                )}
              </span>
              <div className="bg-white/90 rounded-xl shadow p-5 border border-blue-100 hover:shadow-lg transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-800">{item.title}</h3>
                  <span className="text-xs text-blue-500 font-medium">{item.date}</span>
                </div>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
