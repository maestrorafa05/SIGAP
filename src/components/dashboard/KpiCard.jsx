export default function KpiCard({ title, value, subtitle, icon: Icon, tone = "green" }) {
  const tones = {
    green: "bg-forest-50 text-forest-700",
    gold: "bg-harvest-100 text-harvest-600",
    blue: "bg-climate-100 text-climate-700",
    slate: "bg-slate-100 text-slate-700",
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 break-words text-2xl font-bold text-slate-950">{value}</p>
        </div>
        {Icon && (
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>
      {subtitle && <p className="mt-3 text-sm leading-5 text-slate-500">{subtitle}</p>}
    </article>
  )
}
