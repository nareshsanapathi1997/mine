-- Optional company, phone, industry and budget. New budget ranges.
-- Older budget values remain valid so existing rows still satisfy the check.

alter table enquiries drop constraint if exists enquiries_company_check;
alter table enquiries drop constraint if exists enquiries_phone_check;
alter table enquiries drop constraint if exists enquiries_industry_check;
alter table enquiries drop constraint if exists enquiries_budget_range_check;

alter table enquiries alter column company drop not null;
alter table enquiries alter column phone drop not null;
alter table enquiries alter column industry drop not null;
alter table enquiries alter column budget_range drop not null;

alter table enquiries add constraint enquiries_company_check
  check (company is null or char_length(company) between 2 and 120);

alter table enquiries add constraint enquiries_phone_check
  check (
    phone is null
    or (char_length(phone) between 7 and 20 and phone ~ '^[0-9+()[:space:]-]{7,20}$')
  );

alter table enquiries add constraint enquiries_industry_check
  check (
    industry is null
    or industry in (
      'Education',
      'Hospitality',
      'Manufacturing',
      'Healthcare',
      'Corporate / SME',
      'Professional Services',
      'Other'
    )
  );

alter table enquiries add constraint enquiries_budget_range_check
  check (
    budget_range is null
    or budget_range in (
      '₹50K – ₹1L',
      '₹1L – ₹3L',
      '₹3L – ₹5L',
      '₹5L+',
      'Not sure',
      'Under ₹1 Lakh',
      '₹1–5 Lakhs',
      '₹5–10 Lakhs',
      '₹10–25 Lakhs',
      '₹25 Lakhs+'
    )
  );
