create table if not exists admin_users (
  id int unsigned not null auto_increment primary key,
  username varchar(80) not null unique,
  password_hash varchar(255) not null,
  created_at timestamp not null default current_timestamp
) default character set utf8mb4 collate utf8mb4_unicode_ci;
