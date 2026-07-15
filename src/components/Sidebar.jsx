import { NavLink } from 'react-router-dom'

export default function Sidebar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  statuses,
  sortBy,
  onSortByChange,
}) {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-title">
        🛸 Rick & Morty Explorer
      </NavLink>
      <p className="sidebar-subtitle">Explore characters across the multiverse</p>

      <div className="sidebar-section">
        <label htmlFor="search">Search by name</label>
        <input
          id="search"
          type="text"
          placeholder="e.g. Rick"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="sidebar-section">
        <label htmlFor="status">Filter by status</label>
        <select id="status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="sidebar-section">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="id-asc">ID (Low–High)</option>
          <option value="id-desc">ID (High–Low)</option>
          <option value="episodes-desc">Episode count (High–Low)</option>
          <option value="episodes-asc">Episode count (Low–High)</option>
        </select>
      </div>

      <div className="sidebar-footer">
        <p>Data source: Rick and Morty API</p>
      </div>
    </aside>
  )
}
