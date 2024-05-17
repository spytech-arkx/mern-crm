import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/data/tasks";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Tiptap from "@/components/entities/tasks/form-tiptap-editor";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEditTaskMutation, useGetTasksListQuery } from "@/features/api/api-slice";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { formatter } from "@/lib/utils";
import { FormSelect } from "./form-select";

export function TaskForm({ taskId }) {
  const { data } = useGetTasksListQuery();

  const { task } = useGetTasksListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      task: data?.find((task) => task.id === "TASK-660A"),
    }),
  });

  const [editTask, { isLoading }] = useEditTaskMutation();

  const [open, setOpen] = useState(false);
  // const [selectedStatus, setSelectedStatus] = useState(null);

  const form = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });

  async function onAssigneeSelected(assignee) {
    if (!isLoading) {
      try {
        await editTask({ id: task._id, data: assignee });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function onSubmit(data) {
    console.log(data);
  }

  if (!task || !data) return <Spinner />;

  const assignees = data.map((task) => {
    return { name: task.assignee.name, avatar: task.assignee.avatar };
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-[700px]">
          <CardHeader className="">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">{task.status.toUpperCase()}</span>
              <span className="text-xs text-gray-400">DUE-DATE</span>
            </div>
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input
                        id="title"
                        className="border-none text-xl font-bold focus-visible:ring-opacity-0 shadow-none py-0 pl-0"
                        placeholder="Title. ex: Send the proposal document"
                        value={field.value || task.title}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-s font-medium shrink-0">
                {formatter.format(new Date(task.dueDate))}
              </span>
            </div>
            <span className="text-xs">
              Added by <span className="underline text-violet-900">User</span>, 22 hours
              ago
            </span>
          </CardHeader>
          <Separator />
          <CardContent className="py-0">
            <div className="flex flex-wrap flex-col gap-3 py-6">
              <div className="flex items-center gap-1">
                <span className="text-s font-medium w-28 text-zinc-500">Assignee</span>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button className="rounded-full h-7 px-2" variant="outline">
                      <img
                        className="w-4 h-4 rounded-xl"
                        src={task.assignee.avatar}
                        alt="user's avatar"
                      />
                      <span className="pl-1">{task.assignee.name}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
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
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-s font-medium text-zinc-500 w-28">Priority</span>
                <FormSelect task={task} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-s font-medium text-zinc-500 w-28">Status</span>
                <Badge className="rounded-full py-1 px-1" variant="outline">
                  <Plus size="12" />
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-s font-medium text-zinc-500 w-28">Label</span>
                <Badge className="rounded-full py-1 px-1" variant="outline">
                  <Plus size="12" />
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-s font-medium text-zinc-500 w-28">Tags</span>
                <Badge className="rounded-full py-1 px-1" variant="outline">
                  <Plus size="12" />
                </Badge>
              </div>
            </div>
            <div className="py-0">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-zinc-500">
                      DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <ScrollArea className=" bg-gray-100 rounded-md border ">
                        <div className="p-3 rounded-lg">
                          <Tiptap description={field.value} onChange={field.onChange} />
                        </div>
                      </ScrollArea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-4">
              <FormField
                control={form.control}
                name="attachements"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-zinc-500">
                      ATTACHEMENTS
                    </FormLabel>
                    <FormControl>
                      <section>
                        <Button variant="outline" type="button" size="icon">
                          <Plus size="12" />
                        </Button>
                      </section>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end py-3">
            <Button type="submit" className="text-slate-200">
              Create Task
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
