-- Allow unauthenticated users to read profiles
-- (needed for author names/roles to appear on public pages like Recommendations, Courses, Community)
drop policy if exists "profiles: authenticated users can read" on public.profiles;

create policy "profiles: public read"
  on public.profiles
  for select
  using (true);
