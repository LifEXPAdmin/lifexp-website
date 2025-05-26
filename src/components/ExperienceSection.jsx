import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FiTrendingUp, FiStar, FiGitBranch, FiUsers, FiEdit } from "react-icons/fi";

const experience = [
  {
    icon: <FiTrendingUp className="text-purple-500 text-3xl mb-2" />,
    title: "Level Up Your Life",
    desc: "Set real quests and see yourself progress every day with instant feedback.",
  },
  {
    icon: <FiStar className="text-yellow-400 text-3xl mb-2" />,
    title: "Guided by Astra",
    desc: "Your fairy guide Astra gives daily tips, encouragement, and magical surprises.",
  },
  {
    icon: <FiGitBranch className="text-green-500 text-3xl mb-2" />,
    title: "Visual Skill Trees",
    desc: "Track your growth in every area—career, learning, health, hobbies, and more!",
  },
  {
    icon: <FiUsers className="text-blue-500 text-3xl mb-2" />,
    title: "Verified Communities",
    desc: "Unlock exclusive real-world groups and events after completing questlines.",
  },
  {
    icon: <FiEdit className="text-pink-500 text-3xl mb-2" />,
    title: "Customize Your Journey",
    desc: "Personalize your avatar, Astra, and every aspect of your adventure.",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const steps = stepsRef.current;

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 65%",
        end: "bottom 30%",
        scrub: 0.5,
      }
    }).fromTo(
      steps,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <section ref={sectionRef} id="experience-section" className="py-24 bg-gradient-to-b from-indigo-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-3">The LifEXP Experience</h2>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Every day is a new quest! Level up your real life, guided by Astra, and discover new strengths along the way.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {experience.map((exp, i) => (
            <div
              ref={el => stepsRef.current[i] = el}
              key={i}
              className="bg-white rounded-2xl shadow-xl border border-blue-100 px-6 py-7 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(120,117,255,0.08) 0%, rgba(251,226,255,0.09) 100%)"
              }}
            >
              {exp.icon}
              <h3 className="font-bold text-blue-800 text-lg mb-2">{exp.title}</h3>
              <p className="text-gray-600">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
