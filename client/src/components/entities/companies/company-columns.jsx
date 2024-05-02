import { Checkbox } from "@radix-ui/react-checkbox";
import { PhoneCallIcon } from "lucide-react";

export const companyColumns = [
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
      accessorKey: "name",
      header: "Company Name",
      cell: ({ row }) => {
        const name = row.getValue("name");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {name}
          </div>
        );
      },
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => {
        const website = row.getValue("website");
        return (
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {website}
          </a>
        );
      },
    },
    {
      accessorKey: "industry",
      header: "Industry",
      cell: ({ row }) => {
        const industry = row.getValue("industry");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {industry}
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
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const address = row.getValue("address");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {address}
          </div>
        );
      },
    },
  ];