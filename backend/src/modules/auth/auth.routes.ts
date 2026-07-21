import { Router } from "express";
import {
  loginHandler,
  meHandler,
  updateProfileHandler,
  changePasswordHandler,
} from "./auth.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/login", loginHandler);
router.get("/me", requireAuth, meHandler);
router.put("/profile", requireAuth, updateProfileHandler);
router.put("/password", requireAuth, changePasswordHandler);

export default router;
