import { AlertCircle } from "lucide-react"

export default function ChartEmptyState({ title = "Data grafik tidak tersedia" }) {
  return (
    <div className="flex h-72 items-center justify-center rounded-[18px] border border-dashed border-apple-hairline bg-apple-parchment text-center">
      <div>
        <AlertCircle className="mx-auto h-8 w-8 text-apple-muted" aria-hidden="true" />
        <p className="mt-2 font-semibold text-apple-ink">{title}</p>
      </div>
    </div>
  )
}
