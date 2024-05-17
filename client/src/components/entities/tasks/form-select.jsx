import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { formPriorities } from "@/data/tasks";
import { SelectValue } from "@radix-ui/react-select";

export function FormSelect({ task }) {
  const priority = formPriorities.find((e) => e.value === task.priority);

  return (
    <Select defaultValue={priority.value}>
      <SelectTrigger
        className="border-none shadow-none h-7 p-2 w-max focus:ring-0 text-s font-medium"
        variant="outline">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {formPriorities.map((e) => {
            return (
              <SelectItem key={e.value} value={e.value}>
                <div className="flex justify-center align-middle">
                  <div className="self-center">
                    <e.icon />
                  </div>
                  <span className="ml-1 mr-2 text-s">{e.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
