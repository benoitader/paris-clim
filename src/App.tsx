import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '@/components/Header'
import { HomePage } from '@/pages/HomePage'
import { SuggestPage } from '@/pages/SuggestPage'
import { AdminPage } from '@/pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/suggest" element={<SuggestPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <footer className="border-t border-rose-soft/40 py-6 text-center text-sm text-ink-soft">
          paris clim — spots climatisés à Paris
        </footer>
      </div>
    </BrowserRouter>
  )
}
