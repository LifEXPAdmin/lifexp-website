import React, { useState } from "react";

const OCCUPATIONS = [
  "Student",
  "Software/IT",
  "Healthcare",
  "Education",
  "Skilled Trades",
  "Business/Finance",
  "Arts/Design",
  "Retail/Hospitality",
  "Full-time Parent",
  "Unemployed/Job-Seeking",
  "Retired",
  "Other",
];

const MAIN_GOALS = [
  "Make new friends/community",
  "Land a new job",
  "Career change",
  "Self-improvement",
  "Track habits/goals",
  "Level up IRL skills",
  "Get motivated",
  "Have fun/gamify life",
  "Other",
];

const PLATFORMS = [
  "iOS (iPhone/iPad)",
  "Android",
  "Mac",
  "Windows PC",
  "Web browser",
  "Other",
];

const HOW_HEARD_OPTIONS = [
  "Friend/Word of Mouth",
  "Creator",
  "Social Media (Instagram/TikTok/X/Facebook)",
  "YouTube",
  "Web search/Google",
  "Podcast",
  "Article/Blog",
  "Other",
];

export default function CTASection() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [occupationOther, setOccupationOther] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const [mainGoalOther, setMainGoalOther] = useState("");
  const [platform, setPlatform] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [howHeardOther, setHowHeardOther] = useState("");
  const [interests, setInterests] = useState([]);
  const [about, setAbout] = useState("");
  const [share, setShare] = useState("");

  const INTEREST_OPTIONS = [
    "Beta testing and giving feedback",
    "Early access to new features",
    "Joining the community Discord/Slack",
    "Becoming a LifEXP ambassador",
    "None of these",
  ];

  // Checkbox handler
  function handleInterestChange(option) {
    if (option === "None of these") {
      setInterests(["None of these"]);
    } else if (interests.includes("None of these")) {
      setInterests([option]);
    } else if (interests.includes(option)) {
      setInterests(interests.filter((x) => x !== option));
    } else {
      setInterests([...interests, option]);
    }
  }

  // Final submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Compose message for email
    let message = `Waitlist Application\n\n`;
    message += `First Name: ${firstName}\n`;
    message += `Last Initial: ${lastInitial}\n`;
    message += `Email: ${email}\n`;
    message += `Age: ${age}\n`;
    message += `Country: ${country}\n`;
    message += `City: ${city}\n`;
    message += `Occupation/Background: ${
      occupation === "Other" ? occupationOther : occupation
    }\n`;
    message += `Main Goal with LifEXP: ${
      mainGoal === "Other" ? mainGoalOther : mainGoal
    }\n`;
    message += `Preferred Platform/Device: ${platform}\n`;
    message += `How did you hear about us?: ${
      howHeard === "Other" ? howHeardOther : howHeard
    }\n`;
    message += `Would you be interested in:\n`;
    if (interests.length > 0) {
      interests.forEach((item) => {
        message += `- ${item}\n`;
      });
    }
    message += `What interests you about LifEXP?: ${about}\n`;
    message += `Anything else you'd like to share?: ${share}\n`;

    // Use FormData (REQUIRED for Formspree!)
    let formData = new FormData();
    formData.append("email", email);
    formData.append("message", message);

    try {
      const res = await fetch("https://formspree.io/f/mwpbeayy", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const result = await res.json();
      if (result.ok) {
        setSubmitted(true);
        setStep(0);
        setEmail("");
        setFirstName("");
        setLastInitial("");
        setAge("");
        setCountry("");
        setCity("");
        setOccupation("");
        setOccupationOther("");
        setMainGoal("");
        setMainGoalOther("");
        setPlatform("");
        setHowHeard("");
        setHowHeardOther("");
        setInterests([]);
        setAbout("");
        setShare("");
      } else {
        setError("Sorry, there was a problem. Please try again.");
      }
    } catch {
      setError("Sorry, there was a problem. Please try again.");
    }
    setLoading(false);
  };

  // Step 1: Email only
  if (step === 0)
    return (
      <section
        id="cta-section"
        className="relative flex flex-col items-center justify-center min-h-[45vh] bg-gradient-to-b from-purple-700 via-blue-500 to-purple-700 py-12 px-3"
        style={{ backdropFilter: "blur(2px)" }}
      >
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
              <p className="text-blue-700">Your application is received. We'll email you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(1);
              }}
              className="flex flex-col md:flex-row items-center gap-4 w-full max-w-md mx-auto mb-4"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                required
                autoComplete="email"
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

  // Step 2: Full application
  return (
    <section
      id="cta-section"
      className="relative flex flex-col items-center justify-center min-h-[55vh] bg-gradient-to-b from-purple-700 via-blue-500 to-purple-700 py-12 px-3"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-lg bg-white/30 rounded-3xl shadow-2xl px-4 sm:px-10 py-10 md:py-14 border border-white/40 backdrop-blur-md relative z-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center drop-shadow">
          Waitlist Application
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              maxLength={1}
              placeholder="Last Initial"
              className="w-20 px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              value={lastInitial}
              onChange={(e) => setLastInitial(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Age"
              min="10"
              max="99"
              className="flex-1 px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="flex-1 px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              className="flex-1 px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-semibold text-blue-900 mb-1 block">Occupation/Background</label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Choose one...</option>
              {OCCUPATIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {occupation === "Other" && (
              <input
                type="text"
                placeholder="Your occupation/background"
                className="mt-2 w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
                value={occupationOther}
                onChange={(e) => setOccupationOther(e.target.value)}
                required
              />
            )}
          </div>
          <div>
            <label className="font-semibold text-blue-900 mb-1 block">Main Goal with LifEXP</label>
            <select
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Choose one...</option>
              {MAIN_GOALS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {mainGoal === "Other" && (
              <input
                type="text"
                placeholder="What's your main goal?"
                className="mt-2 w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
                value={mainGoalOther}
                onChange={(e) => setMainGoalOther(e.target.value)}
                required
              />
            )}
          </div>
          <div>
            <label className="font-semibold text-blue-900 mb-1 block">Preferred Platform/Device</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Choose one...</option>
              {PLATFORMS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {platform === "Other" && (
              <input
                type="text"
                placeholder="Your preferred platform"
                className="mt-2 w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
                value={platformOther}
                onChange={(e) => setPlatformOther(e.target.value)}
                required
              />
            )}
          </div>
          <div>
            <label className="font-semibold text-blue-900 mb-1 block">How did you hear about us?</label>
            <select
              value={howHeard}
              onChange={(e) => setHowHeard(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Choose one...</option>
              {HOW_HEARD_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {howHeard === "Other" && (
              <input
                type="text"
                placeholder="How did you hear about LifEXP?"
                className="mt-2 w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
                value={howHeardOther}
                onChange={(e) => setHowHeardOther(e.target.value)}
                required
              />
            )}
          </div>
          <div>
            <label className="font-semibold text-blue-900 mb-1 block">Would you be interested in...</label>
            <div className="flex flex-col gap-2">
              {INTEREST_OPTIONS.map((option) => (
                <label key={option} className="flex items-center gap-2 font-normal">
                  <input
                    type="checkbox"
                    checked={interests.includes(option)}
                    onChange={() => handleInterestChange(option)}
                    disabled={
                      option === "None of these" && interests.length > 0 && !interests.includes(option)
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="font-semibold text-blue-900 mb-1 block">What interests you about LifEXP?</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Let us know!"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-blue-900 mb-1 block">Anything else you'd like to share?</label>
            <textarea
              className="w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none min-h-[64px]"
              value={share}
              onChange={(e) => setShare(e.target.value)}
              placeholder="Your thoughts, suggestions, etc."
            />
          </div>
          {error && (
            <div className="text-sm text-red-600 text-center mb-2">{error}</div>
          )}
          <div className="flex justify-between mt-6 gap-4">
            <button
              type="button"
              className="px-6 py-2 bg-blue-100 text-blue-700 font-semibold rounded-xl hover:bg-blue-200 transition"
              onClick={() => setStep(0)}
              disabled={loading}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-extrabold rounded-xl shadow-lg hover:from-purple-600 hover:to-blue-600 transition text-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
        <span className="text-blue-900 text-sm opacity-80 block text-center mt-4">
          No spam. Cancel anytime.
        </span>
      </div>
    </section>
  );
}
