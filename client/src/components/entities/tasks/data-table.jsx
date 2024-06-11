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

import { DataTablePagination } from "../data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useDispatch } from "react-redux";
import { focusTaskById, toggleTaskDrawer } from "@/features/tasks/slice";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "sonner";
import { useDeleteTaskMutation } from "@/features/api/tasks";
import { format } from "date-fns";

export function DataTable({ columns, data }) {
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({ id: false });
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [deleteTask, { isLoading: pendingDelete }] = useDeleteTaskMutation();
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

  const handleClickDelete = async (task) => {
    if (!pendingDelete) {
      try {
        await deleteTask(task._id).unwrap();
        dispatch(focusTaskById(null));
        toast.success(`Task ${task.id} deletion was successful.`);
      } catch (err) {
        console.error(err);
        toast.error(`Failed deleting task.`);
      }
    }
  };

  const handleClickView = (task) => {
    dispatch(focusTaskById(task));
    dispatch(toggleTaskDrawer());
  };

  const handleClickEdit = (task) => {
    dispatch(focusTaskById(task));
    dispatch(toggleTaskDrawer());
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Tasks - {format(new Date(), "PPP")}</h2>
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
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
                        dispatch(focusTaskById(row.original));
                        dispatch(toggleTaskDrawer());
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
                  onClick={() => dispatch(toggleTaskDrawer())}
                  colSpan={columns.length}
                  className="h-56 cursor-pointer text-center">
                  <h3 className="text-lg font-bold tracking-tight">You have no tasks</h3>
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
