import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '@/components/Header'
import { HomePage } from '@/pages/HomePage'
import { SuggestPage } from '@/pages/SuggestPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/suggest" element={<SuggestPage />} />
          </Routes>
        </main>
        <footer className="border-t border-rose-soft/30 py-6 text-center text-sm text-muted">
          paris clim — idée avec Evel · spots frais à Paris
        </footer>
      </div>
    </BrowserRouter>
  )
}
