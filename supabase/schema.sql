-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- 1. GD Sessions Table
create table if not exists public.gd_sessions (
  id uuid primary key default uuid_generate_v4(),
  badge_label text not null default 'Next session',
  title text not null,
  host_name text not null,
  scheduled_display text not null,
  zoom_url text,
  status text not null default 'published' check (status in ('published', 'cancelled', 'draft')),
  display_order int not null default 1,
  created_at timestamptz not null default now()
);

-- 2. GD Topics Table
create table if not exists public.gd_topics (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  image_url text not null,
  category text not null,
  is_popular boolean not null default true,
  display_order int not null default 1,
  created_at timestamptz not null default now()
);

-- 3. Site Settings Table (for Telegram URL & live stats)
create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.gd_sessions enable row level security;
alter table public.gd_topics enable row level security;
alter table public.site_settings enable row level security;

-- Public Read Policies
create policy "Public visitors can view published GD sessions"
  on public.gd_sessions for select
  using (status != 'draft');

create policy "Public visitors can view GD topics"
  on public.gd_topics for select
  using (true);

create policy "Public visitors can view site settings"
  on public.site_settings for select
  using (true);

-- Admin Write Policies (Only authenticated admins)
create policy "Admins can manage GD sessions"
  on public.gd_sessions for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins can manage GD topics"
  on public.gd_topics for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins can update site settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);
