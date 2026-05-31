import { METRIC_OPTIONS } from "../../data/constants"

export default function MetricFilter({ selectedMetric, onChange }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <p className="text-sm font-semibold text-slate-700">Metrik Peta</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {METRIC_OPTIONS.map((metric) => {
          const Icon = metric.icon
          const active = selectedMetric === metric.key

          return (
            <button
              key={metric.key}
              type="button"
              onClick={() => onChange(metric.key)}
              className={[
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition",
                active
                  ? "border-forest-700 bg-forest-700 text-white shadow-panel"
                  : "border-slate-200 bg-white text-slate-600 hover:border-forest-200 hover:bg-forest-50",
              ].join(" ")}
              title={metric.label}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{metric.shortLabel}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
