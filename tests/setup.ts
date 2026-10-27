// Keep tests off any real database, whatever the shell has set.
for (const name of ["MYSQL_HOST", "MYSQL_USER", "MYSQL_PASSWORD", "MYSQL_DATABASE"]) delete process.env[name];
