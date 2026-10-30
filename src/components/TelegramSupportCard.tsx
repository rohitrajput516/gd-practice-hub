"use client";

import React from "react";

interface TelegramSupportCardProps {
  telegramUrl: string;
  onTelegramClick: (url: string) => void;
}

export default function TelegramSupportCard({
  telegramUrl,
  onTelegramClick,
}: TelegramSupportCardProps) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-[#1E56D9] via-[#247BE5] to-[#2CA4F4] shadow-card p-5 flex flex-col items-center justify-between text-center min-h-[210px]">
      <div className="my-auto pt-1">
        <h3 className="text-white font-bold text-xl sm:text-[22px] leading-[1.25] tracking-tight">
          Join Our
          <br />
          Telegram
          <br />
          Support
        </h3>
      </div>

      <button
        type="button"
        onClick={() => onTelegramClick(telegramUrl)}
        className="w-full mt-4 py-2.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-[#0A1628] font-bold text-xs sm:text-[12.5px] shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
      >
        Ask Owner for Any Doubt
      </button>
    </div>
  );
}
