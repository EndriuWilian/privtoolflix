import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Pesquisa from './pages/Pesquisa'
import Principal from './pages/Principal'
import EmAlta from './pages/EmAlta'
import Favoritos from './pages/Favoritos'
import Informacoes from './pages/Informacoes'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-y-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 font-sans">
        <div className="fixed top-0 left-0 h-full z-40 w-16 flex-shrink-0 bg-gray-100 dark:bg-gray-800">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-visible p-3 ml-16 bg-primary dark:bg-primary-dark transition-all duration-500">
          <Routes>
            <Route path="/" element={<Navigate to="/principal" replace />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
            <Route path="/emalta" element={<EmAlta />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/informacoes" element={<Informacoes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
