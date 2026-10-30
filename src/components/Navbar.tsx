"use client";

import React, { useState } from "react";
import { Send, Menu, X } from "lucide-react";

interface NavbarProps {
  telegramUrl: string;
  onOpenAdminModal: () => void;
  onTelegramClick: (url: string) => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#top", active: true },
  { label: "GD Schedule", href: "#upcoming-sessions", active: false },
  { label: "GD Topics", href: "#popular-topics", active: false },
  { label: "Rules", href: "#how-it-works", active: false },
  { label: "Announcements", href: "#upcoming-sessions", active: false },
  { label: "About Us", href: "#footer", active: false },
];

export default function Navbar({
  telegramUrl,
  onOpenAdminModal,
  onTelegramClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1629]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-3">
        {/* Left Brand Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky rounded-lg shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#2B70F6] to-[#1D58D8] flex items-center justify-center shadow-sm">
            {/* Custom Palette/Discussion Icon matching the reference */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
          </div>
          <span className="text-white font-bold text-base sm:text-lg lg:text-[21px] tracking-tight whitespace-nowrap">
            GD Practice Hub
          </span>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[14px] font-medium transition-colors whitespace-nowrap ${
                link.active
                  ? "text-[#3B82F6] font-semibold"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAdminModal}
            className="px-4 py-2 rounded-lg border border-slate-400/60 text-white text-[13.5px] font-medium hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky whitespace-nowrap"
          >
            Admin Login
          </button>

          <button
            type="button"
            onClick={() => onTelegramClick(telegramUrl)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#216CEB] to-[#329AF8] hover:from-[#1B5CD1] hover:to-[#2488E4] text-white text-[13.5px] font-semibold shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5 -rotate-12 fill-white" aria-hidden="true" />
            <span>Ask Owner for Any Doubt</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1629] border-t border-white/10 px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                  link.active
                    ? "bg-brand-blue/20 text-[#5CA9FF] font-semibold"
                    : "text-slate-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full py-2.5 px-4 rounded-lg border border-slate-400/60 text-white text-sm font-medium hover:bg-white/10 transition-colors text-center"
            >
              Admin Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onTelegramClick(telegramUrl);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#216CEB] to-[#329AF8] text-white text-sm font-semibold shadow-sm"
            >
              <Send className="w-4 h-4 -rotate-12 fill-white" aria-hidden="true" />
              <span>Ask Owner for Any Doubt</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
