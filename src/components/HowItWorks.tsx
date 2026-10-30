import React from "react";
import { HowItWorksStep } from "@/types/gd";

interface HowItWorksProps {
  steps: HowItWorksStep[];
}

function StepIcon({ type }: { type: HowItWorksStep["iconName"] }) {
  if (type === "register") {
    return (
      <svg
        className="w-8 h-8 text-[#0A1628] shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11.5 21.5 7 23 8.5 18.5 13H17v-1.5Z" />
      </svg>
    );
  }

  if (type === "prep") {
    return (
      <svg
        className="w-8 h-8 text-[#0A1628] shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="m8 9 1.5 1.5L12 8" />
        <path d="M14 9h3" />
        <path d="m8 14 1.5 1.5L12 13" />
        <path d="M14 14h3" />
      </svg>
    );
  }

  return (
    <svg
      className="w-8 h-8 text-[#0A1628] shrink-0 mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="3.5" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <rect x="13.5" y="3.5" width="7.5" height="5.5" rx="1.2" />
      <path d="M15.5 9v2l2-2" />
    </svg>
  );
}

export default function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-8 sm:py-10 px-4 sm:px-6"
    >
      <div className="max-w-[960px] mx-auto">
        <h2
          id="how-it-works-heading"
          className="text-center text-xl sm:text-2xl font-extrabold text-[#0A1628] tracking-tight"
        >
          How It Works
        </h2>

        <div className="mt-7 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className="flex items-start gap-3.5 max-w-[290px] mx-auto md:mx-0"
            >
              <StepIcon type={step.iconName} />
              <div>
                <h3 className="text-base sm:text-[17px] font-extrabold text-[#0A1628] leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
