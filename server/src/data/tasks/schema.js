import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().max(46, {
    message: "Title too long.",
  }).optional(),
  dueDate: z.string().optional(),
  status: z.string().trim().optional(),
  priority: z.string().trim().optional(),
  description: z.string().trim().max(255).optional(),
  label: z.string().trim().max(16).optional(),
});

export const taskUpdateSchema = taskSchema.omit({ title: true });
