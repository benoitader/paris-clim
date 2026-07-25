import { Link } from 'react-router-dom'
import Aurora from '@/components/Aurora'
import BlurText from '@/components/BlurText'
import FadeContent from '@/components/FadeContent'

export function Hero() {
  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-80">
        <Aurora
          colorStops={['#F2C4D0', '#DDEAF2', '#E89AAD']}
          blend={0.55}
          amplitude={0.85}
          speed={0.45}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-frost/20 via-transparent to-blush/90" />

      <div className="mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20">
        <p className="mb-4 font-display text-lg italic text-rose-deep/90 sm:text-xl">
          paris clim
        </p>
        <BlurText
          text="Les spots frais de Paris"
          className="max-w-xl font-display text-5xl leading-[1.05] font-medium tracking-tight text-ink sm:text-6xl md:text-7xl"
          delay={80}
          animateBy="words"
        />
        <FadeContent delay={400} className="mt-5 max-w-md">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            Cafés, restos et refuges climatisés — une carte aérée pour tenir le coup quand la ville
            chauffe.
          </p>
        </FadeContent>
        <FadeContent delay={650} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#explorer"
            className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-frost transition hover:bg-ink/90"
          >
            Explorer
          </a>
          <Link
            to="/suggest"
            className="inline-flex items-center rounded-full border border-rose-mid/50 bg-white/50 px-5 py-2.5 text-sm font-medium text-ink backdrop-blur-sm transition hover:bg-white/80"
          >
            Ajouter un spot
          </Link>
        </FadeContent>
      </div>
    </section>
  )
}
