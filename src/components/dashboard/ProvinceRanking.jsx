import { Link } from "react-router-dom"
import { Award, BarChart3 } from "lucide-react"
import { calculateProductivity, slugifyProvince } from "../../utils/calculations"
import { formatDecimal, formatNumber } from "../../utils/formatter"

function RankingList({ title, icon: Icon, rows, valueRenderer, maxValue }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {rows.map((item, index) => {
          const value = valueRenderer(item, true)
          const width =
            maxValue > 0 ? `${Math.max((Number(value) / maxValue) * 100, 8)}%` : "8%"

          return (
            <Link
              key={item.id}
              to={`/province/${slugifyProvince(item.province)}`}
              className="block rounded-lg border border-slate-100 bg-slate-50 p-3 transition hover:border-forest-200 hover:bg-forest-50"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-sm font-bold text-forest-700">
                    {index + 1}
                  </span>
                  <span className="truncate text-sm font-semibold text-slate-800">
                    {item.province}
                  </span>
                </div>
                <span className="shrink-0 text-sm font-bold text-slate-900">
                  {valueRenderer(item, false)}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white">
                <div className="h-2 rounded-full bg-forest-600" style={{ width }} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function ProvinceRanking({ productionRanking, productivityRanking }) {
  const productionMax = productionRanking[0]?.production ?? 0
  const productivityMax = productivityRanking[0]
    ? calculateProductivity(
        productivityRanking[0].production,
        productivityRanking[0].harvestArea,
      )
    : 0

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
          Ranking Provinsi
        </p>
        <h2 className="text-xl font-bold text-slate-950">Performa Tahun Aktif</h2>
      </div>

      <div className="space-y-6">
        <RankingList
          title="Produksi Tertinggi"
          icon={Award}
          rows={productionRanking}
          maxValue={productionMax}
          valueRenderer={(item, raw) =>
            raw ? item.production : `${formatNumber(item.production)} ton`
          }
        />
        <RankingList
          title="Produktivitas Tertinggi"
          icon={BarChart3}
          rows={productivityRanking}
          maxValue={productivityMax}
          valueRenderer={(item, raw) => {
            const productivity = calculateProductivity(item.production, item.harvestArea)
            return raw ? productivity : `${formatDecimal(productivity, 2)} ton/ha`
          }}
        />
      </div>
    </aside>
  )
}
