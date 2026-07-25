export type PlaceType = 'cafe' | 'restaurant' | 'bar' | 'other'
export type PlaceStatus = 'pending' | 'approved' | 'rejected'

export type Place = {
  id: string
  name: string
  type: PlaceType
  address: string
  arrondissement: number | null
  lat: number | null
  lng: number | null
  notes: string | null
  status: PlaceStatus
  created_at: string
}

export type PlaceInsert = {
  name: string
  type: PlaceType
  address: string
  arrondissement?: number | null
  lat?: number | null
  lng?: number | null
  notes?: string | null
}

export const PLACE_TYPE_LABELS: Record<PlaceType, string> = {
  cafe: 'Café',
  restaurant: 'Restaurant',
  bar: 'Bar',
  other: 'Autre',
}
