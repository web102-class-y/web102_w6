import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { colorForStatus, INK_SECONDARY } from '../../utils/chartColors'
import StatusLegend from './StatusLegend'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-value">{point.value} characters</p>
      <p className="chart-tooltip-label">{point.name}</p>
    </div>
  )
}

function renderOutsideLabel({ cx, cy, midAngle, outerRadius, name, percent }) {
  const RADIAN = Math.PI / 180
  const radius = outerRadius + 18
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill={INK_SECONDARY}
      fontSize={12}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function StatusPieChart({ characters }) {
  const counts = characters.reduce((acc, c) => {
    const status = c.status || 'unknown'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  if (data.length === 0) {
    return <p className="empty-state">No data to chart yet.</p>
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={330}>
        <PieChart margin={{ top: 16, right: 48, bottom: 16, left: 48 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
            label={renderOutsideLabel}
            labelLine={{ stroke: INK_SECONDARY, strokeWidth: 1 }}
            stroke="#fcfcfb"
            strokeWidth={2}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={colorForStatus(entry.name)} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <StatusLegend statuses={data.map((d) => d.name)} />
    </div>
  )
}
