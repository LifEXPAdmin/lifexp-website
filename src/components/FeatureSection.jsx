import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMap, FaStar, FaMagic, FaUsers } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Main Questlines",
    icon: <FaMap size={38} className="text-blue-500" />,
    summary: "Step-by-step real-life adventures. Achieve goals like changing careers, learning new skills, and transforming habits with structured, rewarding guidance.",
    detail: (
      <>
        <b>Main Questlines</b> are the heart of LifEXP—think of them as RPG campaigns for real life. Each Questline breaks big goals (career change, building habits, learning a language, etc.) into small, guided steps. You always know what’s next, how far you’ve come, and unlock bonuses and community perks as you progress!
        <ul className="list-disc ml-5 mt-2 text-base text-blue-800">
          <li>Curated by experts & the community</li>
          <li>Choose or create your own Questline</li>
          <li>Earn XP, coins, and unlockables for each step</li>
          <li>Access exclusive groups by completing major paths</li>
        </ul>
      </>
    ),
  },
  {
    title: "Level Up",
    icon: <FaStar size={38} className="text-yellow-400" />,
    summary: "Earn XP and coins for every achievement—big or small. Progress, unlock rewards, and see your growth visually through the Skill Tree. Your daily efforts finally count!",
    detail: (
      <>
        <b>Level Up</b> by completing tasks, quests, and developing your real-life skills! LifEXP turns every achievement into visible progress: watch your XP bar grow, earn coins for the shop, and see your skill tree fill out. The more you grow, the more you unlock—both in the app and in the real world.
        <ul className="list-disc ml-5 mt-2 text-base text-blue-800">
          <li>Daily quests, streaks, and achievements</li>
          <li>Earn avatar & fairy cosmetics with coins</li>
          <li>Level milestones = special in-app rewards</li>
          <li>Share your skill tree with friends or employers</li>
        </ul>
      </>
    ),
  },
  {
    title: "Astra the Guide",
    icon: <FaMagic size={38} className="text-purple-500" />,
    summary: "Your friendly AI fairy mentor. Astra gives tips, celebrates milestones, and keeps you motivated along your journey—always there to help you win IRL.",
    detail: (
      <>
        <b>Astra</b> is your AI-powered fairy companion, always floating nearby for advice and encouragement. Tap Astra for a motivational tip, get help with a tough quest, or enjoy animated reactions and sound effects as you progress.
        <ul className="list-disc ml-5 mt-2 text-base text-blue-800">
          <li>Customizable look & voice</li>
          <li>Helpful tips for any situation</li>
          <li>Interactive, animated, and fun</li>
          <li>Future AI: answer questions about goals, quests, or anything else</li>
        </ul>
      </>
    ),
  },
  {
    title: "Verified Communities",
    icon: <FaUsers size={38} className="text-green-500" />,
    summary: "Unlock exclusive clubs and support circles after completing Questlines. Connect with real achievers, share wins, and get inspired to keep growing.",
    detail: (
      <>
        <b>Verified Communities</b> are special “clubs” you unlock by finishing a major Questline (career change, fitness, entrepreneurship, etc). Once inside, you join a private group of others who’ve done the same. Swap advice, build connections, and access bonus quests and events!
        <ul className="list-disc ml-5 mt-2 text-base text-blue-800">
          <li>Only accessible after completing a Questline</li>
          <li>Peer support, Q&A, and real friendships</li>
          <li>Pro-only clubs for power users</li>
          <li>Earn badges and community rewards</li>
        </ul>
      </>
    ),
  },
];

export default function FeatureSection() {
  const featureRef = useRef();
  const [openIdx, setOpenIdx] = useState(null);

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
      <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md shadow-xl rounded-3xl px-4 sm:px-10 py-10 md:py-14 border border-white/30">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-700 text-center">
          What Makes LifEXP Different?
        </h2>
        <p className="text-lg md:text-xl text-gray-800 max-w-2xl text-center mb-8">
          Discover a new way to gamify your life! LifEXP turns goals into quests, rewards your progress, and surrounds you with a community that’s as ambitious as you are.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-7 justify-center items-center">
          {FEATURES.map((feat, i) => (
            <FeatureCard
              key={feat.title}
              icon={feat.icon}
              title={feat.title}
              summary={feat.summary}
              detail={feat.detail}
              open={openIdx === i}
              onClick={() => setOpenIdx(i)}
              onClose={() => setOpenIdx(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, summary, detail, open, onClick, onClose }) {
  return (
    <>
      <motion.div
        className="bg-white/80 border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center w-full max-w-xs cursor-pointer hover:shadow-xl transition"
        whileHover={{ scale: 1.045, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        <div className="mb-2">{icon}</div>
        <h3 className="text-lg font-bold text-blue-700 mb-2 text-center">{title}</h3>
        <p className="text-gray-700 text-center">{summary}</p>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-[1000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="w-full max-w-md mx-4 bg-gradient-to-b from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-blue-100 p-7 relative"
              initial={{ opacity: 0, scale: 0.92, y: 48 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 32 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-4 text-blue-400 hover:text-blue-700 transition"
                aria-label="Close"
              >
                <MdClose size={28} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <span>{icon}</span>
                <h3 className="text-xl font-bold text-blue-700">{title}</h3>
              </div>
              <div className="text-gray-800 leading-relaxed">{detail}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
