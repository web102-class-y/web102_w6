import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { GRIDLINE, INK_PRIMARY, INK_SECONDARY, SEQUENTIAL_BLUE } from '../../utils/chartColors'
import { formatNumber } from '../../utils/characterUtils'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-value">{formatNumber(point.count)} characters</p>
      <p className="chart-tooltip-label">{point.name}</p>
    </div>
  )
}

export default function SpeciesBarChart({ characters }) {
  const counts = characters.reduce((acc, c) => {
    const species = c.species || 'Unknown'
    acc[species] = (acc[species] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .reverse()

  if (data.length === 0) {
    return <p className="empty-state">No data to chart yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
        <CartesianGrid horizontal={false} stroke={GRIDLINE} />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fill: INK_SECONDARY, fontSize: 12 }}
          axisLine={{ stroke: GRIDLINE }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={90}
          tick={{ fill: INK_PRIMARY, fontSize: 12 }}
          axisLine={{ stroke: GRIDLINE }}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(11,11,11,0.04)' }} />
        <Bar dataKey="count" fill={SEQUENTIAL_BLUE} barSize={18} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
