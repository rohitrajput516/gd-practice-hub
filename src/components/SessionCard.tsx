"use client";

import React from "react";
import { GDSession } from "@/types/gd";

interface SessionCardProps {
  session: GDSession;
  onJoinSession: (session: GDSession) => void;
}

export default function SessionCard({
  session,
  onJoinSession,
}: SessionCardProps) {
  const isCancelled = session.status === "cancelled";

  return (
    <article className="bg-white rounded-xl border border-slate-200/90 shadow-card p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
      <div>
        {/* Top Badge */}
        <span className="inline-block text-[12.5px] font-semibold text-[#1D63EB] mb-1.5">
          {isCancelled ? "Cancelled" : session.badge_label}
        </span>

        {/* Session Title */}
        <h3 className="text-[17px] font-bold text-[#0A1628] leading-snug line-clamp-2 min-h-[46px]">
          {session.title}
        </h3>

        {/* Host & Date Metadata */}
        <div className="mt-3 space-y-1 text-[13px] text-slate-700">
          <p>
            <span className="text-slate-600">Host: </span>
            <span className="font-semibold text-[#0A1628]">
              {session.host_name}
            </span>
          </p>
          <p className="text-slate-600 font-medium">
            {session.scheduled_display}
          </p>
        </div>
      </div>

      {/* Bottom Action Row: Join Meeting Button + Zoom Logo */}
      <div className="mt-5 pt-1 flex items-center justify-between gap-2">
        <button
          type="button"
          disabled={isCancelled}
          onClick={() => onJoinSession(session)}
          className={`px-3.5 py-2 rounded-lg text-xs sm:text-[13px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky ${
            isCancelled
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-[#1D63EB] hover:bg-[#1550C4] text-white shadow-sm"
          }`}
        >
          {isCancelled ? "Session Cancelled" : "Join Meeting"}
        </button>

        {/* Zoom Icon + Wordmark */}
        <div
          className="inline-flex items-center gap-1 select-none shrink-0"
          aria-label="Zoom Meeting"
        >
          <span className="w-4 h-4 rounded-full bg-[#2D8CFF] inline-flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-white fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2.5l4 3v-9l-4 3V8a2 2 0 0 0-2-2H4z" />
            </svg>
          </span>
          <span className="text-[#2D8CFF] font-bold text-[14px] tracking-tight lowercase">
            zoom
          </span>
        </div>
      </div>
    </article>
  );
}
  