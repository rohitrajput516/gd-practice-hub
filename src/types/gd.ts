export interface GDSession {
  id: string;
  badge_label: string;
  title: string;
  host_name: string;
  scheduled_display: string;
  zoom_url: string | null;
  status: "published" | "cancelled" | "draft";
}

export interface GDTopic {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  category: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: "register" | "prep" | "discuss";
}

export interface SiteSettings {
  telegramUrl: string;
}
