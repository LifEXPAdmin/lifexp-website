import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
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
        start: "top 15%",
        end: "+=60%",
        scrub: 0.5,
        pin: section,
        anticipatePin: 1,
        markers: false
      }
    })
      .fromTo(steps[0], { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
      .fromTo(steps[1], { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "+=0.2")
      .fromTo(steps[2], { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "+=0.2")
      .fromTo(steps[3], { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "+=0.2");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="experience-section"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-purple-700 to-blue-500 px-3 py-12 md:py-20"
      style={{ backdropFilter: "blur(3px)" }}
    >
      <div className="w-full max-w-2xl bg-white/30 rounded-3xl shadow-2xl px-6 sm:px-10 py-10 md:py-14 border border-white/40 backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-blue-700 text-center drop-shadow">
          The LifEXP Experience
        </h2>
        <div className="flex flex-col gap-6 sm:gap-8 items-center w-full">
          {[
            "Choose your quest for the day.",
            "Complete real-life challenges and grow.",
            "Earn XP, level up, and unlock rewards.",
            "Join exclusive, verified communities as you progress."
          ].map((text, i) => (
            <StepItem
              key={i}
              text={text}
              ref={el => stepsRef.current[i] = el}
            />
          ))}
        </div>
      </div>
      {/* Bottom fade to blend with CTA section */}
      <div
        className="absolute bottom-0 left-0 w-full h-16 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(76,29,149,0), rgba(76,29,149,1) 95%)'
          // rgba(76,29,149,1) = Tailwind's purple-700; adjust as needed to match your CTASection top color
        }}
      />
    </section>
  );
}

const StepItem = React.forwardRef(({ text }, ref) => (
  <div
    ref={ref}
    className="bg-white/40 rounded-xl px-6 sm:px-8 py-4 sm:py-6 shadow-lg text-blue-800 text-base sm:text-xl font-semibold w-full text-center border border-white/30 backdrop-blur"
    style={{ opacity: 0, transform: "translateY(60px)" }}
  >
    {text}
  </div>
));
