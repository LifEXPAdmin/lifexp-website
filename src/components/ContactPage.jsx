import React, { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-blue-100 via-purple-100 to-indigo-100 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8">Contact & Support</h1>
      <p className="mb-8 text-lg text-gray-700 text-center max-w-xl">
        Have questions, feedback, or partnership ideas? Reach out using the form below or email us anytime at{" "}
        <a href="mailto:support@lifexpapp.com" className="text-blue-600 underline hover:text-purple-600">
          support@lifexpapp.com
        </a>.
      </p>

      {!submitted ? (
        <form
          action="https://formspree.io/f/xkgr1zdz"  // <-- use your Formspree form endpoint!
          method="POST"
          className="bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-blue-100"
          onSubmit={() => setSubmitted(true)}
        >
          <label className="block">
            <span className="font-semibold text-blue-700">Name</span>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-semibold text-blue-700">Email</span>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-semibold text-blue-700">Message</span>
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 shadow hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      ) : (
        <div className="bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-md border border-blue-100 text-center">
          <h2 className="text-xl font-bold text-green-600 mb-2">Thank you!</h2>
          <p className="text-gray-700">Your message has been sent. We'll get back to you soon.</p>
        </div>
      )}
    </div>
  );
}
