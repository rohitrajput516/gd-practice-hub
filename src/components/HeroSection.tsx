"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Hero Banner"
      className="relative w-full min-h-[390px] sm:min-h-[440px] lg:min-h-[470px] flex items-center justify-center overflow-hidden"
    >
      {/* Background University Library Discussion Image */}
      <Image
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85"
        alt="Students sitting around a library table practicing a group discussion"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Navy Academic Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/75 via-[#0A1628]/70 to-[#0A1628]/88"
        aria-hidden="true"
      />

      {/* Hero Center Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 pt-10 pb-20 sm:pt-12 sm:pb-24 text-center">
        <h1 className="font-serif text-white font-bold uppercase tracking-wide text-2xl sm:text-4xl md:text-[44px] lg:text-[50px] leading-[1.18] sm:leading-[1.16] drop-shadow-sm">
          MASTER THE ART OF
          <br />
          GROUP DISCUSSION
        </h1>

        <p className="mt-4 sm:mt-5 max-w-[600px] mx-auto text-slate-100/95 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal">
          Prepare, practice, and build communication skills to ace
          <br className="hidden sm:inline" /> your interviews and develop
          confidence.
        </p>

        {/* Dual Action Buttons */}
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href="#upcoming-sessions"
            className="w-full sm:w-auto min-w-[180px] px-6 py-2.5 sm:py-3 rounded-lg bg-[#1D63EB] hover:bg-[#1651C7] text-white text-sm sm:text-[15px] font-semibold shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky text-center"
          >
            Explore GD Sessions
          </a>

          <a
            href="#popular-topics"
            className="w-full sm:w-auto min-w-[170px] px-6 py-2.5 sm:py-3 rounded-lg bg-[#0A1628]/55 hover:bg-[#0A1628]/80 border border-slate-300/75 text-white text-sm sm:text-[15px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky text-center"
          >
            Explore GD Topics
          </a>
        </div>
      </div>
    </section>
  );
}
