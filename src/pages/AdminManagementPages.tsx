import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Search, X, CalendarPlus, BookmarkPlus, Megaphone,
  Link2, Star, RotateCw, Check, Trash2, Globe, MessageCircle,
  Clock, FileEdit, Lock
} from 'lucide-react';
import { AdminLayout } from '../components/Layout';
import { api, isValidHttps } from '../lib/supabase';

/* ============================================================================
   PAGE 10: ADMIN MANAGE GD SESSIONS (Image 15 - 1000086194.png & Spec 25)
   ============================================================================ */
export const AdminSessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Calendar (YYYY-MM-DD) aur Watch (HH:mm) ke helper functions
  const getTodayIso = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const getCurrentTime24 = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const getDefaultFutureSlot = () => {
    const d = new Date(Date.now() + 2 * 60 * 60 * 1000); // Abhi se 2 ghante aage ka default time
    d.setMinutes(0, 0, 0);
    const date_iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const time_24 = `${String(d.getHours()).padStart(2, '0')}:00`;
    return { date_iso, time_24 };
  };

  const isoToDisplayDate = (iso: string) => {
    if (!iso) return '';
    const [y, m, day] = iso.split('-').map(Number);
    if (!y || !m || !day) return iso;
    return new Date(y, m - 1, day).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const displayDateToIso = (display: string) => {
    if (!display) return getTodayIso();
    if (/^\d{4}-\d{2}-\d{2}$/.test(display.trim())) return display.trim();
    const clean = String(display).replace(/^[A-Za-z]+,\s*/, '');
    const dt = new Date(clean);
    if (isNaN(dt.getTime())) return getTodayIso();
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  };

  const time24To12 = (t24: string) => {
    if (!t24) return '6:00 PM';
    if (t24.toLowerCase().includes('am') || t24.toLowerCase().includes('pm')) return t24;
    const [hStr, mStr] = t24.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr || '00';
    if (isNaN(h)) return '6:00 PM';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };

  const time12To24 = (t12: string) => {
    if (!t12) return '18:00';
    if (/^\d{2}:\d{2}$/.test(t12.trim())) return t12.trim();
    const match = t12.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return '18:00';
    let h = parseInt(match[1], 10);
    const m = match[2];
    const period = match[3].toUpperCase();
    if (period === 'PM' && h < 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${m}`;
  };

  const [form, setForm] = useState<any>({
    id: '',
    title: '',
    topic: '',
    category: 'Business & Finance',
    date_iso: getTodayIso(),
    time_24: '18:00',
    scheduled_date: isoToDisplayDate(getTodayIso()),
    start_time: '6:00 PM',
    timezone: 'IST (UTC+5:30)',
    platform: 'Zoom Room',
    zoom_url: '',
    meeting_id: '',
    passcode: '',
    status: 'Upcoming',
    is_published: true,
    description: '',
    preparation_points: '',
    special_instructions: 'Be respectful to other candidates.\nNo interruptions while someone is speaking.\nSupport your opinions with factual data.\nAdhere to the 3-minute speaking limit.'
  });

  const load = () => api.list('sessions').then(setSessions);
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    const slot = getDefaultFutureSlot();
    setForm({
      id: '',
      title: '',
      topic: '',
      category: 'Business & Finance',
      date_iso: slot.date_iso,
      time_24: slot.time_24,
      scheduled_date: isoToDisplayDate(slot.date_iso),
      start_time: time24To12(slot.time_24),
      timezone: 'IST (UTC+5:30)',
      platform: 'Zoom Room',
      zoom_url: '',
      meeting_id: '',
      passcode: '',
      status: 'Upcoming',
      is_published: true,
      description: '',
      preparation_points: '',
      special_instructions: 'Be respectful to other candidates.\nNo interruptions while someone is speaking.\nSupport your opinions with factual data.\nAdhere to the 3-minute speaking limit.'
    });
    setModalOpen(true);
  };

  const openEdit = (s: any) => {
    const dIso = displayDateToIso(s.scheduled_date);
    const t24 = time12To24(s.start_time);
    setForm({
      ...s,
      date_iso: dIso,
      time_24: t24,
      scheduled_date: isoToDisplayDate(dIso),
      start_time: time24To12(t24),
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.zoom_url && !isValidHttps(form.zoom_url)) {
      alert('Zoom URL https:// se shuru hona chahiye.');
      return;
    }

    const formattedDate = isoToDisplayDate(form.date_iso);
    const formattedTime = time24To12(form.time_24);
    const selectedMs = new Date(`${formattedDate} ${formattedTime}`).getTime();

    // Past Date ya Past Time block check
    if (!form.id && selectedMs < Date.now()) {
      alert('Beete hue (past) date ya time par naya session create nahi ho sakta! Kripya Calendar aur Watch se aage ka time chunein.');
      return;
    }
    if (form.id && form.status === 'Upcoming' && selectedMs < Date.now()) {
      alert('Upcoming session ke liye past date/time select nahi kiya ja sakta! Kripya aage ki date/time chunein.');
      return;
    }

    const payload = {
      ...form,
      scheduled_date: formattedDate,
      start_time: formattedTime,
      topic: form.topic || form.title,
    };
    delete payload.date_iso;
    delete payload.time_24;

    await api.save('sessions', payload);
    setModalOpen(false);
    load();
  };


  const togglePublish = async (s: any) => {
    await api.save('sessions', { ...s, is_published: !s.is_published });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this GD session?')) return;
    await api.remove('sessions', id);
    load();
  };

  const filtered = sessions.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.topic || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A1128]">Manage GD Sessions</h1>
            <p className="text-xs text-slate-500">Create, edit, publish, and manage all GD sessions.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs w-52"
              />
            </div>
            <button
              onClick={openCreate}
              className="px-4 py-2 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
            >
              <Plus className="w-4 h-4" /> Create Session
            </button>
          </div>
        </div>

        {/* Sessions Data Table matching Image 15 */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[11px]">
                <th className="py-3.5 px-4">Session Title</th>
                <th className="py-3.5 px-4">Date &amp; Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4">Zoom Link</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#0A1128] text-sm">{s.title}</p>
                    <p className="text-[11px] text-slate-400">{s.category}</p>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {s.scheduled_date} at {s.start_time}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      s.status === 'Live' ? 'bg-emerald-100 text-emerald-700' :
                      s.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      s.status === 'Completed' ? 'bg-slate-200 text-slate-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublish(s)}
                      className={`w-11 h-6 rounded-full p-0.5 transition flex items-center ${
                        s.is_published ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white shadow" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold text-[11px] ${
                      isValidHttps(s.zoom_url) ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <Link2 className="w-3.5 h-3.5" />
                      {isValidHttps(s.zoom_url) ? 'Added' : 'None'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5">
                    <Link to={`/session?id=${s.id}`} className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100">
                      View
                    </Link>
                    <button onClick={() => openEdit(s)} className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="px-2.5 py-1 rounded border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-100">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create / Edit Session Modal matching Image 15 */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                    <CalendarPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0A1128]">
                      {form.id ? 'Edit GD Session' : 'Create New Session'}
                    </h2>
                    <p className="text-xs text-slate-500">Fill in the details to schedule a live GD session.</p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Session Title <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Cryptocurrency: Future or Bubble?"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Topic Group / Category <span className="text-red-500">*</span></label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option>Business &amp; Finance</option>
                      <option>AI &amp; Tech</option>
                      <option>Current Affairs</option>
                      <option>Social Issues</option>
                      <option>Education</option>
                      <option>Abstract Topics</option>
                      <option>Interview and Placement GD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Topic Name</label>
                    <input
                      type="text"
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      placeholder="Specific topic"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Date (Calendar) <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="date"
                      min={getTodayIso()}
                      value={form.date_iso || getTodayIso()}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          date_iso: e.target.value,
                          scheduled_date: isoToDisplayDate(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold text-slate-800 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Start Time (Watch) <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="time"
                      min={form.date_iso === getTodayIso() ? getCurrentTime24() : undefined}
                      value={form.time_24 || '18:00'}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          time_24: e.target.value,
                          start_time: time24To12(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold text-slate-800 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Time Zone</label>
                    <input
                      type="text"
                      value={form.timezone}
                      onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50"
                    />
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-blue-600 -mt-1">
                  📅 Selected Schedule: {isoToDisplayDate(form.date_iso)} at {time24To12(form.time_24)}
                </p>


                <div>
                  <label className="block font-bold text-slate-800 mb-1">Zoom Meeting Link (HTTPS)</label>
                  <div className="relative">
                    <input
                      type="url"
                      value={form.zoom_url}
                      onChange={(e) => setForm({ ...form, zoom_url: e.target.value })}
                      placeholder="https://zoom.us/j/9876543210"
                      className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg"
                    />
                    <Link2 className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Optional Meeting ID</label>
                    <input
                      type="text"
                      value={form.meeting_id || ''}
                      onChange={(e) => setForm({ ...form, meeting_id: e.target.value })}
                      placeholder="987 654 3210"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Optional Passcode</label>
                    <input
                      type="text"
                      value={form.passcode || ''}
                      onChange={(e) => setForm({ ...form, passcode: e.target.value })}
                      placeholder="GD2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center pt-1">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Status <span className="text-red-500">*</span></label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Live">Live</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Publish Directly?</label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, is_published: !form.is_published })}
                      className={`px-3 py-1.5 rounded-full font-extrabold text-[11px] text-white transition ${
                        form.is_published ? 'bg-blue-600' : 'bg-slate-400'
                      }`}
                    >
                      {form.is_published ? 'ON ●' : 'OFF ○'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="A group discussion about the rise of digital currency..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                
                             <div>
               <label className="block font-bold text-slate-800 mb-1">Preparation Points (Har line ek bullet point banegi)</label>
               <textarea
                 rows={3}
                 value={form.preparation_points || ''}
                 onChange={(e) => setForm({ ...form, preparation_points: e.target.value })}
                 placeholder="Point 1&#10;Point 2&#10;Point 3"
                 className="w-full px-3 py-2 border border-slate-300 rounded-lg"
               />
             </div>


                <div>
                  <label className="block font-bold text-slate-800 mb-1">Session Cover Image (Upload ya Image Link)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={form.image_url || ''}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      placeholder="https://... ya Gallery se photo chunein"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <label className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold cursor-pointer border border-blue-200 shrink-0">
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setForm({ ...form, image_url: reader.result });
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>
                </div>


                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold shadow"
                  >
                    Create Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

/* ============================================================================
   PAGE 11: ADMIN MANAGE GD TOPICS (Image 11 - 1000086161.png & Spec 26)
   ============================================================================ */
export const AdminTopicsPage: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<any>({
    id: '',
    title: '',
    category: 'Artificial Intelligence and Technology',
    description: '',
    preparation_points: '',
    is_published: true
  });

  const load = () => api.list('topics').then(setTopics);
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm({
      id: '',
      title: '',
      category: 'Artificial Intelligence and Technology',
      description: '',
      preparation_points: '• Understand the timeline of AI automation.\n• Discuss industries most affected.\n• Synthesize solutions for workforce reskilling.',
      is_published: true
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.save('topics', {
      ...form,
      difficulty: form.difficulty || 'Medium',
      est_time: form.est_time || '45m',
      badge: form.badge || 'POPULAR',
      is_featured: true
    });
    setModalOpen(false);
    load();
  };

  const togglePub = async (t: any) => {
    await api.save('topics', { ...t, is_published: !t.is_published });
    load();
  };

  const removeTopic = async (id: string) => {
    if (!confirm('Delete this topic?')) return;
    await api.remove('topics', id);
    load();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A1128]">Manage GD Topics</h1>
            <p className="text-xs text-slate-500">Create, edit, publish, and manage all GD topics.</p>
          </div>
          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" /> Create Topic
          </button>
        </div>

        {/* Topics Table matching Image 11 */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[11px]">
                <th className="py-3.5 px-4">Topic Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topics.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-[#0A1128] text-sm">{t.title}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{t.category}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePub(t)}
                      className={`w-11 h-6 rounded-full p-0.5 transition flex items-center ${
                        t.is_published ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white shadow" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5">
                    <Link to="/topics" className="px-2.5 py-1 rounded border border-slate-200 font-semibold">View</Link>
                    <button onClick={() => { setForm(t); setModalOpen(true); }} className="px-2.5 py-1 rounded border border-slate-200 font-semibold">Edit</button>
                    <button onClick={() => removeTopic(t.id)} className="px-2.5 py-1 rounded border border-red-200 bg-red-50 text-red-600 font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create / Edit Topic Modal matching Image 11 */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                    <BookmarkPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0A1128]">Create New Topic</h2>
                    <p className="text-xs text-slate-500">Fill in the details to add a new GD topic.</p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Topic Title <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Impact of Artificial Intelligence on Future Jobs"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Category <span className="text-red-500">*</span></label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option>Current Affairs</option>
                    <option>Artificial Intelligence and Technology</option>
                    <option>Education</option>
                    <option>Social Issues</option>
                    <option>Business and Economy</option>
                    <option>Abstract Topics</option>
                    <option>Interview and Placement GD</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="A group discussion about the rise of digital currency..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>


                <div>
                  <label className="block font-bold text-slate-800 mb-1">Preparation Points</label>
                  <textarea
                    rows={4}
                    value={form.preparation_points}
                    onChange={(e) => setForm({ ...form, preparation_points: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Topic Image (Upload ya Image Link)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={form.image_url || ''}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      placeholder="https://... ya Gallery se photo chunein"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <label className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold cursor-pointer border border-blue-200 shrink-0">
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setForm({ ...form, image_url: reader.result });
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>
                </div>


                <div>
                  <label className="block font-bold text-slate-800 mb-1">Publish Directly?</label>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_published: !form.is_published })}
                    className={`px-3 py-1 rounded-full font-extrabold text-[11px] text-white ${
                      form.is_published ? 'bg-blue-600' : 'bg-slate-400'
                    }`}
                  >
                    {form.is_published ? 'ON ●' : 'OFF ○'}
                  </button>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-slate-100 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold">
                    Create Topic
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

/* ============================================================================
   PAGE 12: ADMIN MANAGE ANNOUNCEMENTS (With Full Filter & Show-More Control)
   ============================================================================ */
const DEFAULT_ANNOUNCEMENT_FILTERS = ['Urgent', 'Sessions', 'Platform Updates', 'Tips'];

export const AdminAnnouncementsPage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [filters, setFilters] = useState<string[]>(DEFAULT_ANNOUNCEMENT_FILTERS);
  const [newFilterInput, setNewFilterInput] = useState('');
  const [activeAdminFilter, setActiveAdminFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [customCategoryMode, setCustomCategoryMode] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');

  const [form, setForm] = useState<any>({
    id: '',
    title: '',
    category: 'Sessions',
    message: '',
    action_text: '',
    action_url: '',
    is_important: false,
    is_featured: false,
    is_published: true,
  });

  const load = async () => {
    const [anns, settings] = await Promise.all([
      api.list('announcements'),
      api.getSettings(),
    ]);
    setList(anns);

    const savedFilters: string[] = Array.isArray(settings?.announcement_filters) && settings.announcement_filters.length > 0
      ? settings.announcement_filters
      : DEFAULT_ANNOUNCEMENT_FILTERS;

    // Merge any custom categories already used in announcements
    const merged = [...savedFilters];
    anns.forEach((a: any) => {
      if (a.category && !merged.some((f) => f.toLowerCase() === String(a.category).toLowerCase())) {
        merged.push(a.category);
      }
    });
    setFilters(merged);
  };

  useEffect(() => {
    load();
  }, []);

  const saveFilterList = async (updatedFilters: string[]) => {
    setFilters(updatedFilters);
    const currentSettings = await api.getSettings();
    await api.updateSettings({
      ...currentSettings,
      announcement_filters: updatedFilters,
    });
  };

  const handleAddFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newFilterInput.trim();
    if (!clean) return;
    if (filters.some((f) => f.toLowerCase() === clean.toLowerCase())) {
      alert('Ye filter pehle se maujood hai!');
      return;
    }
    const next = [...filters, clean];
    await saveFilterList(next);
    setNewFilterInput('');
  };

  const handleRemoveFilter = async (target: string) => {
    if (!confirm(`Remove "${target}" filter tab from Announcements page?`)) return;
    const next = filters.filter((f) => f !== target);
    await saveFilterList(next);
    if (activeAdminFilter === target) setActiveAdminFilter('All');
  };

  const openCreateModal = () => {
    setCustomCategoryMode(false);
    setCustomCategoryName('');
    setForm({
      id: '',
      title: '',
      category: filters[0] || 'Sessions',
      message: '',
      action_text: '',
      action_url: '',
      is_important: false,
      is_featured: false,
      is_published: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (a: any) => {
    setCustomCategoryMode(false);
    setCustomCategoryName('');
    setForm({
      ...a,
      category: a.category || 'Sessions',
      action_text: a.action_text || '',
      action_url: a.action_url || '',
      is_featured: Boolean(a.is_featured),
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = customCategoryMode
      ? customCategoryName.trim() || 'General'
      : form.category || 'Sessions';

    // Agar Admin ne modal ke andar naya filter type kiya hai, to use Filter Bar mein bhi jod do
    if (
      finalCategory &&
      !filters.some((f) => f.toLowerCase() === finalCategory.toLowerCase())
    ) {
      await saveFilterList([...filters, finalCategory]);
    }

    // Agar is announcement ko Top Featured banaya hai, to baki par se featured hata do
    if (form.is_featured) {
      for (const item of list) {
        if (item.id !== form.id && item.is_featured) {
          await api.save('announcements', { ...item, is_featured: false });
        }
      }
    }

    await api.save('announcements', {
      ...form,
      category: finalCategory,
    });
    setModalOpen(false);
    load();
  };

  const filteredList = list.filter((a) => {
    if (activeAdminFilter === 'All') return true;
    if (activeAdminFilter === 'Urgent') {
      return a.is_important || String(a.category).toLowerCase() === 'urgent' || String(a.category).toLowerCase() === 'priority';
    }
    return String(a.category || '').toLowerCase() === activeAdminFilter.toLowerCase();
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A1128]">Manage Announcements</h1>
            <p className="text-xs text-slate-500">
              Control all announcements, custom filter tabs, featured notice, and Show More details.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
          >
            <Plus className="w-4 h-4" /> Create Announcement
          </button>
        </div>

        {/* FILTER TABS MANAGER CARD (Add / Remove Public Page Filters) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#0A1128]">
                Announcements Page Filter Tabs (Public &amp; Admin)
              </h3>
              <p className="text-[11px] text-slate-500">
                Yahan se aap Announcements page ke filters dekh sakte hain, naya filter add kar sakte hain ya hata sakte hain.
              </p>
            </div>
            <form onSubmit={handleAddFilter} className="flex items-center gap-2">
              <input
                type="text"
                value={newFilterInput}
                onChange={(e) => setNewFilterInput(e.target.value)}
                placeholder="New filter name (e.g. Exam Alert)"
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs w-48"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Add Filter
              </button>
            </form>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveAdminFilter('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${
                activeAdminFilter === 'All'
                  ? 'bg-[#0A1128] text-white border-[#0A1128]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              All ({list.length})
            </button>

            {filters.map((f) => {
              const active = activeAdminFilter === f;
              return (
                <div
                  key={f}
                  className={`inline-flex items-center gap-1.5 pl-3.5 pr-2 py-1 rounded-full text-xs font-bold border transition ${
                    active
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <button type="button" onClick={() => setActiveAdminFilter(f)}>
                    {f}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveFilter(f)}
                    title={`Delete "${f}" filter`}
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[11px] ${
                      active ? 'hover:bg-blue-800 text-white' : 'hover:bg-red-100 text-slate-400 hover:text-red-600'
                    }`}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Announcements Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[11px]">
                <th className="py-3.5 px-4">Title &amp; Preview</th>
                <th className="py-3.5 px-4">Filter / Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Priority / Featured</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-bold text-[#0A1128] text-sm">{a.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">{a.message}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-[11px]">
                      {a.category || 'Sessions'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{a.created_at}</td>
                  <td className="py-3.5 px-4 space-x-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        a.is_important
                          ? 'bg-[#DC3545] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {a.is_important ? 'Priority' : 'Normal'}
                    </span>
                    {a.is_featured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        ★ Featured
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={async () => {
                        await api.save('announcements', { ...a, is_published: !a.is_published });
                        load();
                      }}
                      className={`w-11 h-6 rounded-full p-0.5 transition flex items-center ${
                        a.is_published ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white shadow" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5">
                    <Link
                      to="/announcements"
                      className="px-2.5 py-1 rounded border border-slate-200 font-semibold hover:bg-slate-100"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => openEditModal(a)}
                      className="px-2.5 py-1 rounded border border-slate-200 font-semibold hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Delete announcement?')) {
                          await api.remove('announcements', a.id);
                          load();
                        }
                      }}
                      className="px-2.5 py-1 rounded border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create / Edit Announcement Modal with Filter Selector & Custom Filter Input */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0A1128]">
                      {form.id ? 'Edit Announcement' : 'Create New Announcement'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Choose filter category, write full notice details, and publish.
                    </p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Announcement Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="New Zoom Links for Weekly GD Sessions"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                {/* Filter / Category Selector + Create New Filter Option */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-800">
                      Select Filter / Category <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCustomCategoryMode(!customCategoryMode)}
                      className="text-[11px] font-bold text-blue-600 hover:underline"
                    >
                      {customCategoryMode ? '← Choose Existing Filter' : '+ Create New Filter'}
                    </button>
                  </div>

                  {customCategoryMode ? (
                    <input
                      required
                      type="text"
                      value={customCategoryName}
                      onChange={(e) => setCustomCategoryName(e.target.value)}
                      placeholder="Type new filter name (e.g. Results, Rules, Weekend Batch)"
                      className="w-full px-3 py-2 border border-blue-400 bg-blue-50/40 rounded-lg font-semibold"
                    />
                  ) : (
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold"
                    >
                      {filters.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Full Message (Shown on Show More / Read Full Notice) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write full announcement details here..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                {/* Optional Action Button inside Show More */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Optional Button Text (Show More ke andar)
                    </label>
                    <input
                      type="text"
                      value={form.action_text || ''}
                      onChange={(e) => setForm({ ...form, action_text: e.target.value })}
                      placeholder="e.g. Check GD Schedule"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Optional Button Link (URL ya Page Path)
                    </label>
                    <input
                      type="text"
                      value={form.action_url || ''}
                      onChange={(e) => setForm({ ...form, action_url: e.target.value })}
                      placeholder="e.g. /schedule or https://..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Priority / Urgent?</label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, is_important: !form.is_important })}
                      className={`px-3 py-1 rounded-full font-extrabold text-[11px] text-white ${
                        form.is_important ? 'bg-[#DC3545]' : 'bg-slate-400'
                      }`}
                    >
                      {form.is_important ? 'ON ●' : 'OFF'}
                    </button>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Featured Top Box?</label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                      className={`px-3 py-1 rounded-full font-extrabold text-[11px] text-white ${
                        form.is_featured ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                    >
                      {form.is_featured ? 'YES ★' : 'NO'}
                    </button>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Publish Directly?</label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, is_published: !form.is_published })}
                      className={`px-3 py-1 rounded-full font-extrabold text-[11px] text-white ${
                        form.is_published ? 'bg-blue-600' : 'bg-slate-400'
                      }`}
                    >
                      {form.is_published ? 'ON ●' : 'OFF'}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold shadow"
                  >
                    {form.id ? 'Save Changes' : 'Create Announcement'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

/* ============================================================================
   PAGE 13: ADMIN MANAGE FEEDBACK & PRIVATE CONTACT MESSAGES
   ============================================================================ */
export const AdminFeedbackPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [tab, setTab] = useState<'All' | 'Messages' | 'Feedback' | 'Unread' | 'Reviewed'>('All');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string>('');

  const load = () => api.list('feedback').then(setItems);
  useEffect(() => { load(); }, []);

  // Helper: Check if record came from "Send Us a Message" (Contact Page)
  const isPrivateMessage = (i: any) => !i.session_title || i.session_title === 'CONTACT_MESSAGE';

  const msgCount = items.filter((i) => isPrivateMessage(i)).length;
  const fbCount = items.filter((i) => !isPrivateMessage(i)).length;
  const unreadCount = items.filter((i) => !i.is_reviewed).length;
  const reviewedCount = items.filter((i) => i.is_reviewed).length;

  const filtered = items.filter((i) => {
    const mTab =
      tab === 'All' ||
      (tab === 'Messages' && isPrivateMessage(i)) ||
      (tab === 'Feedback' && !isPrivateMessage(i)) ||
      (tab === 'Unread' && !i.is_reviewed) ||
      (tab === 'Reviewed' && i.is_reviewed);
    const mSearch =
      (i.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.subject || '').toLowerCase().includes(search.toLowerCase()) ||
      (i.message || '').toLowerCase().includes(search.toLowerCase());
    return mTab && mSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A1128]">Messages &amp; Feedback Inbox</h1>
          <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
            <Lock className="w-3.5 h-3.5" /> Private Contact Messages sirf aapko yahan dikhenge, aur Student Feedback public reviews mein.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Filter Bar */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button onClick={load} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTab('All')}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  tab === 'All' ? 'bg-[#2563EB] text-white' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                All ({items.length})
              </button>
              <button
                onClick={() => setTab('Messages')}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  tab === 'Messages' ? 'bg-[#2563EB] text-white' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                🔒 Contact Messages ({msgCount})
              </button>
              <button
                onClick={() => setTab('Feedback')}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  tab === 'Feedback' ? 'bg-[#2563EB] text-white' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                ⭐ Public Feedback ({fbCount})
              </button>
              <button
                onClick={() => setTab('Unread')}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  tab === 'Unread' ? 'bg-[#2563EB] text-white' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setTab('Reviewed')}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  tab === 'Reviewed' ? 'bg-[#2563EB] text-white' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Reviewed ({reviewedCount})
              </button>
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages or feedback..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Inbox Rows */}
          <div className="divide-y divide-slate-200 text-xs">
            {filtered.map((f) => {
              const isOpen = expandedId === f.id;
              const isPrivate = isPrivateMessage(f);
              return (
                <div
                  key={f.id}
                  className={`p-4 transition ${isOpen ? 'bg-[#EBF3FF]/70' : 'hover:bg-slate-50'}`}
                >
                  <div
                    onClick={() => setExpandedId(isOpen ? '' : f.id)}
                    className="flex flex-wrap items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <input type="checkbox" checked={isOpen} readOnly className="rounded text-blue-600" />
                      <Star
                        onClick={async (e) => {
                          e.stopPropagation();
                          await api.save('feedback', { ...f, is_starred: !f.is_starred });
                          load();
                        }}
                        className={`w-4 h-4 cursor-pointer ${
                          f.is_starred ? 'fill-amber-400 text-amber-400' : 'text-slate-400 hover:text-amber-400'
                        }`}
                      />
                      <div>
                        <p className="font-bold text-[#0A1128] flex items-center gap-1.5">
                          {f.name}
                          {!f.is_reviewed && <span className="text-blue-600 text-[11px] font-semibold">● Unread</span>}
                        </p>
                        <p className="text-slate-500 text-[11px]">{f.email || 'No email provided'}</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isPrivate
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isPrivate ? '🔒 Private Contact Message' : `⭐ Public Feedback (${f.rating || 5}★)`}
                        </span>
                        <p className={`${!f.is_reviewed ? 'font-extrabold text-[#0A1128]' : 'font-semibold text-slate-800'}`}>
                          {f.subject}
                        </p>
                      </div>
                      <p className="text-slate-600 truncate">{f.message}</p>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="text-[11px] text-slate-500">{f.created_at}</p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          f.is_reviewed ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {f.is_reviewed ? 'Reviewed' : 'Unread'}
                      </span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 ml-8 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <p className="text-slate-800 leading-relaxed mb-4 whitespace-pre-line">{f.message}</p>
                      <div className="flex justify-end gap-2.5">
                        <button
                          onClick={async () => {
                            await api.save('feedback', { ...f, is_reviewed: !f.is_reviewed });
                            load();
                          }}
                          className="px-3.5 py-1.5 rounded-lg border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          {f.is_reviewed ? 'Mark as Unread' : 'Mark as Reviewed'}
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete this record?')) {
                              await api.remove('feedback', f.id);
                              load();
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-lg border border-red-300 text-red-600 font-semibold hover:bg-red-50 flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};


/* ============================================================================
   PAGE 14: WEBSITE & TELEGRAM SETTINGS (Image 14 - 1000086179.png & Spec 29)
   ============================================================================ */
export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'General' | 'Contact' | 'Session' | 'Footer'>('General');
  const [settings, setSettings] = useState<any>({
    website_name: 'GD Practice Hub',
    website_tagline: 'Practice. Discuss. Lead.',
    mission_statement: '',
    logo_url: '/logo.png',
    telegram_url: '',
    contact_email: 'admin@gdpractice.com',
    default_timezone: 'IST (UTC+5:30)',
    session_policy: '',
    footer_text: '© 2026 GD Practice Hub'
  });

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (settings.telegram_url && !isValidHttps(settings.telegram_url)) {
      alert('Telegram URL https://t.me/... format mein hona chahiye.');
      return;
    }
    await api.updateSettings(settings);
    alert('Settings saved successfully!');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSettings({ ...settings, logo_url: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <AdminLayout>
      <div className="space-y-5 max-w-4xl">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A1128] flex items-center gap-2">
            ⚙ Website &amp; Telegram Settings
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            🔒 Manage global settings for GD Practice Hub including branding, contact info, and policies.
          </p>
        </div>

        {/* 4 Settings Tabs matching Image 14 */}
        <div className="flex flex-wrap gap-6 border-b border-slate-200 text-xs font-bold">
          {[
            { id: 'General', label: 'General', icon: Globe },
            { id: 'Contact', label: 'Contact & Telegram', icon: MessageCircle },
            { id: 'Session', label: 'Session & Policy', icon: Clock },
            { id: 'Footer', label: 'Footer', icon: FileEdit },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`pb-3 flex items-center gap-1.5 border-b-2 transition ${
                  active ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 text-xs">
          {activeTab === 'General' && (
            <>
              <div>
                <h2 className="text-base font-extrabold text-[#0A1128]">General Website Settings</h2>
                <p className="text-slate-500">Manage your platform’s primary branding and messaging.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Website Name <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    value={settings.website_name}
                    onChange={(e) => setSettings({ ...settings, website_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Website Tagline <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    value={settings.website_tagline}
                    onChange={(e) => setSettings({ ...settings, website_tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">About / Mission Statement</label>
                <textarea
                  rows={3}
                  value={settings.mission_statement}
                  onChange={(e) => setSettings({ ...settings, mission_statement: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-2">Website Logo <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl border border-slate-200 bg-slate-50 p-2 flex items-center justify-center">
                    <img src={settings.logo_url || '/logo.png'} alt="Brand Logo" className="max-h-full object-contain" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-500">Allowed formats: PNG, JPG (Max 2MB). Recommended size 512x512px.</p>
                    <div className="flex items-center gap-2">
                      <label className="px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold cursor-pointer">
                        Upload New Logo
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, logo_url: '/logo.png' })}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                      >
                        Reset Original
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Contact' && (
            <>
              <div>
                <h2 className="text-base font-extrabold text-[#0A1128]">Contact &amp; Telegram Settings</h2>
                <p className="text-slate-500">Configure the destination for all &quot;Ask Owner for Any Doubt&quot; buttons.</p>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Telegram URL (HTTPS)</label>
                <input
                  type="url"
                  value={settings.telegram_url}
                  onChange={(e) => setSettings({ ...settings, telegram_url: e.target.value })}
                  placeholder="https://t.me/your_username"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Public Contact Email</label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg"
                />
              </div>
            </>
          )}

          {activeTab === 'Session' && (
            <>
              <div>
                <h2 className="text-base font-extrabold text-[#0A1128]">Session &amp; Joining Policy</h2>
                <p className="text-slate-500">Default time zone and rules for joining live Zoom rooms.</p>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Default Time Zone</label>
                <input
                  type="text"
                  value={settings.default_timezone}
                  onChange={(e) => setSettings({ ...settings, default_timezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Session Joining Policy</label>
                <textarea
                  rows={3}
                  value={settings.session_policy}
                  onChange={(e) => setSettings({ ...settings, session_policy: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg"
                />
              </div>
            </>
          )}

          {activeTab === 'Footer' && (
            <>
              <div>
                <h2 className="text-base font-extrabold text-[#0A1128]">Footer Settings</h2>
                <p className="text-slate-500">Update copyright text displayed across all public pages.</p>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Footer Text</label>
                <input
                  type="text"
                  value={settings.footer_text}
                  onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg"
                />
              </div>
            </>
          )}

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => api.getSettings().then(setSettings)}
              className="px-4 py-2.5 rounded-lg text-slate-600 font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
