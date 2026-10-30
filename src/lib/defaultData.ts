import { GDSession, GDTopic, HowItWorksStep, StatItem } from "@/types/gd";

export const DEFAULT_STATS: StatItem[] = [
  {
    id: "stat-community",
    value: "2,310+",
    label: "Active Community",
  },
  {
    id: "stat-practice",
    value: "2,160+",
    label: "Daily Practice",
  },
  {
    id: "stat-topics",
    value: "6,430+",
    label: "Daily Topics",
  },
];

export const DEFAULT_SESSIONS: GDSession[] = [
  {
    id: "session-1",
    badge_label: "Next session",
    title: "Impact of Artificial Intelligence",
    host_name: "Ex-Awasthi",
    scheduled_display: "May, 26, 2024, 7:30 PM",
    zoom_url: "",
    status: "published",
  },
  {
    id: "session-2",
    badge_label: "Next session",
    title: "Economic Reforms & Youth Employment",
    host_name: "Ex-Awasthi",
    scheduled_display: "May, 26, 2024, 7:30 PM",
    zoom_url: "",
    status: "published",
  },
  {
    id: "session-3",
    badge_label: "Next session",
    title: "Youth Employment",
    host_name: "Ex-Awasthi",
    scheduled_display: "May, 26, 2024, 7:30 PM",
    zoom_url: "",
    status: "published",
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepNumber: 1,
    title: "1. Register",
    description: "Register your necessity with ease and beauty",
    iconName: "register",
  },
  {
    stepNumber: 2,
    title: "2. Prep",
    description:
      "Clean design, visual hierarchy, and professional visual layout",
    iconName: "prep",
  },
  {
    stepNumber: 3,
    title: "3. Discuss",
    description:
      "Discuss course, alignment, and a professional visual hierarchy",
    iconName: "discuss",
  },
];

export const DEFAULT_TOPICS: GDTopic[] = [
  {
    id: "topic-1",
    title: "Crypto &\nEconomy",
    slug: "crypto-and-economy",
    category: "Economy",
    image_url:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "topic-2",
    title: "Economy &\nFinance",
    slug: "economy-and-finance",
    category: "Finance",
    image_url:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "topic-3",
    title: "Climate Action\n2026",
    slug: "climate-action-2026",
    category: "Environment",
    image_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "topic-4",
    title: "Artificial\nIntelligence",
    slug: "artificial-intelligence",
    category: "Technology",
    image_url:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "topic-5",
    title: "Global Trade\n& Policy",
    slug: "global-trade-and-policy",
    category: "Geopolitics",
    image_url:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
  },
];
