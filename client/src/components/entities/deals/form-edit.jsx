import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Globe2, Mail, Phone, Plus, Trash } from "lucide-react";
import ProgressBar from "@/components/entities/deals/pipeline";
import Tiptap from "../tasks/form-tiptap-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import dealSchema, { assignees, stages } from "@/data/deals";

import { useFieldArray, useForm } from "react-hook-form";
import { useDeleteDealMutation, useEditDealMutation } from "@/features/api/deals";
import { useDispatch } from "react-redux";
import { useUploadThing } from "@/lib/uploadthing";
import { focusDealById, toggleDealDrawer } from "@/features/deals/slice";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DealPopovers, DealSelects } from "./form-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Spinner } from "@/components/ui/spinner";
import { fileTypeIcons } from "@/data/file-types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Separator } from "@/components/ui/separator";

export default function ViewDealForm({ deal }) {
  const form = useForm({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: deal.title,
      stage: deal.stage,
      assignee: deal.assignee,
      amount: String(deal.amount),
      closingDate: new Date(deal.closingDate),
      nextStep: deal.nextStep,
      notes: deal.notes,
      attachements: deal.attachements,
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attachements",
  });

  // Redux, Did we really need to use it?
  const dispatch = useDispatch();
  const [editDeal, { isLoading: pendingEdit }] = useEditDealMutation();
  const [deleteDeal, { isLoading: pendingDelete }] = useDeleteDealMutation();

  // File Uploads hooks and state
  const { startUpload, isUploading } = useUploadThing("multiUploader", {
    skipPolling: true,
    onClientUploadComplete: (res) => {
      append(
        { name: res[0].name, size: res[0].size, type: res[0].type, url: res[0].url },
        { shouldValidate: true },
      );
    },
    onUploadError: (error) => {
      console.error(error);
      toast.error("Error occurred while uploading");
    },
  });

  // Handlers
  const handleClickDelete = async () => {
    if (!pendingDelete) {
      try {
        await deleteDeal(deal._id).unwrap();
        dispatch(toggleDealDrawer());
        dispatch(focusDealById(null));
        toast.success(`Deal ${deal.id} deletion was successful. ✔️`);
      } catch (err) {
        console.error(err);
        toast.error(`Failed deleting deal.`);
      }
    }
  };

  async function onSubmit(data) {
    if (!pendingEdit) {
      try {
        await editDeal({ id: deal._id, data }).unwrap();
        dispatch(toggleDealDrawer());
      } catch (err) {
        console.error(err);
        toast.error("Failed Deal Update..");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-[980px] ml-auto bg-white p-6 md:p-8 lg:p-10 flex flex-col gap-6 rounded-l-xl">
          {/*DealID, Company, Deal title, creator and created time */}
          <span className="absolute top-[18px] text-xs text-gray-400">{deal.id}</span>
          <div className="flex items-center justify-between">
            <div className="w-[800px]">
              <span className="text-s">{deal.company.name}</span>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        className={cn(
                          "text-xl font-semibold border-none py-0 px-0",
                          "focus-visible:ring-opacity-0 shadow-none h-max",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-gray-400 dark:text-gray-400">
                Created by{" "}
                <span className="underline text-violet-900">
                  {deal.owner ?? "Unknown"}
                </span>{" "}
                • {formatDistanceToNow(deal.createdAt)} ago
              </p>
            </div>
            {/* Confirm. and an Edit Button*/}
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleClickDelete()}>
                <Trash className="h-5 w-5 text-red-400" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button type="submit" variant="outline" size="icon">
                <Check className="h-5 w-5 text-green-500" />
                <span className="sr-only">Confirm</span>
              </Button>
            </div>
          </div>
          {/* stages, value, closing date, last activity and assignee */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-1">
              <span className="text-s font-medium text-zinc-500 dark:text-gray-400">
                Deal Stage
              </span>
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DealSelects
                        value={field.value}
                        onChange={field.onChange}
                        options={stages}
                        placeholder="Select stage"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-s font-medium text-zinc-500 dark:text-gray-400">
                Deal Amount
              </span>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Deal Amount"
                        className={cn(
                          "text-[1.2rem] font-semibold border-none py-0 px-0",
                          "focus-visible:ring-opacity-0 shadow-none h-max",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-s font-medium text-zinc-500 dark:text-gray-400">
                Expected Close
              </span>
              <FormField
                control={form.control}
                name="closingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            type="button"
                            className={cn(
                              "w-max justify-start h-max m-0 p-0 shadow-none text-left font-normal border-none",
                              "text-[1.2rem] font-semibold",
                              !field.value && "text-muted-foreground",
                            )}>
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={{ before: new Date() }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-s font-medium text-zinc-500 dark:text-gray-400">
                Last Activity
              </span>
              <div className="text-[1.2rem] font-semibold">
                {format(deal.updatedAt, "PPP")}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-s font-medium text-zinc-500 dark:text-gray-400">
                Next Steps
              </span>
              <FormField
                control={form.control}
                name="nextStep"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Spam the client"
                        className={cn(
                          "text-[1.2rem] font-semibold border-none py-0 px-0",
                          "focus-visible:ring-opacity-0 shadow-none h-max",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-s font-medium text-zinc-500 dark:text-gray-400">
                Assignee
              </span>
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DealPopovers setValue={form.setValue} options={assignees}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage
                              src={field.value.avatar}
                              alt={`${field.value.name}'s Avatar`}
                            />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{field.value.name}</h3>
                          </div>
                        </div>
                      </DealPopovers>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Contact details and notes */}
          <div className="flex gap-10">
            <div className="flex flex-col gap-2 w-56">
              <span className="text-s font-medium text-zinc-500 dark:text-gray-400">
                Contact Details
              </span>
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={deal.contact.avatar} alt="@shadcn" />
                  <AvatarFallback>{deal.contact.firstName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-s">{deal.contact.fullName}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" alt="@shadcn" />
                  <AvatarFallback>
                    <Mail size="16" className="text-[#767e70]" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-gray-400">
                    Email Address
                  </p>
                  <p className="text-s font-normal">{deal.contact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" alt="@shadcn" />
                  <AvatarFallback>
                    <Phone size="16" className="text-[#767e70]" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-gray-400">Phone Number</p>
                  <p className="text-s font-normal">
                    {deal.contact.phone ?? "0809898998"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" alt="@shadcn" />
                  <AvatarFallback>
                    <Globe2 size="16" className="text-[#767e70]" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-gray-400">Source</p>
                  <p className="text-s font-normal">LinkedIn</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-s font-medium text-zinc-500 dark:text-gray-400 ml-2">
                Notes
              </span>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ScrollArea className="bg-neutral-10 rounded-md border">
                        <div className="p-3 rounded-lg h-48">
                          <Tiptap
                            data-vaul-no-drag
                            styles="border-none rounded-lg min-h-20 max-h-60 w-[620px] shadow-none py-0 pl-0 break-words"
                            description={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </ScrollArea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Pipeline */}
          <div className="flex flex-col gap-3 col-span-3">
            <span className="text-s font-medium text-zinc-500 dark:text-gray-400">
              Sales Pipeline
            </span>
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProgressBar setValue={form.setValue} field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Attachements */}
          <div className="flex flex-col gap-3">
            <h2 className="text-s font-medium text-zinc-500 dark:text-gray-400">Files</h2>
            <section className="flex gap-2 items-center flex-wrap whitespace-normal">
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`attachements.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                        <ContextMenu>
                         <ContextMenuTrigger>
                          <Button
                            variant="outline"
                            type="button"
                            id={`attachements-button-${index}`}
                            className="pl-1 pr-3 h-12 flex gap-2"
                            onClick={() => {
                              const url = field.value.url;
                              window.open(url, '_blank', 'noopener,noreferrer');
                            }}>
                            <img src={fileTypeIcons.find((e) => e.mime === field.value.type).icon} alt="FileTypeIcon" />
                            <div className="flex flex-col text-left">
                              <span className="text-xs">{field.value.name}</span>
                              <span className="text-xs text-neutral-80">{fileTypeIcons.find((e) => e.mime === field.value.type).name} &bull; Download</span>
                            </div>
                          </Button>
                            </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem className="text-[0.8rem] text-justify" onSelect={() => document.getElementById(`attachements-button-${index}`).click()}>View in a new tab</ContextMenuItem>
                          <ContextMenuItem disabled className="text-[0.8rem] text-justify">Replace</ContextMenuItem>
                          <Separator />
                          <ContextMenuItem className="text-[0.8rem] text-red-500 text-justify" onSelect={() => remove(index)}>Delete</ContextMenuItem>
                         </ContextMenuContent>
                            </ContextMenu>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Input
                  hidden
                  type="file"
                  id="attachements"
                  onChange={(event) => {
                    startUpload([event.target.files[0]]);
                  }}
                />
                <Button
                  variant="outline"
                  type="button"
                  className="h-12 w-12"
                  onClick={() => {
                    // Imma do the forbidden, ,-,
                    document.getElementById("attachements").click();
                  }}>
                  {isUploading ? <Spinner size="12" /> : <Plus size="16" />}
                </Button>
              </section>
          </div>
        </div>
      </form>
    </Form>
  );
}
