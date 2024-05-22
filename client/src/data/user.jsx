import { z } from "zod";

export const userSchema = z.object({
    firstName: z.string().trim().min(2, "First name also.").transform((val) => val.replace(/^./, (match) => match.toUpperCase())),
    lastName: z.string().trim().min(2, "Last name required.").transform((val) => val.replace(/^./, (match) => match.toUpperCase())),
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required.").min(8, "Weak password.")
  });
  