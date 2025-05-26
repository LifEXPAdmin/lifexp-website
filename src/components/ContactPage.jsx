// src/components/ContactPage.jsx
import React, { useState } from "react";
import { FiMail, FiCheckCircle } from "react-icons/fi";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xeogblny", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      const result = await res.json();
      if (result.ok) {
        setSent(true);
        form.reset();
      } else {
        setError("Sorry, there was a problem sending your message. Please try again.");
      }
    } catch {
      setError("Sorry, there was a problem sending your message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-50 to-blue-200">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-100 rounded-full p-4 mb-4 shadow">
          <FiMail className="text-4xl text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2 text-center">
          Contact & Support
        </h1>
        <p className="text-lg text-gray-700 mb-2 text-center max-w-lg">
          Have questions, feedback, or partnership ideas? Reach out below or email us directly at{" "}
          <a
            href="mailto:support@lifexpapp.com"
            className="text-blue-600 underline font-semibold hover:text-purple-600"
          >
            support@lifexpapp.com
          </a>
        </p>
      </div>

      <div className="w-full max-w-md">
        {!sent ? (
          <form
            className="bg-white/90 shadow-xl rounded-2xl p-8 flex flex-col gap-4 border border-blue-100"
            onSubmit={handleSubmit}
          >
            <label className="font-semibold text-blue-800">
              Name
              <input
                name="name"
                required
                className="block w-full mt-1 p-3 border rounded-xl bg-blue-50 border-blue-200 focus:border-purple-400 focus:outline-none text-lg transition"
                placeholder="Your name"
              />
            </label>
            <label className="font-semibold text-blue-800">
              Email
              <input
                name="email"
                type="email"
                required
                className="block w-full mt-1 p-3 border rounded-xl bg-blue-50 border-blue-200 focus:border-purple-400 focus:outline-none text-lg transition"
                placeholder="your@email.com"
              />
            </label>
            <label className="font-semibold text-blue-800">
              Message
              <textarea
                name="message"
                required
                className="block w-full mt-1 p-3 border rounded-xl bg-blue-50 border-blue-200 focus:border-purple-400 focus:outline-none text-lg min-h-[120px] transition"
                placeholder="How can we help?"
              />
            </label>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="mt-2 bg-blue-600 hover:bg-purple-600 transition text-white font-bold rounded-xl py-3 text-lg shadow focus:outline-none"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-white/90 rounded-2xl shadow-xl border border-blue-100">
            <FiCheckCircle className="text-green-500 text-5xl mb-2" />
            <h2 className="text-2xl font-bold text-blue-700 mb-1">Message Sent!</h2>
            <p className="text-gray-700 text-center">Thanks for reaching out. We’ll get back to you soon!</p>
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-purple-600 transition"
              onClick={() => setSent(false)}
            >
              Send Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
