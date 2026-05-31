import { AlertCircle } from "lucide-react"

export default function ChartEmptyState({ title = "Data grafik tidak tersedia" }) {
  return (
    <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center">
      <div>
        <AlertCircle className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
        <p className="mt-2 font-semibold text-slate-700">{title}</p>
      </div>
    </div>
  )
}
