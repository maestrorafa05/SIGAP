import { getMetricConfig, getMetricValue } from "../../utils/mapUtils"
import { formatMetric } from "../../utils/formatter"

export default function MapLegend({ metric, data }) {
  const config = getMetricConfig(metric)
  const values = data.map((item) => getMetricValue(item, metric)).filter(Number.isFinite)
  const min = values.length ? Math.min(...values) : 0
  const max = values.length ? Math.max(...values) : 0

  return (
    <div className="absolute bottom-4 left-4 z-[400] w-56 rounded-lg border border-white/70 bg-white/95 p-3 shadow-panel backdrop-blur">
      <div className="flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: config.color }}
        />
        <p className="text-sm font-bold text-slate-900">{config.label}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
        <span>{formatMetric(min, metric, config.unit)}</span>
        <span>{formatMetric(max, metric, config.unit)}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-gradient-to-r from-climate-500 via-harvest-400 to-forest-700" />
    </div>
  )
}
