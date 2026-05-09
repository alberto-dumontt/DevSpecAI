-- Allow course authors to update their own courses
create policy "courses: author update"
  on courses for update
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);
