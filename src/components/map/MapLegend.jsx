import { getMetricConfig, getMetricValue } from "../../utils/mapUtils"
import { formatMetric } from "../../utils/formatter"

export default function MapLegend({ metric, data, className = "bottom-4 left-4" }) {
  const config = getMetricConfig(metric)
  const values = data.map((item) => getMetricValue(item, metric)).filter(Number.isFinite)
  const min = values.length ? Math.min(...values) : 0
  const max = values.length ? Math.max(...values) : 0

  return (
    <div className={`absolute z-30 w-56 rounded-[18px] border border-white/70 bg-white/90 p-4 backdrop-blur-xl ${className}`}>
      <div className="flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: config.color }}
        />
        <p className="text-[14px] font-semibold text-apple-ink">{config.label}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-[12px] text-apple-muted">
        <span>{formatMetric(min, metric, config.unit)}</span>
        <span>{formatMetric(max, metric, config.unit)}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-apple-pearl">
        <div className="h-1.5 w-full rounded-full bg-apple-blue" />
      </div>
    </div>
  )
}
