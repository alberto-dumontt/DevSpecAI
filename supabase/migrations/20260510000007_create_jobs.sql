-- jobs
create table if not exists jobs (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  company          text not null,
  location         text,
  workplace_type   text,
  employment_type  text,
  seniority_level  text,
  published_at     timestamptz,
  url              text,
  description      text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table jobs enable row level security;

create policy "jobs: public read"
  on jobs for select using (true);

create policy "jobs: authenticated insert"
  on jobs for insert
  with check (auth.role() = 'authenticated');

create policy "jobs: authenticated update"
  on jobs for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "jobs: authenticated delete"
  on jobs for delete
  using (auth.role() = 'authenticated');

create trigger jobs_updated_at
  before update on jobs
  for each row execute procedure handle_updated_at();
