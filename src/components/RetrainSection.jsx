import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserTie, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RETRAIN_CARDS = [
  {
    title: "Career Change Quests",
    icon: <FaUserTie size={32} className="text-blue-600" />,
    summary: "Structured, guided paths to build new, in-demand skills—even if you’re starting from scratch.",
    detail: (
      <>
        <b>Career Change Quests</b> are step-by-step guides for pivoting into thriving, future-proof careers.
        <ul className="list-disc pl-6 mt-2 text-base">
          <li>Choose a questline for tech, remote work, or creative fields</li>
          <li>Get actionable tasks and skills to complete each week</li>
          <li>Earn XP, unlock rewards, and see your progress on your Skill Tree</li>
        </ul>
        Whether you’re totally new or just switching fields, you’ll build confidence and job-ready skills at your own pace!
      </>
    ),
  },
  {
    title: "Peer Support",
    icon: <FaUsers size={32} className="text-purple-600" />,
    summary: "Join exclusive communities of others retraining after AI or automation—grow together, swap tips, and stay motivated.",
    detail: (
      <>
        <b>Peer Support</b> means you never have to go it alone!
        <ul className="list-disc pl-6 mt-2 text-base">
          <li>Connect with people on the same journey in verified LifEXP groups</li>
          <li>Share resources, motivation, and weekly wins</li>
          <li>Access group events, job leads, and accountability check-ins</li>
        </ul>
        Real support, real stories—grow together with a community that actually “gets it.”
      </>
    ),
  },
  {
    title: "Expert Guidance",
    icon: <FaChalkboardTeacher size={32} className="text-green-600" />,
    summary: "Quests, challenges, and daily tips tailored to help you actually land a new job.",
    detail: (
      <>
        <b>Expert Guidance</b> puts the right advice and tools in your hands:
        <ul className="list-disc pl-6 mt-2 text-base">
          <li>Weekly guidance from real-world professionals</li>
          <li>AI-powered career coaching for resumes, interviews, and job search</li>
          <li>Daily motivation and actionable tips to keep you moving forward</li>
        </ul>
        Never feel lost—get the clarity and structure you need to succeed.
      </>
    ),
  },
];

export default function RetrainSection() {
  const sectionRef = useRef();
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="retrain-section"
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 px-4 py-12 md:py-20 relative"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-3xl bg-white/40 backdrop-blur-md shadow-xl rounded-3xl px-4 sm:px-10 py-10 md:py-14 border border-white/30">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-700 text-center">
          Retrain for a Future-Proof Career
        </h2>
        <p className="text-lg md:text-xl text-gray-800 max-w-2xl text-center mb-8">
          Don’t let AI or automation set you back. LifEXP offers step-by-step questlines designed to help you <b>retrain after job loss</b>—pivoting into thriving new roles, from tech support and remote work to creative entrepreneurship.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-7 justify-center items-center">
          {RETRAIN_CARDS.map((item, i) => (
            <RetrainCard
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

function RetrainCard({ icon, title, summary, detail, open, onClick, onClose }) {
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
