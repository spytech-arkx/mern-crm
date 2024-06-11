import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "@/data/tasks";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { CalendarClock, Plus } from "lucide-react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
       className="translate-y-[2px] mx-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader className="text-xs" column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2 items-center overflow-hidden">
          {label && (
            <Badge className={label.style} variant="outline">
              {label.label}
            </Badge>
          )}
          <span
            className={cn(
              "truncate font-medium max-w-full sm:max-w-[150px] md:max-w-[300px] lg:max-w-[600px]",
              row.getValue("status") === "done" ? "line-through" : "",
            )}>
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
    enableResizing: true,
  },
  {
    accessorKey: "assignee",
    filterFn: (row, assignee, value) => {
      return value.includes(row.getValue(assignee));
    },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assignee(s)" />,
    cell: ({ row }) => {
      const assignee = row.getValue("assignee");
      if (!assignee)
        return (
          <span className="max-w-[200px] truncate text-neutral-70 text-xs">
            <Plus size="16" />
          </span>
        );
      return (
        <div className="flex align-middle space-x-2">
          {assignee.avatar && (
            <img
              className="w-6 h-6 rounded-full"
              src={assignee.avatar}
              alt="user's avatar"
            />
          )}
          <span className="max-w-[200px] truncate text-neutral-80">{`${
            assignee.name.split(" ")[1][0]
          }. ${assignee.name.split(" ")[0]}`}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"));
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
    accessorKey: "status",
    filterFn: (row, status, value) => {
      return value.includes(row.getValue(status));
    },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status"));

      if (!status) {
        return (
          <span className="max-w-[200px] truncate text-neutral-80 text-xs">
            <Plus size="16" />
          </span>
        );
      }

      return (
        <div className={"flex w-max py-[2px] rounded-[37px] items-center " + status.bg}>
          {status.icon && <status.icon />}
          <span className="text-xs font-medium mx-1 pr-1">{status.label}</span>
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "priority",
    filterFn: (row, priority, value) => {
      return value.includes(row.getValue(priority));
    },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return (
          <span className="max-w-[200px] truncate text-neutral-70 text-xs">
            <Plus size="16" />
          </span>
        );
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-xs ml-2 font-medium">{priority.label}</span>
        </div>
      );
    },
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
  },
];
