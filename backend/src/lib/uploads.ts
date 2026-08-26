import path from "path";
import fs from "fs/promises";

const UPLOADS_DIR = path.join(__dirname, "..", "..", "uploads");

// Deletes a previously uploaded file given its public "/uploads/..." URL.
// No-ops for anything that isn't a local upload (external URL, empty, etc.)
// and silently ignores a file that's already gone.
export async function deleteUploadedFile(url: string | null | undefined) {
  if (!url || !url.startsWith("/uploads/")) return;

  const relative = url.slice("/uploads/".length);
  const filePath = path.join(UPLOADS_DIR, relative);

  if (path.relative(UPLOADS_DIR, filePath).startsWith("..")) return;

  try {
    await fs.unlink(filePath);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
  }
}
