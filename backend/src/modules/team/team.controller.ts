import { Response, NextFunction } from "express";
import { createTeamMemberSchema, updateTeamMemberSchema } from "./team.schema";
import * as teamService from "./team.service";
import type { AuthedRequest } from "../../middlewares/auth.middleware";

// ---- Public ----

export async function listPublic(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const members = await teamService.listPublished();
    res.json({ members });
  } catch (err) {
    next(err);
  }
}

// ---- Admin ----

export async function listAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const members = await teamService.listAllForAdmin();
    res.json({ members });
  } catch (err) {
    next(err);
  }
}

export async function getAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const member = await teamService.getByIdForAdmin(String(req.params.id));
    res.json({ member });
  } catch (err) {
    next(err);
  }
}

export async function createAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = createTeamMemberSchema.parse(req.body);
    const member = await teamService.create(input);
    res.status(201).json({ member });
  } catch (err) {
    next(err);
  }
}

export async function updateAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = updateTeamMemberSchema.parse(req.body);
    const member = await teamService.update(String(req.params.id), input);
    res.json({ member });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    await teamService.remove(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
