import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Users, BookOpen, Megaphone, MessageSquare,
  FileText, Settings, LogOut, Send, Menu, X
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FF] text-slate-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium py-5 border-b-2 transition-colors ${
                    active
                      ? 'text-blue-600 border-blue-600 font-semibold'
                      : 'text-slate-600 border-transparent hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition"
            >
              Admin Login
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg border border-slate-200"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="block text-center py-2 rounded-lg bg-[#0A1128] text-white text-sm font-semibold"
            >
              Admin Login
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[#EEF3FB] border-t border-slate-200/80 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <img src={settings.logo_url || '/logo.png'} alt="Logo" className="w-6 h-6 rounded" />
            <span>{settings.footer_text || '© 2026 GD Practice Hub'}</span>
          </div>
          <div className="flex flex-wrap gap-6 font-medium text-slate-700">
            <Link to="/">Home</Link>
            <Link to="/schedule">GD Schedule</Link>
            <Link to="/announcements">Announcements</Link>
            <Link to="/contact">Contact</Link>
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
      {/* Fixed Dark Navy Sidebar matching Image 9 */}
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
