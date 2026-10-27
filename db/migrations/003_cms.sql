create table if not exists cms_content (
  content_key varchar(120) not null primary key,
  payload longtext not null,
  updated_at timestamp not null default current_timestamp on update current_timestamp
) default character set utf8mb4 collate utf8mb4_unicode_ci;
