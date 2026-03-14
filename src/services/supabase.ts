// src/services/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export function createServerSupabase(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.warn('[Supabase] No service role key found, using anon key');
    return createClient(supabaseUrl, supabaseAnonKey);
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

export async function getCached<T>(key: string, ttlMs: number): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from('cache')
      .select('data, cached_at')
      .eq('key', key)
      .single();

    if (error || !data) return null;

    const age = Date.now() - new Date(data.cached_at).getTime();
    if (age > ttlMs) return null;

    return data.data as T;
  } catch {
    return null;
  }
}

export async function setCache(key: string, value: unknown): Promise<void> {
  try {
    await supabase.from('cache').upsert({
      key,
      data: value,
      cached_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Cache] Failed to write:', key, err);
  }
}
