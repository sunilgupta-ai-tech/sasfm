# SASFM — Website + Admin Panel

Monorepo containing the public website, the admin panel (built into the same
Next.js app), and the Node.js/PostgreSQL backend that powers them.

```
sasfm/
├── frontend/   Next.js app — public site + /admin panel
├── backend/    Express + Prisma + PostgreSQL API
└── docker-compose.yml
```

## Scope so far

Dynamic, admin-managed content:
- ✅ **Portfolio** (projects) — full CRUD, image upload, SEO fields
- ✅ **Blog** (insights/articles) — full CRUD, image upload, SEO fields
- ✅ **Soft Services** and **Hard Services** — full CRUD, reorderable, published toggle
- ✅ **Enquiries** — public form submissions land in a dedicated admin inbox (mark read, delete)
- ✅ **Admin Profile** — update name/email, change password, upload a profile photo

Each Portfolio project and Blog post has:
- Core content fields (title, slug, images, body, etc.)
- **SEO Settings** (collapsible section in the admin form): Meta Title, Meta
  Description, Focus Keyword, Social Share Image, Canonical Path Override,
  and a "Hide from search engines" toggle.
- A **Published** toggle — unpublished items are saved as drafts and never
  appear on the public site, but remain editable in the admin panel.

## Quick start (Docker — recommended)

Requires Docker and Docker Compose installed, and an internet connection for
the first build (downloads base images + Prisma's query engine binaries).

```bash
docker compose up --build
```

This starts three containers:
| Service | URL | Purpose |
|---|---|---|
| `postgres` | `localhost:5432` | Database |
| `backend` | `localhost:4000` | API |
| `frontend` | `localhost:3000` | Public site + `/admin` |

**First-time setup** — run the database migration and seed script once the
containers are up:

```bash
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npm run seed
```

The seed script:
- Creates an admin user (`admin@sasfm.co` / `change-me-immediately` by
  default — **change this immediately**, see below)
- Imports the existing Portfolio, Blog, and Soft/Hard Services content so
  the site isn't empty

To set a real admin password during seeding instead of the default:

```bash
docker compose exec -e SEED_ADMIN_EMAIL=you@sasfm.co -e SEED_ADMIN_PASSWORD=a-strong-password backend npm run seed
```

Then log in at **http://localhost:3000/admin/login**.

## Quick start (without Docker — local dev)

You'll need PostgreSQL running locally (or point `DATABASE_URL` at any
reachable Postgres instance).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env    # edit DATABASE_URL if needed
npx prisma migrate dev
npm run seed
npm run dev              # http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev               # http://localhost:3000
```

Admin panel: **http://localhost:3000/admin/login**

## Admin panel structure (frontend)

The admin panel lives inside the same Next.js app, under `/admin`, and
follows a consistent pattern per content type:

```
frontend/src/
  app/admin/
    layout.tsx              Wraps everything in AdminAuthProvider
    login/page.tsx
    page.tsx                  Dashboard (stat cards + quick actions)
    portfolio/
      page.tsx                 List
      new/page.tsx               Create
      [id]/page.tsx                Edit
    blog/                      (same list/new/[id] pattern)
    services/
      soft/                      (same list/new/[id] pattern)
      hard/                       (same list/new/[id] pattern)
    enquiries/page.tsx        Inbox (list, expand, mark read, delete)
    profile/page.tsx          Update name/email, change password, avatar
  components/admin/
    AdminShell.tsx            Responsive sidebar + topbar + mobile drawer, used by every admin page
    RequireAdminAuth.tsx      Route guard — redirects to /admin/login if not authenticated
    PortfolioForm.tsx          Shared form used by both Portfolio new/edit pages
    BlogForm.tsx                 Shared form used by both Blog new/edit pages
    ServiceForm.tsx                Shared form used by both Soft/Hard Service new/edit pages
    ServiceListContent.tsx           Shared list used by both Soft/Hard Services list pages
    EditServiceContent.tsx            Shared fetch-then-render wrapper for Service edit pages
    SeoFieldsSection.tsx              Collapsible SEO fields, shared by Portfolio/Blog forms
    ImageUploadField.tsx              Upload-or-paste-URL image field, shared everywhere
  lib/
    admin-auth.tsx           Auth context: token, user, login, logout, refreshUser
    api.ts                    Typed fetch client (get/post/put/patch/delete)
    data.ts                    Server-side data fetchers for the PUBLIC site (with static fallback)
    useDashboardStats.ts        Hook for the dashboard stat cards + sidebar enquiry badge
```

Every list/new/edit trio follows the same shape, so adding a new dynamic
content type later means: one Prisma model, one backend module (copy
`services/` or `portfolio/` as a starting point), and one `list/new/[id]`
folder + one shared form component on the frontend.

## Enquiry form flow

The public Enquiry form (`components/EnquiryForm.tsx`, used on both the
homepage and `/enquiry`) submits directly to `POST /api/enquiries` — no
admin auth required, since anyone should be able to submit it. Every
submission then appears in **Admin → Enquiries**, badge-counted in the
sidebar, and can be expanded, marked read, or deleted from there.

1. Admin logs in at `/admin/login` → gets a JWT (stored in `localStorage`).
2. Admin creates/edits a Portfolio project or Blog post at `/admin/portfolio`
   or `/admin/blog` → this calls the backend's protected `/api/admin/*`
   routes.
3. The public site's pages (`/`, `/portfolio`, `/portfolio/[slug]`, `/blog`,
   `/blog/[slug]`) fetch from the backend's public `/api/portfolio` and
   `/api/blog` routes (no auth needed) — these only return **published**
   items.
4. Pages revalidate at most once a minute (`revalidate: 60`), so an admin
   edit appears on the live site within ~60 seconds without a redeploy.
5. **If the backend is ever unreachable**, the public site automatically
   falls back to the last-known static content in
   `frontend/src/data/content.ts` instead of showing an error — the site
   never goes down just because the API does.

## Image uploads

Admin-uploaded images are stored on the backend's local disk
(`backend/uploads/`, persisted via a Docker volume) and served at
`http://localhost:4000/uploads/...`. This works out of the box for Phase 1;
swapping to S3/Cloudinary later only requires changing
`backend/src/middlewares/upload.middleware.ts` — the rest of the app just
deals with URL strings and doesn't need to change.

## Environment variables reference

**backend/.env**
| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `JWT_SECRET` | Signs admin auth tokens — set a long random value in production |
| `PORT` | Backend port (default 4000) |
| `CORS_ORIGIN` | Allowed frontend origin |

**frontend/.env.local**
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend URL reachable from the **browser** (e.g. `http://localhost:4000`) |
| `INTERNAL_API_URL` | (Docker only) Backend URL reachable from the Next.js **server**, e.g. `http://backend:4000` — the Docker service name, not `localhost` |

## A note on this build environment

This project was scaffolded in a sandboxed environment without outbound
network access to `binaries.prisma.sh` (Prisma's engine CDN) or to a live
Postgres instance, so the backend could not be fully executed or the
database migrated/tested end-to-end here. Everything has been written
carefully and the frontend build (including all new API-fetching code with
graceful static fallback) has been verified to compile and build
successfully. Run `docker compose up --build` on your machine (with normal
internet access) to complete the first real end-to-end run.
