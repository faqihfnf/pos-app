"use client";
import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/constants/auth-constant";
import { LoginForm, loginSchemaForm } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions";

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM,
  );

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      loginAction(formData);
    });
  });

  useEffect(() => {
    if (loginState?.status === "error") {
      startTransition(() => {
        loginAction(null);
      });
    }
  }, [loginState]);
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email Input  */}
            <FormInput
              form={form}
              name="email"
              label="Email"
              placeholder="Enter your email here"
              type="email"
            />

            {/* Password Input  */}
            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="Enter your password here"
              type="password"
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
