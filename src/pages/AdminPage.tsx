import { useCallback, useEffect, useState, type FormEvent } from 'react'
import type { Place } from '@/types/place'
import { PLACE_TYPE_LABELS } from '@/types/place'
import {
  approvePlace,
  clearAdminSecret,
  getStoredAdminSecret,
  listPendingPlaces,
  rejectPlace,
  storeAdminSecret,
} from '@/lib/admin'

export function AdminPage() {
  const [secret, setSecret] = useState<string | null>(() => getStoredAdminSecret())
  const [password, setPassword] = useState('')
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async (token: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await listPendingPlaces(token)
      setPlaces(data)
    } catch (err) {
      setPlaces([])
      setError(err instanceof Error ? err.message : 'Connexion impossible')
      if (err instanceof Error && /unauthorized/i.test(err.message)) {
        clearAdminSecret()
        setSecret(null)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (secret) void load(secret)
  }, [secret, load])

  async function onLogin(e: FormEvent) {
    e.preventDefault()
    const token = password.trim()
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      await listPendingPlaces(token)
      storeAdminSecret(token)
      setSecret(token)
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  async function onApprove(id: string) {
    if (!secret) return
    setBusyId(id)
    setError(null)
    try {
      await approvePlace(secret, id)
      setPlaces((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la validation')
    } finally {
      setBusyId(null)
    }
  }

  async function onReject(id: string) {
    if (!secret) return
    setBusyId(id)
    setError(null)
    try {
      await rejectPlace(secret, id)
      setPlaces((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec du refus')
    } finally {
      setBusyId(null)
    }
  }

  function onLogout() {
    clearAdminSecret()
    setSecret(null)
    setPlaces([])
  }

  if (!secret) {
    return (
      <section className="mx-auto max-w-sm px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl italic text-ink">Modération</h1>
        <p className="mt-2 text-ink-soft">Espace réservé — entre le code d’accès pour valider les spots.</p>
        <form onSubmit={onLogin} className="mt-8 space-y-4 rounded-3xl bg-white/70 p-6 ring-1 ring-rose-soft/50">
          <div>
            <label htmlFor="admin-pass" className="mb-1.5 block text-sm font-medium text-ink">
              Code d’accès
            </label>
            <input
              id="admin-pass"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-0 bg-frost px-4 py-2.5 text-ink ring-1 ring-rose-mid/40 outline-none focus:ring-rose-mid"
            />
          </div>
          {error ? <p className="text-sm text-rose-deep">{error}</p> : null}
          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-frost disabled:opacity-60"
          >
            {loading ? 'Vérification…' : 'Entrer'}
          </button>
        </form>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl italic text-ink">À valider</h1>
          <p className="mt-2 text-ink-soft">
            {places.length} suggestion{places.length !== 1 ? 's' : ''} en attente
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load(secret)}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-rose-mid/40"
          >
            Rafraîchir
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            Quitter
          </button>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-deep">{error}</p> : null}

      <div className="mt-8 space-y-3">
        {loading && places.length === 0 ? (
          <p className="text-sm text-ink-soft">Chargement…</p>
        ) : places.length === 0 ? (
          <p className="rounded-3xl bg-white/60 px-6 py-10 text-center text-ink-soft ring-1 ring-rose-soft/40">
            Rien à valider pour le moment.
          </p>
        ) : (
          places.map((place) => (
            <article
              key={place.id}
              className="rounded-3xl bg-white/75 px-5 py-4 ring-1 ring-rose-soft/45"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-medium text-ink">{place.name}</h2>
                  <p className="mt-0.5 text-sm text-ink-soft">{place.address}</p>
                  {place.notes ? (
                    <p className="mt-2 text-sm text-ink-soft">{place.notes}</p>
                  ) : null}
                  <p className="mt-2 text-xs font-medium text-rose-deep">
                    {PLACE_TYPE_LABELS[place.type]}
                    {place.arrondissement ? ` · ${place.arrondissement}e` : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busyId === place.id}
                    onClick={() => void onApprove(place.id)}
                    className="rounded-full bg-rose-mid px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                  >
                    Approuver
                  </button>
                  <button
                    type="button"
                    disabled={busyId === place.id}
                    onClick={() => void onReject(place.id)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-rose-mid/40 disabled:opacity-60"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
