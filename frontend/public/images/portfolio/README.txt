Folder structure (matches each project's `slug` in src/data/content.ts):

  public/images/portfolio/
    banner.jpg                          <- top banner for the /portfolio listing page
    meridian-tech-park/cover.jpg
    harborview-institute/cover.jpg
    northgate-medical-center/cover.jpg
    suncrest-residences/cover.jpg
    willow-court-townhomes/cover.jpg
    riverside-commerce-tower/cover.jpg

Drop a `cover.jpg` (or .png/.webp — just match the extension in content.ts)
into each project's folder, and set the banner path in
src/app/portfolio/page.tsx (IMAGE_SRC constant).

If a file is missing, that card/page automatically falls back to the
designed gradient placeholder — nothing breaks.

--- About going dynamic later (Node.js + PostgreSQL) ---
Every image reference in this codebase is just a plain string (an `image`
field in src/data/content.ts, or an IMAGE_SRC constant on a page) — never a
hardcoded path baked into a component. When the backend is built, each
project row in Postgres will simply have an `image_url` column, and the API
will return that URL instead of this static path. The frontend components
(SafeImage, PortfolioGrid, etc.) don't need to change at all — they already
just render whatever `src` they're given, whether that's a local /public
path (now) or an uploaded file URL from the backend/S3/Cloudinary (later).
