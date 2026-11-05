import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Video, Send, Search, Calendar, AlertCircle,
  LayoutGrid, List, Flame, Star, Radio
} from 'lucide-react';
import { PublicLayout, openTelegramSupport, joinZoomSession } from '../components/Layout';
import { api, isValidHttps } from '../lib/supabase';

/* ============================================================================
   PAGE 1: HOME PAGE (100% Pixel-Accurate Match to 1000085022_3.png)
   ============================================================================ */
export const HomePage: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.list('sessions', true).then((rows) => setSessions(rows.slice(0, 3)));
  }, []);

  const videoFaces = [
    { name: 'Aarav', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
    { name: 'Rohan', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { name: 'Ananya', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80' },
    { name: 'Priya', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80' },
    { name: 'Neha', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { name: 'Sneha', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80' },
    { name: 'Vikram', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
    { name: 'Kabir', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80' },
    { name: 'Aditi', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80' },
  ];

  // Generate isometric keyboard keys rows
  const keyRows = [0, 1, 2, 3];
  const keyCols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <PublicLayout>
      {/* HERO SECTION - Side by Side (md:grid-cols-12) matching 1000085022_3.png */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EDF3FC] via-[#F1F6FE] to-[#E4EEFB] border-b border-slate-200/70 py-10 md:py-14">
        
        {/* Bottom-Left Constellation Network Mesh SVG */}
        <svg
          className="absolute bottom-0 left-0 w-72 md:w-96 h-52 text-slate-400/40 pointer-events-none"
          viewBox="0 0 360 220"
          fill="none"
        >
          <path
            d="M0 150 L45 125 L95 160 L155 135 L215 175 L285 155 L340 215 M45 125 L75 70 L140 95 L155 135 M95 160 L70 215 M155 135 L185 215 M215 175 L245 215 M0 85 L45 125"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          {[
            [45, 125], [95, 160], [155, 135], [215, 175], [285, 155],
            [75, 70], [140, 95], [70, 215], [185, 215]
          ].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#94A3B8" fillOpacity="0.55" />
          ))}
        </svg>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center relative z-10">
          
          {/* Left Column (5 Cols): Headline, Subtitle, Buttons */}
          <div className="md:col-span-5 space-y-4">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#0A1128] leading-[1.12] tracking-tight">
              Master Group<br />
              Discussions, Speak<br />
              with Absolute<br />
              Confidence.
            </h1>

            <p className="text-slate-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-md">
              Join real-time online Group Discussions, improve your communication skills, and prepare for interviews on India’s premier GD practice platform.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/schedule"
                className="px-6 py-2.5 rounded-full bg-[#1D6BF3] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition"
              >
                Explore GD Sessions
              </Link>
              <Link
                to="/topics"
                className="px-6 py-2.5 rounded-full bg-white/80 hover:bg-white text-[#1D6BF3] border-[1.5px] border-[#2563EB] font-bold text-xs sm:text-sm transition"
              >
                Browse GD Topics
              </Link>
            </div>

            <p className="text-xs sm:text-[13px] font-bold text-[#0A1128] pt-1">
              No experience required • Live Mock GDs
            </p>
          </div>

          {/* Right Column (7 Cols): Exact 3D Isometric Silver Laptop Illustration */}
          <div className="md:col-span-7 relative flex items-center justify-center">
            <div className="w-full max-w-[590px]">
              <svg
                viewBox="0 0 640 470"
                className="w-full h-auto overflow-visible drop-shadow-sm select-none"
              >
                <defs>
                  {/* Laptop Drop Shadow */}
                  <filter id="laptopShadow" x="-20%" y="-20%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.28" />
                  </filter>
                  <filter id="badgeShadow" x="-20%" y="-20%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.22" />
                  </filter>

                  {/* Metallic Silver Gradients for 3D Keyboard Base */}
                  <linearGradient id="silverTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F1F5F9" />
                    <stop offset="50%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#94A3B8" />
                  </linearGradient>
                  <linearGradient id="silverEdgeFront" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94A3B8" />
                    <stop offset="50%" stopColor="#64748B" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                  <linearGradient id="silverEdgeSide" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#64748B" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  <linearGradient id="redPillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#F43F5E" />
                  </linearGradient>
                  <linearGradient id="bluePillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1D6BF3" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>

                {/* 1. CONCENTRIC DOTTED ORBIT CIRCLES & RADAR WAVES */}
                <circle cx="365" cy="225" r="205" fill="none" stroke="#60A5FA" strokeWidth="1.4" strokeDasharray="3 6" opacity="0.65" />
                <circle cx="365" cy="225" r="178" fill="none" stroke="#3B82F6" strokeWidth="1.3" strokeDasharray="4 6" opacity="0.55" />
                <circle cx="365" cy="225" r="152" fill="none" stroke="#93C5FD" strokeWidth="1.2" opacity="0.5" />

                {/* Top-Right Radar Concentric Waves */}
                <g opacity="0.7">
                  <circle cx="525" cy="88" r="16" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
                  <circle cx="525" cy="88" r="29" fill="none" stroke="#93C5FD" strokeWidth="1.5" />
                  <circle cx="525" cy="88" r="43" fill="none" stroke="#93C5FD" strokeWidth="1.4" opacity="0.75" />
                  <circle cx="525" cy="88" r="58" fill="none" stroke="#93C5FD" strokeWidth="1.2" opacity="0.45" />
                </g>

                {/* Floating Orbit Dots */}
                <circle cx="290" cy="36" r="4" fill="#3B82F6" opacity="0.8" />
                <circle cx="408" cy="24" r="3" fill="#60A5FA" opacity="0.7" />
                <circle cx="490" cy="48" r="4.5" fill="#60A5FA" opacity="0.8" />
                <circle cx="170" cy="145" r="3" fill="#93C5FD" opacity="0.7" />
                <circle cx="156" cy="235" r="3" fill="#60A5FA" opacity="0.5" />
                <circle cx="562" cy="175" r="4" fill="#60A5FA" opacity="0.7" />
                <circle cx="585" cy="205" r="3.5" fill="#93C5FD" opacity="0.7" />
                <circle cx="556" cy="252" r="5.5" fill="#60A5FA" opacity="0.55" />
                <circle cx="485" cy="405" r="5.5" fill="#1D4ED8" opacity="0.9" />
                <circle cx="245" cy="392" r="3" fill="#60A5FA" opacity="0.6" />

                {/* 2. 3D LAPTOP SCREEN LID & BEZEL (Tilted Isometric Back) */}
                {/* Silver Lid Back Rim */}
                <polygon
                  points="240,42 544,78 515,288 216,242"
                  fill="#94A3B8"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Dark Screen Bezel */}
                <polygon
                  points="237,45 540,81 511,288 213,242"
                  fill="#0F172A"
                  stroke="#1E293B"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />

                {/* Top Bezel Webcam Dot & Status */}
                <circle cx="385" cy="66" r="2.5" fill="#475569" />
                <text x="505" y="86" fill="#94A3B8" fontSize="7" fontWeight="bold">● V0:08</text>

                {/* 3. EMBEDDED 3x3 STUDENT VIDEO CALL GRID (Isometric Skewed Matrix) */}
                <g transform="matrix(0.955, 0.114, -0.095, 0.94, 242, 60)">
                  {/* Screen Inner Canvas */}
                  <rect x="0" y="0" width="292" height="186" rx="4" fill="#1E293B" />

                  {videoFaces.map((p, idx) => {
                    const col = idx % 3;
                    const row = Math.floor(idx / 3);
                    const x = 4 + col * 96;
                    const y = 4 + row * 54;
                    return (
                      <g key={idx}>
                        <clipPath id={`vidClip${idx}`}>
                          <rect x={x} y={y} width="92" height="50" rx="3" />
                        </clipPath>
                        <rect x={x} y={y} width="92" height="50" rx="3" fill="#334155" />
                        <image
                          href={p.img}
                          x={x}
                          y={y - 6}
                          width="92"
                          height="64"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath={`url(#vidClip${idx})`}
                        />
                        {/* Participant Name Tag */}
                        <rect x={x + 3} y={y + 36} width="34" height="11" rx="2" fill="rgba(0,0,0,0.65)" />
                        <text x={x + 6} y={y + 44} fill="#FFFFFF" fontSize="6.5" fontWeight="600">
                          {p.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* Bottom Zoom Call Control Bar */}
                  <rect x="0" y="166" width="292" height="20" fill="#090E17" />
                  <circle cx="95" cy="176" r="4" fill="#334155" />
                  <circle cx="115" cy="176" r="4" fill="#334155" />
                  <circle cx="135" cy="176" r="4" fill="#10B981" />
                  <circle cx="155" cy="176" r="4" fill="#334155" />
                  <rect x="242" y="171" width="38" height="10" rx="4" fill="#E11D48" />
                  <text x="248" y="178" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">End Call</text>
                </g>

                {/* 4. 3D SILVER METALLIC KEYBOARD DECK & TRACKPAD (Projecting Forward-Left) */}
                <g filter="url(#laptopShadow)">
                  {/* Top Aluminum Deck Surface */}
                  <polygon
                    points="213,242 511,288 386,374 72,315"
                    fill="url(#silverTop)"
                    stroke="#F8FAFC"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Recessed Dark Keyboard Well */}
                  <polygon
                    points="212,251 482,294 420,339 144,289"
                    fill="#1E293B"
                    stroke="#475569"
                    strokeWidth="1"
                  />

                  {/* Isometric Individual Keyboard Keycaps */}
                  {keyRows.map((r) =>
                    keyCols.map((c) => {
                      // Interpolate key position inside the isometric keyboard well
                      const u = (c + 0.3) / 11.4;
                      const v = (r + 0.25) / 4.3;
                      const topX = 216 + u * 260;
                      const topY = 254 + u * 41;
                      const kx = topX - v * 62;
                      const ky = topY + v * 36;
                      return (
                        <polygon
                          key={`${r}-${c}`}
                          points={`${kx},${ky} ${kx + 18},${ky + 2.8} ${kx + 8},${ky + 9.2} ${kx - 10},${ky + 6.4}`}
                          fill="#334155"
                          stroke="#0F172A"
                          strokeWidth="0.6"
                        />
                      );
                    })
                  )}

                  {/* Angled Silver Trackpad */}
                  <polygon
                    points="224,312 304,327 272,349 192,334"
                    fill="#CBD5E1"
                    stroke="#94A3B8"
                    strokeWidth="1.2"
                  />

                  {/* 3D Front Lip Edge of Laptop Base */}
                  <polygon
                    points="72,315 386,374 386,385 72,325"
                    fill="url(#silverEdgeFront)"
                  />
                  {/* Front Center Thumb Notch */}
                  <polygon
                    points="205,340 248,348 246,352 203,344"
                    fill="#334155"
                  />

                  {/* 3D Right Side Edge with USB-C Ports */}
                  <polygon
                    points="386,374 511,288 511,298 386,385"
                    fill="url(#silverEdgeSide)"
                  />
                  <ellipse cx="445" cy="338" rx="4" ry="1.8" transform="rotate(-34 445 338)" fill="#0F172A" />
                  <ellipse cx="465" cy="324" rx="4" ry="1.8" transform="rotate(-34 465 324)" fill="#0F172A" />
                </g>

                {/* 5. FLOATING PILL 1: RED "Live GD Session" (Top-Left of Laptop Screen) */}
                <g filter="url(#badgeShadow)" transform="translate(115, 70)">
                  <rect x="0" y="0" width="148" height="36" rx="18" fill="url(#redPillGrad)" />
                  {/* Video Camera Icon */}
                  <rect x="14" y="12" width="11" height="10" rx="2" fill="#FFFFFF" />
                  <polygon points="26,15 31,12 31,22 26,19" fill="#FFFFFF" />
                  <text x="38" y="23" fill="#FFFFFF" fontSize="13.5" fontWeight="700" fontFamily="Inter, sans-serif">
                    Live GD Session
                  </text>
                </g>

                {/* 6. FLOATING PILL 2: BLUE "Join Zoom Meeting ->" (Right of Laptop Screen) */}
                <g
                  filter="url(#badgeShadow)"
                  transform="translate(425, 205)"
                  className="cursor-pointer"
                  onClick={() => navigate('/schedule')}
                >
                  <rect x="0" y="0" width="188" height="42" rx="21" fill="url(#bluePillGrad)" stroke="#60A5FA" strokeWidth="1" />
                  <text x="18" y="26" fill="#FFFFFF" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
                    Join Zoom Meeting
                  </text>
                  <text x="158" y="26" fill="#FFFFFF" fontSize="15" fontWeight="800">→</text>
                </g>

                {/* 7. FLOATING CARD 3: FROSTED GLASS "zoom" BADGE (Bottom-Right) */}
                <g filter="url(#badgeShadow)" transform="translate(465, 296)">
                  <rect
                    x="0"
                    y="0"
                    width="132"
                    height="50"
                    rx="14"
                    fill="#E8F1FD"
                    fillOpacity="0.92"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <circle cx="28" cy="25" r="14" fill="#2563EB" />
                  <rect x="21" y="20" width="10" height="9" rx="1.5" fill="#FFFFFF" />
                  <polygon points="32,22 36,19 36,29 32,26" fill="#FFFFFF" />
                  <text x="50" y="31" fill="#1D6BF3" fontSize="22" fontWeight="800" fontFamily="Inter, sans-serif">
                    zoom
                  </text>
                </g>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* UPCOMING VIDEO GD SESSIONS (3-Column Cards matching 1000085022_3.png) */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-center text-[#0A1128] mb-10">
            Upcoming Video GD Sessions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_4px_20px_rgba(10,17,40,0.05)] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-extrabold text-[#0A1128] leading-snug mb-1.5">
                    {s.title.split(':')[0]}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4">
                    {s.scheduled_date} • {s.start_time}
                  </p>

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

      {/* TELEGRAM SUPPORT SECTION (Exact 2-Column Match to 1000085022_3.png) */}
      <section className="py-14 bg-[#EBF1FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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
