import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "../data-table-view-options";

import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { useGetDealsListQuery } from "@/features/api/deals";
import { useDispatch } from "react-redux";
import { focusDealById, toggleDealDrawer } from "@/features/deals/slice";
import { Plus } from "lucide-react";
import { stages } from "./columns";

// DEALS!! FILTER NEED CHANGING
export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const dispatch = useDispatch();
  const { data: deals, isSuccess } = useGetDealsListQuery();

  let assignees = [];
  if (isSuccess)
    assignees = [...deals].map((deal) => {
      return { label: deal.assignee?.name ?? null, value: deal.assignee?.name ?? null };
    });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter deals..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )} */}
        {table.getColumn("stage") && (
          <DataTableFacetedFilter
            column={table.getColumn("stage")}
            title="Stage"
            options={stages}
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
            className="h-8 px-2 lg:px-3 border text-xs rounded-md border-dashed">
            Reset
            <Cross2Icon className="ml-2 h-3 w-3" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      <Button
        variant="outline"
        onClick={() => {
          dispatch(focusDealById(null));
          dispatch(toggleDealDrawer());
        }}
        className="ml-2 h-8 px-2 lg:px-3 border text-xs rounded-md">
        <Plus size="16"/>
      </Button>
    </div>
  );
}
