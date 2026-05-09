-- ─────────────────────────────────────────────────────────────
-- Table: profiles
-- Stores public profile data for each authenticated user.
-- The row is created automatically via trigger on auth.users insert.
-- ─────────────────────────────────────────────────────────────

create table public.profiles (
  id          uuid        primary key references auth.users (id) on delete cascade,
  name        text,
  job_title   text,
  seniority   text        check (seniority in ('beginner', 'junior', 'mid', 'senior')),
  company     text,
  country     char(2),    -- ISO 3166-1 alpha-2
  bio         text,
  github      text,
  linkedin    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────

alter table public.profiles enable row level security;

-- Any authenticated user can read any profile (community feature)
create policy "profiles: authenticated users can read"
  on public.profiles
  for select
  to authenticated
  using (true);

-- Users can only insert their own profile row
create policy "profiles: users can insert own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Users can only update their own profile row
create policy "profiles: users can update own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ─────────────────────────────────────────────────────────────
-- Function: keep updated_at current
-- ─────────────────────────────────────────────────────────────

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Function + Trigger: auto-create profile on user signup
-- Reads from raw_user_meta_data so data passed via signUp()
-- options.data lands here automatically.
-- ─────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, name, job_title, seniority, company, country, bio, github, linkedin)
  values (
    new.id,
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'job_title',
    new.raw_user_meta_data ->> 'seniority',
    new.raw_user_meta_data ->> 'company',
    new.raw_user_meta_data ->> 'country',
    new.raw_user_meta_data ->> 'bio',
    new.raw_user_meta_data ->> 'github',
    new.raw_user_meta_data ->> 'linkedin'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
