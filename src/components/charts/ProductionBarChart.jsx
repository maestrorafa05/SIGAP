import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CHART_COLORS } from "../../data/constants"
import { formatCompactNumber, formatNumber } from "../../utils/formatter"
import ChartEmptyState from "./ChartEmptyState"

export default function ProductionBarChart({ data, selectedYear }) {
  if (!data.length) return <ChartEmptyState />

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
          Produksi
        </p>
        <h2 className="text-xl font-bold text-slate-950">
          Produksi Padi per Provinsi {selectedYear}
        </h2>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis
              dataKey="province"
              angle={-32}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
            />
            <YAxis
              tickFormatter={formatCompactNumber}
              tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${formatNumber(value)} ton`, "Produksi"]}
              labelStyle={{ fontWeight: 700 }}
            />
            <Bar dataKey="production" fill={CHART_COLORS.production} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
