import { prisma } from "../../db/prisma";
import { ApiError } from "../../middlewares/error.middleware";
import type { CreateServiceInput, UpdateServiceInput } from "./services.schema";

export async function listPublished(type?: "SOFT" | "HARD") {
  return prisma.service.findMany({
    where: { published: true, ...(type ? { type } : {}) },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function listAllForAdmin(type?: "SOFT" | "HARD") {
  return prisma.service.findMany({
    where: type ? { type } : {},
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function getByIdForAdmin(id: string) {
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) throw new ApiError(404, "Service not found");
  return service;
}

export async function create(input: CreateServiceInput) {
  return prisma.service.create({ data: input });
}

export async function update(id: string, input: UpdateServiceInput) {
  await getByIdForAdmin(id);
  return prisma.service.update({ where: { id }, data: input });
}

export async function remove(id: string) {
  await getByIdForAdmin(id);
  await prisma.service.delete({ where: { id } });
}
