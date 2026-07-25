import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Place } from '@/types/place'
import { getDirectionsUrl } from '@/lib/maps'
import 'leaflet/dist/leaflet.css'

const roseIcon = L.divIcon({
  className: '',
  html: `<span style="
    display:block;width:14px;height:14px;border-radius:9999px;
    background:#6FAFD0;border:2px solid #fff;
    box-shadow:0 2px 8px rgba(26,47,58,0.22);
  "></span>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const selectedIcon = L.divIcon({
  className: '',
  html: `<span style="
    display:block;width:18px;height:18px;border-radius:9999px;
    background:#3D8FB5;border:3px solid #fff;
    box-shadow:0 2px 12px rgba(26,47,58,0.32);
  "></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

type PlaceMapProps = {
  places: Place[]
  selectedId: string | null
  onSelect: (place: Place) => void
}

function MapFocus({ place }: { place: Place | undefined }) {
  const map = useMap()

  useEffect(() => {
    if (place?.lat != null && place?.lng != null) {
      map.flyTo([place.lat, place.lng], 15, { duration: 0.8 })
    }
  }, [map, place])

  return null
}

export function PlaceMap({ places, selectedId, onSelect }: PlaceMapProps) {
  const mappable = places.filter((p) => p.lat != null && p.lng != null)
  const selected = mappable.find((p) => p.id === selectedId)

  return (
    <div className="h-[360px] overflow-hidden rounded-3xl ring-1 ring-rose-soft/40 sm:h-[480px]">
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapFocus place={selected} />
        {mappable.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat!, place.lng!]}
            icon={place.id === selectedId ? selectedIcon : roseIcon}
            eventHandlers={{ click: () => onSelect(place) }}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              <a
                href={getDirectionsUrl(place)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {place.address}
              </a>
              <br />
              <a
                href={getDirectionsUrl(place)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '12px' }}
              >
                Itinéraire →
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
