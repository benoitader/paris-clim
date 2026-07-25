import { useEffect, useMemo, useState } from 'react'
import { Hero } from '@/components/Hero'
import { Filters } from '@/components/Filters'
import { PlaceCard } from '@/components/PlaceCard'
import { PlaceMap } from '@/components/PlaceMap'
import { fetchApprovedPlaces, isSupabaseConfigured } from '@/lib/supabase'
import type { Place, PlaceType } from '@/types/place'
import FadeContent from '@/components/FadeContent'

const FALLBACK_PLACES: Place[] = [
  {
    id: 'demo-1',
    name: 'Café Kitsuné',
    type: 'cafe',
    address: '51 Galerie de Montpensier, 75001 Paris',
    arrondissement: 1,
    lat: 48.8638,
    lng: 2.3372,
    notes: 'Clim discrète, parfait pour un café au frais.',
    status: 'approved',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    name: 'Le Petit Cler',
    type: 'restaurant',
    address: '29 rue Cler, 75007 Paris',
    arrondissement: 7,
    lat: 48.8565,
    lng: 2.3064,
    notes: 'Terrasse à l’ombre + salle climatisée.',
    status: 'approved',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    name: 'Hardware Société',
    type: 'cafe',
    address: '10 rue Lamarck, 75018 Paris',
    arrondissement: 18,
    lat: 48.8871,
    lng: 2.3436,
    notes: 'Brunch + clim qui tient la route.',
    status: 'approved',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    name: 'Septime La Cave',
    type: 'bar',
    address: '3 rue Basfroi, 75011 Paris',
    arrondissement: 11,
    lat: 48.8537,
    lng: 2.3805,
    notes: 'Cave fraîche, ambiance apaisante.',
    status: 'approved',
    created_at: new Date().toISOString(),
  },
]

export function HomePage() {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [type, setType] = useState<PlaceType | 'all'>('all')
  const [arrondissement, setArrondissement] = useState<number | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        if (!isSupabaseConfigured) {
          if (!cancelled) setPlaces(FALLBACK_PLACES)
          return
        }
        const data = await fetchApprovedPlaces()
        if (!cancelled) setPlaces(data.length > 0 ? data : FALLBACK_PLACES)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Impossible de charger les lieux.')
          setPlaces(FALLBACK_PLACES)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    return places.filter((p) => {
      if (type !== 'all' && p.type !== type) return false
      if (arrondissement !== 'all' && p.arrondissement !== arrondissement) return false
      return true
    })
  }, [places, type, arrondissement])

  function handleSelect(place: Place) {
    setSelectedId(place.id)
  }

  return (
    <>
      <Hero />
      <section id="explorer" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20">
        <FadeContent>
          <h2 className="font-display text-3xl italic text-ink sm:text-4xl">Explorer</h2>
          <p className="mt-2 max-w-lg text-ink-soft">
            Filtre par type ou arrondissement, puis clique un spot pour le retrouver sur la carte.
          </p>
        </FadeContent>

        <div className="mt-8">
          <Filters
            type={type}
            arrondissement={arrondissement}
            onTypeChange={setType}
            onArrondissementChange={setArrondissement}
            count={filtered.length}
          />
        </div>

        {error ? (
          <p className="mt-4 text-sm text-rose-deep">
            {error} — affichage des spots de démo.
          </p>
        ) : null}

        {!isSupabaseConfigured && !loading ? (
          <p className="mt-4 text-sm text-ink-soft">
            Mode démo : configure Supabase (`.env`) pour charger tes vrais spots.
          </p>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="flex max-h-[480px] flex-col gap-2 overflow-y-auto pr-1">
            {loading ? (
              <p className="text-sm text-ink-soft">Chargement…</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-ink-soft">Aucun spot pour ces filtres.</p>
            ) : (
              filtered.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  selected={place.id === selectedId}
                  onSelect={handleSelect}
                />
              ))
            )}
          </div>
          <PlaceMap places={filtered} selectedId={selectedId} onSelect={handleSelect} />
        </div>
      </section>
    </>
  )
}
