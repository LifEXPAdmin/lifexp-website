import React, { useState } from "react";

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="cta-section"
      className="relative flex flex-col items-center justify-center min-h-[45vh] bg-gradient-to-b from-purple-700 via-blue-500 to-purple-700 py-12 px-3"
      style={{ backdropFilter: "blur(2px)" }}
    >
      {/* Top fade to blend with previous section */}
      <div
        className="absolute top-0 left-0 w-full h-16 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, rgba(76,29,149,0), rgba(76,29,149,0.95) 90%)'
          // fade from transparent to purple-700 at the very top
        }}
      />

      <div className="w-full max-w-lg bg-white/30 rounded-3xl shadow-2xl px-4 sm:px-10 py-10 md:py-14 border border-white/40 backdrop-blur-md relative z-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center drop-shadow">
          Ready to Level Up Your Life?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-blue-900 mb-8 max-w-xl text-center">
          Join LifEXP and start your real-life adventure today. Get early access, unlock questlines, and become part of something bigger!
        </p>
        {submitted ? (
  <div className="bg-white bg-opacity-90 rounded-xl p-8 shadow-xl text-center w-full max-w-md mx-auto">
    <p className="text-2xl font-bold text-blue-700 mb-2">Thank you!</p>
    <p className="text-blue-700">You’re on the waitlist. We’ll email you soon.</p>
  </div>
) : (
  <form
    action="https://formspree.io/f/xkgr1zdz"
    method="POST"
    className="flex flex-col md:flex-row items-center gap-4 w-full max-w-md mx-auto mb-4"
    onSubmit={(e) => {
      // Don't prevent default! Let browser submit the form.
      setTimeout(() => setSubmitted(true), 300);
    }}
  >
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      className="flex-1 px-5 py-3 rounded-full border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
      required
    />
    <button
      type="submit"
      className="px-8 py-3 bg-white text-blue-700 text-lg md:text-xl font-bold rounded-full shadow-lg hover:bg-blue-100 transition"
    >
      Join the Waitlist
    </button>
  </form>
)}

        <span className="text-blue-900 text-sm opacity-80 block text-center">
          No spam. Cancel anytime.
        </span>
      </div>
    </section>
  );
}
