-- Enable extensions
create extension if not exists "uuid-ossp";

create type public.app_status as enum ('pending', 'approved', 'rejected');
create type public.user_role as enum ('admin', 'moderator', 'publisher', 'user');
create type public.ad_type as enum ('banner', 'native');

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique
);

create table if not exists public.apps (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text not null,
  apk_url text not null,
  icon_url text not null,
  screenshots jsonb not null default '[]'::jsonb,
  downloads bigint not null default 0,
  status public.app_status not null default 'pending',
  author_id uuid references public.users(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  version_name text,
  version_code integer,
  affiliate_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.ads (
  id uuid primary key default uuid_generate_v4(),
  type public.ad_type not null,
  image_url text,
  link text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default uuid_generate_v4(),
  app_id uuid references public.apps(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid references public.users(id) on delete cascade,
  app_id uuid references public.apps(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, app_id)
);

create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  plan_name text not null,
  status text not null,
  renews_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.apps enable row level security;
alter table public.ads enable row level security;
alter table public.comments enable row level security;
alter table public.favorites enable row level security;

create policy "public can view approved apps" on public.apps
for select using (status = 'approved');

create policy "publishers can insert apps" on public.apps
for insert with check (auth.uid() = author_id);

create policy "authors can edit own apps" on public.apps
for update using (auth.uid() = author_id);
