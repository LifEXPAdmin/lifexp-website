import React, { useState } from "react";

// Dropdown options
const OCCUPATIONS = [
  "Student",
  "Professional",
  "Job Seeker",
  "Career Changer",
  "Homemaker",
  "Entrepreneur",
  "Retired",
  "Other"
];

const MAIN_GOALS = [
  "Build daily habits",
  "Career change/retraining",
  "Level up my life",
  "Make new friends/community",
  "Track skill progress",
  "Boost motivation",
  "Other"
];

const PLATFORMS = [
  "iOS (iPhone/iPad)",
  "Android",
  "Web/Desktop",
  "Other"
];

const HOW_HEARD = [
  "Instagram",
  "TikTok",
  "YouTube",
  "X/Twitter",
  "Facebook",
  "Friend/Word of Mouth",
  "Online Article/Blog",
  "YC/Startup Community",
  "Other"
];

const INTERESTED_IN = [
  "Beta testing and giving feedback",
  "Early access to new features",
  "Joining the community Discord/Slack",
  "Becoming a LifEXP ambassador",
  "None of these"
];

export default function CTASection() {
  // Step 1: Email entry, Step 2: Survey, Step 3: Success
  const [step, setStep] = useState(1);

  // Form values
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [occupationOther, setOccupationOther] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const [mainGoalOther, setMainGoalOther] = useState("");
  const [platform, setPlatform] = useState("");
  const [platformOther, setPlatformOther] = useState("");
  const [heard, setHeard] = useState("");
  const [heardOther, setHeardOther] = useState("");
  const [interested, setInterested] = useState([]);
  const [interestText, setInterestText] = useState("");
  const [extra, setExtra] = useState("");

  // Error & loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle multi-select for "Would you be interested..."
  function handleInterestedChange(opt) {
    setInterested(prev =>
      prev.includes(opt)
        ? prev.filter(i => i !== opt)
        : [...prev, opt]
    );
  }

  // Show "Other" input logic
  const showOccupationOther = occupation === "Other";
  const showGoalOther = mainGoal === "Other";
  const showPlatformOther = platform === "Other";
  const showHeardOther = heard === "Other";

  // On submit: bundle data into one "message" field
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Compose email body
    const message = `
Waitlist Application

First Name: ${first}
Last Initial: ${last}
Email: ${email}
Age: ${age}
Country: ${country}
City: ${city}
Occupation/Background: ${showOccupationOther ? occupationOther : occupation}
Main Goal: ${showGoalOther ? mainGoalOther : mainGoal}
Preferred Platform: ${showPlatformOther ? platformOther : platform}
How did you hear about us?: ${showHeardOther ? heardOther : heard}
Interested in: ${interested.length ? interested.join(", ") : ""}
What interests you about LifEXP?: ${interestText}
Anything else you'd like to share?: ${extra}
    `.trim();

    // POST to Formspree
    try {
      const res = await fetch("https://formspree.io/f/mwpbeayy", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(
          Object.assign(document.createElement("form"), {
            elements: [
              { name: "email", value: email },
              { name: "message", value: message }
            ]
          })
        ),
      });

      // Fallback for browsers (FormData above is a little hacky)
      // Alternative safer way:
      // let formData = new FormData();
      // formData.append("email", email);
      // formData.append("message", message);

      // const res = await fetch("https://formspree.io/f/mwpbeayy", {
      //   method: "POST",
      //   headers: { Accept: "application/json" },
      //   body: formData,
      // });

      const result = await res.json();
      if (result.ok) {
        setStep(3);
      } else {
        setError("Sorry, there was a problem. Please try again.");
      }
    } catch {
      setError("Sorry, there was a problem. Please try again.");
    }
    setLoading(false);
  }

  // Step 1: Just email input
  if (step === 1)
    return (
      <section
        id="cta-section"
        className="relative flex flex-col items-center justify-center min-h-[45vh] bg-gradient-to-b from-purple-700 via-blue-500 to-purple-700 py-12 px-3"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div
          className="absolute top-0 left-0 w-full h-16 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(76,29,149,0), rgba(76,29,149,0.95) 90%)",
          }}
        />

        <div className="w-full max-w-lg bg-white/30 rounded-3xl shadow-2xl px-4 sm:px-10 py-10 md:py-14 border border-white/40 backdrop-blur-md relative z-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 text-center drop-shadow">
            Ready to Level Up Your Life?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-900 mb-8 max-w-xl text-center">
            Join LifEXP and start your real-life adventure today. Get early access, unlock questlines, and become part of something bigger!
          </p>
          <form
            className="flex flex-col md:flex-row items-center gap-4 w-full max-w-md mx-auto mb-4"
            onSubmit={e => {
              e.preventDefault();
              if (!email) return;
              setStep(2);
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-blue-700 text-lg md:text-xl font-bold rounded-full shadow-lg hover:bg-blue-100 transition"
            >
              Join the Waitlist
            </button>
          </form>
          <span className="text-blue-900 text-sm opacity-80 block text-center">
            No spam. Cancel anytime.
          </span>
        </div>
      </section>
    );

  // Step 3: Thank you
  if (step === 3)
    return (
      <section
        id="cta-section"
        className="relative flex flex-col items-center justify-center min-h-[45vh] bg-gradient-to-b from-purple-700 via-blue-500 to-purple-700 py-12 px-3"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div className="w-full max-w-lg bg-white/30 rounded-3xl shadow-2xl px-4 sm:px-10 py-10 md:py-14 border border-white/40 backdrop-blur-md flex flex-col items-center relative z-20">
          <div className="bg-white bg-opacity-90 rounded-xl p-8 shadow-xl text-center w-full max-w-md mx-auto">
            <p className="text-2xl font-bold text-blue-700 mb-2">Thank you!</p>
            <p className="text-blue-700">
              Your application is received. We’ll email you soon.
            </p>
          </div>
          <span className="text-blue-900 text-sm opacity-80 block text-center mt-4">
            No spam. Cancel anytime.
          </span>
        </div>
      </section>
    );

  // Step 2: Survey form
  return (
    <section
      id="cta-section"
      className="relative flex flex-col items-center justify-center min-h-[45vh] bg-gradient-to-b from-purple-700 via-blue-500 to-purple-700 py-12 px-3"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="w-full max-w-lg bg-white/30 rounded-3xl shadow-2xl px-4 sm:px-10 py-10 md:py-14 border border-white/40 backdrop-blur-md flex flex-col items-center relative z-20">
        <form
          className="w-full space-y-5"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              placeholder="First Name"
              required
              value={first}
              onChange={e => setFirst(e.target.value)}
            />
            <input
              type="text"
              maxLength={2}
              className="w-20 px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              placeholder="Last Initial"
              required
              value={last}
              onChange={e => setLast(e.target.value)}
            />
            <input
              type="number"
              min={1}
              max={120}
              className="w-24 px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              placeholder="Age"
              required
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              placeholder="Country"
              required
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              placeholder="City"
              required
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          {/* Occupation/Background */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Occupation/Background
            </label>
            <select
              required
              className="block w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              value={occupation}
              onChange={e => setOccupation(e.target.value)}
            >
              <option value="">Select...</option>
              {OCCUPATIONS.map(opt => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </select>
            {showOccupationOther && (
              <input
                type="text"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                placeholder="Please specify"
                value={occupationOther}
                onChange={e => setOccupationOther(e.target.value)}
                required
              />
            )}
          </div>
          {/* Main Goal */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Main Goal with LifEXP
            </label>
            <select
              required
              className="block w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              value={mainGoal}
              onChange={e => setMainGoal(e.target.value)}
            >
              <option value="">Select...</option>
              {MAIN_GOALS.map(opt => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </select>
            {showGoalOther && (
              <input
                type="text"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                placeholder="Please specify"
                value={mainGoalOther}
                onChange={e => setMainGoalOther(e.target.value)}
                required
              />
            )}
          </div>
          {/* Preferred Platform */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Preferred Platform/Device
            </label>
            <select
              required
              className="block w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              value={platform}
              onChange={e => setPlatform(e.target.value)}
            >
              <option value="">Select...</option>
              {PLATFORMS.map(opt => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </select>
            {showPlatformOther && (
              <input
                type="text"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                placeholder="Please specify"
                value={platformOther}
                onChange={e => setPlatformOther(e.target.value)}
                required
              />
            )}
          </div>
          {/* How did you hear about us */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              How did you hear about us?
            </label>
            <select
              required
              className="block w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              value={heard}
              onChange={e => setHeard(e.target.value)}
            >
              <option value="">Select...</option>
              {HOW_HEARD.map(opt => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </select>
            {showHeardOther && (
              <input
                type="text"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
                placeholder="Please specify"
                value={heardOther}
                onChange={e => setHeardOther(e.target.value)}
                required
              />
            )}
          </div>
          {/* Would you be interested in... */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Would you be interested in...
            </label>
            <div className="flex flex-col gap-2">
              {INTERESTED_IN.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-base font-normal text-blue-900">
                  <input
                    type="checkbox"
                    checked={interested.includes(opt)}
                    onChange={() => handleInterestedChange(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          {/* What interests you about LifEXP */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              What interests you about LifEXP?
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base"
              value={interestText}
              onChange={e => setInterestText(e.target.value)}
              placeholder="e.g. Habit tracking, community, career quests..."
              required
            />
          </div>
          {/* Anything else */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Anything else you’d like to share?
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-base min-h-[60px]"
              value={extra}
              onChange={e => setExtra(e.target.value)}
              placeholder="(Optional)"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 mb-2 text-center">{error}</div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-blue-400 bg-blue-100 text-blue-700 font-bold hover:bg-blue-200 transition"
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-700 text-white text-lg md:text-xl font-bold rounded-full shadow-lg hover:bg-blue-800 transition"
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
