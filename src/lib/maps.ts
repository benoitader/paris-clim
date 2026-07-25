import type { Place } from '@/types/place'

/** Opens Google Maps directions — on mobile, the OS usually offers Maps / Google Maps / Waze. */
export function getDirectionsUrl(place: Pick<Place, 'address' | 'lat' | 'lng' | 'name'>): string {
  const destination =
    place.lat != null && place.lng != null
      ? `${place.lat},${place.lng}`
      : place.address

  const params = new URLSearchParams({
    api: '1',
    destination,
  })

  return `https://www.google.com/maps/dir/?${params.toString()}`
}
