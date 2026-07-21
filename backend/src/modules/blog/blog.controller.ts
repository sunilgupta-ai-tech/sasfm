import { Response, NextFunction } from "express";
import { createBlogSchema, updateBlogSchema } from "./blog.schema";
import * as blogService from "./blog.service";
import type { AuthedRequest } from "../../middlewares/auth.middleware";

// ---- Public ----

export async function listPublic(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const posts = await blogService.listPublished();
    res.json({ posts });
  } catch (err) {
    next(err);
  }
}

export async function getPublicBySlug(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const post = await blogService.getPublishedBySlug(String(req.params.slug));
    res.json({ post });
  } catch (err) {
    next(err);
  }
}

// ---- Admin ----

export async function listAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const posts = await blogService.listAllForAdmin();
    res.json({ posts });
  } catch (err) {
    next(err);
  }
}

export async function getAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const post = await blogService.getByIdForAdmin(String(req.params.id));
    res.json({ post });
  } catch (err) {
    next(err);
  }
}

export async function createAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = createBlogSchema.parse(req.body);
    const post = await blogService.create(input);
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
}

export async function updateAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = updateBlogSchema.parse(req.body);
    const post = await blogService.update(String(req.params.id), input);
    res.json({ post });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    await blogService.remove(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
