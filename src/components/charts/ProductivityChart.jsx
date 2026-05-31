import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CHART_COLORS } from "../../data/constants"
import { formatDecimal } from "../../utils/formatter"
import ChartEmptyState from "./ChartEmptyState"

export default function ProductivityChart({ data }) {
  if (!data.length) return <ChartEmptyState />

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
          Produktivitas
        </p>
        <h2 className="text-xl font-bold text-slate-950">Tren Produktivitas</h2>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis dataKey="year" tick={{ fill: CHART_COLORS.axis, fontSize: 12 }} />
            <YAxis
              tickFormatter={(value) => formatDecimal(value, 1)}
              tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${formatDecimal(value, 2)} ton/ha`, "Produktivitas"]}
              labelStyle={{ fontWeight: 700 }}
            />
            <Line
              type="monotone"
              dataKey="productivity"
              stroke={CHART_COLORS.productivity}
              strokeWidth={3}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
