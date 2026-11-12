import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock, Eye, EyeOff, Users, BookOpen, Megaphone, MessageSquare,
  TrendingUp, CheckCircle2, AlertCircle, Plus, Video
} from 'lucide-react';
import { AdminLayout, joinZoomSession } from '../components/Layout';
import { api, isValidHttps } from '../lib/supabase';

/* ============================================================================
   PAGE 8: ADMIN LOGIN (Design 4 - Full-Screen Dark Theme - Image 8)
   ============================================================================ */
export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@gdpractice.com');
  const [password, setPassword] = useState('password123');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Yahan aap apna manchaha Admin Email aur Password set kar sakte hain
    const CORRECT_EMAIL = 'rohitrajput.com';
    const CORRECT_PASS = 'Rajput@123';

    if (email.trim() === CORRECT_EMAIL && password === CORRECT_PASS) {
      sessionStorage.setItem('gd_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Galat Email ya Password! Kripya sahi details dalein.');
    }
  };


  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7, 12, 28, 0.9), rgba(7, 12, 28, 0.95)), url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      {/* Glowing Glassmorphic Admin Card matching Image 8 */}
      <div className="w-full max-w-md bg-[#0F172A]/90 border border-blue-500/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(37,99,235,0.25)] backdrop-blur text-white">
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-xl object-contain" />
          <div>
            <h1 className="font-extrabold text-base tracking-tight">GD Practice Hub</h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-semibold">
              <Lock className="w-3 h-3" /> Secure Portal
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold mb-1">Admin Login</h2>
        <p className="text-xs text-slate-400 mb-5">Authorized personnel only • GD Practice Hub Portal</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mb-4 p-3 rounded-xl bg-blue-950/50 border border-blue-500/30 text-blue-200 text-xs">
          No public registration available. Unauthorized access is strictly prohibited.
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-2.5 text-slate-400"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-slate-900 border-slate-700" defaultChecked /> Remember me
            </label>
            <a href="#" className="hover:underline text-blue-400">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span> →
          </button>
        </form>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-xs text-slate-400 hover:text-white transition">
          ← Return to GD Practice Hub public site
        </Link>
      </div>
    </div>
  );
};

/* ============================================================================
   PAGE 9: ADMIN DASHBOARD OVERVIEW (Design 1 - Classic Sidebar + Stat Cards - Image 9)
   ============================================================================ */
export const AdminDashboardOverview: React.FC = () => {
  const [stats, setStats] = useState({
    sessions: 0,
    upcoming: 0,
    completed: 0,
    topics: 0,
    announcements: 0,
    feedback: 0,
  });
  const [sessions, setSessions] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    Promise.all([
      api.list('sessions'),
      api.list('topics'),
      api.list('announcements'),
      api.list('feedback'),
      api.getSettings(),
    ]).then(([sess, tops, anns, fbs, sets]) => {
      setSessions(sess);
      setSettings(sets);
      setStats({
        sessions: sess.length,
        upcoming: sess.filter((s: any) => s.status === 'Upcoming' || s.status === 'Live').length,
        completed: sess.filter((s: any) => s.status === 'Completed').length,
        topics: tops.length,
        announcements: anns.length,
        feedback: fbs.filter((f: any) => !f.is_reviewed).length,
      });
    });
  }, []);

  const statCards = [
    { label: 'Total GD Sessions', val: stats.sessions, note: '+12 this month', icon: Users, bg: 'bg-blue-50 text-blue-600' },
    { label: 'Upcoming Sessions', val: stats.upcoming, note: 'Next 7 days', icon: Video, bg: 'bg-indigo-50 text-indigo-600' },
    { label: 'Completed Sessions', val: stats.completed, note: 'All past', icon: CheckCircle2, bg: 'bg-emerald-50 text-emerald-600' },
    { label: 'GD Topics Library', val: stats.topics, note: 'Categorized', icon: BookOpen, bg: 'bg-cyan-50 text-cyan-600' },
    { label: 'Announcements', val: stats.announcements, note: 'Published', icon: Megaphone, bg: 'bg-purple-50 text-purple-600' },
    { label: 'Pending Feedback', val: stats.feedback, note: 'Action needed', icon: MessageSquare, bg: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A1128]">Dashboard Overview</h1>
            <p className="text-xs text-slate-500">Welcome back, Admin! Here is what’s happening on your platform today.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
           <span>Current Date: <strong>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong></span>

          </div>
        </div>

        {/* 6 Metric Stat Cards matching Image 9 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">{c.label}</p>
                  <p className="text-3xl font-extrabold text-[#0A1128] my-1">{c.val}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{c.note}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.bg}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Scheduled Sessions Table + Platform Settings Brief matching Image 9 */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-[#0A1128]">Next Scheduled GD Sessions</h3>
              <Link
                to="/admin/sessions"
                className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow"
              >
                <Plus className="w-3.5 h-3.5" /> Create New
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                    <th className="py-3 px-3">Session</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sessions.slice(0, 4).map((s: any, idx: number) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#0A1128]">{idx + 1}. {s.title}</span>
                        <p className="text-slate-400 text-[11px]">{s.scheduled_date} | {s.start_time}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isValidHttps(s.zoom_url) ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isValidHttps(s.zoom_url) ? 'Zoom Link Added' : 'Needs Zoom Link'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => joinZoomSession(s.zoom_url, s.status)}
                          className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold text-[11px]"
                        >
                          Join
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-[#0A1128]">Platform Settings Brief</h3>
              <div>
                <p className="text-xs text-slate-500 mb-1">Owner Support Telegram Support Link</p>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs font-medium text-emerald-700 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="truncate">{settings.telegram_url || 'https://t.me/gdpractice_owner'}</span>
                </div>
              </div>

              <div className="bg-[#EBF2FF] border border-blue-200 rounded-xl p-4">
                <h4 className="font-extrabold text-xs text-[#0A1128] mb-1">Ask Owner for Any Doubt Tracker</h4>
                <p className="text-[11px] text-slate-600 mb-2">Tracking support redirects with your...</p>
                <p className="text-xs font-bold text-blue-700">Activity Count: 24 clicks this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
