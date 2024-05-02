/**
 *  Column definitions for contact data entities
 */

import { Checkbox } from "../../ui/checkbox";
import { z } from "zod"

export const contactSchema = z.object({
    // All properties are required by default.
    id: z.string().trim(),
    description: z.string().trim(),
    dueData: z.date().optional(),
    status: z.string().trim().optional(),
    title: z.string().min(8).optional(),
  });

  export const taskColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {description}
          </div>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => {
        const dueDate = row.getValue("dueDate");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {dueDate ? new Date(dueDate).toLocaleDateString() : ""}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const title = row.getValue("title");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {title}
          </div>
        );
      },
    },
  ];
  