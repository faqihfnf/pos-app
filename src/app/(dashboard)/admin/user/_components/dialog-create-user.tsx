"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
} from "@/constants/auth-constant";
import {
  CreateUserForm,
  CreateUserSchemaForm,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser } from "../action";

export default function DialogCreateUser({ refetch }: { refetch: () => void }) {
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(CreateUserSchemaForm),
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_CREATE_USER);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      createUserAction(formData);
    });
  });

  useEffect(() => {
    if (createUserState?.status === "error") {
      toast.error("Add user failed!", {
        description:
          createUserState?.errors?._form?.[0] || "Something went wrong",
      });
    }

    if (createUserState?.status === "success") {
      toast.success("Add user successfully!");
      form.reset();
      document.querySelector<HTMLButtonElement>("[data-state=open]")?.click();
      refetch();
    }
  }, [createUserState]);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogTitle>Add User</DialogTitle>
        <DialogDescription>Register new user</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name Input  */}
          <FormInput
            form={form}
            name="name"
            label="Name"
            placeholder="Enter name here"
          />

          {/* Email Input  */}
          <FormInput
            form={form}
            name="email"
            label="Email"
            placeholder="Enter your email here"
            type="email"
          />

          {/* Role Input  */}
          <FormInput
            form={form}
            name="role"
            label="Role"
            placeholder="Enter role here"
          />

          {/* Password Input  */}
          <FormInput
            form={form}
            name="password"
            label="Password"
            placeholder="Enter your password here"
            type="password"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isPendingCreateUser ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Add User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
