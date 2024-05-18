import { DotsVerticalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels } from "@/data/tasks";
import { Badge } from "@/components/ui/badge";
import { useDeleteTaskMutation } from "@/features/api/api-slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { focusTaskById, toggleTaskDrawer } from "@/features/tasks/tasks-slice";

export function DataTableRowActions({ row }) {
  // const task = taskSchema.parse(row.original);
  const task = row.original;
  const dispatch = useDispatch()
  const [deleteTask, { isLoading: pendingDelete }] = useDeleteTaskMutation();

  const onDeleteTaskSelected = async () => {
    if (!pendingDelete) {
      try {
        await deleteTask(row.original._id);
        toast.success(`Task ${row.original.id} deletion was successful.`);
      } catch (err) {
        console.log(err);
        toast.error(`Failed deleting task.`);
      }
    }
  };

  const onViewTaskSelected = () => alert("Clicked!");
  const onEditTaskSelected = () => {
    dispatch(focusTaskById(task.id))
    dispatch(toggleTaskDrawer());
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsVerticalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={onViewTaskSelected}>View</DropdownMenuItem>
        <DropdownMenuItem onSelect={onEditTaskSelected}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  <Badge className={label.style} variant="outline">
                    {label.label}
                  </Badge>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onDeleteTaskSelected}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
