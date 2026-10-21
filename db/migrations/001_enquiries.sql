create table enquiries (
  id char(36) not null primary key,
  name varchar(80) not null,
  company varchar(120) not null,
  email varchar(120) not null,
  phone varchar(20) not null,
  industry varchar(64) not null,
  need varchar(160) not null,
  budget_range varchar(40) not null,
  message text not null,
  source_page varchar(500) not null default '',
  user_agent varchar(500) not null default '',
  ip_hash char(64) not null,
  status varchar(40) not null default 'new',
  created_at timestamp not null default current_timestamp,
  constraint enquiries_name_check check (char_length(name) between 2 and 80),
  constraint enquiries_company_check check (char_length(company) between 2 and 120),
  constraint enquiries_email_check check (char_length(email) between 5 and 120 and locate('@', email) > 1),
  constraint enquiries_phone_check check (
    char_length(phone) between 7 and 20 and phone regexp '^[0-9+()[[:space:]]-]{7,20}$'
  ),
  constraint enquiries_industry_check check (
    industry in ('Education', 'Hospitality', 'Manufacturing', 'Healthcare', 'Corporate / SME', 'Other')
  ),
  constraint enquiries_need_check check (char_length(need) between 3 and 160),
  constraint enquiries_budget_range_check check (
    budget_range in ('Under ₹1 Lakh', '₹1–5 Lakhs', '₹5–10 Lakhs', '₹10–25 Lakhs', '₹25 Lakhs+')
  ),
  constraint enquiries_message_check check (char_length(message) between 20 and 2000),
  constraint enquiries_source_page_check check (char_length(source_page) <= 500),
  constraint enquiries_user_agent_check check (char_length(user_agent) <= 500),
  constraint enquiries_ip_hash_check check (char_length(ip_hash) = 64 and ip_hash regexp '^[0-9a-f]{64}$'),
  constraint enquiries_status_check check (char_length(status) between 1 and 40)
) default character set utf8mb4 collate utf8mb4_unicode_ci;

create index enquiries_created_at_idx on enquiries (created_at);
create index enquiries_email_idx on enquiries (email);
create index enquiries_status_idx on enquiries (status);
