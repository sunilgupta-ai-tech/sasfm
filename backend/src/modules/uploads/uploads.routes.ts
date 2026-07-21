import { Router, Response, NextFunction } from "express";
import { requireAuth, AuthedRequest } from "../../middlewares/auth.middleware";
import {
  uploadPortfolioImage,
  uploadBlogImage,
  uploadAvatarImage,
  uploadTeamImage,
} from "../../middlewares/upload.middleware";
import { ApiError } from "../../middlewares/error.middleware";

const router = Router();

router.post(
  "/portfolio",
  requireAuth,
  uploadPortfolioImage.single("image"),
  (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) throw new ApiError(400, "No image file provided");
      res.status(201).json({ url: `/uploads/portfolio/${req.file.filename}` });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/blog",
  requireAuth,
  uploadBlogImage.single("image"),
  (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) throw new ApiError(400, "No image file provided");
      res.status(201).json({ url: `/uploads/blog/${req.file.filename}` });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/avatar",
  requireAuth,
  uploadAvatarImage.single("image"),
  (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) throw new ApiError(400, "No image file provided");
      res.status(201).json({ url: `/uploads/avatars/${req.file.filename}` });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/team",
  requireAuth,
  uploadTeamImage.single("image"),
  (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) throw new ApiError(400, "No image file provided");
      res.status(201).json({ url: `/uploads/team/${req.file.filename}` });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
