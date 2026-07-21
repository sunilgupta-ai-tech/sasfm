import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function makeStorage(subfolder: "portfolio" | "blog" | "avatars" | "team") {
  const dir = path.join(__dirname, "..", "..", "uploads", subfolder);
  fs.mkdirSync(dir, { recursive: true });

  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, unique);
    },
  });
}

function fileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    return cb(new Error("Only JPEG, PNG, WEBP or AVIF images are allowed"));
  }
  cb(null, true);
}

export const uploadPortfolioImage = multer({
  storage: makeStorage("portfolio"),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

export const uploadBlogImage = multer({
  storage: makeStorage("blog"),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

export const uploadAvatarImage = multer({
  storage: makeStorage("avatars"),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB, avatars should be small
  fileFilter,
});

export const uploadTeamImage = multer({
  storage: makeStorage("team"),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});
