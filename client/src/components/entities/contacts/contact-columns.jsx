/**
 *  Column definitions for contact data entities
 */

import { MailIcon, PhoneCallIcon } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { z } from "zod"

export const contactSchema = z.object({
    // All properties are required by default.
    id: z.string().trim(),
    firstname: z.string().trim(),
    lastname: z.string().regex(/^[A-Z]{1}[a-z\s]{3,23}/gm, "Invalid name format.").trim(),
    email: z.string().email(),
    phone: z.string().trim().optional(),
    company: z.string().trim().optional(),
    title: z.string().min(8).optional(),
  });

  export const contactColumns = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() 
            }
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
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => {
        const name = row.getValue("firstName");
        return <div className="text-neutral-950 text-s font-normal">{name}</div>
      },
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => {
        const name = row.getValue("lastName");
        return <div className="text-neutral-950 text-s font-normal">{name}</div>
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email");
        return (
            <div className="flex items-center text-neutral-90 text-s font-normal">
              <MailIcon className="pr-1" size='14px'/>
              <div className="underline">{email}</div>
            </div>
          );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const phone = row.getValue("phone");
        return (
            <div className="flex items-center text-neutral-80 text-xs font-normal">
              <PhoneCallIcon className="pr-1" size='14px'/>
              <div>{phone}</div>
            </div>
          );
      },
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => {
        const company = row.getValue("company");
        return (
            <div className="text-neutral-80 text-s font-normal">
              {company}
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
  ]