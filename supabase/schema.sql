create extension if not exists "uuid-ossp";

create type public.app_status as enum ('pending', 'approved', 'rejected');
create type public.user_role as enum ('admin', 'publisher', 'user');
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

alter table public.users enable row level security;
alter table public.apps enable row level security;
alter table public.ads enable row level security;

create policy "users_view_self" on public.users
for select using (auth.uid() = id);

create policy "admins_manage_users" on public.users
for all using (
  exists(select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

create policy "public_view_approved_apps" on public.apps
for select using (status = 'approved');

create policy "publisher_insert_apps" on public.apps
for insert with check (
  auth.uid() = author_id and exists(select 1 from public.users u where u.id = auth.uid() and u.role in ('publisher', 'admin'))
);

create policy "author_update_own_apps" on public.apps
for update using (
  auth.uid() = author_id or exists(select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

create policy "admin_manage_ads" on public.ads
for all using (
  exists(select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

insert into storage.buckets (id, name, public)
values ('private-assets', 'private-assets', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('public-assets', 'public-assets', true)
on conflict (id) do nothing;

create policy "public_assets_read" on storage.objects
for select using (bucket_id = 'public-assets');

create policy "service_private_assets_full" on storage.objects
for all using (bucket_id = 'private-assets' and auth.role() = 'service_role')
with check (bucket_id = 'private-assets' and auth.role() = 'service_role');

create policy "service_public_assets_write" on storage.objects
for all using (bucket_id = 'public-assets' and auth.role() = 'service_role')
with check (bucket_id = 'public-assets' and auth.role() = 'service_role');
