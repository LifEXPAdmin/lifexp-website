import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", id: "hero-section" },
  { label: "Features", id: "feature-section" },
  { label: "Experience", id: "experience-section" },
  { label: "Updates", path: "/updates" },
  { label: "About", path: "/about" },
];

const contactLink = { label: "Contact", path: "/contact" };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Nav handler
  const handleNav = (link) => {
    if (link.path) {
      if (location.pathname !== link.path) {
        navigate(link.path);
      }
      setOpen(false);
    } else if (link.id) {
      if (location.pathname === "/") {
        const section = document.getElementById(link.id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        setOpen(false);
      } else {
        navigate("/");
        setTimeout(() => {
          const section = document.getElementById(link.id);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
        setOpen(false);
      }
    }
  };

  // Logo/Home handler
  const handleHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setOpen(false);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto mt-3 md:mt-5 flex items-center justify-between px-4 py-2 md:px-6 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 transition-all">
        <span
          className="font-bold text-2xl text-blue-600 select-none cursor-pointer tracking-tight drop-shadow"
          onClick={handleHome}
          style={{ textShadow: "0 2px 8px rgba(76,29,149,0.05)" }}
        >
          LifEXP
        </span>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                className="text-blue-700 font-semibold hover:text-purple-700 transition rounded-xl px-3 py-2 hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => handleNav(link)}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              className="ml-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-purple-600 transition"
              onClick={() => handleNav(contactLink)}
            >
              Contact
            </button>
          </li>
        </ul>
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 rounded hover:bg-blue-50/50 focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d={open
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      <div className={`${open ? "block" : "hidden"} md:hidden bg-white/95 shadow-lg backdrop-blur absolute w-full left-0 mt-2 py-2 rounded-b-2xl`}>
        <ul className="flex flex-col gap-2 py-2 px-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                className="w-full text-left text-blue-700 font-semibold py-2 px-2 rounded-xl hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => handleNav(link)}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              className="mt-2 w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-purple-600 transition"
              onClick={() => handleNav(contactLink)}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
