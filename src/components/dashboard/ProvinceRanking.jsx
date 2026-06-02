import { Link } from "react-router-dom"
import { Award, BarChart3 } from "lucide-react"
import { calculateProductivity, slugifyProvince } from "../../utils/calculations"
import { formatDecimal, formatNumber } from "../../utils/formatter"

function RankingList({ title, icon: Icon, rows, valueRenderer, maxValue }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-apple-pearl text-apple-blue">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="text-[17px] font-semibold text-apple-ink">{title}</h3>
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
              className="block border-t border-apple-hairline py-3 transition first:border-t-0 hover:text-apple-blue"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-apple-pearl text-[14px] font-semibold text-apple-blue">
                    {index + 1}
                  </span>
                  <span className="truncate text-[14px] font-semibold text-apple-ink">
                    {item.province}
                  </span>
                </div>
                <span className="shrink-0 text-[14px] font-semibold text-apple-ink">
                  {valueRenderer(item, false)}
                </span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-apple-pearl">
                <div className="h-1.5 rounded-full bg-apple-blue" style={{ width }} />
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
    <aside className="rounded-[18px] border border-apple-hairline bg-white p-6">
      <div className="mb-5">
        <p className="text-[14px] font-normal leading-[1.43] text-apple-muted">
          Ranking Provinsi
        </p>
        <h2 className="apple-display text-[28px] font-semibold leading-[1.14] text-apple-ink">
          Performa Tahun Aktif
        </h2>
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
