import type { Place } from '@/types/place'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const STORAGE_KEY = 'paris-clim-admin-secret'

export function getStoredAdminSecret(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function storeAdminSecret(secret: string) {
  sessionStorage.setItem(STORAGE_KEY, secret)
}

export function clearAdminSecret() {
  sessionStorage.removeItem(STORAGE_KEY)
}

async function callModerate<T>(
  secret: string,
  body: { action: 'list' | 'approve' | 'reject'; id?: string },
): Promise<T> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase n’est pas configuré.')
  }

  const res = await fetch(`${supabaseUrl}/functions/v1/moderate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAnonKey}`,
      apikey: supabaseAnonKey,
      'x-admin-secret': secret,
    },
    body: JSON.stringify(body),
  })

  const json = (await res.json()) as T & { error?: string }
  if (!res.ok) {
    throw new Error(json.error || `Erreur ${res.status}`)
  }
  return json
}

export async function listPendingPlaces(secret: string): Promise<Place[]> {
  const data = await callModerate<{ places: Place[] }>(secret, { action: 'list' })
  return data.places
}

export async function approvePlace(secret: string, id: string): Promise<void> {
  await callModerate(secret, { action: 'approve', id })
}

export async function rejectPlace(secret: string, id: string): Promise<void> {
  await callModerate(secret, { action: 'reject', id })
}
