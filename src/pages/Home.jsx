import { useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, Database, MapPinned } from "lucide-react"
import SumateraMap from "../components/map/SumateraMap"
import { DATASET_STATS, DEFAULT_METRIC, DEFAULT_YEAR } from "../data/constants"
import { useRiceData } from "../hooks/useRiceData"
import { filterByYear } from "../utils/calculations"
import { toChartData } from "../utils/dataTransform"

export default function Home() {
  const { data } = useRiceData()
  const latestData = useMemo(
    () => toChartData(filterByYear(data, DEFAULT_YEAR)),
    [data],
  )

  return (
    <div>
      <section className="apple-tile bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <p className="apple-display text-[21px] font-semibold leading-[1.19] text-apple-ink">
            Sistem Informasi Geografis Agro-Klimatologi Padi Sumatera
          </p>
          <h1 className="apple-display mx-auto mt-3 max-w-5xl text-[42px] font-semibold leading-[1.07] text-apple-ink sm:text-[56px]">
            SIGAP SUMATERA
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-[21px] leading-[1.47] text-apple-ink sm:text-[28px] sm:leading-[1.14]">
            Visualisasi data produksi padi, luas panen, dan faktor iklim berbasis
            wilayah untuk analisis pertanian Sumatera.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="apple-pill inline-flex items-center justify-center gap-2 bg-apple-blue px-[22px] py-[11px] text-[17px] leading-[1.47] text-white transition hover:bg-apple-blueFocus"
            >
              Buka Dashboard
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/data"
              className="apple-pill inline-flex items-center justify-center border border-apple-blue px-[22px] py-[11px] text-[17px] leading-[1.47] text-apple-blue transition hover:bg-apple-pearl"
            >
              Lihat Data
            </Link>
          </div>

          {latestData.length > 0 && (
            <div className="apple-product-shadow mx-auto mt-12 max-w-6xl overflow-hidden rounded-[18px] border border-apple-hairline">
              <SumateraMap
                data={latestData}
                metric={DEFAULT_METRIC}
                interactive={false}
                className="h-[420px] rounded-none border-0"
              />
            </div>
          )}
        </div>
      </section>

      <section className="apple-tile bg-apple-parchment py-16 sm:py-20">
        <div className="mx-auto grid max-w-[980px] gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {DATASET_STATS.map((stat) => (
            <div key={stat.label} className="rounded-[18px] border border-apple-hairline bg-white p-6">
              <p className="apple-display text-[40px] font-semibold leading-[1.1] text-apple-ink">
                {stat.value}
              </p>
              <p className="mt-2 text-[14px] leading-[1.43] text-apple-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="apple-tile bg-apple-tile py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-3">
          {[
            {
              title: "Peta Marker",
              text: "Koordinat memakai titik ibu kota provinsi sebagai aproksimasi level provinsi.",
              icon: MapPinned,
            },
            {
              title: "Analitik Produksi",
              text: "KPI, ranking, dan grafik berubah mengikuti tahun aktif dari 1993 sampai 2020.",
              icon: BarChart3,
            },
            {
              title: "Data Historis",
              text: "Data explorer mendukung pencarian, filter, sorting, pagination, dan export CSV.",
              icon: Database,
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-[18px] border border-white/12 p-6">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-apple-blueDark">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="apple-display text-[28px] font-semibold leading-[1.14] text-white">
                  {item.title}
                </h2>
                <p className="mt-3 text-[17px] leading-[1.47] text-[#cccccc]">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
