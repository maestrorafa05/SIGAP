import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CHART_COLORS } from "../../data/constants"
import { formatCompactNumber, formatNumber } from "../../utils/formatter"
import ChartEmptyState from "./ChartEmptyState"

export default function HarvestAreaChart({ data }) {
  if (!data.length) return <ChartEmptyState />

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-harvest-600">
          Luas Panen
        </p>
        <h2 className="text-xl font-bold text-slate-950">Tren Luas Panen</h2>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis dataKey="year" tick={{ fill: CHART_COLORS.axis, fontSize: 12 }} />
            <YAxis
              tickFormatter={formatCompactNumber}
              tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${formatNumber(value)} ha`, "Luas Panen"]}
              labelStyle={{ fontWeight: 700 }}
            />
            <Area
              type="monotone"
              dataKey="harvestArea"
              stroke={CHART_COLORS.harvestArea}
              fill="#fff2bf"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
