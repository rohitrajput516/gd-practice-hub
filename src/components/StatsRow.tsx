import React from "react";
import { StatItem } from "@/types/gd";

interface StatsRowProps {
  stats: StatItem[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <section
      aria-label="Platform Statistics"
      className="relative z-20 -mt-11 sm:-mt-12 px-4 sm:px-6"
    >
      <div className="max-w-[680px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl py-4 sm:py-5 px-5 text-center shadow-stat border border-slate-100"
          >
            <div className="text-2xl sm:text-[28px] font-extrabold text-[#0A1628] tracking-tight leading-tight">
              {stat.value}
            </div>
            <div className="mt-1 text-xs sm:text-[13.5px] font-medium text-slate-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
