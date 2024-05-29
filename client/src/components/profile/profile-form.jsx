import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { profileFormSchema } from "@/data/profile";
import { useEditUserMutation } from "@/features/api/user";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import { Spinner } from "../ui/spinner";
import { useSelector } from "react-redux";

export function ProfileForm() {
  const { user } = useSelector((state) => state.auth);
  const [editUser, { isLoading }] = useEditUserMutation()

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      avatar: user?.avatar || "",
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      phone: user?.phone,
      bio: user?.bio || "",
      urls: user?.urls.map((url) => ({ value: url })) || [{ value: "https://twitter.com/fashyl_"}],
    },
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    skipPolling: true,
    onClientUploadComplete: (res) => {
      form.setValue("avatar", res[0].url, { shouldValidate: true });
    },
    onUploadError: (error) => {
      console.error(error);
      toast.error("Error occurred while uploading");
    },
    onUploadBegin: () => {
      // May need it later.
      // alert("upload has begun");
    },
  });

  async function onSubmit(data) {
    try {
      await editUser({ id: user._id, data}).unwrap()
    } catch (error) {
      console.error(error)
      toast.error("Couldn't update profile, please try again");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col w-full min-h-screen">
          <div className="grid gap-6">
            <Card className="bg-white dark:bg-gray-950 rounded-none">
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-4 pt-2">
                  <Avatar className="h-20 w-20">
                    <AvatarImage alt="avatar" src={form.getValues("avatar")} />
                    <AvatarFallback className="bg-lime-20 text-neutral-500 text-xs font-medium">
                      None.
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <FormField
                      name="avatar"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Button
                                type="button"
                                variant="outline"
                                className="text-neutral-90 dark:hover:bg-lime-900 w-max"
                                onClick={() => {
                                  // Imma do the forbidden, ,-,
                                  document.getElementById("avatar").click();
                                }}>
                                {isUploading ? <Spinner /> : "Change Avatar"}
                              </Button>
                              <Input
                                hidden
                                type="file"
                                id="avatar"
                                onChange={(event) => {
                                  startUpload([event.target.files[0]]);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Update your profile picture (4MB max..).
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              id="firstName"
                              value={field.value}
                              placeholder="John"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              id="lastName"
                              value={field.value}
                              placeholder="Dough"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          You can <span>@mention</span> other users and organizations to
                          link to them.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" value={field.value} {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name. It can be your real name or a
                          pseudonym. You can only change this once every 30 days.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    className="disabled:text-neutral-900 font-medium"
                    disabled
                    value={user?.email}
                    type="email"
                  />
                  <p className="text-[0.8rem] text-neutral-500">
                    There just ain&apos;t no way you&apos;re changing this.
                  </p>
                </div>
                <div className="space-y-2">
                  <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            id="phone"
                            placeholder="+212 (6) 555-5555"
                            value={field.value}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Should prolly use area codes for better UX.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`urls.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            URLs
                          </FormLabel>
                          <FormDescription className={cn(index !== 0 && "sr-only")}>
                            Add links to your website, blog, or social media profiles.
                          </FormDescription>
                          <FormControl>
                            <Input
                              placeholder={`snaz${index}@domain.ma`}
                              value={field.value}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ value: "" })}>
                    Add URL
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" variant="default">
                  {isLoading ? <Spinner /> : "Update profile"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
