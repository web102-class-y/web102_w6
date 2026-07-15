import { Link, useParams } from 'react-router-dom'
import { useCharacters, episodeIdFromUrl } from '../context/CharactersContext'
import { colorForStatus } from '../utils/chartColors'

export default function CharacterDetail() {
  const { id } = useParams()
  const { characters, episodesById, loading, error } = useCharacters()

  if (loading) return <p className="status-message">Loading character…</p>
  if (error) return <p className="status-message error">Failed to load data: {error}</p>

  const character = characters.find((c) => String(c.id) === id)

  if (!character) {
    return (
      <div className="character-detail">
        <p className="status-message">We couldn't find a character with id "{id}".</p>
        <Link to="/" className="back-link">
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  const episodes = character.episode
    .map((url) => episodesById[episodeIdFromUrl(url)])
    .filter(Boolean)

  const firstEpisode = episodes[0]
  const lastEpisode = episodes[episodes.length - 1]

  return (
    <div className="character-detail">
      <Link to="/" className="back-link">
        ← Back to dashboard
      </Link>

      <div className="character-detail-header">
        <img src={character.image} alt={character.name} className="character-detail-image" />
        <div>
          <h1>{character.name}</h1>
          <p className="character-detail-status">
            <span
              className="status-dot"
              style={{ backgroundColor: colorForStatus(character.status) }}
            />
            {character.status} · {character.species}
            {character.type ? ` (${character.type})` : ''}
          </p>
        </div>
      </div>

      <div className="character-detail-grid">
        <div className="detail-field">
          <span className="detail-label">Gender</span>
          <span>{character.gender}</span>
        </div>
        <div className="detail-field">
          <span className="detail-label">Origin</span>
          <span>{character.origin?.name || 'Unknown'}</span>
        </div>
        <div className="detail-field">
          <span className="detail-label">Last known location</span>
          <span>{character.location?.name || 'Unknown'}</span>
        </div>
        <div className="detail-field">
          <span className="detail-label">Episode count</span>
          <span>{character.episode.length}</span>
        </div>
        <div className="detail-field">
          <span className="detail-label">First appearance</span>
          <span>
            {firstEpisode ? `${firstEpisode.episode} — ${firstEpisode.name}` : 'Unknown'}
          </span>
        </div>
        <div className="detail-field">
          <span className="detail-label">Last appearance</span>
          <span>{lastEpisode ? `${lastEpisode.episode} — ${lastEpisode.name}` : 'Unknown'}</span>
        </div>
        <div className="detail-field">
          <span className="detail-label">Added to database</span>
          <span>{new Date(character.created).toLocaleDateString('en-US')}</span>
        </div>
      </div>

      {episodes.length > 0 && (
        <div className="episode-list">
          <h2>Episode appearances ({episodes.length})</h2>
          <div className="episode-chips">
            {episodes.map((ep) => (
              <span key={ep.id} className="episode-chip" title={ep.air_date}>
                {ep.episode} · {ep.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
