# VARASENA Technologies website

Marketing site for VARASENA Technologies, a B2B software and AI company. It is a Next.js 16 app (App Router) with TypeScript and Tailwind CSS 4. Default copy lives in `src/content/`. When MySQL is configured, edits made in the admin panel (`/admin`) are stored in the `cms_content` table and merged over those defaults. Components render that data and do not hard-code the company name.

## Run it on Windows

From the project folder (`D:\My\mine` if that is where you copied it):

```bat
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:6001](http://localhost:6001). The dev server uses port 6001; `npm start` uses 3000 unless `PORT` is set.

Production check:

```bat
npm run check
npm run build
npm start
```

`npm run check` runs the type check, ESLint and the unit tests (`npm test`: Node's test runner via `tsx`, files in `tests/`). The build also fails on type errors. `SKIP_TYPECHECK=1` turns that off for one emergency build only.

Node.js 20.9 or newer is required.

## Database setup (Windows)

Install MySQL 8 from the [official Windows installer](https://dev.mysql.com/downloads/installer/) and note the password you set for the `root` user. The database commands are Node scripts, so they run in Command Prompt or PowerShell.

1. Copy the example env file if you have not already: `copy .env.example .env.local`
2. Set the `MYSQL_*` values in `.env.local`. `MYSQL_HOST=localhost`, `MYSQL_PORT=3306`, `MYSQL_USER=root`, `MYSQL_PASSWORD` to the password you chose, `MYSQL_DATABASE=varasena`. `MYSQL_MAX_CONNECTIONS` is the pool size (default 20). `MYSQL_IDLE_TIMEOUT` is how long an idle connection stays open, in milliseconds (default 300000).
3. **New database:** from the project folder, create the database, apply migrations and fill in the page content:

```bat
npm run db:setup
```

**Existing database (for example the live site after an update):** run only the new migrations:

```bat
npm run db:migrate
```

| Command | What it does |
| --- | --- |
| `npm run db:create` | Creates the database if it does not exist. |
| `npm run db:migrate` | Applies new files in `db/migrations/` (recorded in `schema_migrations`). Safe to run again. |
| `npm run db:setup` | `db:create` + `db:migrate`, then `db:seed-cms`. |
| `npm run db:seed-cms` | Adds any page-content section that is missing. Never overwrites edits made in `/admin`. |
| `npm run db:seed-cms:reset` | **Replaces all page content with the code defaults**, discarding `/admin` edits. |
| `npm run db:seed` | Inserts demo enquiries (Priya Sharma, Rahul Mehta, ...). For local testing only. |

Migrations include `005_rate_limits.sql`, which stores rate-limit counters so they survive restarts and are shared across instances.

View stored enquiries in the MySQL client (`mysql -u root -p varasena`):

```sql
select id, name, company, email, status, created_at
from enquiries
order by created_at desc;
```

The table stores a SHA-256 hash of the visitor IP, not the raw address. If MySQL is stopped or the `MYSQL_*` variables are empty, the contact form still tries email and the webhook. `GET /api/health` reports `database` as `up`, `down`, or `unconfigured` and does not include connection details.

## Before launch

- Replace the placeholders in `src/content/site.ts`: email, phone, location and business hours. Confirm the public inbox before treating it as monitored.
- Set the real public URL with `NEXT_PUBLIC_SITE_URL` (see `.env.example`). Canonical links, the sitemap and Open Graph use it.
- Set the contact delivery variables. Email needs `SMTP_HOST`, `SMTP_USER` and `SMTP_PASS`; `SMTP_PORT` defaults to 587 and `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` default to the site email. An optional `CONTACT_WEBHOOK_URL` posts the same enquiry as JSON for n8n, a CRM, a sheet or a messaging workflow. Set `MYSQL_HOST` and `MYSQL_USER` (and run `npm run db:setup` on a new database, or `npm run db:migrate` on an existing one) to store each enquiry in MySQL. If none of these are set, the API logs the enquiry and returns a clear message instead of crashing.
- Optional: set `NEXT_PUBLIC_GA_ID` to a Google Analytics 4 measurement ID (`G-` followed by letters and numbers). The script loads only after a visitor accepts analytics in the cookie banner.
- Review `/privacy`, `/terms` and `/cookies` with counsel. The privacy page still asks you to name the real providers, storage location and retention period.
- Replace the placeholder case studies in `src/content/case-studies.ts`. They are examples of the page structure, not client results.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Public origin for canonical URLs, sitemap and social cards. Defaults to `https://varasena.com`. |
| `NEXT_PUBLIC_GA_ID` | No | GA4 measurement ID. Ignored unless it matches `G-` plus letters and numbers, and the visitor has accepted analytics. |
| `SMTP_HOST` | For email | SMTP server hostname. |
| `SMTP_PORT` | For email | SMTP port. `465` is treated as TLS. |
| `SMTP_USER` | For email | SMTP username. |
| `SMTP_PASS` | For email | SMTP password. |
| `CONTACT_TO_EMAIL` | For email | Inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL` | For email | From address on the notification. |
| `CONTACT_WEBHOOK_URL` | No | `http` or `https` URL that receives the enquiry JSON. |
| `MYSQL_HOST` | For the database | MySQL host. |
| `MYSQL_PORT` | For the database | MySQL port. Defaults to `3306` when empty. |
| `MYSQL_USER` | For the database | MySQL user. |
| `MYSQL_PASSWORD` | For the database | MySQL password. |
| `MYSQL_DATABASE` | For the database | Database name. Defaults to `varasena` when empty. |
| `MYSQL_MAX_CONNECTIONS` | No | Pool size. Defaults to `20`. |
| `MYSQL_IDLE_TIMEOUT` | No | Idle connection timeout in milliseconds. Defaults to `300000`. |
| `ADMIN_USER` | For the admin panel | Username created on first sign-in when no admin exists. |
| `ADMIN_PASSWORD` | For the admin panel | Password for that first account. 12+ characters and not a default, in production. |
| `ADMIN_SECRET` | Yes, in production | 32+ random characters used to sign admin sessions. |
| `ADMIN_COOKIE_SECURE` | No | `0` sends the admin cookie over plain http. Testing only. |
| `UPLOAD_DIR` | Recommended | Absolute folder for admin uploads, outside the app folder. Defaults to `storage/uploads`. |
| `TRUSTED_PROXY_HOPS` | No | Proxies in front of Node that append to `X-Forwarded-For`. Defaults to `1`. Do not set `0`: Node cannot see the socket IP here, so every visitor would share one rate limit. |
| `CLIENT_IP_HEADER` | No | Header holding the real client IP from a trusted edge, e.g. `cf-connecting-ip`. |
| `OPENROUTER_API_KEY` | For chat | OpenRouter key for the chat assistant. |
| `OPENROUTER_MODEL` | No | Primary chat model. Defaults to `google/gemma-2-9b-it:free`. |
| `OPENROUTER_FALLBACK_MODELS` | No | Comma-separated models tried after the primary. |
| `OPENROUTER_BASE_URL` | No | API base URL. Defaults to `https://openrouter.ai/api/v1`. |
| `OPENROUTER_TIMEOUT` | No | Seconds per model attempt. Defaults to `30`, minimum `5`. |
| `SKIP_TYPECHECK` | No | `1` skips the type check in `next build`. Emergency use only. |

