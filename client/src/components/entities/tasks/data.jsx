import { BlueCircle, GreenCircle, GreyCircle, OrangeCircle, RedCircle, YellowCircle } from "@/assets/small-circle"
import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
  } from "@radix-ui/react-icons"
  
import data from '@/data/tasks/tasks.json'

  export const labels = [
    {
      value: "urgent",
      label: "Urgent",
      style: "border-none bg-[#f7eded] text-[#af4b4b]"
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
  ]
  
  export const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: BlueCircle,
      bg: "bg-[#edf2fe]"
    },
    {
      value: "todo",
      label: "To-do",
      icon: GreenCircle,
      bg: "bg-[#eef5f0]"
    },
    {
      value: "in progress",
      label: "In Progress",
      icon: OrangeCircle,
      bg: "bg-[#fbf4ec]"
    },
    {
      value: "done",
      label: "Done",
      icon: YellowCircle,
      bg: "bg-[#f7f7e8]"
    },
    {
      value: "canceled",
      label: "Canceled",
      icon: GreyCircle,
      bg: "bg-[#f9f9f9]"
    },
    {
      value: "impeded",
      label: "Impeded",
      icon: RedCircle,
      bg: "bg-[#f7eded]"
    },
  ]
  
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
  ]
  
  export const assignees = [...data].map((task) => {
    return { value: task.assignee.name, label: task.assignee.name }
  });
  