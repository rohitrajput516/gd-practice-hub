import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Users, BookOpen, Megaphone, MessageSquare,
  FileText, Settings, LogOut, Menu, X, ChevronRight, ShieldCheck
} from 'lucide-react';
import { api, isValidHttps } from '../lib/supabase';

export const openTelegramSupport = async () => {
  const s = await api.getSettings();
  if (isValidHttps(s.telegram_url)) {
    window.open(s.telegram_url, '_blank', 'noopener,noreferrer');
  } else {
    alert('Telegram URL abhi Admin Website Settings mein configure nahi kiya gaya hai.');
  }
};

export const joinZoomSession = (url?: string, status?: string) => {
  if (status === 'Cancelled' || status === 'Completed') {
    alert(`This session is ${status} and cannot be joined.`);
    return;
  }
  if (!isValidHttps(url)) {
    alert('Zoom meeting link will be activated before the session starts.');
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'GD Schedule', to: '/schedule' },
    { label: 'Topics Library', to: '/topics' },
    { label: 'Rules & Guidelines', to: '/guidelines' },
    { label: 'Announcements', to: '/announcements' },
    { label: 'Contact & FAQs', to: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FE] text-slate-900 font-sans">
      {/* Top Navbar with Single Collapsible Menu Section */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between relative">
          {/* Original Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={settings.logo_url || '/logo.png'}
              alt="GD Practice Hub"
              className="w-9 h-9 rounded-lg object-contain shadow-sm"
            />
            <span className="font-extrabold text-lg tracking-tight text-[#0A1128]">
              {settings.website_name || 'GD Practice Hub'}
            </span>
          </Link>

          {/* Right Side: Unified Menu Button + Admin Login */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/admin/login"
              className="hidden sm:inline-flex px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition"
            >
              Admin Login
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A1128] hover:bg-[#1E3A8A] text-white text-xs font-bold shadow-sm transition"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>Menu</span>
            </button>
          </div>

          {/* Dropdown Menu Drawer containing all options */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 top-16 bg-slate-900/20 backdrop-blur-[1px] z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-4 sm:right-8 top-[68px] w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-slate-100 mb-1.5">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Navigation Menu
                  </p>
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const active = pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                          active
                            ? 'bg-[#2563EB] text-white shadow-sm'
                            : 'text-slate-700 hover:bg-[#EEF4FF] hover:text-[#2563EB]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <Link
                    to="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0A1128] text-slate-800 hover:text-white text-xs font-bold transition"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Login</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer matching Image 2 */}
      <footer className="bg-[#EBF1FA] border-t border-slate-200/80 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700">
              {settings.footer_text || '© 2026 GD Practice Hub'}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 font-medium text-slate-700">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/schedule" className="hover:text-blue-600">GD Schedule</Link>
            <Link to="/announcements" className="hover:text-blue-600">Announcements</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('gd_admin_auth') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const menu = [
    { label: 'Dashboard Overview', to: '/admin/dashboard', icon: LayoutGrid },
    { label: 'Manage GD Sessions', to: '/admin/sessions', icon: Users },
    { label: 'GD Topics Library', to: '/admin/topics', icon: BookOpen },
    { label: 'Announcements', to: '/admin/announcements', icon: Megaphone },
    { label: 'Feedback & Testimonials', to: '/admin/feedback', icon: MessageSquare },
    { label: 'Rules & Guidelines', to: '/guidelines', icon: FileText },
    { label: 'Website & Telegram Settings', to: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#F4F7FC] text-slate-900">
      <aside className="w-64 bg-[#0B1223] text-white flex flex-col justify-between shrink-0 min-h-screen">
        <div>
          <div className="p-5 flex items-center gap-3 border-b border-slate-800">
            <img src="/logo.png" alt="GD" className="w-9 h-9 rounded-lg object-contain" />
            <span className="font-bold text-base tracking-tight">GD Practice Hub</span>
          </div>
          <nav className="p-3 space-y-1.5">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                    active
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              sessionStorage.removeItem('gd_admin_auth');
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</div>
    </div>
  );
};
