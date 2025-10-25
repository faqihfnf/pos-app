import z from "zod";

export const loginSchemaForm = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const CreateUserSchemaForm = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(3, { message: "Name is required" }),
  role: z.string().min(3, { message: "Role is required" }),
  // avatar_url: z.union([
  //   z.string().min(1, { message: "Avatar URL is required" }),
  //   z.instanceof(File),
  // ]),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;
export type CreateUserForm = z.infer<typeof CreateUserSchemaForm>;
