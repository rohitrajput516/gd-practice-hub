import React from "react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full bg-[#081221] text-white border-t border-white/10"
    >
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-7 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left Column: Useful Links */}
        <div>
          <h2 className="text-sm sm:text-[15px] font-bold text-white tracking-tight">
            Useful Links
          </h2>
          <ul className="mt-2.5 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-[13.5px] text-slate-300">
            <li>
              <a
                href="#upcoming-sessions"
                className="hover:text-white transition-colors"
              >
                GD Practice
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-white transition-colors"
              >
                Rules
              </a>
            </li>
            <li>
              <a href="#top" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a
                href="#upcoming-sessions"
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Privacy Policy */}
        <div className="sm:text-left">
          <h2 className="text-sm sm:text-[15px] font-bold text-white tracking-tight">
            Privacy Policy
          </h2>
          <ul className="mt-2.5 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-[13.5px] text-slate-300">
            <li>
              <a href="#footer" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#footer" className="hover:text-white transition-colors">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
