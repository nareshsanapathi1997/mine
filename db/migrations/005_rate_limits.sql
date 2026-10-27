create table if not exists rate_limits (
  bucket char(64) not null primary key,
  hits int unsigned not null,
  reset_at bigint unsigned not null,
  key rate_limits_reset_at (reset_at)
) default character set utf8mb4 collate utf8mb4_unicode_ci;
