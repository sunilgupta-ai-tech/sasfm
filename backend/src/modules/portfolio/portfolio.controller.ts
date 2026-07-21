import { Response, NextFunction } from "express";
import { createPortfolioSchema, updatePortfolioSchema } from "./portfolio.schema";
import * as portfolioService from "./portfolio.service";
import type { AuthedRequest } from "../../middlewares/auth.middleware";

// ---- Public ----

export async function listPublic(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const projects = await portfolioService.listPublished(category);
    res.json({ projects });
  } catch (err) {
    next(err);
  }
}

export async function getPublicBySlug(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const project = await portfolioService.getPublishedBySlug(String(req.params.slug));
    res.json({ project });
  } catch (err) {
    next(err);
  }
}

// ---- Admin ----

export async function listAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const projects = await portfolioService.listAllForAdmin();
    res.json({ projects });
  } catch (err) {
    next(err);
  }
}

export async function getAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const project = await portfolioService.getByIdForAdmin(String(req.params.id));
    res.json({ project });
  } catch (err) {
    next(err);
  }
}

export async function createAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = createPortfolioSchema.parse(req.body);
    const project = await portfolioService.create(input);
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
}

export async function updateAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = updatePortfolioSchema.parse(req.body);
    const project = await portfolioService.update(String(req.params.id), input);
    res.json({ project });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    await portfolioService.remove(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
