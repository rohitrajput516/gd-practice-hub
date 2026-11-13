import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Users, BookOpen, Megaphone, MessageSquare,
  FileText, Settings, LogOut, Menu, X, ChevronRight, ShieldCheck, ExternalLink
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
  const { pathname, search } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    if (!search.includes('section=')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    api.getSettings().then(setSettings);
  }, [pathname, search]);

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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={settings.logo_url || '/logo.png'}
              alt="GD Practice Hub"
              className="w-9 h-9 rounded-lg object-contain shadow-sm"
            />
            <div>
              <span className="font-extrabold text-lg tracking-tight text-[#0A1128] block leading-none">
                {settings.website_name || 'GD Practice Hub'}
              </span>
              {settings.website_tagline && (
                <span className="text-[10px] font-semibold text-slate-500 hidden sm:block mt-0.5">
                  {settings.website_tagline}
                </span>
              )}
            </div>
          </Link>

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

      <footer className="bg-[#070C1C] text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          <div className="md:col-span-4 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={settings.logo_url || '/logo.png'}
                alt="GD Practice Hub"
                className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow"
              />
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block leading-none">
                  {settings.website_name || 'GD Practice Hub'}
                </span>
                {settings.website_tagline && (
                  <span className="text-[11px] text-blue-400 font-semibold block mt-1">
                    {settings.website_tagline}
                  </span>
                )}
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed pr-2">
              {settings.mission_statement ||
                "India's premier Group Discussion practice platform for defence candidates and students to build confidence and ace interviews."}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <h4 className="font-extrabold text-sm text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/schedule" className="hover:text-white transition">GD Schedule</Link></li>
              <li><Link to="/topics" className="hover:text-white transition">Topics Library</Link></li>
              <li><Link to="/guidelines" className="hover:text-white transition">Rules &amp; Guidelines</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2.5 text-xs">
            <h4 className="font-extrabold text-sm text-white mb-3">Important Pages</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/announcements" className="hover:text-white transition">Announcements</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact &amp; FAQs</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition">Admin Portal</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <h4 className="font-extrabold text-sm text-white mb-3">Telegram Contact</h4>
            <button
              onClick={openTelegramSupport}
              className="px-4 py-2 rounded-lg bg-[#1D6BF3] hover:bg-blue-600 text-white font-bold text-xs transition inline-block mb-2"
            >
              Ask Owner for Any Doubt
            </button>
            {settings.contact_email && (
              <p className="text-[11px] text-slate-400">
                Email:{' '}
                <a href={`mailto:${settings.contact_email}`} className="text-blue-400 hover:underline">
                  {settings.contact_email}
                </a>
              </p>
            )}
            <ul className="space-y-1.5 text-slate-400 pt-1">
              <li><Link to="/guidelines?section=privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/guidelines?section=terms" className="hover:text-white transition">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 text-center text-xs text-slate-500">
          {settings.footer_text || '© 2026 GD Practice Hub. All Rights Reserved.'}
        </div>
      </footer>
    </div>
  );
};

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    if (sessionStorage.getItem('gd_admin_auth') !== 'true') {
      navigate('/admin/login');
    }
    api.getSettings().then(setSettings);
  }, [navigate, pathname]);

  const menu = [
    { label: 'Dashboard Overview', to: '/admin/dashboard', icon: LayoutGrid },
    { label: 'Manage GD Sessions', to: '/admin/sessions', icon: Users },
    { label: 'GD Topics Library', to: '/admin/topics', icon: BookOpen },
    { label: 'Announcements', to: '/admin/announcements', icon: Megaphone },
    { label: 'Feedback & Testimonials', to: '/admin/feedback', icon: MessageSquare },
    { label: 'Rules & Guidelines', to: '/admin/guidelines', icon: FileText },
    { label: 'Website & Telegram Settings', to: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F4F7FC] text-slate-900">
      <div className="lg:hidden bg-[#0B1223] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2.5">
          <img src={settings.logo_url || '/logo.png'} alt="GD" className="w-8 h-8 rounded-lg object-contain bg-white p-0.5" />
          <span className="font-bold text-sm">{settings.website_name || 'GD Practice Hub'} Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } lg:flex w-full lg:w-64 bg-[#0B1223] text-white flex-col justify-between shrink-0 lg:min-h-screen z-30`}
      >
        <div>
          <div className="hidden lg:flex p-5 items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <img src={settings.logo_url || '/logo.png'} alt="GD" className="w-9 h-9 rounded-lg object-contain bg-white p-0.5" />
              <span className="font-bold text-base tracking-tight">{settings.website_name || 'GD Practice Hub'}</span>
            </div>
          </div>
          <nav className="p-3 space-y-1.5">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
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

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold text-blue-300 hover:bg-slate-800 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Website</span>
          </Link>
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

      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</div>
    </div>
  );
};
