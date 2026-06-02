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
    <section className="rounded-[18px] border border-apple-hairline bg-white p-6">
      <div className="mb-4">
        <p className="text-[14px] font-normal leading-[1.43] text-apple-muted">
          Luas Panen
        </p>
        <h2 className="apple-display text-[28px] font-semibold leading-[1.14] text-apple-ink">
          Tren Luas Panen
        </h2>
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
              fill="#f5f5f7"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