Email is sent when `SMTP_HOST`, `SMTP_USER` and `SMTP_PASS` are set; `SMTP_PORT` (587), `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (the site email) have defaults. `MAIL_FROM`, if set, overrides `CONTACT_FROM_EMAIL` as the From address. A partial SMTP setup is logged and skipped. The visitor's confirmation email contains no text they typed, and at most 150 are sent per day, so the form cannot be used to send mail to strangers. The enquiry is written to MySQL when `MYSQL_HOST` and `MYSQL_USER` are set. If the database is down, that failure is logged and is not shown to the visitor. A stored enquiry, a sent email, or a successful webhook is enough for the form to succeed. If email and the webhook are both configured, a success on either one is enough for the visitor to see a sent confirmation. The other failure is logged.

Spam controls on `POST /api/contact`: a honeypot field, a minimum time of 3 seconds from when the form was opened, and a limit of 8 submissions per 10 minutes per IP. Limits are stored in MySQL (`rate_limits`, keys SHA-256 hashed) and fall back to process memory when the database is unavailable. The client IP is read from the right-hand end of `X-Forwarded-For` (see `TRUSTED_PROXY_HOPS` and `CLIENT_IP_HEADER`), so a visitor cannot dodge the limit with a fake header. Requests with no IP share one bucket.

## Admin panel

`/admin` edits site settings, brand images and page content, and lists enquiries. It needs MySQL.

- **First sign-in.** When `admin_users` is empty, signing in with `ADMIN_USER` / `ADMIN_PASSWORD` creates that account. In production the password must be at least 12 characters and not a default or common value, or the account is not created (the reason is logged). Change it at `/admin/account` afterwards.
- **`ADMIN_SECRET` is required in production.** It signs the session cookie and must be at least 32 random characters. If it is missing or still a placeholder, admin sign-in is disabled. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`.
- **Sessions** last 7 days in an `httpOnly`, `SameSite=Strict` cookie. Each token is tied to the current password, so changing the password signs out every other device.
- **Login protection.** 5 attempts per username from one IP and 20 per IP every 15 minutes, so an attacker can only block their own address, never lock the real admin out. Past 30 attempts on one username from all IPs, each try is slowed by 2 seconds. Usernames are normalised (case and accents) so variants share the same counters. Unknown usernames take the same time as wrong passwords.
- **Every admin page checks the session itself** (`requireAdmin()`), not only the layout.
- **Uploads** are identified by their file bytes (PNG, JPEG, WebP, plus ICO for brand slots). SVG is refused because it can carry script. Files are written to `UPLOAD_DIR` (default `storage/uploads`) and served by the `/uploads/[...path]` route, because `next start` does not serve files added to `public/` after the build. Set `UPLOAD_DIR` to a folder outside the app on the server so redeploys keep them. Older files still in `public/uploads/` keep working, including earlier camelCase names such as `logoLight-123.png` and SVG logos. Everything under `/uploads` is served with a sandboxed Content-Security-Policy.

