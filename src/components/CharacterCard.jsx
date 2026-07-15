import { Link } from 'react-router-dom'
import { colorForStatus } from '../utils/chartColors'

export default function CharacterCard({ character }) {
  return (
    <Link to={`/character/${character.id}`} className="character-card">
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="character-card-body">
        <h3>{character.name}</h3>
        <p className="character-status">
          <span
            className="status-dot"
            style={{ backgroundColor: colorForStatus(character.status) }}
          />
          {character.status} · {character.species}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Last known location:</strong> {character.location?.name || 'Unknown'}
        </p>
      </div>
    </Link>
  )
}
