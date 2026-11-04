import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Video, Send, Search, Calendar, Clock, AlertCircle,
  LayoutGrid, List, Flame, Star, Radio
} from 'lucide-react';
import { PublicLayout, openTelegramSupport, joinZoomSession } from '../components/Layout';
import { api, isValidHttps } from '../lib/supabase';

/* ============================================================================
   PAGE 1: HOME PAGE (Design 6 - Video-Call Centric - Image 1000085022.png)
   ============================================================================ */
export const HomePage: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    api.list('sessions', true).then((rows) => setSessions(rows.slice(0, 3)));
  }, []);

  return (
    <PublicLayout>
      {/* Hero Section with Connected Dots & Tilted 3D Laptop Zoom Frame */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EBF2FF] via-[#F3F7FF] to-[#E6F0FF] border-b border-slate-200/70 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-5"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A1128] leading-[1.12] tracking-tight">
              Master Group Discussions, Speak with Absolute Confidence.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Join real-time online Group Discussions, improve your communication skills, and prepare for interviews on India’s premier GD practice platform.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-1">
              <Link
                to="/schedule"
                className="px-6 py-3 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition"
              >
                Explore GD Sessions
              </Link>
              <Link
                to="/topics"
                className="px-6 py-3 rounded-full bg-white hover:bg-blue-50 text-blue-600 border border-blue-500 font-semibold text-sm transition"
              >
                Browse GD Topics
              </Link>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#0A1128] pt-1">
              No experience required • Live Mock GDs
            </p>
          </motion.div>

          {/* Right 3D Laptop Zoom Mockup (Exact match to Image 1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg bg-[#111827] rounded-2xl p-3 shadow-2xl border-4 border-slate-700 transform lg:-rotate-2">
              {/* Floating Red Live Pill */}
              <div className="absolute -top-4 -left-4 z-20 flex items-center gap-2 bg-[#E11D48] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                <Video className="w-3.5 h-3.5" />
                <span>Live GD Session</span>
              </div>

              {/* 3x3 Video Call Participant Grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2 rounded-xl">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
                  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
                  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80',
                ].map((src, i) => (
                  <div key={i} className="relative h-20 sm:h-24 rounded-lg overflow-hidden bg-slate-800">
                    <img src={src} alt="Student" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                      Student {i + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Floating Blue Join Zoom Pill */}
              <Link
                to="/schedule"
                className="absolute -right-4 bottom-14 z-20 bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2"
              >
                <span>Join Zoom Meeting →</span>
              </Link>

              {/* Floating White Zoom Badge */}
              <div className="absolute -bottom-5 right-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <Video className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-blue-600 text-sm tracking-wide">zoom</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Video GD Sessions (3-Column Cards matching Image 1) */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0A1128] mb-10">
            Upcoming Video GD Sessions
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-extrabold text-[#0A1128] leading-snug mb-2">
                    {s.title.split(':')[0]}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4">
                    {s.scheduled_date} • {s.start_time}
                  </p>
                  <div className="bg-[#EAF2FF] text-[#1D4ED8] px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold mb-6">
                    <span className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      {s.platform || 'Zoom Room'}
                    </span>
                    <Video className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    to={`/session?id=${s.id}`}
                    className="flex-1 text-center py-2.5 rounded-full border border-slate-400 text-xs font-bold text-slate-800 hover:bg-slate-50"
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

      {/* Bottom Telegram Support Section (Exact 2-column layout from Image 1) */}
      <section className="py-14 bg-[#EDF3FC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0A1128] mb-2">Telegram Support</h2>
            <p className="text-slate-600 text-base">Have a doubt? Ask Owner for Any Doubt</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 text-center max-w-md mx-auto w-full">
            <div className="w-12 h-12 rounded-full bg-[#2AABEE] text-white flex items-center justify-center mx-auto mb-3 shadow">
              <Send className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0A1128] mb-1">
              Ask Owner for Any Doubt 👋
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Get 1-on-1 support directly from the founder.
            </p>
            <button
              onClick={openTelegramSupport}
              className="w-full py-3 rounded-xl bg-[#0A142F] hover:bg-blue-600 text-white font-bold text-xs transition"
            >
              Ask Owner for Any Doubt
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

/* ============================================================================
   PAGE 2: GD SCHEDULE PAGE (Design 6 - Featured Next Session + List - Image 2)
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

        {/* Dark Glowing Featured Next Session Card with Countdown (Image 2) */}
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

        {/* Search & Filter Row */}
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

        {/* Other Upcoming Sessions */}
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

        {/* Past Sessions */}
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

        {/* Light Blue Telegram Banner (Exact match to Image 2) */}
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
   PAGE 3: SESSION DETAILS PAGE (Design 2 - Full-Width Banner - Image 3)
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

        {/* Full-Width Photo Header Banner matching Image 3 */}
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

        {/* 2-Column Content Layout matching Image 3 */}
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
   PAGE 4: GD TOPICS LIBRARY (Design 9 - Featured Topics + Grid - Image 4)
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

        {/* Search & Filter Pills matching Image 4 */}
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

        {/* Solid Blue Bottom Telegram Banner matching Image 4 */}
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
