import React, { useState } from "react";

export default function CTASection() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  // Survey fields
  const [firstName, setFirstName] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const [age, setAge] = useState("");
  const [referral, setReferral] = useState("");
  const [interest, setInterest] = useState("");
  const [anythingElse, setAnythingElse] = useState("");

  // Handle the first screen (email entry)
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  // Handle the full survey/application submit
  const handleSurveySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Format the message body
    const message = `
Waitlist Application

First Name: ${firstName}
Last Initial: ${lastInitial}
Email: ${email}
Age: ${age}
How did you hear about us?: ${referral}
What interests you about LifEXP?: ${interest}
Anything else you'd like to share?: ${anythingElse}
    `.trim();

    // Build the FormData for Formspree (send as a single "message" field)
    const data = new FormData();
    data.append("email", email);
    data.append("message", message);

    try {
      const res = await fetch("https://formspree.io/f/mwpbeayy", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError("There was a problem submitting your application. Please try again.");
      }
    } catch {
      setError("There was a problem submitting your application. Please try again.");
    }
    setLoading(false);
  };

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
        }}
      />
      <div className="w-full max-w-lg bg-white/30 rounded-3xl shadow-2xl px-4 sm:px-10 py-10 md:py-14 border border-white/40 backdrop-blur-md relative z-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center drop-shadow">
          Ready to Level Up Your Life?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-blue-900 mb-8 max-w-xl text-center">
          Join LifEXP and start your real-life adventure today. Get early access, unlock questlines, and become part of something bigger!
        </p>

        {/* Success Message */}
        {submitted ? (
          <div className="bg-white bg-opacity-90 rounded-xl p-8 shadow-xl text-center w-full max-w-md mx-auto">
            <p className="text-2xl font-bold text-blue-700 mb-2">Thank you!</p>
            <p className="text-blue-700">Your application is received. We’ll email you soon.</p>
          </div>
        ) : (
          <>
            {/* Step 1: Email Entry */}
            {step === 1 && (
              <form
                className="flex flex-col md:flex-row items-center gap-4 w-full max-w-md mx-auto mb-4"
                onSubmit={handleEmailSubmit}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-blue-700 text-lg md:text-xl font-bold rounded-full shadow-lg hover:bg-blue-100 transition"
                  disabled={loading || !email}
                >
                  Join the Waitlist
                </button>
              </form>
            )}

            {/* Step 2: Waitlist Application */}
            {step === 2 && (
              <form className="space-y-4 w-full max-w-md mx-auto" onSubmit={handleSurveySubmit}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="lastInitial"
                    placeholder="Last Initial"
                    className="w-20 px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                    required
                    value={lastInitial}
                    onChange={(e) => setLastInitial(e.target.value)}
                    maxLength={2}
                    disabled={loading}
                  />
                </div>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="w-28 px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={8}
                  max={120}
                  disabled={loading}
                />
                <input
                  type="text"
                  name="referral"
                  placeholder="How did you hear about us?"
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                  required
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  disabled={loading}
                />
                <textarea
                  name="interest"
                  placeholder="What interests you about LifEXP?"
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                  required
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  rows={3}
                  disabled={loading}
                />
                <textarea
                  name="anythingElse"
                  placeholder="Anything else you'd like to share?"
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                  value={anythingElse}
                  onChange={(e) => setAnythingElse(e.target.value)}
                  rows={2}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-white text-blue-700 text-lg md:text-xl font-bold rounded-full shadow-lg hover:bg-blue-100 transition"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  className="block mx-auto mt-1 text-blue-700 underline opacity-70 text-sm"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </button>
                {error && (
                  <div className="text-sm text-red-600 text-center mt-2">{error}</div>
                )}
              </form>
            )}
          </>
        )}

        <span className="text-blue-900 text-sm opacity-80 block text-center mt-3">
          No spam. Cancel anytime.
        </span>
      </div>
    </section>
  );
}
