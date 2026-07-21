Put your service page hero images here, e.g.:
  soft-services-hero.jpg
  hard-services-hero.jpg

Then open the matching page file and set the IMAGE_SRC constant, e.g. in
src/app/services/soft-services/page.tsx:

  const IMAGE_SRC = "/images/soft-services-hero.jpg";

External hosted URLs (https://...) work too — no need to place a file here
in that case, but you'll need to add that domain to next.config.ts:

  images: { remotePatterns: [{ hostname: "your-image-host.com" }] }

Leave it empty ("") to show the designed placeholder instead
of a broken image.
