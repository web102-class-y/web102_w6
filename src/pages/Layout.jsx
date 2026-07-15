import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const STATUSES = ['All', 'Alive', 'Dead', 'unknown']

export default function Layout() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [sortBy, setSortBy] = useState('name-asc')

  return (
    <div className="app-shell">
      <Sidebar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        statuses={STATUSES}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
      <main className="main-content">
        <Outlet context={{ search, status, sortBy }} />
      </main>
    </div>
  )
}
