import { Response, NextFunction } from "express";
import { createEnquirySchema, updateEnquiryStatusSchema } from "./enquiries.schema";
import * as enquiriesService from "./enquiries.service";
import type { AuthedRequest } from "../../middlewares/auth.middleware";

// ---- Public ----

export async function createPublic(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const input = createEnquirySchema.parse(req.body);
    const enquiry = await enquiriesService.create(input);
    res.status(201).json({ enquiry: { id: enquiry.id } });
  } catch (err) {
    next(err);
  }
}

// ---- Admin ----

export async function listAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const enquiries = await enquiriesService.listForAdmin();
    res.json({ enquiries });
  } catch (err) {
    next(err);
  }
}

export async function updateStatusAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { status } = updateEnquiryStatusSchema.parse(req.body);
    const enquiry = await enquiriesService.updateStatus(String(req.params.id), status);
    res.json({ enquiry });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    await enquiriesService.remove(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
