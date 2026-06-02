import { METRIC_OPTIONS } from "../../data/constants"

export default function MetricFilter({ selectedMetric, onChange }) {
  return (
    <div className="rounded-[18px] border border-apple-hairline bg-white p-6">
      <p className="text-[17px] font-semibold text-apple-ink">Metrik Peta</p>
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
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2 text-[14px] font-normal transition",
                active
                  ? "border-apple-blue bg-apple-blue text-white"
                  : "border-black/10 bg-white text-apple-ink hover:border-apple-blue hover:text-apple-blue",
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
