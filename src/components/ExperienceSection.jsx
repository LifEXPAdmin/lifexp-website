import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaMagic, FaShareAlt, FaUsers, FaPalette } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    title: "Level Up Your Life",
    icon: <FaChartLine size={32} className="text-blue-500" />,
    summary: "Set real quests and see yourself progress every day with instant feedback.",
    detail: (
      <>
        <b>Level Up Your Life</b> means making every real-world win count. Earn XP and coins for big goals and small victories. As you progress, watch your Skill Tree and profile grow—and get instant feedback that keeps you going every day.
      </>
    ),
  },
  {
    title: "Guided by Astra",
    icon: <FaMagic size={32} className="text-purple-500" />,
    summary: "Your fairy guide Astra gives daily tips, encouragement, and magical surprises.",
    detail: (
      <>
        <b>Astra</b> is your magical companion—offering encouragement, useful tips, and occasional surprises as you take on new quests. Tap Astra for advice, and celebrate your progress together!
      </>
    ),
  },
  {
    title: "Visual Skill Trees",
    icon: <FaShareAlt size={32} className="text-green-600" />,
    summary: "Track your growth in every area—career, learning, health, hobbies, and more!",
    detail: (
      <>
        <b>Visual Skill Trees</b> make your progress visible and inspiring. Each skill you build—whether at work, in a hobby, or in life—shows up on your own personal Skill Tree, so you can see your journey and share it with others.
      </>
    ),
  },
  {
    title: "Verified Communities",
    icon: <FaUsers size={32} className="text-green-500" />,
    summary: "Unlock exclusive real-world groups and events after completing questlines.",
    detail: (
      <>
        <b>Verified Communities</b> are exclusive, supportive groups you unlock by finishing questlines. Connect, get advice, and join real events with people who share your goals!
      </>
    ),
  },
  {
    title: "Customize Your Journey",
    icon: <FaPalette size={32} className="text-pink-400" />,
    summary: "Personalize your avatar, Astra, and every aspect of your adventure.",
    detail: (
      <>
        <b>Customize Your Journey</b> with avatars, Astra fairy skins, and theme options. LifEXP is yours to shape, both visually and through every quest you choose!
      </>
    ),
  },
];

export default function ExperienceSection() {
  const expRef = useRef();
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      expRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: expRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="experience-section"
      ref={expRef}
      className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 px-4 py-12 md:py-20 relative"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md shadow-xl rounded-3xl px-4 sm:px-10 py-10 md:py-14 border border-white/30">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-700 text-center">
          The LifEXP Experience
        </h2>
        <p className="text-lg md:text-xl text-gray-800 max-w-2xl text-center mb-8">
          Every day is a new quest! Level up your real life, guided by Astra, and discover new strengths along the way.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-7 justify-center items-center">
          {EXPERIENCE.map((item, i) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              summary={item.summary}
              detail={item.detail}
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
