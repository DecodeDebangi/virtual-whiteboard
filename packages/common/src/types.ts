import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20).optional().nullable(),
  password: z.string(),
  email: z.string().email(),
});

export const SigninSchema = z.object({
  username: z.string().min(3).max(20).optional().nullable(),
  password: z.string(),
  email: z.string().email(),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});
