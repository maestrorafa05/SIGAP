import {
  CartesianGrid,
  Legend,
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

export default function ClimateTrendChart({
  data,
  title = "Agro-Klimatologi",
  subtitle = "Curah hujan, kelembapan, dan suhu",
  xKey = "year",
}) {
  if (!data.length) return <ChartEmptyState />

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-climate-700">
          {subtitle}
        </p>
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis
              dataKey={xKey}
              interval={0}
              angle={xKey === "province" ? -25 : 0}
              textAnchor={xKey === "province" ? "end" : "middle"}
              height={xKey === "province" ? 58 : 30}
              tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
            />
            <YAxis tick={{ fill: CHART_COLORS.axis, fontSize: 12 }} />
            <Tooltip
              formatter={(value, name, payload) => {
                const key = payload?.dataKey ?? name
                const labels = {
                  rainfall: "Curah Hujan",
                  humidity: "Kelembapan",
                  avgTemperature: "Suhu Rata-rata",
                }
                const units = {
                  rainfall: "mm",
                  humidity: "%",
                  avgTemperature: "C",
                }
                return [
                  `${formatDecimal(value, 2)} ${units[key] ?? ""}`.trim(),
                  labels[key] ?? name,
                ]
              }}
              labelStyle={{ fontWeight: 700 }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="rainfall"
              name="Curah Hujan"
              stroke={CHART_COLORS.rainfall}
              strokeWidth={3}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              name="Kelembapan"
              stroke={CHART_COLORS.humidity}
              strokeWidth={3}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="avgTemperature"
              name="Suhu"
              stroke={CHART_COLORS.avgTemperature}
              strokeWidth={3}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
