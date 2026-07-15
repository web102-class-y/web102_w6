import { createContext, useContext, useEffect, useState } from 'react'

const CharactersContext = createContext(null)

function episodeIdFromUrl(url) {
  return Number(url.split('/').pop())
}

async function fetchAllPages(baseUrl) {
  const first = await fetch(baseUrl).then((res) => {
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    return res.json()
  })

  const pages = [first.results]
  const requests = []
  for (let page = 2; page <= first.info.pages; page += 1) {
    requests.push(fetch(`${baseUrl}?page=${page}`).then((res) => res.json()))
  }
  const rest = await Promise.all(requests)
  rest.forEach((r) => pages.push(r.results))

  return pages.flat()
}

export function CharactersProvider({ children }) {
  const [characters, setCharacters] = useState([])
  const [episodesById, setEpisodesById] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([
      fetchAllPages('https://rickandmortyapi.com/api/character'),
      fetchAllPages('https://rickandmortyapi.com/api/episode'),
    ])
      .then(([characterList, episodeList]) => {
        if (cancelled) return
        const byId = {}
        episodeList.forEach((ep) => {
          byId[ep.id] = ep
        })
        setCharacters(characterList)
        setEpisodesById(byId)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <CharactersContext.Provider value={{ characters, episodesById, loading, error }}>
      {children}
    </CharactersContext.Provider>
  )
}

export function useCharacters() {
  const ctx = useContext(CharactersContext)
  if (!ctx) throw new Error('useCharacters must be used within a CharactersProvider')
  return ctx
}

export { episodeIdFromUrl }