## Security headers and CSRF

`next.config.ts` sends a Content-Security-Policy plus `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and HSTS in production. The CSP allows inline scripts (needed for the theme boot script, JSON-LD and GA without making every page dynamic) but loads scripts only from this origin and Google Tag Manager, and blocks framing, plugins and foreign form targets. If you add a third-party embed or script, add its host to the CSP.

`src/proxy.ts` rejects cross-site `POST`/`PUT`/`PATCH`/`DELETE` requests to `/api/*` by checking `Origin` and `Sec-Fetch-Site` against `Host`, `X-Forwarded-Host` and `NEXT_PUBLIC_SITE_URL`, and marks `/admin` responses `noindex` and `no-store`.

## Chat assistant

The floating chat widget posts to `/api/chat`, which answers with an OpenRouter model using a system prompt built from the site content (`src/lib/chat/knowledge.ts`). Set `OPENROUTER_API_KEY` to turn it on. `OPENROUTER_MODEL` picks the model (default `google/gemma-2-9b-it:free`) and `OPENROUTER_FALLBACK_MODELS` lists more to try in order. Free models have tight rate limits, so add a paid fallback for a busy site. Visitors are limited to 30 messages per 10 minutes. Without a key the widget offers WhatsApp, call and "Leave your number" instead.

## Change the company name and contact details

Edit **`src/content/site.ts`** for the defaults: company name, email, phone, location, business hours and public site URL. The wordmark, titles, Open Graph and Twitter cards, JSON-LD and the copyright line all read from these settings.

**Once the database has been seeded, the live values come from `/admin` → Brand**, which overrides `site.ts`. Changing a phone number in `site.ts` then has no effect on the live site; change it in the admin panel. The alternate phone is hidden when it is the same number as the main one.

You can override the public URL without editing code:

```bat
set NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Change page content

Services, industries, case studies, workflows, legal pages and solution or industry detail copy live in `src/content/`. Blog posts are Markdown or MDX files in `src/content/blog/` with frontmatter: `title`, `description`, `date`, `author`, `tags`, and an optional `cover` path. The author on the starter posts is the company name.

`/solutions/automation` redirects to `/solutions/business-automation`. `/solutions/education`, `/solutions/hospitality` and `/solutions/manufacturing` permanently redirect to `/industries/education`, `/industries/hospitality` and `/industries/manufacturing`. `/industries/schools`, `/industries/colleges` and `/industries/coaching` sit under education. `/industries/hotels` sits under hospitality. `/industries/manufacturing` is the manufacturing industry page.

## Projects and team

**Projects (real client work).** Admin → Content → **Projects** → Items → **Add**. Fill in the title, client, industry, location, year, summary, main photo (upload), challenge / what we built / what changed, technologies, optional gallery photos and live link, then tick **Published** and save. A project appears only when it is published and has a title, a main photo and a unique lowercase slug (`school-admissions-portal`). The `/projects` page, each `/projects/<slug>` page, the "Projects" menu link (after Examples, in the header and footer) and the sitemap entries appear automatically once at least one project is published, and disappear again if none are. Only add real work and results the client agreed to share; the Examples page stays for sample scenarios.

**Team members.** Admin → Content → **About** → Team → People → **Add**: name, role, short bio, photo (upload, square works best) and LinkedIn URL. Members without a photo show their initials. Tick **Show** on the Team section to display it on the About page.

## Colours

The site palette ("Refined Blue") lives in `src/app/palette.css`, imported right after `globals.css` in `src/app/layout.tsx`. One royal blue from the logo (`#0A5CE6`) is used for every action, with cool blue-slate neutrals and cyan only as small accents. To change a colour site-wide, edit the tokens in section 1 of that file (light, dark and the always-dark bands). Colours that CSS cannot reach live in `src/lib/theme.ts` (browser bar), `src/lib/social-image.tsx` (share images) and `src/lib/email/enquiry-mail.ts` (emails).

## Photos

Banner photos are real photographs (Pexels, free for commercial use). Their sources, licences and alt text are in `photos/credits.json`. To add or replace one, put the original in `photos/source/` and run `npm run photos -- <name>`. See [photos/README.md](photos/README.md). The About page still needs a real founders photo and team photo. Until the founders photo exists, its section shows names only.

## Folder structure

```text
db/migrations/      numbered SQL files applied by npm run db:migrate
scripts/db.mjs      creates the database and applies migrations
scripts/seed-cms.ts copies the code defaults into cms_content
scripts/photos.mjs  builds banner photos from photos/source (npm run photos)
photos/             photo credits and licences; originals in photos/source (git-ignored)
tests/              unit tests (npm test)
storage/uploads/    default UPLOAD_DIR for admin uploads (git-ignored)
src/
  proxy.ts            CSRF origin check for /api, noindex for /admin
  app/                routes, sitemap, robots, icons, social images, APIs (contact, chat, health, admin), /uploads
  components/
    admin/            admin panel shell and content editor
    blog/             MDX article body
    chat/             floating chat assistant
    brand/            wordmark and geometric mark
    consent/          cookie banner, preferences, analytics gate
    contact/          enquiry form and contact details
    layout/           navbar, footer, breadcrumbs, detail template
    sections/         homepage sections
    seo/              JSON-LD
    ui/               button, input, label, textarea
  content/            site config, page copy, blog posts
  lib/                validation, delivery, database, CMS, admin auth, rate limits, uploads, security helpers
public/varasena-brand-pack/  logo assets used by header, footer and structured data
```

## Routes

`/`, `/about`, `/solutions`, `/solutions/[slug]`, `/industries`, `/industries/[slug]`, `/ai-automation`, `/case-studies`, `/insights`, `/contact`, `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/privacy`, `/terms`, `/cookies`.

Admin: `/admin`, `/admin/login`, `/admin/content`, `/admin/content/[key]`, `/admin/brand`, `/admin/enquiries`, `/admin/account`.

API: `POST /api/contact`, `POST /api/chat`, `GET /api/health`, and `/api/admin/*` (login, logout, password, site, content, upload, enquiries).
