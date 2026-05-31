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
import { formatCompactNumber, formatNumber } from "../../utils/formatter"
import ChartEmptyState from "./ChartEmptyState"

export default function ProductionTrendChart({ data, province }) {
  if (!data.length) return <ChartEmptyState />

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
          Tren Historis
        </p>
        <h2 className="text-xl font-bold text-slate-950">
          Produksi {province || "Provinsi"} 1993-2020
        </h2>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis dataKey="year" tick={{ fill: CHART_COLORS.axis, fontSize: 12 }} />
            <YAxis
              tickFormatter={formatCompactNumber}
              tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${formatNumber(value)} ton`, "Produksi"]}
              labelStyle={{ fontWeight: 700 }}
            />
            <Line
              type="monotone"
              dataKey="production"
              stroke={CHART_COLORS.production}
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
