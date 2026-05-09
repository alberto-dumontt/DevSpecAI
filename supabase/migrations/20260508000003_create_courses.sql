-- courses
create table if not exists courses (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null,
  platform    text,
  url         text,
  tags        text[] not null default '{}',
  author_id   uuid not null references profiles(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table courses enable row level security;

create policy "courses: public read"
  on courses for select using (true);

create policy "courses: authenticated insert own"
  on courses for insert
  with check (auth.uid() = author_id);

create policy "courses: author delete"
  on courses for delete
  using (auth.uid() = author_id);

create trigger courses_updated_at
  before update on courses
  for each row execute procedure handle_updated_at();

-- course_likes
create table if not exists course_likes (
  course_id  uuid not null references courses(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  primary key (course_id, user_id)
);

alter table course_likes enable row level security;

create policy "course_likes: public read"
  on course_likes for select using (true);

create policy "course_likes: authenticated insert own"
  on course_likes for insert
  with check (auth.uid() = user_id);

create policy "course_likes: owner delete"
  on course_likes for delete
  using (auth.uid() = user_id);

-- course_comments
create table if not exists course_comments (
  id         uuid primary key default gen_random_uuid(),
  course_id  uuid not null references courses(id) on delete cascade,
  author_id  uuid not null references profiles(id) on delete cascade,
  content    text not null,
  created_at timestamptz not null default now()
);

alter table course_comments enable row level security;

create policy "course_comments: public read"
  on course_comments for select using (true);

create policy "course_comments: authenticated insert own"
  on course_comments for insert
  with check (auth.uid() = author_id);

create policy "course_comments: author delete"
  on course_comments for delete
  using (auth.uid() = author_id);

-- course_comment_likes
create table if not exists course_comment_likes (
  comment_id uuid not null references course_comments(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  primary key (comment_id, user_id)
);

alter table course_comment_likes enable row level security;

create policy "course_comment_likes: public read"
  on course_comment_likes for select using (true);

create policy "course_comment_likes: authenticated insert own"
  on course_comment_likes for insert
  with check (auth.uid() = user_id);

create policy "course_comment_likes: owner delete"
  on course_comment_likes for delete
  using (auth.uid() = user_id);
