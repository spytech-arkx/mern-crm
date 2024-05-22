import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEditTaskMutation } from "@/features/api/tasks";

export function FormCombobox({ task, assignees, setOpen }) {
    const [editTask, { isLoading }] = useEditTaskMutation();

    async function onAssigneeSelected(assignee) {
        if (!isLoading) {
          try {
            await editTask({ id: task._id, data: assignee });
          } catch (err) {
            console.error(err);
            throw err;
          }
        }
      }

      <Command>
        <CommandInput placeholder="Select..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {assignees.map((ass) => {
              return (
                <CommandItem
                  key={ass.name}
                  value={ass.name}
                  onSelect={(value) => {
                    // setSelectedStatus(
                    //   assignees.find(
                    //     (ass) => ass.name === value,
                    //   ) || null,
                    // );
                    const assignee = assignees.find(
                      (ass) => ass.name === value,
                    );
                    if (assignee) onAssigneeSelected(assignee);
                    setOpen(false);
                  }}>
                  <img
                    alt="user's avatar"
                    src={ass.avatar}
                    className="mr-2 h-4 w-4 rounded-xl"
                  />
                  <span>{ass.name}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
}