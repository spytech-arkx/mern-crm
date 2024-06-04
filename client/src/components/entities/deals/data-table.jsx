import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/new-york/table";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { DataTablePagination } from "../data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useDispatch } from "react-redux";
import { focusDealById, toggleDealDrawer } from "@/features/deals/slice";
import { useDeleteDealMutation } from "@/features/api/deals";

import { toast } from "sonner";
import { format } from "date-fns";

export function DataTable({ columns, data }) {
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({ id: false, assignee: false });
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [deleteDeal, { isLoading: pendingDelete }] = useDeleteDealMutation();
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleClickDelete = async (deal) => {
    if (!pendingDelete) {
      try {
        await deleteDeal(deal._id).unwrap();
        toast.success(`Deal ${deal.id} deletion was successful.`);
      } catch (err) {
        console.error(err);
        toast.error(`Failed deleting deal.`);
      }
    }
  };

  const handleClickView = (deal) => {
    dispatch(focusDealById(deal));
    dispatch(toggleDealDrawer());
  };

  const handleClickEdit = (deal) => {
    dispatch(focusDealById(deal));
    dispatch(toggleDealDrawer());
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Deals - {format(new Date(), "PPP")}</h2>
      <DataTableToolbar table={table} />
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => {
                        dispatch(focusDealById(row.original));
                        dispatch(toggleDealDrawer());
                      }}
                      data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={() => handleClickView(row.original)}>
                      View
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={() => handleClickEdit(row.original)}>
                      Edit
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={() => handleClickDelete(row.original)}
                      className="focus:text-red-500">
                      Delete
                      <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))
            ) : (
              <TableRow>
                <TableCell
                  onClick={() => dispatch(toggleDealDrawer())}
                  colSpan={columns.length}
                  className="h-56 cursor-pointer text-center">
                  <h3 className="text-lg font-bold tracking-tight">You have no deals</h3>
                  <p className="text-sm text-muted-foreground">
                    Click here to add your first 😃.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
