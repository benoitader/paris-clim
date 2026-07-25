import { createClient } from '@supabase/supabase-js'
import type { Place, PlaceInsert } from '@/types/place'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

export async function fetchApprovedPlaces(): Promise<Place[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('status', 'approved')
    .order('name')

  if (error) throw error
  return (data ?? []) as Place[]
}

export async function suggestPlace(place: PlaceInsert): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase n’est pas configuré. Ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.')
  }

  const { error } = await supabase.from('places').insert({
    ...place,
    status: 'pending',
  })

  if (error) throw error
}
