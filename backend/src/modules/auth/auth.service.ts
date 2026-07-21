import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../db/prisma";
import { env } from "../../config/env";
import { ApiError } from "../../middlewares/error.middleware";
import type {
  LoginInput,
  UpdateProfileInput,
  ChangePasswordInput,
} from "./auth.schema";

const TOKEN_EXPIRY = "7d";

function toPublicUser(user: {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}) {
  return { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl };
}

export async function login({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, {
    expiresIn: TOKEN_EXPIRY,
  });

  return { token, user: toPublicUser(user) };
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, "User not found");
  return toPublicUser(user);
}

export async function updateProfile(id: string, input: UpdateProfileInput) {
  if (input.email) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing && existing.id !== id) {
      throw new ApiError(409, "That email is already in use");
    }
  }

  const user = await prisma.user.update({ where: { id }, data: input });
  return toPublicUser(user);
}

export async function changePassword(id: string, input: ChangePasswordInput) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, "User not found");

  const valid = await bcrypt.compare(input.currentPassword, user.passwordHash);
  if (!valid) throw new ApiError(401, "Current password is incorrect");

  const passwordHash = await bcrypt.hash(input.newPassword, 10);
  await prisma.user.update({ where: { id }, data: { passwordHash } });
}
