import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useCharacters } from '../context/CharactersContext'
import { filterAndSortCharacters } from '../utils/characterUtils'
import CharacterList from '../components/CharacterList'
import SpeciesBarChart from '../components/charts/SpeciesBarChart'
import StatusPieChart from '../components/charts/StatusPieChart'

const CHART_VIEWS = [
  { id: 'both', label: 'Both charts' },
  { id: 'species', label: 'Species' },
  { id: 'status', label: 'Status' },
]

export default function Dashboard() {
  const { characters, loading, error } = useCharacters()
  const { search, status, sortBy } = useOutletContext()
  const [chartView, setChartView] = useState('both')

  const filtered = useMemo(
    () => filterAndSortCharacters(characters, { search, status, sortBy }),
    [characters, search, status, sortBy],
  )

  if (loading) return <p className="status-message">Loading characters…</p>
  if (error) return <p className="status-message error">Failed to load data: {error}</p>

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Rick & Morty Character Dashboard</h1>
        <p>
          Browse {characters.length} characters fetched live from the Rick and Morty API.
          Search, filter by status, and sort using the sidebar — the charts and list below
          update together.
        </p>
      </header>

      <section className="charts-section">
        <div className="charts-section-header">
          <h2>At a glance</h2>
          <div className="chart-toggle" role="group" aria-label="Choose which charts to display">
            {CHART_VIEWS.map((view) => (
              <button
                key={view.id}
                className={chartView === view.id ? 'active' : ''}
                onClick={() => setChartView(view.id)}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`charts-grid charts-grid--${chartView}`}>
          {(chartView === 'both' || chartView === 'species') && (
            <div className="chart-card">
              <h3>Top 10 most common species</h3>
              <p className="chart-caption">
                Bar length shows how many currently filtered characters belong to each species.
              </p>
              <SpeciesBarChart characters={filtered} />
            </div>
          )}
          {(chartView === 'both' || chartView === 'status') && (
            <div className="chart-card">
              <h3>Characters by status</h3>
              <p className="chart-caption">
                Share of the currently filtered characters who are alive, dead, or unknown.
              </p>
              <StatusPieChart characters={filtered} />
            </div>
          )}
        </div>
      </section>

      <section className="list-section">
        <div className="list-section-header">
          <h2>Characters</h2>
          <span className="result-count">
            {filtered.length} result{filtered.length === 1 ? '' : 's'}
          </span>
        </div>
        <CharacterList characters={filtered} />
      </section>
    </div>
  )
}
