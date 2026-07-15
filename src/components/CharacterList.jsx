import CharacterCard from './CharacterCard'

export default function CharacterList({ characters }) {
  if (characters.length === 0) {
    return <p className="empty-state">No characters match your search and filters.</p>
  }

  return (
    <div className="character-grid">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}
