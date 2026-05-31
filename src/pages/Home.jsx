import { useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, Database, MapPinned, Sprout } from "lucide-react"
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
    <div className="space-y-6">
      <section className="relative min-h-[72vh] overflow-hidden rounded-lg border border-slate-200 bg-forest-900 shadow-soft">
        {latestData.length > 0 && (
          <div className="absolute inset-0">
            <SumateraMap
              data={latestData}
              metric={DEFAULT_METRIC}
              interactive={false}
              className="h-full rounded-none border-0 shadow-none"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/35" />
        <div className="relative z-10 flex min-h-[72vh] max-w-4xl flex-col justify-center px-6 py-14 sm:px-10 lg:px-14">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-forest-200 bg-white/80 px-4 py-2 text-sm font-semibold text-forest-800 shadow-panel backdrop-blur">
            <Sprout className="h-4 w-4" aria-hidden="true" />
            GIS Agro-Klimatologi Padi
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-forest-900 sm:text-5xl lg:text-6xl">
            SIGAP SUMATERA
          </h1>
          <p className="mt-4 max-w-3xl text-xl font-semibold text-slate-800">
            Sistem Informasi Geografis Agro-Klimatologi Padi Sumatera
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Visualisasi produksi padi, luas panen, dan faktor iklim historis berbasis
            provinsi untuk membaca pola pertanian Sumatera secara spasial dan analitik.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-forest-700 px-5 text-sm font-bold text-white shadow-panel transition hover:bg-forest-900"
            >
              Buka Dashboard
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/data"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-5 text-sm font-bold text-slate-800 transition hover:bg-white"
            >
              Lihat Data
            </Link>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4">
            {DATASET_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/70 bg-white/85 p-4 shadow-panel backdrop-blur"
              >
                <p className="text-2xl font-black text-forest-900">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Peta Marker",
            text: "Koordinat memakai titik ibu kota provinsi sebagai aproksimasi level provinsi.",
            icon: MapPinned,
            tone: "text-forest-700 bg-forest-50",
          },
          {
            title: "Analitik Produksi",
            text: "KPI, ranking, dan grafik berubah mengikuti tahun aktif dari 1993 sampai 2020.",
            icon: BarChart3,
            tone: "text-harvest-600 bg-harvest-100",
          },
          {
            title: "Data Historis",
            text: "Data explorer mendukung pencarian, filter, sorting, pagination, dan export CSV.",
            icon: Database,
            tone: "text-climate-700 bg-climate-100",
          },
        ].map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel"
            >
              <span
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${item.tone}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
              <p className="mt-2 leading-6 text-slate-600">{item.text}</p>
            </article>
          )
        })}
      </section>
    </div>
  )
}
