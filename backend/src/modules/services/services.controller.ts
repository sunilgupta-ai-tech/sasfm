import { Response, NextFunction } from "express";
import { createServiceSchema, updateServiceSchema } from "./services.schema";
import * as servicesService from "./services.service";
import type { AuthedRequest } from "../../middlewares/auth.middleware";

function parseType(req: AuthedRequest): "SOFT" | "HARD" | undefined {
  const type = typeof req.query.type === "string" ? req.query.type.toUpperCase() : undefined;
  return type === "SOFT" || type === "HARD" ? type : undefined;
}

// ---- Public ----

export async function listPublic(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const services = await servicesService.listPublished(parseType(req));
    res.json({ services });
  } catch (err) {
    next(err);
  }
}

// ---- Admin ----

export async function listAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const services = await servicesService.listAllForAdmin(parseType(req));
    res.json({ services });
  } catch (err) {
    next(err);
  }
}

export async function getAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const service = await servicesService.getByIdForAdmin(String(req.params.id));
    res.json({ service });
  } catch (err) {
    next(err);
  }
}

export async function createAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = createServiceSchema.parse(req.body);
    const service = await servicesService.create(input);
    res.status(201).json({ service });
  } catch (err) {
    next(err);
  }
}

export async function updateAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = updateServiceSchema.parse(req.body);
    const service = await servicesService.update(String(req.params.id), input);
    res.json({ service });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    await servicesService.remove(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
