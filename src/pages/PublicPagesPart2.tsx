import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Send, Search, Megaphone, HelpCircle, PhoneCall
} from 'lucide-react';
import { PublicLayout, openTelegramSupport } from '../components/Layout';
import { api } from '../lib/supabase';

/* ============================================================================
   PAGE 5: RULES & GUIDELINES (Design 2 - Accordion FAQ Style - Image 5)
   ============================================================================ */
export const GuidelinesPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const steps = [
    {
      num: '01',
      title: 'Start Strong (Initiation)',
      content: 'Take the initiative if you are well-prepared. Introduce the topic clearly, set a positive, welcoming direction, and invite others to contribute. Tip: If you are unsure of the topic, wait, listen, and then initiate after gathering thoughts.',
    },
    {
      num: '02',
      title: 'Express Opinions Clearly',
      content: 'Structure your points logically. Use clear language and state your stance firmly without being aggressive.',
    },
    {
      num: '03',
      title: 'Provide Factual Examples',
      content: 'Support your arguments with real-world data, statistics, case studies, or historical references to boost credibility.',
    },
    {
      num: '04',
      title: 'Practice Active Listening',
      content: 'Pay close attention to fellow speakers. Acknowledge valid points made by others before adding your perspective.',
    },
    {
      num: '05',
      title: 'Disagree Respectfully',
      content: 'When countering an argument, attack the point, not the person. Use phrases like "I see it slightly differently..."',
    },
    {
      num: '06',
      title: 'Summarize & Conclude',
      content: 'Bring diverse viewpoints together towards the end. Deliver a balanced conclusion that captures the essence of the group discussion.',
    },
  ];

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#0A1128] mb-1">Group Discussion (GD) Guidelines</h1>
          <p className="text-sm text-slate-600">
            A compact, on-demand guide on how to perform well in a GD, from starting to summarizing.
          </p>
        </div>

        {/* Hero Banner with Photo */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-md h-52 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="Guidelines"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <span className="text-white font-extrabold text-lg">Essential GD Rules & Etiquette</span>
          </div>
        </div>

        {/* Vertical Timeline paired with Accordions matching Image 5 */}
        <div className="space-y-4 relative before:absolute before:left-7 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-300">
          {steps.map((st, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={st.num} className="flex items-start gap-4 relative">
                <div className="w-14 h-12 rounded-xl bg-[#0A1128] text-white font-extrabold text-sm flex items-center justify-center shrink-0 z-10 shadow">
                  {st.num}
                </div>

                <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-[#0A1128] text-base"
                  >
                    <span>{st.num} | {st.title}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
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

        {/* Highlighted Common Mistakes Box matching Image 5 */}
        <div className="mt-8 bg-[#FFF5EB] border border-[#FCD34D] rounded-2xl p-6 text-[#9A3412]">
          <h3 className="font-extrabold text-base mb-2">07 | Common Mistakes to Avoid</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Interrupting others repeatedly or talking over participants.</li>
            <li>Losing your temper or being overly aggressive.</li>
            <li>Going off-topic or drifting away from the core agenda.</li>
          </ul>
        </div>

        {/* Bottom Telegram Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0A1128] to-[#1D4ED8] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow">
          <div>
            <h3 className="text-lg font-extrabold">Ask Owner for Any Doubt</h3>
            <p className="text-xs text-blue-200">Have a doubt? Get 1-on-1 support directly from the founder.</p>
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
   PAGE 6: ANNOUNCEMENTS PAGE (Design 7 - Featured Latest + List - Image 6)
   ============================================================================ */
export const AnnouncementsPage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.list('announcements', true).then(setList);
  }, []);

  const categories = ['All', 'Urgent', 'Sessions', 'Platform Updates', 'Tips'];
const filtered = list.filter((a) => {
  const catLower = (a.category || '').toLowerCase();
  const mCat =
    filter === 'All' ||
    (filter === 'Urgent' && (a.is_important || catLower === 'priority')) ||
    (filter === 'Platform Updates' && (catLower.includes('update') || catLower.includes('system'))) ||
    catLower.includes(filter.toLowerCase());
  const mSearch =
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.message || '').toLowerCase().includes(search.toLowerCase());
  return mCat && mSearch;
});


  const featured = filtered[0];
  const older = filtered.slice(1);

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#0A1128] mb-1">Announcements</h1>
          <p className="text-sm text-slate-600">
            Stay updated with our latest GD sessions, platform upgrades, and priority notices.
          </p>
        </div>

        {/* Category Pills & Search */}
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

        {/* 2-Column Grid matching Image 6 */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {featured && (
              <div className="bg-[#EAF2FF] border-2 border-[#0A1128] rounded-2xl p-7 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    FEATURED LATEST
                  </span>
                  <span className="text-xs font-medium text-slate-500">{featured.created_at}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0A1128] mb-3">{featured.title}</h2>
                <span className="inline-block px-3 py-1 rounded-full bg-[#E11D48] text-white text-[11px] font-bold mb-4">
                  Priority
                </span>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">{featured.message}</p>
                <button
                  onClick={() => alert(featured.message)}
                  className="px-6 py-2.5 rounded-xl bg-[#0A1128] hover:bg-blue-700 text-white font-bold text-xs shadow"
                >
                  Read Full Notice
                </button>
              </div>
            )}

            <h3 className="text-lg font-extrabold text-[#0A1128] pt-4">Older Announcements</h3>
            <div className="space-y-4">
              {older.map((a) => (
                <div
                  key={a.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-400">{a.created_at}</span>
                      <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {a.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-[#0A1128]">{a.title}</h4>
                  </div>
                  <button
                    onClick={() => alert(a.message)}
                    className="text-xs font-bold text-blue-600 hover:underline shrink-0 flex items-center gap-1"
                  >
                    Show More →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar matching Image 6 */}
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
   PAGE 7: CONTACT & FAQS (Design 6 - Contact Form + Telegram + FAQ - Image 7)
   ============================================================================ */
export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      alert('Kripya message field bharein.');
      return;
    }
    await api.save('feedback', { name, email, subject, message, rating: 5, is_reviewed: false });
    alert('Aapka message successfully bhej diya gaya hai!');
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

        {/* Send Us a Message Form + Photo matching Image 7 */}
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

        {/* Telegram Direct Support Card matching Image 7 */}
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

        {/* Quick Answers (FAQs) Accordion matching Image 7 */}
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
