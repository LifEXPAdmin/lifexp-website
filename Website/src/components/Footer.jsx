import React from "react";
import { Link } from "react-router-dom";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/_lifexp/",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@reallifexpapp",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
        <path d="M27 9.6v3.12c-2.74.07-4.6-1.56-5.46-3.12V22.6c0 3.13-2.51 5.66-5.6 5.66-3.08 0-5.6-2.53-5.6-5.66 0-3.13 2.52-5.66 5.6-5.66.26 0 .52.02.78.06v3.17a2.44 2.44 0 0 0-.78-.12c-1.43 0-2.6 1.19-2.6 2.65 0 1.46 1.17 2.65 2.6 2.65 1.43 0 2.6-1.19 2.6-2.65V2.6h3.12c.08 2.48 2.14 4.41 5.48 4.43z"/>
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/_LifEXP",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.98 2.5H2.91A.42.42 0 0 0 2.5 2.91v18.07c0 .23.18.42.41.42h18.07a.41.41 0 0 0 .42-.41V2.91a.41.41 0 0 0-.42-.41zm-4.95 14.64h-1.94l-3.1-4.14-3.06 4.14H5.05L9.05 12 5.16 7.19h1.95l2.7 3.61 2.71-3.61h1.95L10.96 12l3.97 5.14z"/>
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com/channels/1367239862264135750/1367239862264135753",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.3a.08.08 0 0 0-.084.04c-.376.653-.797 1.507-1.092 2.19a18.238 18.238 0 0 0-5.418 0A12.46 12.46 0 0 0 9.189 3.34a.077.077 0 0 0-.084-.04A19.726 19.726 0 0 0 3.68 4.369a.069.069 0 0 0-.03.027C.533 9.09-.319 13.557.099 17.982a.082.082 0 0 0 .031.054A19.978 19.978 0 0 0 7.15 20.7a.08.08 0 0 0 .087-.028c.334-.457.631-.94.885-1.449a.08.08 0 0 0-.044-.113 13.244 13.244 0 0 1-1.904-.932.08.08 0 0 1-.008-.133c.128-.098.255-.2.377-.307a.077.077 0 0 1 .079-.014c4.016 1.831 8.354 1.831 12.325 0a.077.077 0 0 1 .08.013c.122.108.249.21.377.308a.08.08 0 0 1-.007.132 12.36 12.36 0 0 1-1.905.932.08.08 0 0 0-.043.113c.253.509.55.992.884 1.45a.08.08 0 0 0 .087.027 19.934 19.934 0 0 0 7.019-2.663.08.08 0 0 0 .031-.053c.564-5.84-.944-10.272-3.548-13.586a.064.064 0 0 0-.03-.028ZM8.02 15.331c-1.184 0-2.156-1.085-2.156-2.419 0-1.333.956-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.956 2.419-2.156 2.419Zm7.962 0c-1.184 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.174 1.095 2.155 2.418 0 1.334-.956 2.419-2.155 2.419Z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:support@lifexpapp.com",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="20" height="16" x="2" y="4" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M22 6 12 13 2 6" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  }
];

export default function Footer() {
  return (
    <footer className="bg-white/30 backdrop-blur border-t border-gray-200 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center px-4 py-8 gap-4">
        <div className="flex flex-wrap gap-6 items-center justify-center mb-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-blue-600 hover:text-purple-600 transition"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <div className="flex gap-4 text-sm mb-2">
          <Link
            to="/terms"
            className="text-blue-700 underline hover:text-purple-700 transition"
          >
            Terms
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/privacy"
            className="text-blue-700 underline hover:text-purple-700 transition"
          >
            Privacy
          </Link>
        </div>
        <span className="text-gray-600 text-xs text-center">
          &copy; {new Date().getFullYear()} LifEXP. All rights reserved.
        </span>
      </div>
    </footer>
  );
}