# SASFM Backend

Express + TypeScript + Prisma + PostgreSQL API.

See the root `README.md` for full setup instructions. This file covers
backend-specific details.

## Structure

```
src/
  config/          Environment variable loading
  db/
    prisma/
      schema.prisma  Database schema
    prisma.ts        Shared Prisma client instance
    seed.ts          Seeds an admin user + imports existing Portfolio/Blog/Services content
  modules/
    auth/            Admin login, JWT issuing, profile update, change password
    portfolio/        Portfolio CRUD (public read + admin write)
    blog/              Blog CRUD (public read + admin write)
    services/           Soft/Hard Services CRUD (public read + admin write, filtered by `type`)
    enquiries/            Public form submission + admin inbox (list/mark read/delete)
    dashboard/             Admin dashboard stats (counts per content type)
    uploads/                Admin image upload endpoints (portfolio, blog, avatar)
  middlewares/
    auth.middleware.ts    Verifies JWT on protected routes
    error.middleware.ts   Centralized error handling + Zod validation errors
    upload.middleware.ts  Multer config for image uploads
  app.ts             Express app setup, route mounting
  server.ts          Entrypoint
uploads/             Uploaded images (portfolio/, blog/, avatars/) — gitignored, persisted via Docker volume in production
```

## API routes

### Public (no auth)
- `GET /api/portfolio` — list published projects (`?category=Commercial` to filter)
- `GET /api/portfolio/:slug` — get one published project
- `GET /api/blog` — list published posts
- `GET /api/blog/:slug` — get one published post
- `GET /api/services?type=soft|hard` — list published services of that type
- `POST /api/enquiries` — submit the public Enquiry form
- `GET /health` — health check

### Admin (requires `Authorization: Bearer <token>`)
- `POST /api/auth/login` — returns `{ token, user }`
- `GET /api/auth/me` — returns the current admin user
- `PUT /api/auth/profile` — update name/email/avatarUrl
- `PUT /api/auth/password` — change password (`{ currentPassword, newPassword }`)
- `GET /api/admin/portfolio` / `:id` / `POST` / `PUT :id` / `DELETE :id`
- `GET /api/admin/blog` / `:id` / `POST` / `PUT :id` / `DELETE :id`
- `GET /api/admin/services?type=soft|hard` / `:id` / `POST` / `PUT :id` / `DELETE :id`
- `GET /api/admin/enquiries` — list all submissions
- `PATCH /api/admin/enquiries/:id/status` — mark NEW / READ / ARCHIVED
- `DELETE /api/admin/enquiries/:id`
- `GET /api/admin/dashboard/stats` — counts for the admin dashboard cards
- `POST /api/admin/uploads/portfolio` — multipart image upload, returns `{ url }`
- `POST /api/admin/uploads/blog` — same, for blog images
- `POST /api/admin/uploads/avatar` — same, for the admin's profile photo

## Commands

```bash
npm run dev              # start with hot reload (tsx watch)
npm run build             # compile TypeScript + generate Prisma client
npm run start              # run the compiled build
npm run prisma:migrate      # create/apply a migration in dev
npm run prisma:deploy        # apply migrations in production (no schema changes allowed)
npm run prisma:studio         # visual database browser
npm run seed                   # seed admin user + initial content
```

## A note on Prisma in this sandbox

This backend was written in an environment without network access to
`binaries.prisma.sh`, so `npx prisma generate` / `migrate` could not be run
here to fully verify the schema end-to-end. The schema and all Prisma
Client usage were written carefully against Prisma's documented API. Run
`npm install && npx prisma migrate dev` on a machine with normal internet
access (or via `docker compose up --build`, which downloads everything
inside the build) to complete first-time setup.
