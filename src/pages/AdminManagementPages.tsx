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
  const [form, setForm] = useState<any>({
    id: '',
    title: '',
    topic: '',
    category: 'Business & Finance',
    scheduled_date: 'March 22, 2026',
    start_time: '6:00 PM',
    timezone: 'IST (UTC+5:30)',
    platform: 'Zoom Room',
    zoom_url: '',
    meeting_id: '',
    passcode: '',
    status: 'Upcoming',
    is_published: true,
    description: '',
    special_instructions: 'Be respectful to other candidates.\nNo interruptions while someone is speaking.\nSupport your opinions with factual data.\nAdhere to the 3-minute speaking limit.'
  });

  const load = () => api.list('sessions').then(setSessions);
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm({
      id: '',
      title: '',
      topic: '',
      category: 'Business & Finance',
      scheduled_date: 'March 22, 2026',
      start_time: '6:00 PM',
      timezone: 'IST (UTC+5:30)',
      platform: 'Zoom Room',
      zoom_url: '',
      meeting_id: '',
      passcode: '',
      status: 'Upcoming',
      is_published: true,
      description: '',
      special_instructions: 'Be respectful to other candidates.\nNo interruptions while someone is speaking.\nSupport your opinions with factual data.\nAdhere to the 3-minute speaking limit.'
    });
    setModalOpen(true);
  };

  const openEdit = (s: any) => {
    setForm({ ...s });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.zoom_url && !isValidHttps(form.zoom_url)) {
      alert('Zoom URL https:// se shuru hona chahiye.');
      return;
    }
    await api.save('sessions', {
      ...form,
      topic: form.topic || form.title
    });
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

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Date <span className="text-red-500">*</span></label>
                    <input
                      required
                      type="text"
                      value={form.scheduled_date}
                      onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })}
                      placeholder="March 22, 2026"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Start Time <span className="text-red-500">*</span></label>
                    <input
                      required
                      type="text"
                      value={form.start_time}
                      onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                      placeholder="6:00 PM"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Time Zone</label>
                    <input
                      type="text"
                      value={form.timezone}
                      onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

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
                  <</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
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
   PAGE 12: ADMIN MANAGE ANNOUNCEMENTS (Image 12 - 1000086162.png & Spec 27)
   ============================================================================ */
export const AdminAnnouncementsPage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<any>({
    id: '',
    title: '',
    message: '',
    is_important: true,
    is_published: true
  });

  const load = () => api.list('announcements').then(setList);
  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.save('announcements', {
      ...form,
      category: form.is_important ? 'Priority' : 'Sessions'
    });
    setModalOpen(false);
    load();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A1128]">Manage Announcements</h1>
            <p className="text-xs text-slate-500">Create, edit, and publish announcements &amp; important notices.</p>
          </div>
          <button
            onClick={() => {
              setForm({ id: '', title: '', message: '', is_important: true, is_published: true });
              setModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" /> Create Announcement
          </button>
        </div>

        {/* Announcements Table matching Image 12 */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[11px]">
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Important</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-[#0A1128] text-sm">{a.title}</td>
                  <td className="py-3.5 px-4 text-slate-500">{a.created_at}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      a.is_important ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {a.is_important ? '★ Active' : 'Normal'}
                    </span>
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
                    <Link to="/announcements" className="px-2.5 py-1 rounded border border-slate-200 font-semibold">View</Link>
                    <button onClick={() => { setForm(a); setModalOpen(true); }} className="px-2.5 py-1 rounded border border-slate-200 font-semibold">Edit</button>
                    <button
                      onClick={async () => {
                        if (confirm('Delete announcement?')) {
                          await api.remove('announcements', a.id);
                          load();
                        }
                      }}
                      className="px-2.5 py-1 rounded border border-red-200 bg-red-50 text-red-600 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create / Edit Announcement Modal matching Image 12 */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0A1128]">Create New Announcement</h2>
                    <p className="text-xs text-slate-500">Fill in the details to publish a new announcement.</p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Announcement Title <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="New Zoom Links for Weekly GD Sessions"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Message <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hey everyone! Starting this week..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Mark as Important? <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, is_important: !form.is_important })}
                      className={`px-3 py-1 rounded-full font-extrabold text-[11px] text-white ${
                        form.is_important ? 'bg-blue-600' : 'bg-slate-400'
                      }`}
                    >
                      {form.is_important ? 'ON ●' : 'OFF ○'}
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
                      {form.is_published ? 'ON ●' : 'OFF ○'}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-slate-100 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white font-bold">
                    Create Announcement
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
   PAGE 13: ADMIN MANAGE FEEDBACK (Image 13 - 1000086163.png & Spec 28)
   ============================================================================ */
export const AdminFeedbackPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [tab, setTab] = useState<'All' | 'Unread' | 'Reviewed'>('All');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string>('f2');

  const load = () => api.list('feedback').then(setItems);
  useEffect(() => { load(); }, []);

  const unreadCount = items.filter((i) => !i.is_reviewed).length;
  const reviewedCount = items.filter((i) => i.is_reviewed).length;

  const filtered = items.filter((i) => {
    const mTab =
      tab === 'All' ||
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
          <h1 className="text-2xl font-extrabold text-[#0A1128]">Manage Feedback</h1>
          <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
            <Lock className="w-3.5 h-3.5" /> Display visitor feedback. Admin can read, filter, mark as reviewed, and delete feedback records.
          </p>
        </div>

        {/* Inbox Container matching Image 13 */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Filter Bar */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
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

            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search feedback..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Inbox Rows */}
          <div className="divide-y divide-slate-200 text-xs">
            {filtered.map((f) => {
              const isOpen = expandedId === f.id;
              return (
                <div
                  key={f.id}
                  className={`p-4 transition ${isOpen ? 'bg-[#EBF3FF]/70' : 'hover:bg-slate-50'}`}
                >
                  <div
                    onClick={() => setExpandedId(isOpen ? '' : f.id)}
                    className="flex flex-wrap items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-[210px]">
                      <input type="checkbox" checked={isOpen} readOnly className="rounded text-blue-600" />
                      <Star className={`w-4 h-4 ${f.is_starred ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                      <div>
                        <p className="font-bold text-[#0A1128] flex items-center gap-1.5">
                          {f.name}
                          {!f.is_reviewed && <span className="text-blue-600 text-[11px] font-semibold">● Unread</span>}
                        </p>
                        <p className="text-slate-500 text-[11px]">{f.email}</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-xl">
                      <p className={`${!f.is_reviewed ? 'font-extrabold text-[#0A1128]' : 'font-semibold text-slate-800'}`}>
                        {f.subject} —
                      </p>
                      <p className="text-slate-600 truncate">{f.message}</p>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="text-[11px] text-slate-500">{f.created_at}</p>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        f.is_reviewed ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {f.is_reviewed ? 'Reviewed' : 'Unread'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Message Card matching Image 13 */}
                  {isOpen && (
                    <div className="mt-4 ml-8 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <p className="text-slate-800 leading-relaxed mb-4">{f.message}</p>
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
                            if (confirm('Delete feedback record?')) {
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
