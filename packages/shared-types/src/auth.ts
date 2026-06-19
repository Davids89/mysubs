import { z } from "zod";

export const registerUserRequestSchema = z
  .object({
    confirmPassword: z.string().min(8),
    email: z.email(),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    password: z.string().min(8),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginUserRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const authUserSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  id: z.uuid(),
  lastName: z.string(),
});

export const authResponseSchema = z.object({
  token: z.string(),
  user: authUserSchema,
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;
export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;
