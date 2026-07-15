import { Route, Routes } from 'react-router-dom'
import { CharactersProvider } from './context/CharactersContext'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import CharacterDetail from './pages/CharacterDetail'

function App() {
  return (
    <CharactersProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="character/:id" element={<CharacterDetail />} />
        </Route>
      </Routes>
    </CharactersProvider>
  )
}

export default App
