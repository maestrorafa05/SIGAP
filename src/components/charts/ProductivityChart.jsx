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
    <section className="rounded-[18px] border border-apple-hairline bg-white p-6">
      <div className="mb-4">
        <p className="text-[14px] font-normal leading-[1.43] text-apple-muted">
          Produktivitas
        </p>
        <h2 className="apple-display text-[28px] font-semibold leading-[1.14] text-apple-ink">
          Tren Produktivitas
        </h2>
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
