export function filterAndSortCharacters(characters, { search, status, sortBy }) {
  const query = search.trim().toLowerCase()

  const filtered = characters.filter((c) => {
    const matchesSearch = !query || c.name.toLowerCase().includes(query)
    const matchesStatus = status === 'All' || c.status === status
    return matchesSearch && matchesStatus
  })

  const [field, direction] = sortBy.split('-')
  const sorted = [...filtered].sort((a, b) => {
    let result = 0
    if (field === 'name') {
      result = a.name.localeCompare(b.name)
    } else if (field === 'id') {
      result = a.id - b.id
    } else if (field === 'episodes') {
      result = a.episode.length - b.episode.length
    }
    return direction === 'desc' ? -result : result
  })

  return sorted
}

export function formatNumber(num) {
  if (num == null) return 'N/A'
  return num.toLocaleString('en-US')
}
