import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-rose-soft/40 bg-frost/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-2xl tracking-tight text-ink italic">
          paris clim
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium text-muted">
          <Link
            to="/"
            className={`rounded-full px-3 py-1.5 transition-colors ${
              pathname === '/' ? 'bg-rose-soft/50 text-ink' : 'hover:text-ink'
            }`}
          >
            Explorer
          </Link>
          <Link
            to="/suggest"
            className={`rounded-full px-3 py-1.5 transition-colors ${
              pathname === '/suggest' ? 'bg-rose-soft/50 text-ink' : 'hover:text-ink'
            }`}
          >
            Ajouter
          </Link>
        </nav>
      </div>
    </header>
  )
}
