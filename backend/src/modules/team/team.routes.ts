import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import * as controller from "./team.controller";

const router = Router();

// Public — GET /api/team
router.get("/", controller.listPublic);

// Admin (mounted separately at /api/admin/team)
export const adminRouter = Router();
adminRouter.use(requireAuth);
adminRouter.get("/", controller.listAdmin);
adminRouter.get("/:id", controller.getAdmin);
adminRouter.post("/", controller.createAdmin);
adminRouter.put("/:id", controller.updateAdmin);
adminRouter.delete("/:id", controller.deleteAdmin);

export default router;
