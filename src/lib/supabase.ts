import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isCloudEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
export const supabase = isCloudEnabled ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export const isValidHttps = (url?: string) => {
  if (!url) return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
};

// Dynamic future dates generator so default seed sessions stay Upcoming
const getFutureDateStr = (daysAhead: number) => {
  const d = new Date(Date.now() + daysAhead * 86400000);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const SEED_DATA: Record<string, any> = {
  website_settings: {
    id: 1,
    website_name: 'GD Practice Hub',
    website_tagline: 'Practice. Discuss. Lead.',
    mission_statement:
      'A premier web platform designed for students to practice, discuss, and improve their Group Discussion (GD) and communication skills through guided live interactive sessions.',
    logo_url: '/logo.png',
    telegram_url: 'https://t.me/gdpractice_owner',
    default_timezone: 'IST (UTC+5:30)',
    contact_email: 'admin@gdpractice.com',
    footer_text: '© 2026 GD Practice Hub. All Rights Reserved.',
    session_policy:
      'Starting this Monday, please register at least 2 hours before any scheduled GD session to get the Zoom meeting credentials.',
  },
  sessions: [
    {
      id: '1',
      title: 'Tech & Society GD: Is Privacy Dead in the Age of AI & Social Media?',
      topic: 'Is Social Media Killing Privacy?',
      category: 'AI & Tech',
      scheduled_date: getFutureDateStr(1),
      start_time: '7:00 PM',
      timezone: 'IST (UTC+5:30)',
      platform: 'Zoom Room',
      zoom_url: 'https://zoom.us/j/9876543210',
      meeting_id: '987 654 3210',
      passcode: 'GD2026',
      status: 'Upcoming',
      is_published: true,
      is_featured: true,
      participants: '12-15 Participants',
      description:
        'A fast-paced interactive discussion on how AI algorithms, data mining, and social media platforms handle our personal data. Who should join? Students preparing for campus placements, interviews, and anyone keen on digital privacy.',
      preparation_points:
        'Pros: AI improves personalized experiences, security, and automates repetitive tasks\nCons: Leads to data misuse, invasion of personal space, and constant surveillance\nData points to research: Case studies on major data leaks, privacy regulations like GDPR, and the role of tech giants in monitoring public opinion.',
      special_instructions:
        'Be respectful to other candidates\nNo interruptions while someone is speaking\nSupport your opinions with factual data\nAdhere to the 3-minute speaking limit',
    },
    {
      id: '2',
      title: 'Business & Economy GD',
      topic: 'Economic Impact of Artificial Intelligence',
      category: 'Business & Economy',
      scheduled_date: getFutureDateStr(2),
      start_time: '6:00 PM',
      timezone: 'IST (UTC+5:30)',
      platform: 'Zoom Room',
      zoom_url: 'https://zoom.us/j/9876543211',
      status: 'Upcoming',
      is_published: true,
      is_featured: false,
      participants: '8 Participants',
      description: 'Group discussion on macroeconomic trends, inflation, and AI corporate shifts.',
      preparation_points:
        'Analyze wealth distribution.\nExamine labor displacement.\nGlobal market competition.',
      special_instructions:
        'Be respectful to other candidates\nAdhere to the 3-minute speaking limit',
    },
    {
      id: '3',
      title: 'Placement Special GD',
      topic: 'AI & The Future of Work',
      category: 'Interview and Placement GD',
      scheduled_date: getFutureDateStr(3),
      start_time: '5:00 PM',
      timezone: 'IST (UTC+5:30)',
      platform: 'Zoom Room',
      zoom_url: 'https://zoom.us/j/9876543212',
      status: 'Upcoming',
      is_published: true,
      is_featured: false,
      participants: '15 Participants',
      description: 'Special mock placement session focused on campus interview readiness.',
      preparation_points:
        'Understand the timeline of AI automation.\nSynthesize solutions for workforce reskilling.',
      special_instructions: 'Join 5 minutes early.',
    },
    {
      id: '4',
      title: 'Corporate Case Study GD',
      topic: 'Startup Governance',
      category: 'Business & Economy',
      scheduled_date: 'Jan 22, 2026',
      start_time: '6:00 PM',
      timezone: 'IST (UTC+5:30)',
      platform: 'Zoom Room',
      zoom_url: '',
      status: 'Completed',
      is_published: true,
      is_featured: false,
      participants: '14 Participants',
      description: 'Completed session on corporate ethics.',
      preparation_points: 'Case study breakdown.',
      special_instructions: 'Completed.',
    },
  ],
  topics: [
    {
      id: 't1',
      title: 'Impact of AI on Modern Jobs',
      category: 'AI & Tech',
      description: 'Analyze the threat of automation, digital tracking, and AI on human labor.',
      preparation_points:
        '• Understand the timeline of AI automation.\n• Discuss industries most affected (e.g., manufacturing, finance).\n• Examine new roles and skills in demand.\n• Synthesize solutions for workforce reskilling.',
      difficulty: 'Medium',
      est_time: '45m',
      badge: 'POPULAR',
      image_url:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_published: true,
    },
    {
      id: 't2',
      title: 'Is Social Media Killing Privacy?',
      category: 'Social Issues',
      description: 'Discuss the impact of algorithms and social media on human dignity.',
      preparation_points:
        '• Algorithmic tracking.\n• GDPR and privacy laws.\n• Mental health impacts.',
      difficulty: 'Hard',
      est_time: '40m',
      badge: 'RECOMMENDED',
      image_url:
        'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_published: true,
    },
    {
      id: 't3',
      title: 'Economic Impact of Artificial Intelligence',
      category: 'Business',
      description: 'Analyzing AI-driven growth, wealth distribution, and labor displacement.',
      preparation_points:
        '• Productivity gains vs job loss.\n• Universal basic income debate.',
      difficulty: 'Hard',
      est_time: '50m',
      badge: 'POPULAR',
      image_url:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_published: true,
    },
    {
      id: 't4',
      title: 'Can AI & Tech Replace Human Creativity?',
      category: 'AI & Tech',
      description: 'Explore whether generative AI can replicate authentic human emotion and art.',
      preparation_points:
        '• Originality vs training data.\n• Future of creative professions.',
      difficulty: 'Medium',
      est_time: '45m',
      badge: 'POPULAR',
      image_url:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      is_published: true,
    },
    {
      id: 't5',
      title: 'The Role of Social Media in Pandemic Awareness',
      category: 'Social Issues',
      description: 'Rapid information sharing vs misinformation during public health crises.',
      preparation_points:
        '• Verified health advisories.\n• Combating fake news.',
      difficulty: 'Easy',
      est_time: '30m',
      badge: 'POPULAR',
      image_url:
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      is_published: true,
    },
    {
      id: 't6',
      title: 'Impact of Autonomous Vehicles',
      category: 'AI & Tech',
      description: 'Safety, legal liability, and urban transport transformation.',
      preparation_points:
        '• Reduction in human error.\n• Infrastructure readiness in India.',
      difficulty: 'Medium',
      est_time: '45m',
      badge: 'POPULAR',
      image_url:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      is_published: true,
    },
  ],
  announcements: [
    {
      id: 'a1',
      title: 'IMPORTANT: GD Registration Policy Update',
      message:
        'Starting this Monday, please register at least 2 hours before any scheduled GD session to get the Zoom meeting credentials. Late registrations will not be accommodated to avoid disruptions.',
      category: 'Priority',
      is_important: true,
      is_featured: true,
      is_published: true,
      image_url:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
      created_at: '2026-03-15',
    },
    {
      id: 'a2',
      title: 'Live Practice Session with Mock Judges',
      message: 'Join our weekend evaluation panel for personalized speaking feedback.',
      category: 'Sessions',
      is_important: false,
      is_published: true,
      created_at: '2026-03-14',
    },
    {
      id: 'a3',
      title: 'New Feature: GD Prep Resources Added',
      message: 'Structured preparation points are now live inside the Topics Library.',
      category: 'Platform Updates',
      is_important: false,
      is_published: true,
      created_at: '2026-03-12',
    },
    {
      id: 'a4',
      title: 'Scheduled Server Maintenance',
      message: 'Brief 15-minute database upgrade completed smoothly.',
      category: 'Platform Updates',
      is_important: false,
      is_published: true,
      created_at: '2026-03-10',
    },
  ],
  feedback: [
    {
      id: 'f1',
      name: 'Aman Sharma',
      email: 'aman.sharma@example.com',
      session_title: 'Tech & Society GD',
      subject: 'Awesome GD Sessions!',
      message:
        'Really enjoying the live GD practice sessions on Zoom! The mentors are great and help everyone speak.',
      rating: 5,
      is_reviewed: false,
      is_starred: false,
      created_at: '10:42 AM',
    },
    {
      id: 'f2',
      name: 'Pooja Patel',
      email: 'pooja.p@example.com',
      session_title: 'Business & Economy GD',
      subject: 'Suggestion for Schedule Page',
      message:
        'The current GD Schedule page is very informative, but could you please show which Zoom session will use which exact topic beforehand? Thanks for this amazing tool!',
      rating: 5,
      is_reviewed: false,
      is_starred: false,
      created_at: 'Yesterday',
    },
    {
      id: 'f3',
      name: 'Sneha Roy',
      email: 'sneha.roy9@example.com',
      session_title: 'Session 12',
      subject: 'Technical issue joining Zoom',
      message:
        "Hey Admin, I tried joining the Session 12 yesterday, but the link showed 'Session expired'. Please check.",
      rating: 4,
      is_reviewed: true,
      is_starred: true,
      created_at: 'Nov 1, 2026',
    },
  ],
  guidelines: [
    {
      id: '1',
      num: '01',
      title: 'Start Strong (Initiation)',
      content:
        'Take the initiative if you are well-prepared. Introduce the topic clearly, set a positive, welcoming direction, and invite others to contribute. Tip: If you are unsure of the topic, wait, listen, and then initiate after gathering thoughts.',
    },
    {
      id: '2',
      num: '02',
      title: 'Express Opinions Clearly',
      content:
        'Structure your points logically. Use clear language and state your stance firmly without being aggressive.',
    },
    {
      id: '3',
      num: '03',
      title: 'Provide Factual Examples',
      content:
        'Support your arguments with real-world data, statistics, case studies, or historical references to boost credibility.',
    },
    {
      id: '4',
      num: '04',
      title: 'Practice Active Listening',
      content:
        'Pay close attention to fellow speakers. Acknowledge valid points made by others before adding your perspective.',
    },
    {
      id: '5',
      num: '05',
      title: 'Disagree Respectfully',
      content:
        'When countering an argument, attack the point, not the person. Use phrases like "I see it slightly differently..."',
    },
    {
      id: '6',
      num: '06',
      title: 'Summarize & Conclude',
      content:
        'Bring diverse viewpoints together towards the end. Deliver a balanced conclusion that captures the essence of the group discussion.',
    },
    {
      id: '7',
      num: '07',
      title: 'Common Mistakes to Avoid',
      content:
        'Interrupting others repeatedly or talking over participants.\nLosing your temper or being overly aggressive.\nGoing off-topic or drifting away from the core agenda.',
    },
  ],
};

const readLocal = (key: string) => {
  const raw = localStorage.getItem(`gdhub_${key}`);
  if (!raw || raw === 'undefined') {
    const fallback = SEED_DATA[key] ?? [];
    localStorage.setItem(`gdhub_${key}`, JSON.stringify(fallback));
    return fallback;
  }
  try {
    const parsed = JSON.parse(raw);
    // Auto-migrate old Jan 2026 seed sessions if still stuck in localStorage
    if (key === 'sessions' && Array.isArray(parsed)) {
      const hasOldJanSeed = parsed.some(
        (s: any) =>
          (s.id === '1' || s.id === '2' || s.id === '3') &&
          String(s.scheduled_date).includes('Jan, 2026')
      );
      if (hasOldJanSeed) {
        localStorage.setItem(`gdhub_sessions`, JSON.stringify(SEED_DATA.sessions));
        return SEED_DATA.sessions;
      }
    }
    return parsed;
  } catch {
    const fallback = SEED_DATA[key] ?? [];
    localStorage.setItem(`gdhub_${key}`, JSON.stringify(fallback));
    return fallback;
  }
};

const writeLocal = (key: string, val: any) => {
  localStorage.setItem(`gdhub_${key}`, JSON.stringify(val));
};

export const api = {
  async getSettings() {
    if (isCloudEnabled && supabase) {
      const { data } = await supabase.from('website_settings').select('*').single();
      if (data) return { ...SEED_DATA.website_settings, ...data };
    }
    const local = readLocal('website_settings');
    return {
      ...SEED_DATA.website_settings,
      ...local,
      telegram_url: local?.telegram_url || SEED_DATA.website_settings.telegram_url,
    };
  },
  async updateSettings(payload: any) {
    if (isCloudEnabled && supabase) {
      await supabase.from('website_settings').upsert({ id: 1, ...payload });
    }
    const next = { ...readLocal('website_settings'), ...payload };
    writeLocal('website_settings', next);
    return next;
  },
  async list(table: string, onlyPublished = false) {
    let rows: any[] = [];
    if (isCloudEnabled && supabase) {
      let q = supabase.from(table).select('*');
      if (onlyPublished) q = q.eq('is_published', true);
      const { data } = await q;
      if (data) rows = data;
    } else {
      rows = readLocal(table) || [];
      if (onlyPublished) rows = rows.filter((r: any) => r.is_published !== false);
    }

    if (table === 'topics' && rows.length > 0) {
      writeLocal('topics', rows);
    }

    if (table === 'sessions') {
      const allTopics = readLocal('topics') || [];
      const now = Date.now();
      const DURATION_MS = 60 * 60 * 1000; // 1 hour live window

      const parseTime = (s: any) => {
        if (!s?.scheduled_date || !s?.start_time) return Number.MAX_SAFE_INTEGER;
        const cleanDate = String(s.scheduled_date).replace(/^[A-Za-z]+,\s*/, '');
        const parsed = new Date(`${cleanDate} ${s.start_time}`).getTime();
        return isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
      };

      const categoryFallbackImages: Record<string, string> = {
        'AI & Tech': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        'Artificial Intelligence and Technology': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        'Business & Economy': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        'Business & Finance': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        'Social Issues': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
        'Interview and Placement GD': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
      };

      rows = rows.map((s: any) => {
        const startMs = parseTime(s);
        let computedStatus = s.status;

        if (
          s.status !== 'Cancelled' &&
          s.status !== 'Live' &&
          s.status !== 'Completed' &&
          startMs !== Number.MAX_SAFE_INTEGER
        ) {
          if (now >= startMs && now <= startMs + DURATION_MS) {
            computedStatus = 'Live';
          } else if (now < startMs) {
            computedStatus = 'Upcoming';
          } else if (now > startMs + DURATION_MS) {
            computedStatus = 'Completed';
          }
        }

        const matchedTopic = allTopics.find(
          (t: any) =>
            (s.topic && t.title?.toLowerCase() === s.topic.toLowerCase()) ||
            t.title?.toLowerCase() === s.title?.split(':')[0]?.toLowerCase()
        );
        const resolvedImage =
          s.image_url ||
          matchedTopic?.image_url ||
          categoryFallbackImages[s.category] ||
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';

        return { ...s, status: computedStatus, _startMs: startMs, image_url: resolvedImage };
      });

      rows.sort((a: any, b: any) => {
        if (a.status === 'Live' && b.status !== 'Live') return -1;
        if (b.status === 'Live' && a.status !== 'Live') return 1;
        return a._startMs - b._startMs;
      });
    }

    return rows;
  },
  async save(table: string, record: any) {
    const cleanRecord = { ...record };
    delete cleanRecord._startMs;

    if (isCloudEnabled && supabase) {
      const { data, error } = await supabase.from(table).upsert(cleanRecord).select().single();
      if (error) throw error;
      return data;
    }

    const rows = readLocal(table) || [];
    if (cleanRecord.id) {
      const idx = rows.findIndex((r: any) => r.id === cleanRecord.id);
      if (idx > -1) rows[idx] = { ...rows[idx], ...cleanRecord };
      else rows.unshift(cleanRecord);
    } else {
      cleanRecord.id = `${Date.now()}`;
      cleanRecord.created_at = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      rows.unshift(cleanRecord);
    }
    writeLocal(table, rows);
    return cleanRecord;
  },
  async remove(table: string, id: string) {
    if (isCloudEnabled && supabase) {
      await supabase.from(table).delete().eq('id', id);
    }
    const rows = (readLocal(table) || []).filter((r: any) => r.id !== id);
    writeLocal(table, rows);
  },
};
