import type { PlaceType } from '@/types/place'
import { PLACE_TYPE_LABELS } from '@/types/place'

type FiltersProps = {
  type: PlaceType | 'all'
  arrondissement: number | 'all'
  onTypeChange: (type: PlaceType | 'all') => void
  onArrondissementChange: (arr: number | 'all') => void
  count: number
}

const TYPES: Array<PlaceType | 'all'> = ['all', 'cafe', 'restaurant', 'bar', 'other']

export function Filters({
  type,
  arrondissement,
  onTypeChange,
  onArrondissementChange,
  count,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTypeChange(t)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition ${
              type === t
                ? 'bg-rose-mid text-white'
                : 'bg-white/60 text-muted ring-1 ring-rose-soft/50 hover:text-ink'
            }`}
          >
            {t === 'all' ? 'Tous' : PLACE_TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="whitespace-nowrap">Arr.</span>
          <select
            value={arrondissement === 'all' ? 'all' : String(arrondissement)}
            onChange={(e) => {
              const v = e.target.value
              onArrondissementChange(v === 'all' ? 'all' : Number(v))
            }}
            className="rounded-full border-0 bg-white/70 px-3 py-1.5 text-ink ring-1 ring-rose-soft/50 outline-none focus:ring-rose-mid"
          >
            <option value="all">Tous</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
                {n === 1 ? 'er' : 'e'}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-muted tabular-nums">{count} spot{count > 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}
