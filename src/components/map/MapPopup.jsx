import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { calculateProductivity, slugifyProvince } from "../../utils/calculations"
import { formatDecimal, formatNumber } from "../../utils/formatter"

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-1.5 last:border-b-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-right text-xs font-semibold text-slate-800">{value}</span>
    </div>
  )
}

export default function MapPopup({ item }) {
  const productivity = calculateProductivity(item.production, item.harvestArea)

  return (
    <div className="p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
          {item.year}
        </p>
        <h3 className="text-base font-bold text-slate-950">{item.province}</h3>
        <p className="text-xs text-slate-500">{item.capitalCity}</p>
      </div>

      <div className="mt-3">
        <Row label="Produksi" value={`${formatNumber(item.production)} ton`} />
        <Row label="Luas Panen" value={`${formatNumber(item.harvestArea)} ha`} />
        <Row label="Produktivitas" value={`${formatDecimal(productivity, 2)} ton/ha`} />
        <Row label="Curah Hujan" value={`${formatDecimal(item.rainfall, 1)} mm`} />
        <Row label="Kelembapan" value={`${formatDecimal(item.humidity, 1)}%`} />
        <Row label="Suhu Rata-rata" value={`${formatDecimal(item.avgTemperature, 2)} C`} />
      </div>

      <Link
        to={`/province/${slugifyProvince(item.province)}`}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-forest-900"
      >
        Lihat Detail
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  )
}
