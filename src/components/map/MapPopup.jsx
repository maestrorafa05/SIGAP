import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { calculateProductivity, slugifyProvince } from "../../utils/calculations"
import { formatDecimal, formatNumber } from "../../utils/formatter"

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-apple-hairline py-1.5 last:border-b-0">
      <span className="text-[12px] text-apple-muted">{label}</span>
      <span className="text-right text-[12px] font-semibold text-apple-ink">{value}</span>
    </div>
  )
}

export default function MapPopup({ item }) {
  const productivity = calculateProductivity(item.production, item.harvestArea)

  return (
    <div className="p-4">
      <div>
        <p className="text-[12px] font-normal leading-none text-apple-blue">
          {item.year}
        </p>
        <h3 className="apple-display mt-1 text-[21px] font-semibold leading-[1.19] text-apple-ink">
          {item.province}
        </h3>
        <p className="text-[12px] text-apple-muted">{item.capitalCity}</p>
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
        className="apple-pill mt-4 inline-flex w-full items-center justify-center gap-2 bg-apple-blue px-[22px] py-[11px] text-[14px] leading-none text-white transition hover:bg-apple-blueFocus"
      >
        Lihat Detail
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  )
}
