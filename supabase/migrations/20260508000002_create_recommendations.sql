-- ─────────────────────────────────────────────────────────────
-- Table: recommendations
-- ─────────────────────────────────────────────────────────────

create table public.recommendations (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  description text        not null,
  url         text,
  tags        text[]      not null default '{}',
  author_id   uuid        not null references public.profiles (id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.recommendations enable row level security;

create policy "recs: anyone can read"
  on public.recommendations for select using (true);

create policy "recs: authenticated users can insert"
  on public.recommendations for insert to authenticated
  with check (auth.uid() = author_id);

create policy "recs: author can update"
  on public.recommendations for update to authenticated
  using (auth.uid() = author_id) with check (auth.uid() = author_id);

create policy "recs: author can delete"
  on public.recommendations for delete to authenticated
  using (auth.uid() = author_id);

create trigger recommendations_updated_at
  before update on public.recommendations
  for each row execute function public.handle_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Table: recommendation_likes
-- ─────────────────────────────────────────────────────────────

create table public.recommendation_likes (
  recommendation_id uuid        not null references public.recommendations (id) on delete cascade,
  user_id           uuid        not null references auth.users (id) on delete cascade,
  created_at        timestamptz not null default now(),
  primary key (recommendation_id, user_id)
);

alter table public.recommendation_likes enable row level security;

create policy "rec_likes: anyone can read"
  on public.recommendation_likes for select using (true);

create policy "rec_likes: authenticated users can insert own"
  on public.recommendation_likes for insert to authenticated
  with check (auth.uid() = user_id);

create policy "rec_likes: users can delete own"
  on public.recommendation_likes for delete to authenticated
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- Table: recommendation_comments
-- ─────────────────────────────────────────────────────────────

create table public.recommendation_comments (
  id                uuid        primary key default gen_random_uuid(),
  recommendation_id uuid        not null references public.recommendations (id) on delete cascade,
  author_id         uuid        not null references public.profiles (id) on delete cascade,
  content           text        not null,
  created_at        timestamptz not null default now()
);

alter table public.recommendation_comments enable row level security;

create policy "rec_comments: anyone can read"
  on public.recommendation_comments for select using (true);

create policy "rec_comments: authenticated users can insert"
  on public.recommendation_comments for insert to authenticated
  with check (auth.uid() = author_id);

create policy "rec_comments: author can delete"
  on public.recommendation_comments for delete to authenticated
  using (auth.uid() = author_id);

-- ─────────────────────────────────────────────────────────────
-- Table: recommendation_comment_likes
-- ─────────────────────────────────────────────────────────────

create table public.recommendation_comment_likes (
  comment_id  uuid        not null references public.recommendation_comments (id) on delete cascade,
  user_id     uuid        not null references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (comment_id, user_id)
);

alter table public.recommendation_comment_likes enable row level security;

create policy "rec_comment_likes: anyone can read"
  on public.recommendation_comment_likes for select using (true);

create policy "rec_comment_likes: authenticated users can insert own"
  on public.recommendation_comment_likes for insert to authenticated
  with check (auth.uid() = user_id);

create policy "rec_comment_likes: users can delete own"
  on public.recommendation_comment_likes for delete to authenticated
  using (auth.uid() = user_id);
