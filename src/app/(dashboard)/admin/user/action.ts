"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthFormState } from "@/types/auth";
import { CreateUserSchemaForm } from "@/validations/auth-validation";

export async function createUser(prevState: AuthFormState, formData: FormData) {
  const validatedFiels = CreateUserSchemaForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    role: formData.get("role"),
    // avatar_url: formData.get("avatar_url"),
  });

  if (!validatedFiels.success) {
    return {
      status: "error",
      errors: {
        ...validatedFiels.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: validatedFiels.data.email,
    password: validatedFiels.data.password,
    options: {
      data: {
        name: validatedFiels.data.name,
        role: validatedFiels.data.role,
        // avatar_url: validatedFiels.data.avatar_url,
      },
    },
  });

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return { status: "success" };
}
