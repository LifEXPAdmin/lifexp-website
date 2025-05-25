import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef();
  const stepsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const steps = stepsRef.current;

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",        // Triggers when section top is at 70% of viewport height
        end: "bottom 30%",       // Ends when section bottom is at 30% of viewport height
        scrub: 1,                // Scrub for smoothness
        // pin: false,           // COMMENT OUT or REMOVE pin
        markers: false
      }
    })
      .fromTo(steps, { opacity: 0, y: 60 }, { opacity: 1, y: 0, stagger: 0.15, duration: 1 });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience-section"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl font-bold text-blue-700 mb-10">The LifEXP Experience</h2>
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        {[
          "Choose your quest for the day.",
          "Complete real-life challenges and grow.",
          "Earn XP, level up, and unlock rewards.",
          "Join exclusive, verified communities as you progress."
        ].map((text, i) => (
          <div
            key={i}
            ref={el => stepsRef.current[i] = el}
            className="bg-white bg-opacity-10 rounded-xl px-8 py-6 shadow-lg text-blue-900 text-xl font-semibold w-full backdrop-blur"
            style={{ opacity: 0, transform: "translateY(60px)" }}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
