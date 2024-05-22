import { DotsVerticalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDeleteTaskMutation } from "@/features/api/tasks";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { focusTaskById, toggleTaskDrawer } from "@/features/tasks/slice";

export function DataTableRowActions({ row }) {
  // const task = taskSchema.parse(row.original);
  const task = row.original;
  const dispatch = useDispatch();
  const [deleteTask, { isLoading: pendingDelete }] = useDeleteTaskMutation();

  const handleClickDelete = async () => {
    if (!pendingDelete) {
      try {
        await deleteTask(row.original._id);
        toast.success(`Task ${row.original.id} deletion was successful.`);
      } catch (err) {
        console.error(err);
        toast.error(`Failed deleting task.`);
      }
    }
  };

  const handleClickView = () => {
    alert("Clicked!");
  }
  const handleClickEdit = () => {
    dispatch(focusTaskById(task.id));
    dispatch(toggleTaskDrawer());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsVerticalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={handleClickView}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={handleClickEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={handleClickDelete}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
