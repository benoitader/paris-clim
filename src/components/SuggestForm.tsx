import { useState, type FormEvent } from 'react'
import type { PlaceType } from '@/types/place'
import { PLACE_TYPE_LABELS } from '@/types/place'
import { suggestPlace } from '@/lib/supabase'

const TYPES: PlaceType[] = ['cafe', 'restaurant', 'bar', 'other']

export function SuggestForm() {
  const [name, setName] = useState('')
  const [type, setType] = useState<PlaceType>('cafe')
  const [address, setAddress] = useState('')
  const [arrondissement, setArrondissement] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    try {
      await suggestPlace({
        name: name.trim(),
        type,
        address: address.trim(),
        arrondissement: arrondissement ? Number(arrondissement) : null,
        notes: notes.trim() || null,
      })
      setStatus('success')
      setName('')
      setAddress('')
      setArrondissement('')
      setNotes('')
      setType('cafe')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-white/60 px-6 py-10 text-center ring-1 ring-rose-soft/40">
        <p className="font-display text-3xl italic text-ink">Merci !</p>
        <p className="mt-2 text-ink-soft">
          Ta suggestion est en attente de validation. Elle apparaîtra dès qu’elle sera approuvée.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-frost"
        >
          Ajouter un autre spot
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl bg-white/55 p-6 ring-1 ring-rose-soft/40 sm:p-8"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Nom du lieu
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border-0 bg-frost/80 px-4 py-2.5 text-ink ring-1 ring-rose-soft/50 outline-none focus:ring-rose-mid"
          placeholder="Café des Glaces"
        />
      </div>

      <div>
        <label htmlFor="type" className="mb-1.5 block text-sm font-medium text-ink">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as PlaceType)}
          className="w-full rounded-2xl border-0 bg-frost/80 px-4 py-2.5 text-ink ring-1 ring-rose-soft/50 outline-none focus:ring-rose-mid"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {PLACE_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-ink">
          Adresse
        </label>
        <input
          id="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-2xl border-0 bg-frost/80 px-4 py-2.5 text-ink ring-1 ring-rose-soft/50 outline-none focus:ring-rose-mid"
          placeholder="12 rue de Rivoli, Paris"
        />
      </div>

      <div>
        <label htmlFor="arr" className="mb-1.5 block text-sm font-medium text-ink">
          Arrondissement
        </label>
        <select
          id="arr"
          value={arrondissement}
          onChange={(e) => setArrondissement(e.target.value)}
          className="w-full rounded-2xl border-0 bg-frost/80 px-4 py-2.5 text-ink ring-1 ring-rose-soft/50 outline-none focus:ring-rose-mid"
        >
          <option value="">Non précisé</option>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
              {n === 1 ? 'er' : 'e'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-ink">
          Notes (optionnel)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full resize-none rounded-2xl border-0 bg-frost/80 px-4 py-2.5 text-ink ring-1 ring-rose-soft/50 outline-none focus:ring-rose-mid"
          placeholder="Clim bien froide, prises électriques, calme l’après-midi…"
        />
      </div>

      {error ? <p className="text-sm text-rose-deep">{error}</p> : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-frost transition hover:bg-ink/90 disabled:opacity-60"
      >
        {status === 'loading' ? 'Envoi…' : 'Envoyer la suggestion'}
      </button>
    </form>
  )
}
