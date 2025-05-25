import React from "react";
import { motion } from "framer-motion";

export default function TermsPage() {
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
          LifEXP Terms of Service
        </h1>
        <p className="text-gray-500 mb-2 text-center">Last updated: May 2025</p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">1. Eligibility & Accounts</h2>
        <p className="mb-4">
          You must be at least 13 years old to use LifEXP. If under 18, you need permission from a parent or legal guardian.
          You are responsible for maintaining the security of your account and password. Notify us immediately if you believe your account has been compromised.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">2. Use of the Service</h2>
        <p className="mb-4">
          LifEXP is designed to help you track personal growth, complete quests, and connect with a positive community.
          You agree not to use LifEXP for any illegal, harmful, or abusive purpose, or to violate any laws or regulations.
          You may not attempt to reverse engineer, hack, or disrupt the Service or its users.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">3. Content & Conduct</h2>
        <p className="mb-4">
          You are responsible for any content you post or share on LifEXP.
          You agree not to post content that is hateful, discriminatory, obscene, threatening, infringing, or otherwise violates our community guidelines.
          We reserve the right to remove content or suspend accounts that violate these Terms or our guidelines.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">4. Rewards, XP, and Coins</h2>
        <p className="mb-4">
          XP, coins, badges, and other rewards earned in LifEXP are virtual items only and have no cash value.
          We reserve the right to modify, revoke, or discontinue rewards, questlines, or features at any time.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">5. Subscriptions & Purchases</h2>
        <p className="mb-4">
          LifEXP may offer premium features (“LifEXP Pro”) and in-app purchases.
          All purchases are final except where required by law. You may cancel your subscription at any time through your account settings.
          If your payment fails or subscription lapses, your access to premium features may be suspended.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">6. Community & Verified Groups</h2>
        <p className="mb-4">
          Some communities may require completion of questlines or a subscription to access (“Verified Communities”).
          You agree to follow all group and community guidelines. Admins may remove users for violating rules.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">7. Privacy & Data</h2>
        <p className="mb-4">
          By using LifEXP, you consent to the collection, use, and sharing of your information as described in our <a href="/privacy" className="text-blue-700 underline">Privacy Policy</a>.
          We take your privacy seriously and strive to protect your data. See our Privacy Policy for details.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">8. Intellectual Property</h2>
        <p className="mb-4">
          All content, features, trademarks, and branding on LifEXP are owned by LifEXP or its licensors.
          You may not use, copy, or distribute our content without permission.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">9. Disclaimer & Limitation of Liability</h2>
        <p className="mb-4">
          LifEXP is provided “as is” and we make no guarantees about the Service.
          To the fullest extent permitted by law, LifEXP is not liable for any damages, loss, or injury resulting from your use of the Service.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">10. Changes to These Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. If we make material changes, we will notify you by email or in-app notice.
          Continued use after changes means you accept the new Terms.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-2">11. Contact</h2>
        <p>
          If you have any questions about these Terms, contact us at <a href="mailto:support@lifexpapp.com" className="text-blue-700 underline">support@lifexpapp.com</a>.
        </p>
      </div>
    </motion.section>
  );
}
