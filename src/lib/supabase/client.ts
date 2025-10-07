import { environment } from "@/configs/environment";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  //   const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment;
  return createBrowserClient(
    environment.SUPABASE_URL!,
    environment.SUPABASE_ANON_KEY!,
  );
}
