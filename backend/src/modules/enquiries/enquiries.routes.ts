import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import * as controller from "./enquiries.controller";

const router = Router();

// Public — submitted by the frontend Enquiry form
router.post("/", controller.createPublic);

// Admin (mounted separately at /api/admin/enquiries)
export const adminRouter = Router();
adminRouter.use(requireAuth);
adminRouter.get("/", controller.listAdmin);
adminRouter.patch("/:id/status", controller.updateStatusAdmin);
adminRouter.delete("/:id", controller.deleteAdmin);

export default router;
