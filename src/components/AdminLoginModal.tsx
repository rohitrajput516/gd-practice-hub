"use client";

import React, { useState } from "react";
import { X, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTelegramUrl: string;
  onUpdateTelegramUrl: (newUrl: string) => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  currentTelegramUrl,
  onUpdateTelegramUrl,
}: AdminLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [telegramInput, setTelegramInput] = useState(currentTelegramUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both your admin email and password.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setErrorMsg(
        "Supabase credentials are not configured in .env.local yet. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live admin authentication."
      );
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setIsAuthenticated(true);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    setErrorMsg(null);

    if (supabase && isAuthenticated) {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "telegram_url", value: telegramInput.trim() });

      if (error) {
        setErrorMsg(error.message);
        return;
      }
    }

    onUpdateTelegramUrl(telegramInput.trim());
    setSaveSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/75 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h2
              id="admin-login-title"
              className="text-lg font-bold text-navy-900"
            >
              {isAuthenticated ? "Admin Quick Settings" : "Admin Login"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="mt-4 space-y-4" noValidate>
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gdpracticehub.com"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-brand-blue hover:bg-brand-blueHover text-white text-sm font-semibold disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSaveSettings} className="mt-4 space-y-4">
            {saveSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Telegram support URL updated!</span>
              </div>
            )}

            <div>
              <label
                htmlFor="telegram-url-input"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Owner Telegram Support URL
              </label>
              <input
                id="telegram-url-input"
                type="url"
                value={telegramInput}
                onChange={(e) => setTelegramInput(e.target.value)}
                placeholder="https://t.me/your_username"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-brand-blue hover:bg-brand-blueHover text-white text-sm font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
