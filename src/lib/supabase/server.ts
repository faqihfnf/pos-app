import { environment } from "@/configs/environment";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type CreateClientOptions = {
  isAdmin?: boolean;
};

export async function createClient({
  isAdmin = false,
}: CreateClientOptions = {}) {
  const cookieStore = await cookies();

  return createServerClient(
    environment.SUPABASE_URL!,
    isAdmin
      ? environment.SUPABASE_SERVICE_ROLE_KEY!
      : environment.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            console.log("Failed to set cookies", cookiesToSet);
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
