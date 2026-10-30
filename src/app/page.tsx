"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import SessionCard from "@/components/SessionCard";
import TelegramSupportCard from "@/components/TelegramSupportCard";
import HowItWorks from "@/components/HowItWorks";
import PopularTopics from "@/components/PopularTopics";
import AdminLoginModal from "@/components/AdminLoginModal";
import Footer from "@/components/Footer";
import {
  DEFAULT_SESSIONS,
  DEFAULT_STATS,
  DEFAULT_TOPICS,
  HOW_IT_WORKS_STEPS,
} from "@/lib/defaultData";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { GDSession, GDTopic } from "@/types/gd";

export default function HomePage() {
  const [sessions, setSessions] = useState<GDSession[]>(DEFAULT_SESSIONS);
  const [topics, setTopics] = useState<GDTopic[]>(DEFAULT_TOPICS);
  const [telegramUrl, setTelegramUrl] = useState<string>(
    process.env.NEXT_PUBLIC_DEFAULT_TELEGRAM_URL || ""
  );
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadLiveContent() {
      if (!isSupabaseConfigured || !supabase) return;

      const [sessionsRes, topicsRes, settingsRes] = await Promise.all([
        supabase
          .from("gd_sessions")
          .select("*")
          .neq("status", "draft")
          .order("display_order", { ascending: true })
          .limit(3),
        supabase
          .from("gd_topics")
          .select("*")
          .eq("is_popular", true)
          .order("display_order", { ascending: true }),
        supabase
          .from("site_settings")
          .select("key, value")
          .eq("key", "telegram_url")
          .maybeSingle(),
      ]);

      if (sessionsRes.data && sessionsRes.data.length > 0) {
        setSessions(sessionsRes.data as GDSession[]);
      }
      if (topicsRes.data && topicsRes.data.length > 0) {
        setTopics(topicsRes.data as GDTopic[]);
      }
      if (settingsRes.data?.value) {
        setTelegramUrl(settingsRes.data.value);
      }
    }

    loadLiveContent();
  }, []);

  const showNotice = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleJoinSession = (session: GDSession) => {
    if (session.status === "cancelled") {
      showNotice(`"${session.title}" has been cancelled.`);
      return;
    }

    if (session.zoom_url && session.zoom_url.startsWith("http")) {
      window.open(session.zoom_url, "_blank", "noopener,noreferrer");
    } else {
      showNotice(
        `Zoom link for "${session.title}" has not been pasted by the Admin yet. Please check back before the session or contact Telegram Support.`
      );
    }
  };

  const handleTelegramClick = (url: string) => {
    const cleanUrl = url.trim();
    if (
      cleanUrl &&
      cleanUrl !== "https://t.me/" &&
      cleanUrl.startsWith("http")
    ) {
      window.open(cleanUrl, "_blank", "noopener,noreferrer");
    } else {
      showNotice(
        "Owner Telegram link is not configured yet. An administrator can set the live Telegram URL via Admin Login."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Sticky Dark Navy Navbar */}
      <Navbar
        telegramUrl={telegramUrl}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onTelegramClick={handleTelegramClick}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner */}
        <HeroSection />

        {/* Overlapping Floating Statistics Cards */}
        <StatsRow stats={DEFAULT_STATS} />

        {/* Upcoming GD Sessions Section */}
        <section
          id="upcoming-sessions"
          aria-labelledby="upcoming-sessions-heading"
          className="pt-11 sm:pt-14 pb-6 px-4 sm:px-6"
        >
          <div className="max-w-[980px] mx-auto">
            <h2
              id="upcoming-sessions-heading"
              className="text-center text-xl sm:text-2xl font-extrabold text-[#0A1628] tracking-tight"
            >
              Upcoming GD Sessions
            </h2>

            {/* 4-Card Responsive Grid (3 Session Cards + 1 Telegram Support Gradient Card) */}
            <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {sessions.slice(0, 3).map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onJoinSession={handleJoinSession}
                />
              ))}

              <TelegramSupportCard
                telegramUrl={telegramUrl}
                onTelegramClick={handleTelegramClick}
              />
            </div>
          </div>
        </section>

        {/* How It Works 3-Step Section */}
        <HowItWorks steps={HOW_IT_WORKS_STEPS} />

        {/* Popular GD Topics 4-Card Carousel Section */}
        <PopularTopics topics={topics} />
      </main>

      {/* Deep Navy Footer */}
      <Footer />

      {/* Admin Login & Settings Modal */}
      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        currentTelegramUrl={telegramUrl}
        onUpdateTelegramUrl={(newUrl) => setTelegramUrl(newUrl)}
      />

      {/* Non-Intrusive Toast Notification Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#0A1628] text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl border border-white/15 flex items-center justify-between gap-3"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-brand-sky font-semibold hover:underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
