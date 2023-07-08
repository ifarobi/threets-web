import { Database } from "@/types/database.types";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useMemo } from "react";

export function getSupabaseAnonClient() {
  return createPagesBrowserClient<Database>();
}

export function useSupabaseAnon() {
  return useMemo(getSupabaseAnonClient, []);
}
