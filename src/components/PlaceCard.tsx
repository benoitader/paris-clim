import type { Place } from '@/types/place'
import { PLACE_TYPE_LABELS } from '@/types/place'
import { getDirectionsUrl } from '@/lib/maps'

type PlaceCardProps = {
  place: Place
  selected: boolean
  onSelect: (place: Place) => void
}

export function PlaceCard({ place, selected, onSelect }: PlaceCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(place)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(place)
        }
      }}
      className={`w-full cursor-pointer rounded-2xl px-4 py-3.5 text-left transition ${
        selected
          ? 'bg-rose-soft/60 ring-1 ring-rose-mid/40'
          : 'bg-white/50 ring-1 ring-transparent hover:bg-white/80 hover:ring-rose-soft/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-medium text-ink">{place.name}</h3>
          <a
            href={getDirectionsUrl(place)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-0.5 inline-block text-sm text-rose-deep underline decoration-rose-mid/40 underline-offset-2 transition hover:text-ink hover:decoration-rose-deep"
          >
            {place.address}
          </a>
          {place.notes ? (
            <p className="mt-2 text-sm leading-snug text-ink-soft">{place.notes}</p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full bg-ice px-2.5 py-0.5 text-xs font-medium text-ink">
          {PLACE_TYPE_LABELS[place.type]}
          {place.arrondissement ? ` · ${place.arrondissement}e` : ''}
        </span>
      </div>
    </div>
  )
}
