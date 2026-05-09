-- posts
create table if not exists posts (
  id          uuid primary key default gen_random_uuid(),
  content     text not null,
  tags        text[] not null default '{}',
  author_id   uuid not null references profiles(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table posts enable row level security;

create policy "posts: public read"
  on posts for select using (true);

create policy "posts: authenticated insert own"
  on posts for insert
  with check (auth.uid() = author_id);

create policy "posts: author update"
  on posts for update
  using (auth.uid() = author_id) with check (auth.uid() = author_id);

create policy "posts: author delete"
  on posts for delete
  using (auth.uid() = author_id);

create trigger posts_updated_at
  before update on posts
  for each row execute procedure handle_updated_at();

-- post_likes
create table if not exists post_likes (
  post_id  uuid not null references posts(id) on delete cascade,
  user_id  uuid not null references auth.users(id) on delete cascade,
  primary key (post_id, user_id)
);

alter table post_likes enable row level security;

create policy "post_likes: public read"
  on post_likes for select using (true);

create policy "post_likes: authenticated insert own"
  on post_likes for insert
  with check (auth.uid() = user_id);

create policy "post_likes: owner delete"
  on post_likes for delete
  using (auth.uid() = user_id);

-- post_comments
create table if not exists post_comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references posts(id) on delete cascade,
  author_id  uuid not null references profiles(id) on delete cascade,
  content    text not null,
  created_at timestamptz not null default now()
);

alter table post_comments enable row level security;

create policy "post_comments: public read"
  on post_comments for select using (true);

create policy "post_comments: authenticated insert own"
  on post_comments for insert
  with check (auth.uid() = author_id);

create policy "post_comments: author delete"
  on post_comments for delete
  using (auth.uid() = author_id);

-- post_comment_likes
create table if not exists post_comment_likes (
  comment_id uuid not null references post_comments(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  primary key (comment_id, user_id)
);

alter table post_comment_likes enable row level security;

create policy "post_comment_likes: public read"
  on post_comment_likes for select using (true);

create policy "post_comment_likes: authenticated insert own"
  on post_comment_likes for insert
  with check (auth.uid() = user_id);

create policy "post_comment_likes: owner delete"
  on post_comment_likes for delete
  using (auth.uid() = user_id);
