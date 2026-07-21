import { prisma } from "../../db/prisma";
import { ApiError } from "../../middlewares/error.middleware";
import type { CreateEnquiryInput } from "./enquiries.schema";

export async function create(input: CreateEnquiryInput) {
  return prisma.enquiry.create({ data: input });
}

export async function listForAdmin() {
  return prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getByIdForAdmin(id: string) {
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  if (!enquiry) throw new ApiError(404, "Enquiry not found");
  return enquiry;
}

export async function updateStatus(id: string, status: "NEW" | "READ" | "ARCHIVED") {
  await getByIdForAdmin(id);
  return prisma.enquiry.update({ where: { id }, data: { status } });
}

export async function remove(id: string) {
  await getByIdForAdmin(id);
  await prisma.enquiry.delete({ where: { id } });
}

export async function countNew() {
  return prisma.enquiry.count({ where: { status: "NEW" } });
}
