import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { formPriorities, formStatuses, labels } from "@/data/tasks";
import { cn } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select";

export function SelectPriority({ task, field }) {
  return (
    <Select onValueChange={field.onChange} defaultValue={task?.priority ?? field.value}>
      <SelectTrigger
        className="border-none shadow-none h-7 p-0 w-max focus:ring-0 text-s font-medium"
        variant="outline">
        {task || field.value ? (
          <SelectValue />
        ) : (
          <Badge className="rounded-xl py-1 px-1" variant="outline">
            <Plus size="16" />
          </Badge>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {formPriorities.map((e) => {
            return (
              <SelectItem key={e.value} value={e.value}>
                <div className="flex w-max py-[2px] rounded-[37px] items-center bg-white border shadow-sm">
                  <e.icon />
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

export function SelectStatus({ task, field }) {
  return (
    <Select onValueChange={field.onChange} defaultValue={task?.status ?? field.value}>
      <SelectTrigger
        className="border-none shadow-none h-7 p-0 w-max focus:ring-0 text-s font-medium"
        variant="outline">
        {task || field.value ? (
          <SelectValue />
        ) : (
          <Badge className="rounded-xl py-1 px-1" variant="outline">
            <Plus size="16" />
          </Badge>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {formStatuses.map((e) => {
            return (
              <SelectItem key={e.value} value={e.value}>
                <div
                  className={
                    "flex w-max py-[2px] rounded-[37px] items-center shadow-sm" + e.bg
                  }>
                  <div className="px-1">
                    <e.icon />
                  </div>
                  <span className="text-s font-medium ml-1 mr-2">{e.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SelectLabel({ task, field }) {
  return (
    <Select onValueChange={field.onChange} defaultValue={task?.label ?? field.value}>
      <SelectTrigger
        className="border-none shadow-none h-7 p-0 w-max focus:ring-0 text-s font-medium"
        variant="outline">
        {task || field.value ? (
          <SelectValue />
        ) : (
          <Badge className="rounded-xl py-1 px-1" variant="outline">
            <Plus size="16" />
          </Badge>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {labels.map((e) => {
            return (
              <SelectItem key={e.value} value={e.value}>
                <Badge
                  className={cn(e.style, "py-[2px] border border-solid")}
                  variant="outline">
                  {e.label}
                </Badge>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
