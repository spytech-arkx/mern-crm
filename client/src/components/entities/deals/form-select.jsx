import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function DealSelects({ value, onChange, options, placeholder }) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px] text-[1.2rem] font-semibold border-none shadow-none p-0 m-0 h-max focus:ring-0">
        <SelectValue placeholder={placeholder ?? "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return (
            <SelectItem key={option.id} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export function DealPopovers({ setValue, options, children }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search assignee..." className="h-9" />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={crypto.randomUUID()}
                  value={option.name}
                  onSelect={() => {
                    setValue("assignee", option)
                  }}>
                  <Avatar className="mr-2 h-4 w-4 rounded-xl">
                    <AvatarImage src={option.avatar} alt="The Assignee's Avatar" />
                    <AvatarFallback>{option.name}</AvatarFallback>
                  </Avatar>
                  <span>{option.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
