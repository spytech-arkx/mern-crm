import { Checkbox } from "@radix-ui/react-checkbox";

export const dealColumns = [
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
      accessorKey: "title",
      header: "Deal Title",
      cell: ({ row }) => {
        const title = row.getValue("title");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {title}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
  
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => {
        const stage = row.getValue("stage");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {stage}
          </div>
        );
      },
    },
    {
      accessorKey: "closedTime",
      header: "Closed Time",
      cell: ({ row }) => {
        const closedTime = row.getValue("closedTime");
        return (
          <div className="text-neutral-950 text-s font-normal">
            {closedTime}
          </div>
        );
      },
    },
  ];
  