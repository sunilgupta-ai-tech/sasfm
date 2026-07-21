import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import * as controller from "./portfolio.controller";

const router = Router();

// Public
router.get("/", controller.listPublic);
router.get("/:slug", controller.getPublicBySlug);

// Admin (mounted separately below at /api/admin/portfolio)
export const adminRouter = Router();
adminRouter.use(requireAuth);
adminRouter.get("/", controller.listAdmin);
adminRouter.get("/:id", controller.getAdmin);
adminRouter.post("/", controller.createAdmin);
adminRouter.put("/:id", controller.updateAdmin);
adminRouter.delete("/:id", controller.deleteAdmin);

export default router;
