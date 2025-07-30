import { z } from "zod";
import { patterns } from "../../constants";

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((email) => patterns.email.test(email), {
      message: "Invalid email format",
    }),
  role: z.enum(["user", "admin"], { message: "Role is required" }),
});

export type UserSchema = z.infer<typeof userSchema>;
