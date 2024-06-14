import {
  GreenBadge,
  OrangeBadge,
  RedBadge,
  YellowBadge,
} from "@/assets/small-badge";
import {
  BlueCircle,
  GreenCircle,
  OrangeCircle,
  RedCircle,
  GrayCircle,
  YellowCircle,
} from "@/assets/small-circle";

import { z } from "zod";

export const taskSchema = z.object({
  createdBy: z.string().trim().optional(),
  owner: z.string().trim().optional(),
  title: z
    .string()
    .min(2, "Tile is required.")
    .max(46, {
      message: "Title too long.",
    }),
  dueDate: z.date().optional().transform((str) => str?.toISOString()),
  status: z.string().trim().optional(),
  priority: z.string().trim().optional(),
  description: z.string().trim().max(255).optional(),
  label: z.string().trim().max(16).optional(),
  assignee: z.object({
    name: z.string().trim(),
    avatar: z.string().trim(),
  }).optional(),
  attachements: z.array(z.object({
    name: z.string().trim(),
    type: z.string().trim(),
    size: z.number(),
    url: z.string().url(),
  }).optional()).max(3, "3 Attachements max.").optional(),
});

export const taskUpdateSchema = taskSchema.omit({ title: true });

export const labels = [
  {
    value: "urgent",
    label: "Urgent",
    style: "border-none bg-[#f7eded] text-[#af4b4b]",
  },
  {
    value: "marketing",
    label: "Marketing",
    style: "border-none bg-[#f7f7e8] text-[#b1ab1d]",
  },
  {
    value: "document",
    label: "Document",
    style: "border-none bg-[#edf2fe] text-[#4976f4]",
  },
  {
    value: "internal",
    label: "Internal",
    style: "border-none bg-[#fbf4ec] text-[#d28e3d]",
  },
  {
    value: "report",
    label: "Report",
    style: "border-none bg-[#eef5f0] text-[#589e67]",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: BlueCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "todo",
    label: "To-do",
    icon: GreenCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: OrangeCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "done",
    label: "Done",
    icon: YellowCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: GrayCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "impeded",
    label: "Impeded",
    icon: RedCircle,
    bg: "bg-white border rounded-xl shadow",
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: GreenBadge,
  },
  {
    label: "Medium",
    value: "medium",
    icon: YellowBadge,
  },
  {
    label: "High",
    value: "high",
    icon: OrangeBadge,
  },
  {
    label: "Critical",
    value: "critical",
    icon: RedBadge,
  },
];

export const formStatuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: BlueCircle,
    bg: "bg-white border rounded-xl",
  },
  {
    value: "todo",
    label: "To-do",
    icon: GreenCircle,
    bg: "bg-white border rounded-xl",
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: OrangeCircle,
    bg: "bg-white border rounded-xl",
  },
  {
    value: "done",
    label: "Done",
    icon: YellowCircle,
    bg: "bg-white border rounded-xl",
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: GrayCircle,
    bg: "bg-white border rounded-xl",
  },
  {
    value: "impeded",
    label: "Impeded",
    icon: RedCircle,
    bg: "bg-white border rounded-xl",
  },
];
