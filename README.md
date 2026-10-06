# Kyntriq website

Marketing site for Kyntriq, a B2B software and AI company. It is a Next.js app (App Router) with TypeScript and Tailwind CSS. Copy lives in `src/content/`. Components render that data and do not hard-code the company name.

## Run it on Windows

From the project folder (`D:\My\mine` if that is where you copied it):

```bat
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production check:

```bat
npm run lint
npm run build
npm start
```

Node.js 20.9 or newer is required.

## Database setup (Windows)

Install PostgreSQL from the [official Windows installer](https://www.postgresql.org/download/windows/) and note the password you set for the `postgres` user. The database commands are Node scripts, so they run in Command Prompt or PowerShell.

1. Copy the example env file if you have not already: `copy .env.example .env.local`
2. Set the `PG_*` values in `.env.local`. `PG_HOST=localhost`, `PG_PORT=5432`, `PG_USER=postgres`, `PG_PASSWORD` to the password you chose, `PG_DATABASE=kyntriq`. `PG_MAX_CONNECTIONS` is the pool size (default 20). `PG_IDLE_TIMEOUT` is how long an idle connection stays open, in milliseconds (default 300000).
3. From the project folder, create the database and apply migrations:

```bat
npm run db:setup
```

`npm run db:create` only creates the database (it connects to the `postgres` maintenance database). `npm run db:migrate` only applies new files in `db/migrations/`. `npm run db:setup` does both. Applied files are recorded in `schema_migrations`.

View stored enquiries in psql (`psql -U postgres -d kyntriq`):

```sql
select id, name, company, email, status, created_at
from enquiries
order by created_at desc;
```

The table stores a SHA-256 hash of the visitor IP, not the raw address. If Postgres is stopped or the `PG_*` variables are empty, the contact form still tries email and the webhook. `GET /api/health` reports `database` as `up`, `down`, or `unconfigured` and does not include connection details.

## Before launch

- Replace the placeholders in `src/content/site.ts`: email, phone, location and business hours. `hello@kyntriq.com` is a placeholder address and is not a monitored inbox until you connect it.
- Set the real public URL with `NEXT_PUBLIC_SITE_URL` (see `.env.example`). Canonical links, the sitemap and Open Graph use it.
- Set the contact delivery variables. Email needs `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. An optional `CONTACT_WEBHOOK_URL` posts the same enquiry as JSON for n8n, a CRM, a sheet or a messaging workflow. Set `PG_HOST` and `PG_USER` (and run `npm run db:setup`) to store each enquiry in PostgreSQL. If none of these are set, the API logs the enquiry and returns a clear message instead of crashing.
- Optional: set `NEXT_PUBLIC_GA_ID` to a Google Analytics 4 measurement ID (`G-` followed by letters and numbers). The script loads only after a visitor accepts analytics in the cookie banner.
- Review `/privacy`, `/terms` and `/cookies` with counsel. The privacy page still asks you to name the real providers, storage location and retention period.
- Replace the placeholder case studies in `src/content/case-studies.ts`. They are examples of the page structure, not client results.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Public origin for canonical URLs, sitemap and social cards. Defaults to `https://kyntriq.com`. |
| `NEXT_PUBLIC_GA_ID` | No | GA4 measurement ID. Ignored unless it matches `G-` plus letters and numbers, and the visitor has accepted analytics. |
| `SMTP_HOST` | For email | SMTP server hostname. |
| `SMTP_PORT` | For email | SMTP port. `465` is treated as TLS. |
| `SMTP_USER` | For email | SMTP username. |
| `SMTP_PASS` | For email | SMTP password. |
| `CONTACT_TO_EMAIL` | For email | Inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL` | For email | From address on the notification. |
| `CONTACT_WEBHOOK_URL` | No | `http` or `https` URL that receives the enquiry JSON. |
| `PG_HOST` | For the database | PostgreSQL host. |
| `PG_PORT` | For the database | PostgreSQL port. Defaults to `5432` when empty. |
| `PG_USER` | For the database | PostgreSQL user. |
| `PG_PASSWORD` | For the database | PostgreSQL password. |
| `PG_DATABASE` | For the database | Database name. Defaults to `kyntriq` when empty. |
| `PG_MAX_CONNECTIONS` | No | Pool size. Defaults to `20`. |
| `PG_IDLE_TIMEOUT` | No | Idle connection timeout in milliseconds. Defaults to `300000`. |

Email is sent only when all six SMTP variables are non-empty. A partial SMTP setup is logged and skipped. The enquiry is written to PostgreSQL when `PG_HOST` and `PG_USER` are set. If the database is down, that failure is logged and is not shown to the visitor. A stored enquiry, a sent email, or a successful webhook is enough for the form to succeed. If email and the webhook are both configured, a success on either one is enough for the visitor to see a sent confirmation. The other failure is logged.

Spam controls on `POST /api/contact`: a honeypot field, a minimum time of 3 seconds from when the form was opened, and an in-memory limit of 8 submissions per 10 minutes per IP. The limit lives in the server process. It resets on restart and is not shared across multiple instances. Requests with no IP share one bucket.

## Change the company name and contact details

Edit **`src/content/site.ts`**. That file is the only place the company name, email, phone, location, business hours and public site URL are defined. The wordmark, titles, Open Graph and Twitter cards, JSON-LD and the copyright line all read from it.

You can override the public URL without editing code:

```bat
set NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Change page content

Services, industries, case studies, workflows, legal pages and solution or industry detail copy live in `src/content/`. Blog posts are Markdown or MDX files in `src/content/blog/` with frontmatter: `title`, `description`, `date`, `author`, `tags`, and an optional `cover` path. The author on the starter posts is the company name.

`/solutions/automation` redirects to `/solutions/business-automation`. `/solutions/education`, `/solutions/hospitality` and `/solutions/manufacturing` are sector pages. `/industries/schools`, `/industries/colleges` and `/industries/coaching` sit under education. `/industries/hotels` sits under hospitality. `/industries/manufacturing` is the manufacturing industry page.

## Folder structure

```text
db/migrations/      numbered SQL files applied by npm run db:migrate
scripts/db.mjs      creates the database and applies migrations
src/
  app/                routes, sitemap, robots, icons, social images, contact and health APIs
  components/
    blog/             MDX article body
    brand/            wordmark and geometric mark
    consent/          cookie banner, preferences, analytics gate
    contact/          enquiry form and contact details
    layout/           navbar, footer, breadcrumbs, detail template
    sections/         homepage sections
    seo/              JSON-LD
    ui/               button, input, label, textarea
  content/            site config, page copy, blog posts
  lib/                validation, delivery, database access, metadata, structured data
public/mark.svg       logo file used by structured data
```

## Routes

`/`, `/about`, `/solutions`, `/solutions/[slug]`, `/industries`, `/industries/[slug]`, `/case-studies`, `/contact`, `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/privacy`, `/terms`, `/cookies`.
