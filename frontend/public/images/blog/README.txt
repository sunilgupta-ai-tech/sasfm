Folder structure (matches each post's `slug` in src/data/content.ts):

  public/images/blog/
    banner.jpg                                                <- top banner for the /blog listing page
    why-carpentry-still-matters-in-interior-fit-outs/cover.jpg
    what-to-ask-before-hiring-an-office-fit-out-partner/cover.jpg
    the-real-cost-of-skipping-duct-cleaning/cover.jpg
    hvac-efficiency-starts-with-the-ducts/cover.jpg

Drop a `cover.jpg` (or .png/.webp) into each post's folder, and set the
banner path in src/app/blog/page.tsx (IMAGE_SRC constant).

If a file is missing, that card/page automatically falls back to the
designed gradient placeholder — nothing breaks.

Same dynamic-migration note as public/images/portfolio/README.txt: these
are plain string paths in src/data/content.ts, so swapping to a Postgres
`image_url` column later is a data change, not a component rewrite.
