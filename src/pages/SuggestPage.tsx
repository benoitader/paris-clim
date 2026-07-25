import { Link } from 'react-router-dom'
import { SuggestForm } from '@/components/SuggestForm'
import FadeContent from '@/components/FadeContent'

export function SuggestPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-20">
      <FadeContent>
        <Link to="/" className="text-sm text-muted transition hover:text-ink">
          ← Retour
        </Link>
        <h1 className="mt-4 font-display text-4xl italic text-ink sm:text-5xl">Ajouter un spot</h1>
        <p className="mt-3 text-muted">
          Tu as trouvé un café, resto ou refuge avec la clim ? Propose-le — on le validera avant de
          l’afficher sur la carte.
        </p>
      </FadeContent>
      <div className="mt-8">
        <SuggestForm />
      </div>
    </section>
  )
}
