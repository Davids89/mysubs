import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;

/**
 * Messages are user-facing: the mobile register form renders them per field
 * and the backend returns them on 400, so both stay in sync from one place.
 */
export const registerUserRequestSchema = z
  .object({
    confirmPassword: z.string().min(MIN_PASSWORD_LENGTH),
    email: z.email("Enter a valid email"),
    firstName: z.string().trim().min(1, "Name is required"),
    lastName: z.string().trim().min(1, "Surname is required"),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, "Password must be at least 8 characters"),
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
