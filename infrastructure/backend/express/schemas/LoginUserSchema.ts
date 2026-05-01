import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
