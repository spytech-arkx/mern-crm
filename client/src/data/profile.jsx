import { z } from "zod";

export const tabs = [
  {
    title: "Profile",
    value: "profile",
    description: "Update your personal information and account details.",
  },
  {
    title: "Preferences",
    value: "preferences",
    description: "Customize notifications, themes, and default views.",
  },
  {
    title: "Security",
    value: "security",
    description: "Manage your account security and access controls.",
  },
  {
    title: "Data",
    value: "data",
    description: "Import/export data.",
  },
  {
    title: "Socials",
    value: "socials",
    description: "Link and manage social media accounts.",
  },
];

export const profileFormSchema = z.object({
  avatar: z
    .string()
    .optional()
    .transform((val) => (val ? val : undefined)),
  firstName: z
    .string()
    .trim()
    .transform((val) => val.replace(/^./, (match) => match.toUpperCase()))
    .optional(),
  lastName: z
    .string()
    .trim()
    .transform((val) => val.replace(/^./, (match) => match.toUpperCase()))
    .optional(),
  username: z.string().trim().toLowerCase().optional(),
  email: z.string().email().optional(),
  phone: z.string().trim().optional(),
  bio: z.string().max(80).optional(),
  urls: z
    .array(
      z
        .object({
          value: z.string().url({ message: "Please enter a valid URL." }),
        })
        .transform((obj) => obj.value)
        .optional(),
    )
    .optional(),
});
