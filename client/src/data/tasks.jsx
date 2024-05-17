import {
    BlueCircle,
    GreenCircle,
    GreyCircle,
    OrangeCircle,
    RedCircle,
    YellowCircle,
  } from "@/assets/small-circle";
  import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "@radix-ui/react-icons";
  
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
      icon: GreyCircle,
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
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ];
  
  export const formPriorities = [
    {
      label: "Low",
      value: "low",
      icon: GreenCircle,
    },
    {
      label: "Medium",
      value: "medium",
      icon: YellowCircle,
    },
    {
      label: "High",
      value: "high",
      icon: OrangeCircle,
    },
    {
      label: "Critical",
      value: "critical",
      icon: RedCircle,
    }
  ]
  