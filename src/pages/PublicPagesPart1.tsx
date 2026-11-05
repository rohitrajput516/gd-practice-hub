import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Video, Send, Search, Calendar, AlertCircle,
  LayoutGrid, List, Flame, Star, Radio, Mic, PhoneOff
} from 'lucide-react';
import { PublicLayout, openTelegramSupport, joinZoomSession } from '../components/Layout';
import { api, isValidHttps } from '../lib/supabase';

/* ============================================================================
   PAGE 1: HOME PAGE (100% Exact Match to Image 1000085022_2.png)
   ============================================================================ */
export const HomePage: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    api.list('sessions', true).then((rows) => setSessions(rows.slice(0, 3)));
  }, []);

  const participants = [
    { name: 'Aarav', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
    { name: 'Rohan', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { name: 'Ananya', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80' },
    { name: 'Priya', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80' },
    { name: 'Neha', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { name: 'Sneha', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80' },
    { name: 'Vikram', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
    { name: 'Kabir', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80' },
    { name: 'Aditi', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80' },
  ];

  return (
    <PublicLayout>
      {/* HERO SECTION WITH CONSTELLATION MESH, DOTTED RINGS & 3D SILVER LAPTOP */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EDF3FC] via-[#F2F6FD] to-[#E5EEFB] border-b border-slate-200/60 pt-10 pb-16 lg:py-20">
        
        {/* Bottom-Left Constellation Network Mesh SVG (Exact match to Image 2) */}
        <svg
          className="absolute bottom-0 left-0 w-72 sm:w-96 h-56 text-slate-400/35 pointer-events-none"
          viewBox="0 0 320 220"
          fill="none"
        >
          <path
            d="M10 190 L65 140 L130 165 L195 120 L260 185 L310 210 M65 140 L95 75 L165 100 L130 165 M10 110 L65 140 M95 75 L40 45"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {[
            [10, 190], [65, 140], [130, 165], [195, 120], [260, 185],
            [95, 75], [165, 100], [10, 110], [40, 45]
          ].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#94A3B8" fillOpacity="0.5" />
          ))}
        </svg>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: Headline, Description & Pill Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5"
          >
            <h1 className="text-[34px] sm:text-[46px] font-extrabold text-[#0A1128] leading-[1.12] tracking-tight">
              Master Group<br />
              Discussions, Speak<br />
              with Absolute<br />
              Confidence.
            </h1>

            <p className="text-slate-700 text-sm sm:text-base max-w-lg leading-relaxed">
              Join real-time online Group Discussions, improve your communication skills, and prepare for interviews on India’s premier GD practice platform.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                to="/schedule"
                className="px-7 py-3 rounded-full bg-[#1D6BF3] hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition"
              >
                Explore GD Sessions
              </Link>
              <Link
                to="/topics"
                className="px-7 py-3 rounded-full bg-white/90 hover:bg-white text-[#1D6BF3] border-[1.5px] border-[#3B82F6] font-bold text-sm shadow-sm transition"
              >
                Browse GD Topics
              </Link>
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#0A1128] pt-1">
              No experience required • Live Mock GDs
            </p>
          </motion.div>

          {/* Right Column: 3D Isometric Silver Laptop + Dotted Rings + Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 relative flex items-center justify-center py-6"
          >
            {/* Background Dotted Concentric Circles & Radar Waves SVG */}
            <svg
              className="absolute inset-0 w-full h-full max-w-[520px] max-h-[520px] m-auto pointer-events-none"
              viewBox="0 0 500 500"
              fill="none"
            >
              {/* Outer & Inner Dashed Orbit Circles */}
              <circle cx="255" cy="245" r="215" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.55" />
              <circle cx="255" cy="245" r="182" stroke="#3B82F6" strokeWidth="1.3" strokeDasharray="3 5" opacity="0.45" />
              <circle cx="255" cy="245" r="148" stroke="#93C5FD" strokeWidth="1.2" opacity="0.4" />

              {/* Top-Right Radar Wave Rings */}
              <circle cx="395" cy="95" r="18" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
              <circle cx="395" cy="95" r="32" stroke="#93C5FD" strokeWidth="1.5" opacity="0.45" />
              <circle cx="395" cy="95" r="46" stroke="#93C5FD" strokeWidth="1.5" opacity="0.3" />
              <circle cx="395" cy="95" r="60" stroke="#93C5FD" strokeWidth="1.2" opacity="0.18" />

              {/* Floating Blue Orbit Dots */}
              <circle cx="155" cy="60" r="4" fill="#2563EB" opacity="0.7" />
              <circle cx="290" cy="34" r="3.5" fill="#60A5FA" opacity="0.8" />
              <circle cx="70" cy="170" r="3" fill="#3B82F6" opacity="0.5" />
              <circle cx="445" cy="195" r="4.5" fill="#60A5FA" opacity="0.7" />
              <circle cx="465" cy="225" r="3" fill="#93C5FD" opacity="0.7" />
              <circle cx="110" cy="395" r="3.5" fill="#60A5FA" opacity="0.6" />
              <circle cx="365" cy="435" r="5" fill="#1D4ED8" opacity="0.85" />
            </svg>

            {/* 3D Tilted Laptop Container */}
            <div
              className="relative w-full max-w-[460px] select-none"
              style={{ perspective: '1200px' }}
            >
              {/* Floating Red "Live GD Session" Pill (Top-Left of Screen) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 left-0 sm:-left-4 z-30 flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl shadow-rose-600/30"
              >
                <Video className="w-3.5 h-3.5 fill-white" />
                <span>Live GD Session</span>
              </motion.div>

              {/* Floating Blue "Join Zoom Meeting ->" Pill (Right of Screen) */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity }}
                className="absolute right-0 sm:-right-5 bottom-24 z-30"
              >
                <Link
                  to="/schedule"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#1D6BF3] to-[#2563EB] hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-xl shadow-blue-600/40 border border-blue-400/40"
                >
                  <span>Join Zoom Meeting</span>
                  <span>→</span>
                </Link>
              </motion.div>

              {/* Floating Frosted Glass "zoom" Card (Bottom-Right) */}
              <div className="absolute -bottom-3 right-2 sm:right-0 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1D6BF3] text-white flex items-center justify-center shadow-sm">
                  <Video className="w-4 h-4 fill-white" />
                </div>
                <span className="font-extrabold text-[#1D6BF3] text-base tracking-tight">
                  zoom
                </span>
              </div>

              {/* 3D Tilted Laptop Assembly */}
              <div
                className="relative mx-auto transition-transform duration-500"
                style={{
                  transform: 'rotateY(-18deg) rotateX(8deg) rotateZ(-2deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Laptop Lid / Dark Bezel Screen */}
                <div className="bg-[#0F172A] rounded-t-2xl p-2.5 pb-2 border-[3px] border-[#334155] shadow-2xl relative">
                  {/* Top Camera Notch & Window Dots */}
                  <div className="flex items-center justify-between px-2 pb-1.5">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="text-[8px] text-slate-400 font-semibold">REC ●</span>
                  </div>

                  {/* 3x3 Video Call Grid inside Laptop Screen */}
                  <div className="grid grid-cols-3 gap-1.5 bg-[#1E293B] p-1.5 rounded-lg">
                    {participants.map((p, i) => (
                      <div
                        key={i}
                        className={`relative h-16 sm:h-20 rounded overflow-hidden bg-slate-800 ${
                          i === 4 ? 'ring-2 ring-emerald-400' : ''
                        }`}
                      >
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/65 text-white text-[9px] font-medium px-1.5 py-0.5 rounded">
                          {p.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Laptop Bottom Call Control Bar */}
                  <div className="mt-1.5 px-3 py-1 bg-[#090D16] rounded flex items-center justify-center gap-4 text-slate-300">
                    <Mic className="w-3 h-3 text-emerald-400" />
                    <Video className="w-3 h-3 text-blue-400" />
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[8px] font-bold flex items-center gap-1">
                      <PhoneOff className="w-2.5 h-2.5" /> End
                    </span>
                  </div>
                </div>

                {/* 3D Silver Metallic Keyboard Deck & Trackpad Base */}
                <div
                  className="relative mx-auto w-[108%] -left-[4%] h-14 bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-b-2xl shadow-[0_22px_35px_rgba(15,23,42,0.35)] border-t border-white px-5 pt-2 flex flex-col justify-between"
                  style={{
                    transform: 'rotateX(58deg)',
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Dark Keyboard Key Rows */}
                  <div className="w-full h-6 bg-[#1E293B] rounded p-1 grid grid-cols-12 gap-0.5 shadow-inner">
                    {Array.from({ length: 24 }).map((_, k) => (
                      <span key={k} className="bg-[#334155] rounded-[1px] h-1.5" />
                    ))}
                  </div>
                  {/* Silver Trackpad */}
                  <div className="w-20 h-3.5 mx-auto mb-1 bg-[#B8C4D4] border border-slate-400/70 rounded-sm shadow-inner" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* UPCOMING VIDEO GD SESSIONS (Exact match to Image 2) */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-center text-[#0A1128] mb-10">
            Upcoming Video GD Sessions
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_4px_20px_rgba(10,17,40,0.05)] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-extrabold text-[#0A1128] leading-snug mb-1.5">
                    {s.title.split(':')[0]}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4">
                    {s.scheduled_date} • {s.start_time}
                  </p>

                  {/* Light Blue Zoom Room Bar */}
                  <div className="bg-[#E9F2FF] text-[#0A1128] px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-bold mb-6">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1D6BF3] text-white flex items-center justify-center">
                        <Video className="w-3.5 h-3.5 fill-white" />
                      </span>
                      <span>{s.platform || 'Zoom Room'}</span>
                    </span>
                    <Video className="w-4 h-4 text-[#1D6BF3] fill-[#1D6BF3]" />
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    to={`/session?id=${s.id}`}
                    className="flex-1 text-center py-2.5 rounded-full border border-slate-500 text-xs font-bold text-[#0A1128] hover:bg-slate-50 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => joinZoomSession(s.zoom_url, s.status)}
                    className="flex-1 py-2.5 rounded-full bg-[#0A142F] hover:bg-blue-700 text-white text-xs font-bold transition"
                  >
                    Join Session
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TELEGRAM SUPPORT SECTION (Exact match to Image 2) */}
      <section className="py-14 bg-[#EBF1FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <h2 className="text-3xl font-extrabold text-[#0A1128] mb-2">
              Telegram Support
            </h2>
            <p className="text-slate-700 text-base">
              Have a doubt? Ask Owner for Any Doubt
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#2AABEE] text-white flex items-center justify-center mx-auto mb-3.5 shadow-md">
                <Send className="w-6 h-6 -ml-0.5" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0A1128] mb-1">
                Ask Owner for Any Doubt 👋
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Get 1-on-1 support directly from the founder.
              </p>
              <button
                onClick={openTelegramSupport}
                className="w-full py-3.5 rounded-xl bg-[#0A142F] hover:bg-blue-700 text-white font-bold text-xs tracking-wide transition"
              >
                Message on Telegram
              </button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

/* ============================================================================
   PAGE 2: GD SCHEDULE PAGE
   ============================================================================ */
export const SchedulePage: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [secLeft, setSecLeft] = useState(2 * 3600 + 45 * 60 + 10);

  useEffect(() => {
    api.list('sessions', true).then(setSessions);
    const timer = setInterval(() => {
      setSecLeft((prev) => (prev > 0 ? prev - 1 : 9900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = String(Math.floor(secLeft / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secLeft % 60).padStart(2, '0');

  const featured = sessions.find((s) => s.is_featured || s.status === 'Live') || sessions[0];
  const filtered = sessions.filter((s) => {
    const mSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const mStatus = statusFilter === 'All Statuses' || s.status === statusFilter;
    return mSearch && mStatus;
  });

  const upcoming = filtered.filter((s) => s.status === 'Upcoming' || s.status === 'Live');
  const past = filtered.filter((s) => s.status === 'Completed' || s.status === 'Cancelled');

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#0A1128] mb-1">GD Schedule</h1>
          <p className="text-sm text-slate-600">
            Stay on top of upcoming discussions, plan your practice, and join live sessions.
          </p>
        </div>

        {featured && (
          <div className="rounded-2xl bg-gradient-to-r from-[#040B24] via-[#0B1E54] to-[#0D3B9E] text-white p-7 sm:p-8 shadow-xl mb-7 grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#10B981] text-[#042F2E] text-[11px] font-extrabold uppercase">
                  FEATURED UPCOMING GD
                </span>
                <span className="px-3 py-1 rounded-full border border-cyan-400/50 bg-cyan-950/50 text-cyan-300 text-[11px] font-bold flex items-center gap-1">
                  <Radio className="w-3 h-3" /> LIVE COUNTDOWN
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">{featured.title.split(':')[0]}</h2>
              <p className="text-xs text-blue-200 font-medium">
                {featured.scheduled_date}, {featured.start_time} | {featured.platform}
              </p>
              <p className="text-xs text-slate-200 leading-relaxed">{featured.description}</p>
            </div>

            <div className="md:col-span-3 text-center">
              <p className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold mb-2">
                STARTS IN
              </p>
              <div className="flex items-center justify-center gap-1.5 font-extrabold text-lg">
                <span className="bg-white/15 border border-white/25 px-3 py-2 rounded-lg">{hrs}h</span>
                <span>:</span>
                <span className="bg-white/15 border border-white/25 px-3 py-2 rounded-lg">{mins}m</span>
                <span>:</span>
                <span className="bg-white/15 border border-white/25 px-3 py-2 rounded-lg">{secs}s</span>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2.5">
              <button
                onClick={() => joinZoomSession(featured.zoom_url, featured.status)}
                className="w-full py-2.5 rounded-lg bg-[#1D7AFC] hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Video className="w-4 h-4" /> Join Session
              </button>
              <Link
                to={`/session?id=${featured.id}`}
                className="w-full py-2.5 rounded-lg border border-blue-300/60 hover:bg-white/10 text-white text-center font-bold text-xs"
              >
                View Details
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="relative flex-1 min-w-[220px] max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sessions..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
            >
              <option>All Statuses</option>
              <option value="Live">Live</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex border border-slate-200 rounded-lg bg-white overflow-hidden">
              <button className="p-2 bg-slate-100 text-slate-800"><LayoutGrid className="w-4 h-4" /></button>
              <button className="p-2 text-slate-500"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-extrabold text-[#0A1128] mb-3">Other Upcoming Sessions</h3>
        <div className="space-y-3 mb-8">
          {upcoming.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div>
                <h4 className="font-bold text-base text-[#0A1128]">{s.title}</h4>
                <p className="text-xs text-slate-500">
                  {s.scheduled_date}, {s.start_time} | {s.participants || '12 Participants'}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold uppercase">
                  {s.status}
                </span>
                <Link
                  to={`/session?id=${s.id}`}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50"
                >
                  View Details
                </Link>
                <button
                  onClick={() => joinZoomSession(s.zoom_url, s.status)}
                  disabled={!isValidHttps(s.zoom_url)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold ${
                    isValidHttps(s.zoom_url)
                      ? 'bg-[#1D7AFC] text-white'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Join Session
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-extrabold text-[#0A1128] mb-3">Past Sessions</h3>
        <div className="space-y-3 mb-10">
          {past.map((s) => (
            <div
              key={s.id}
              className="bg-[#CBD5E1]/70 border border-slate-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-bold text-base text-slate-800">{s.title}</h4>
                <p className="text-xs text-slate-600">
                  {s.scheduled_date}, {s.start_time}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold uppercase">
                  COMPLETED
                </span>
                <Link
                  to={`/session?id=${s.id}`}
                  className="px-3.5 py-2 rounded-lg border border-slate-500 text-xs font-semibold text-slate-800"
                >
                  View Details
                </Link>
                <button disabled className="px-3.5 py-2 rounded-lg bg-slate-400/60 text-slate-600 text-xs font-semibold cursor-not-allowed">
                  Join Session
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#D8EAFF] border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#0A1128]">Ask Owner for Any Doubt 💬</h3>
            <p className="text-xs text-slate-700">
              Have a doubt? Ask Owner for Any Doubt. Get 1-on-1 support directly from the founder.
            </p>
          </div>
          <button
            onClick={openTelegramSupport}
            className="px-5 py-2.5 rounded-lg bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shrink-0 shadow"
          >
            <Send className="w-4 h-4" /> Ask Owner for Any Doubt
          </button>
        </div>
      </div>
    </PublicLayout>
  );
};

/* ============================================================================
   PAGE 3: SESSION DETAILS PAGE
   ============================================================================ */
export const SessionDetailsPage: React.FC = () => {
  const [params] = useSearchParams();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    api.list('sessions', true).then((rows) => {
      const found = rows.find((r: any) => r.id === params.get('id')) || rows[0];
      setSession(found);
    });
  }, [params]);

  if (!session) return null;

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-6">
        <div className="text-xs text-slate-500 mb-3">
          <Link to="/schedule" className="hover:underline">GD Schedule</Link> / Session Details /{' '}
          <span className="text-slate-900 font-semibold">{session.title.split(':')[0]}</span>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden bg-cover bg-center p-7 sm:p-10 text-white shadow-lg mb-8"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(10,17,40,0.92) 0%, rgba(10,17,40,0.65) 100%), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80')",
          }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-400 text-emerald-950 text-xs font-extrabold mb-3">
            ● {session.status === 'Live' ? 'LIVE NOW' : session.status.toUpperCase()}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold max-w-2xl leading-tight mb-3">
            {session.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mb-6">
            Date &amp; Time: {session.scheduled_date}, {session.start_time} | {session.platform}
          </p>

          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => joinZoomSession(session.zoom_url, session.status)}
              className="px-5 py-2.5 rounded-lg bg-[#1D7AFC] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow"
            >
              <Video className="w-4 h-4" /> Join Session
            </button>
            <button
              onClick={() => alert('Added reminder to your calendar!')}
              className="px-5 py-2.5 rounded-lg bg-[#0A1128]/80 border border-white/40 text-white font-semibold text-xs"
            >
              Add to Calendar
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#0A1128] mb-2">About This Session</h2>
              <p className="text-sm text-slate-700 leading-relaxed">{session.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#0A1128] mb-1">Preparation Points</h2>
              <p className="text-xs text-slate-500 mb-3">Article-style, structured, readable</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-800">
                {(session.preparation_points || '').split('\n').filter(Boolean).map((pt: string, i: number) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#E8F1FC] border border-blue-200 rounded-xl p-5">
              <h3 className="font-extrabold text-base text-[#0A1128] flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-blue-700" /> Discussion Rules &amp; Guidelines
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-800">
                {(session.special_instructions || '').split('\n').filter(Boolean).map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-[#0A1128]">Session Information</h3>
              <div className="flex items-start gap-3 text-xs">
                <Calendar className="w-4 h-4 text-slate-500 mt-0.5" />
                <div>
                  <p className="text-slate-500">Time &amp; Date</p>
                  <p className="font-bold text-slate-900">{session.scheduled_date}, {session.start_time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs border-t border-slate-100 pt-3">
                <Video className="w-4 h-4 text-slate-500 mt-0.5" />
                <div>
                  <p className="text-slate-500">Platform</p>
                  <p className="font-bold text-slate-900">Zoom</p>
                </div>
              </div>
              <div className="text-xs border-t border-slate-100 pt-3">
                <p className="text-slate-500">Expected Participants</p>
                <p className="font-bold text-slate-900 text-sm">{session.participants || '12–15'}</p>
              </div>

              <div className="bg-[#DFF0FF] rounded-xl p-4 space-y-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1D88E5] text-white flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-sm text-[#0A1128]">Ask Owner for Any Doubt</h4>
                <p className="text-[11px] text-slate-700">
                  Got a question about this session? Get 1-on-1 support from the founder.
                </p>
                <button
                  onClick={openTelegramSupport}
                  className="w-full py-2 rounded-lg bg-[#0D74E7] hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Ask Owner for Any Doubt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

/* ============================================================================
   PAGE 4: GD TOPICS LIBRARY
   ============================================================================ */
export const TopicsPage: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All Topics');

  useEffect(() => {
    api.list('topics', true).then(setTopics);
  }, []);

  const categories = [
    'All Topics',
    'Current Affairs',
    'AI & Tech',
    'Education',
    'Social Issues',
    'Business',
    'Abstract',
    'Interview & Placement GD',
  ];

  const featured = topics.filter((t) => t.is_featured).slice(0, 3);
  const filtered = topics.filter((t) => {
    const mCat =
      activeCat === 'All Topics' ||
      t.category.toLowerCase().includes(activeCat.toLowerCase());
    const mSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return mCat && mSearch;
  });

  const TopicCard = ({ t }: { t: any }) => (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
    >
      <div>
        <div className="relative h-40 bg-slate-200">
          <img src={t.image_url} alt={t.title} className="w-full h-full object-cover" />
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
              t.badge === 'RECOMMENDED'
                ? 'bg-amber-300 text-amber-950'
                : 'bg-[#E11D48] text-white'
            }`}
          >
            {t.badge === 'RECOMMENDED' ? <Star className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
            {t.badge || 'POPULAR'}
          </span>
        </div>
        <div className="p-5">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold mb-2">
            {t.category}
          </span>
          <h3 className="font-extrabold text-lg text-[#0A1128] leading-snug mb-1.5">{t.title}</h3>
          <p className="text-xs text-slate-600 mb-3">{t.description}</p>
        </div>
      </div>

      <div className="px-5 pb-5">
        <p className="text-xs font-semibold text-slate-700 mb-3">
          Difficulty: <span className="font-bold">{t.difficulty}</span> | Est. Time:{' '}
          <span className="font-bold">{t.est_time}</span>
        </p>
        <Link
          to="/schedule"
          className="block w-full py-2.5 rounded-lg bg-[#155EEF] hover:bg-blue-700 text-white text-center font-bold text-xs transition"
        >
          Practice Now
        </Link>
      </div>
    </motion.div>
  );

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        <h1 className="text-3xl font-extrabold text-[#0A1128] mb-1">GD Topics Library</h1>
        <p className="text-sm text-slate-600 mb-6">
          A searchable, filterable library of GD topics to practice, prepare, and level up your skills.
        </p>

        <h2 className="text-lg font-extrabold text-[#0A1128] flex items-center gap-1.5 mb-4">
          <span className="text-amber-500">★</span> Featured Topics
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featured.map((t) => (
            <TopicCard key={t.id} t={t} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
            />
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
                activeCat === cat
                  ? 'bg-[#0A142F] text-white border-[#0A142F]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-extrabold text-[#0A1128] mb-4">All Topics</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {filtered.map((t) => (
            <TopicCard key={t.id} t={t} />
          ))}
        </div>

        <div className="bg-[#155EEF] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <h3 className="text-xl font-extrabold">Ask Owner for Any Doubt</h3>
          <button
            onClick={openTelegramSupport}
            className="px-5 py-2.5 rounded-lg bg-white text-[#0A1128] font-bold text-xs hover:bg-slate-100"
          >
            Ask Owner for Any Doubt
          </button>
        </div>
      </div>
    </PublicLayout>
  );
};
