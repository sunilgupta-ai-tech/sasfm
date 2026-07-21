Put your hero video file here, e.g. hero.mp4

Then open src/components/sections/Hero.tsx and set:

  const HERO_VIDEO_SRC = "/videos/hero.mp4";

If you'd rather use an externally hosted video (S3, Cloudinary, YouTube-hosted
mp4, etc.), just paste the full https:// URL into HERO_VIDEO_SRC instead —
no need to place a file here.

Until a URL is set, the hero shows a designed placeholder graphic instead of
a broken video.
