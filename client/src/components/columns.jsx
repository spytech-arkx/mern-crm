/**
 *  Column definitions for data entities
 */

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
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
  ]