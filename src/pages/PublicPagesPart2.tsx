import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, Search } from 'lucide-react';
import { PublicLayout, openTelegramSupport } from '../components/Layout';
import { api } from '../lib/supabase';

const ActionButtonLink: React.FC<{ url: string; text?: string; className: string }> = ({
  url,
  text,
  className,
}) => {
  const cleanUrl = url.trim();
  const isExternal = /^https?:\/\//i.test(cleanUrl) || cleanUrl.startsWith('www.');
  const href = cleanUrl.startsWith('www.') ? `https://${cleanUrl}` : cleanUrl;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {text || 'Open Link →'}
      </a>
    );
  }
  return (
    <Link to={cleanUrl} className={className}>
      {text || 'Open Link →'}
    </Link>
  );
};

/* ============================================================================
   PAGE 5: RULES & GUIDELINES
   ============================================================================ */
export const GuidelinesPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    api.list('guidelines').then((rows) => {
      if (rows && rows.length > 0) {
        setSteps(rows);
      }
    });
  }, []);

  const timelineRules = steps.filter(
    (s) => !String(s.title).toLowerCase().includes('common mistakes')
  );
  const mistakesRule =
    steps.find((s) => String(s.title).toLowerCase().includes('common mistakes')) || {
      num: '07',
      title: 'Common Mistakes to Avoid',
      content:
        'Interrupting others repeatedly or talking over participants.\nLosing your temper or being overly aggressive.\nGoing off-topic or drifting away from the core agenda.',
    };

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#0A1128] mb-1">
            Group Discussion (GD) Guidelines
          </h1>
          <p className="text-sm text-slate-600">
            A compact, on-demand guide on how to perform well in a GD, from starting to summarizing.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-md h-52 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="Guidelines"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <span className="text-white font-extrabold text-lg">Essential GD Rules &amp; Etiquette</span>
          </div>
        </div>

        <div className="space-y-4 relative before:absolute before:left-7 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-300">
          {timelineRules.map((st, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={st.id || st.num} className="flex items-start gap-4 relative">
                <div className="w-14 h-12 rounded-xl bg-[#0A1128] text-white font-extrabold text-sm flex items-center justify-center shrink-0 z-10 shadow">
                  {st.num}
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-[#0A1128] text-base"
                  >
                    <span>{st.num} | {st.title}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 whitespace-pre-line"
                      >
                        {st.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {mistakesRule && (
          <div className="mt-8 bg-[#FFF5EB] border border-[#FCD34D] rounded-2xl p-6 text-[#9A3412]">
            <h3 className="font-extrabold text-base mb-2">
              {mistakesRule.num} | {mistakesRule.title}
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {String(mistakesRule.content)
                .split('\n')
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
            </ul>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-[#0A1128] to-[#1D4ED8] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow">
          <div>
            <h3 className="text-lg font-extrabold">Ask Owner for Any Doubt</h3>
            <p className="text-xs text-blue-200">
              Have a doubt? Get 1-on-1 support directly from the founder.
            </p>
          </div>
          <button
            onClick={openTelegramSupport}
            className="px-5 py-2.5 rounded-lg bg-white text-[#0A1128] font-bold text-xs hover:bg-slate-100 flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-blue-600" /> Message on Telegram
          </button>
        </div>
      </div>
    </PublicLayout>
  );
};

/* ============================================================================
   PAGE 6: ANNOUNCEMENTS PAGE
   ============================================================================ */
export const AnnouncementsPage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [adminFilters, setAdminFilters] = useState<string[]>([
    'Urgent',
    'Sessions',
    'Platform Updates',
    'Tips',
  ]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [featuredExpanded, setFeaturedExpanded] = useState(false);

  useEffect(() => {
    Promise.all([api.list('announcements', true), api.getSettings()]).then(
      ([anns, settings]) => {
        setList(anns);
        const baseFilters: string[] =
          Array.isArray(settings?.announcement_filters) &&
          settings.announcement_filters.length > 0
            ? settings.announcement_filters
            : ['Urgent', 'Sessions', 'Platform Updates', 'Tips'];
        const merged = [...baseFilters];
        anns.forEach((a: any) => {
          if (
            a.category &&
            a.category !== 'Priority' &&
            !merged.some((f) => f.toLowerCase() === String(a.category).toLowerCase())
          ) {
            merged.push(a.category);
          }
        });
        setAdminFilters(merged);
      }
    );
  }, []);

  const categories = ['All', ...adminFilters];

  const filtered = list.filter((a) => {
    const catLower = String(a.category || '').toLowerCase();
    const filterLower = filter.toLowerCase();

    const mCat =
      filter === 'All' ||
      (filterLower === 'urgent' &&
        (a.is_important || catLower === 'urgent' || catLower === 'priority')) ||
      (filterLower === 'platform updates' &&
        (catLower === 'platform updates' ||
          catLower.includes('update') ||
          catLower.includes('system'))) ||
      catLower === filterLower ||
      catLower.includes(filterLower);

    const mSearch =
      (a.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.message || '').toLowerCase().includes(search.toLowerCase());

    return mCat && mSearch;
  });

  const featured = filtered.find((a) => a.is_featured) || filtered[0];
  const older = filtered.filter((a) => a.id !== featured?.id);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#0A1128] mb-1">Announcements</h1>
          <p className="text-sm text-slate-600">
            Stay updated with our latest GD sessions, platform upgrades, and priority notices.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                  filter === c
                    ? 'bg-[#0A1128] text-white border-[#0A1128]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {featured ? (
              <div className="bg-[#EAF2FF] border-2 border-[#0A1128] rounded-2xl p-7 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    FEATURED LATEST
                  </span>
                  <span className="text-xs font-medium text-slate-500">{featured.created_at}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0A1128] mb-3">{featured.title}</h2>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {featured.is_important && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#DC3545] text-white text-[11px] font-bold">
                      Priority
                    </span>
                  )}
                  {featured.category && (
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                      {featured.category}
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-5 ${
                    featuredExpanded ? '' : 'line-clamp-3'
                  }`}
                >
                  {featured.message}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setFeaturedExpanded(!featuredExpanded)}
                    className="px-6 py-2.5 rounded-xl bg-[#0A1128] hover:bg-blue-700 text-white font-bold text-xs shadow transition"
                  >
                    {featuredExpanded ? 'Show Less ↑' : 'Read Full Notice'}
                  </button>
                  {featured.action_url && (
                    <ActionButtonLink
                      url={featured.action_url}
                      text={featured.action_text}
                      className="px-5 py-2.5 rounded-xl bg-[#1D6BF3] hover:bg-blue-700 text-white font-bold text-xs shadow transition"
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-sm text-slate-500">
                Is filter mein abhi koi announcement nahi hai.
              </div>
            )}

            {older.length > 0 && (
              <>
                <h3 className="text-lg font-extrabold text-[#0A1128] pt-4">Older Announcements</h3>
                <div className="space-y-4">
                  {older.map((a) => {
                    const isOpen = Boolean(expandedIds[a.id]);
                    return (
                      <div
                        key={a.id}
                        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs text-slate-400">{a.created_at}</span>
                              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                                {a.category || 'Sessions'}
                              </span>
                            </div>
                            <h4 className="font-bold text-base text-[#0A1128]">{a.title}</h4>
                          </div>
                          <button
                            onClick={() => toggleExpand(a.id)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 shrink-0 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition"
                          >
                            {isOpen ? 'Show Less ↑' : 'Show More →'}
                          </button>
                        </div>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                {a.message}
                                {a.action_url && (
                                  <div className="mt-3">
                                    <ActionButtonLink
                                      url={a.action_url}
                                      text={a.action_text}
                                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#1D6BF3] hover:bg-blue-700 text-white font-bold text-xs"
                                    />
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-base text-[#0A1128] mb-4">Quick Stats/Resources</h3>
              <ul className="space-y-3 text-sm font-medium text-slate-700">
                <li className="pb-2 border-b border-slate-100">
                  <Link to="/schedule" className="hover:text-blue-600 block">Prep Schedules →</Link>
                </li>
                <li className="pb-2 border-b border-slate-100">
                  <Link to="/topics" className="hover:text-blue-600 block">GD Topics &amp; Resources →</Link>
                </li>
                <li>
                  <Link to="/guidelines" className="hover:text-blue-600 block">Rules &amp; Guidelines →</Link>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <h3 className="font-extrabold text-base text-[#0A1128]">Have a Doubt?</h3>
              <p className="text-xs text-slate-600">
                Connect directly with the founder/owner via Telegram.
              </p>
              <button
                onClick={openTelegramSupport}
                className="w-full py-2.5 rounded-xl bg-[#0A1128] hover:bg-blue-700 text-white font-bold text-xs"
              >
                Ask Owner for Any Doubt
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

/* ============================================================================
   PAGE 7: CONTACT & FAQS
   ============================================================================ */
export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Kripya message field bharein.');
      return;
    }
    await api.save('feedback', {
      name: name.trim() || 'Visitor',
      email: email.trim(),
      session_title: 'CONTACT_MESSAGE',
      subject: subject.trim() || 'Private Contact Inquiry',
      message: message.trim(),
      rating: 0,
      is_reviewed: false,
    });
    alert('Aapka message seedha Admin ko bhej diya gaya hai!');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const faqs = [
    { q: 'How do I join a live Group Discussion?', a: 'Visit the GD Schedule page, select an upcoming session, and click Join Meeting when the countdown finishes.' },
    { q: 'Are the GD practice sessions free?', a: 'Yes! All scheduled student practice sessions are 100% free of cost.' },
    { q: 'How can I suggest a new GD topic?', a: 'You can message the founder directly via Telegram using the support button.' },
    { q: 'What if I experience technical issues?', a: 'Make sure your browser has camera and microphone permissions enabled for Zoom.' },
  ];

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#0A1128] mb-1">Have a Question? We Are Here to Help!</h1>
          <p className="text-sm text-slate-600">
            Reach out through our message form, join us on Telegram, or browse our FAQs below.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-2xl p-7 shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="md:col-span-6 space-y-4">
            <h2 className="text-xl font-extrabold text-[#0A1128] mb-2">Send Us a Message</h2>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What is this about?"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message here..."
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#155EEF] hover:bg-blue-700 text-white font-bold text-xs shadow"
            >
              Send Message
            </button>
          </form>
          <div className="md:col-span-6 rounded-2xl overflow-hidden shadow h-72">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
              alt="Support Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-[#D8EAFF] border border-blue-200 rounded-2xl p-7 text-center mb-10 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#2AABEE] text-white flex items-center justify-center mx-auto mb-3 shadow">
            <Send className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-[#0A1128] mb-1">Telegram Support</h2>
          <p className="text-xs text-slate-700 max-w-md mx-auto mb-5">
            Connect directly with the founder/owner instantly on Telegram for quick resolutions to your queries, scheduling doubts, and feedback.
          </p>
          <button
            onClick={openTelegramSupport}
            className="px-6 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold text-xs shadow inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Ask Owner for Any Doubt
          </button>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#0A1128] mb-4">Quick Answers (FAQs)</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-[#0A1128] text-sm"
                  >
                    <span>{f.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
