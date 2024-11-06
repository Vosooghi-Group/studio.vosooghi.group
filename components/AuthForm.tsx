"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import Logo from "@/assets/vosooghi-group-logo-without-bg.png";
import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ImSpinner8 } from "react-icons/im";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import * as z from "zod";
import { default_loggedin_redirect } from "@/routes";
import { Card } from "./ui/card";

export const AuthForm = () => {
  // const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  // const [isPending, startTransition] = useTransition();
  // const form = useForm<z.infer<typeof LoginSchema>>({
  //   resolver: zodResolver(LoginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: default_loggedin_redirect,
    });
  };
  // const onSubmit = (values: z.infer<typeof LoginSchema>) => {
  //   setError("");
  //   setSuccess("");
  //   startTransition(() => {
  //     login(values).then((data: any) => {
  //       setError(data?.error);
  //       setSuccess(data?.success);
  //     });
  //   });
  // };
  return (
    <Card className="w-[370px] sm:max-w-[400px] p-5">
      <div className="space-y-5 flex flex-col ">
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div className=" space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.deo@mail.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <Button type="submit" className="w-full">
              {isPending ? (
                <ImSpinner8 className="w-[20px] h-[20px] animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form> */}
        <div className="flex flex-col gap-3 text-cetner w-full items-center">
          <Image
            src={Logo}
            alt="vosooghi studio"
            width={70}
            height={70}
            className="w-[40px]"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <Button
            onClick={() => onClick("google")}
            size="lg"
            className="w-full"
            variant="outline"
          >
            <FcGoogle className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => onClick("github")}
            size="lg"
            className="w-full"
            variant="outline"
          >
            <FaGithub className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
