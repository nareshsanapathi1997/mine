create table enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  company text not null check (char_length(company) between 2 and 120),
  email text not null check (char_length(email) between 5 and 120 and position('@' in email) > 1),
  phone text not null check (char_length(phone) between 7 and 20 and phone ~ '^[0-9+()[:space:]-]{7,20}$'),
  industry text not null check (
    industry in ('Education', 'Hospitality', 'Manufacturing', 'Healthcare', 'Corporate / SME', 'Other')
  ),
  need text not null check (char_length(need) between 3 and 160),
  budget_range text not null check (
    budget_range in ('Under ₹1 Lakh', '₹1–5 Lakhs', '₹5–10 Lakhs', '₹10–25 Lakhs', '₹25 Lakhs+')
  ),
  message text not null check (char_length(message) between 20 and 2000),
  source_page text not null default '' check (char_length(source_page) <= 500),
  user_agent text not null default '' check (char_length(user_agent) <= 500),
  ip_hash text not null check (char_length(ip_hash) = 64 and ip_hash ~ '^[0-9a-f]{64}$'),
  status text not null default 'new' check (char_length(status) between 1 and 40),
  created_at timestamptz not null default now()
);

create index enquiries_created_at_idx on enquiries (created_at desc);
create index enquiries_email_idx on enquiries (email);
create index enquiries_status_idx on enquiries (status);
