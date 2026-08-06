import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client.
 *
 * The site is a static export, so there is no server runtime to hold a
 * service-role key — and we would not want one in the bundle anyway. The
 * anon key is public by design; what keeps orders private is the Row Level
 * Security policy in supabase/schema.sql, not this file.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when the project has been configured, so the UI can explain itself
 *  instead of throwing an opaque error during a build with no env vars. */
export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;
let publicClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase belum dikonfigurasi. Set NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  client ??= createClient(url!, anonKey!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
  return client;
}

/**
 * Session-free client for public order submission.
 *
 * Admin auth is persisted for the dashboard. Without a separate client, that
 * same session also leaks into the public booking form when an admin tests it
 * in the same browser, changing the database role from `anon` to
 * `authenticated`. Public writes must always use the deliberately restricted
 * anonymous role.
 */
export function getPublicSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase belum dikonfigurasi. Set NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  publicClient ??= createClient(url!, anonKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return publicClient;
}
