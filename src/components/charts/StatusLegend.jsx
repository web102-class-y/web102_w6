import { colorForStatus } from '../../utils/chartColors'

export default function StatusLegend({ statuses }) {
  return (
    <ul className="chart-legend">
      {statuses.map((status) => (
        <li key={status}>
          <span className="legend-swatch" style={{ backgroundColor: colorForStatus(status) }} />
          {status}
        </li>
      ))}
    </ul>
  )
}
