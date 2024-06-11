import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { userSchema } from "@/data/user";
import { useSignupMutation } from "@/features/api/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotebookTabs } from "lucide-react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignUpPage() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const onSubmit = async (data) => {
    // went the long road, in order to access the error immediatly.
    // You have to chain `unwrap()`
    await signup(data).then((value) => {
      if (value.error && value.error.status === 409) setError("email", { type: 409, message: "Email already exists."})
      if (value.error && value.error.status !== 409 ) toast.error("Registration failed. Please try again or contact support.")
      toast.info("Registered successfully, Please login.")
      navigate("/login");
    });
  };

  return (
    <div className="container relative h-screen grid items-center justify-center lg:max-w-none lg:grid-cols-[1fr_1fr_1fr] lg:px-0 bg-gradient-to-l from-lime-30 to-stone-500">
      <div className="relative hidden h-full flex-col self-start bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0" />
        <div className="relative z-20 flex items-center text-lg font-medium gap-2">
          <NotebookTabs />
          sanzCRM
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;Dêpechez vous.&rdquo;</p>
            <footer className="text-sm">&nbsp;– l&apos;Bacha</footer>
          </blockquote>
        </div>
      </div>

      <Card className="mx-auto max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div
                  className={cn(
                    "grid grid-cols-2 gap-x-4",
                    errors.lastName || errors.firstName ? "grid-rows-[4fr_1fr]" : "",
                  )}>
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" autoComplete="current-firstname" placeholder="John" {...register("firstName")} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" autoComplete="current-lastname" placeholder="Doe" {...register("lastName")} />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs grid">
                      {errors.firstName.message}
                    </p>
                  )}
                  {errors.lastName && (
                    <p className="text-red-500 text-xs col-start-2 row-start-2">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="m@example.com" {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Min. 8 characters"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full">
                  {isLoading ? <Spinner /> : "Create an account"}
                </Button>
                <Button variant="outline" className="w-full">
                  Sign up with GitHub
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
