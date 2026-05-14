'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase env vars missing. Running in demo mode.')
    // Return a dummy object that won't crash common calls but will be recognizable
    return {
      auth: {
        getUser: async () => ({ data: { user: { email: 'admin@demo.com' } }, error: null }),
        signInWithPassword: async ({ email, password }: any) => {
          if (email === 'admin@axion.com' && password === 'admin123') {
            return { data: { user: { email } }, error: null }
          }
          return { data: null, error: { message: 'Invalid credentials' } }
        },
        signOut: async () => ({ error: null })
      },
      from: (table: string) => ({
        select: () => ({ 
          order: () => ({ limit: () => ({ data: [], error: null }), data: [], error: null }),
          eq: () => ({ single: () => ({ data: null, error: null }), data: [], error: null }),
          count: () => ({ count: 0, error: null }),
          data: [], error: null 
        }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ error: null }) }),
        delete: () => ({ eq: () => ({ error: null }) }),
        upsert: () => ({ error: null })
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: { path: 'dummy' }, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: 'https://via.placeholder.com/150' } })
        })
      }
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
