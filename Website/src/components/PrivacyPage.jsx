import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/80 via-purple-700/70 to-blue-400/90 px-2 py-8"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div className="w-full max-w-3xl rounded-3xl bg-white/30 shadow-2xl px-4 sm:px-8 py-10 md:py-14 border border-white/40 backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-blue-700 text-center drop-shadow">
          LifEXP Privacy Policy
        </h1>
        <p className="text-gray-500 mb-2 text-center">Last updated: May 2025</p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          <strong>Account Info:</strong> Name, email, age, hobbies, interests, and other profile data you provide.<br />
          <strong>Usage Data:</strong> XP, quests, achievements, activity logs, and how you interact with the app.<br />
          <strong>Device Info:</strong> Browser type, device type, operating system, IP address.<br />
          <strong>Cookies & Tracking:</strong> We use cookies and similar technologies to provide and improve our Service.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">2. How We Use Your Information</h2>
        <ul className="mb-4 list-disc list-inside">
          <li>To create and manage your account.</li>
          <li>To deliver personalized quest recommendations and features.</li>
          <li>To improve our Service, fix bugs, and develop new features.</li>
          <li>To communicate with you (updates, notifications, support).</li>
          <li>For legal and safety reasons (complying with laws, preventing abuse).</li>
        </ul>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">3. How We Share Your Information</h2>
        <ul className="mb-4 list-disc list-inside">
          <li><strong>Service Providers:</strong> We may share info with trusted third parties who help operate LifEXP (hosting, analytics, payment processing).</li>
          <li><strong>Legal Compliance:</strong> We may disclose info if required by law or to protect rights, safety, or property.</li>
          <li><strong>Community:</strong> If you join groups or communities, your username and public info may be visible to other members.</li>
          <li><strong>No Selling:</strong> We <strong>never sell</strong> your personal data to third parties.</li>
        </ul>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">4. Your Choices & Rights</h2>
        <ul className="mb-4 list-disc list-inside">
          <li>You can edit your profile and account info at any time.</li>
          <li>You can opt out of marketing emails by following unsubscribe links.</li>
          <li>You may request deletion of your account by contacting <a href="mailto:support@lifexpapp.com" className="text-blue-700 underline">support@lifexpapp.com</a>.</li>
        </ul>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">5. Data Security</h2>
        <p className="mb-4">
          We use industry-standard security measures to protect your information.
          Despite our efforts, no system is 100% secure. Please use strong passwords and notify us of any suspicious activity.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">6. Children’s Privacy</h2>
        <p className="mb-4">
          LifEXP is not intended for children under 13. If you believe a child has provided us with information, contact us and we will promptly delete it.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">7. International Users</h2>
        <p className="mb-4">
          LifEXP is based in the United States. By using our Service, you consent to the transfer and processing of your information in the U.S. and other countries.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">8. Updates to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Changes will be posted here, with notice for material updates.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">9. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, email us at <a href="mailto:support@lifexpapp.com" className="text-blue-700 underline">support@lifexpapp.com</a>.
        </p>
      </div>
    </motion.section>
  );
}
