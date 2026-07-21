import { prisma } from "../../db/prisma";
import { ApiError } from "../../middlewares/error.middleware";
import type { CreateTeamMemberInput, UpdateTeamMemberInput } from "./team.schema";

export async function listPublished() {
  return prisma.teamMember.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function listAllForAdmin() {
  return prisma.teamMember.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function getByIdForAdmin(id: string) {
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) throw new ApiError(404, "Team member not found");
  return member;
}

export async function create(input: CreateTeamMemberInput) {
  return prisma.teamMember.create({ data: input });
}

export async function update(id: string, input: UpdateTeamMemberInput) {
  await getByIdForAdmin(id);
  return prisma.teamMember.update({ where: { id }, data: input });
}

export async function remove(id: string) {
  await getByIdForAdmin(id);
  await prisma.teamMember.delete({ where: { id } });
}
