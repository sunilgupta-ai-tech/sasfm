import { Response, NextFunction } from "express";
import { loginSchema, updateProfileSchema, changePasswordSchema } from "./auth.schema";
import * as authService from "./auth.service";
import type { AuthedRequest } from "../../middlewares/auth.middleware";

export async function loginHandler(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = loginSchema.parse(req.body);
    const result = await authService.login(input);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function meHandler(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const user = await authService.getUserById(req.user!.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function updateProfileHandler(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = updateProfileSchema.parse(req.body);
    const user = await authService.updateProfile(req.user!.id, input);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function changePasswordHandler(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = changePasswordSchema.parse(req.body);
    await authService.changePassword(req.user!.id, input);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
