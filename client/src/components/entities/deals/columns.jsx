// import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// import { labels, priorities, stagees } from "@/data/tasks";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { CalendarClock, Plus } from "lucide-react";

import { format } from "date-fns";
import { cn, moneyFormatter } from "@/lib/utils";
import {
  BlueCircle,
  GrayCircle,
  OrangeCircle,
  GreenCircle,
  RedCircle,
  PurpleCircle,
} from "@/assets/small-circle";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { brands}  from "@/assets/brands";

export const stages = [
  {
    value: "Qualification",
    label: "Qualification",
    icon: BlueCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "Proposal",
    label: "Proposal",
    icon: GreenCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "Negotiation",
    label: "Negotiation",
    icon: OrangeCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "Closed Won",
    label: "Closed Won",
    icon: PurpleCircle,
    bg: "bg-white border rounded-xl shadow",
  },
  {
    value: "Closed Lost",
    label: "Closed Lost",
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

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-[#282828] data-[state=checked]:border-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="data-[state=checked]:bg-[#282828] data-[state=checked]:border-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader className="text-xs" column={column} title="Deal" />
    ),
    cell: ({ row }) => <div className="w-max">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader className="ml-3" column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        // TODO: overflow-gradient ?
        <div className="flex space-x-2 ml-3 items-center overflow-hidden">
          <span
            className={cn(
              // "truncate font-medium max-w-full sm:max-w-[150px] md:max-w-[300px] lg:max-w-[600px]",
            )}>
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "company",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company" />,
    cell: ({ row }) => {
      const company = row.getValue("company");
      if (!company)
        return (
          <span className="max-w-[200px] truncate text-neutral-70 text-xs">
            <Plus size="16" />
          </span>
        );
      return (
        <div className="flex items-center space-x-2">
          {brands[row.index]}
          <span className="max-w-[100px] truncate">{company.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => <DataTableColumnHeader column={column} title="People" />,
    cell: ({ row }) => {
      const contact = row.getValue("contact");
      if (!contact)
        return (
          <span className="max-w-[200px] truncate text-neutral-70 text-xs">
            <Plus size="16" />
          </span>
        );
      return (
        <div className="flex items-center space-x-2">
          {contact.avatar && (
            <Avatar className="w-7 h-7 border-[2px]">
              <AvatarImage src={contact.avatar} alt="user's avatar" />
              <AvatarFallback>{contact.firstName[0]}</AvatarFallback>
            </Avatar>
          )}
          <div className="grid">
          <span className="">{contact.fullName}</span>
          <span className="text-xs">{contact.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assignee(s)" />,
    cell: ({ row }) => {
      const assignee = row.getValue("assignee");
      if (!assignee)
        return (
          <span className="max-w-[150px] truncate text-neutral-70 text-xs">
            <Plus size="16" />
          </span>
        );
      return (
        <div className="flex items-center space-x-2">
          {assignee.avatar && (
            <Avatar className="w-7 h-7 border-[2px]">
              <AvatarImage src={assignee.avatar} alt="user's avatar" />
              <AvatarFallback>{assignee.name[0]}</AvatarFallback>
            </Avatar>
          )}
          <span className="max-w-[200px] truncate">{assignee.name}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "closingDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Closed Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("closingDate"));
      if (date == "Invalid Date")
        return (
          <div className="flex items-center space-x-2">
            <Plus size="16" className="max-w-[200px] truncate text-neutral-70 text-xs" />
          </div>
        );
      return (
        <div className="flex align-middle space-x-2">
          <div>
            <CalendarClock color="#6d7076" size="16" />
          </div>
          <span className="max-w-[200px] truncate text-neutral-80 text-xs">
            {format(date, "PPP")}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "stage",
    filterFn: (row, stage, value) => {
      return value.includes(row.getValue(stage));
    },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stage" />,
    cell: ({ row }) => {
      const stage = stages.find((stage) => stage.value === row.getValue("stage"));

      if (!stage) {
        return (
          <span className="max-w-[200px] truncate text-neutral-80 text-xs">
            <Plus size="16" />
          </span>
        );
      }

      return (
        <div className={"flex w-max py-[2px] rounded-[37px] items-center " + stage.bg}>
          {stage.icon && <stage.icon />}
          <span className="text-xs font-medium mx-1 pr-1">{stage.label}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Value" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {moneyFormatter.format(row.getValue("amount")) ?? null}
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
  },
];
