import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { priorities, statuses, assignees } from "@/components/entities/tasks/data"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"

export function DataTableToolbar({
  table,
}) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input

          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {table.getColumn("assignee") && (
          <DataTableFacetedFilter
            column={table.getColumn("assignee")}
            title="Assignees"
            options={assignees}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 border text-xs rounded-md border-dashed"
          >
            Reset
            <Cross2Icon className="ml-2 h-3 w-3" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
