import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"
import ClimateTrendChart from "../components/charts/ClimateTrendChart"
import ProductionBarChart from "../components/charts/ProductionBarChart"
import ProductionTrendChart from "../components/charts/ProductionTrendChart"
import KpiSummary from "../components/dashboard/KpiSummary"
import MetricFilter from "../components/dashboard/MetricFilter"
import ProvinceRanking from "../components/dashboard/ProvinceRanking"
import YearFilter from "../components/dashboard/YearFilter"
import SumateraMap from "../components/map/SumateraMap"
import DataExplorerTable from "../components/table/DataExplorerTable"
import { DEFAULT_METRIC, DEFAULT_YEAR } from "../data/constants"
import { useDashboardData } from "../hooks/useDashboardData"
import { useRiceData } from "../hooks/useRiceData"

function PageState({ title, text }) {
  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-center">
      <div>
        <AlertCircle className="mx-auto h-9 w-9 text-slate-400" aria-hidden="true" />
        <h2 className="mt-3 text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-slate-500">{text}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { data, loading, error } = useRiceData()
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR)
  const [selectedMetric, setSelectedMetric] = useState(DEFAULT_METRIC)
  const [selectedProvince, setSelectedProvince] = useState(null)
  const dashboard = useDashboardData(data, selectedYear, selectedProvince)

  useEffect(() => {
    if (!selectedProvince && dashboard.trendProvince) {
      setSelectedProvince(dashboard.trendProvince)
    }
  }, [dashboard.trendProvince, selectedProvince])

  if (loading) {
    return <PageState title="Memuat dashboard" text="Dataset padi Sumatera sedang diproses." />
  }

  if (error) {
    return <PageState title="Data gagal dimuat" text={error} />
  }

  if (!dashboard.yearlyData.length) {
    return (
      <PageState
        title="Tahun tidak memiliki data"
        text="Pilih tahun lain untuk melihat dashboard."
      />
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
              Dashboard Geografis
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-950">
              SIGAP SUMATERA {selectedYear}
            </h1>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">
              Ringkasan spasial produksi padi, luas panen, produktivitas, dan kondisi
              agro-klimatologi delapan provinsi Sumatera.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            {dashboard.yearlyData.length} provinsi aktif
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
        <YearFilter
          years={dashboard.years}
          selectedYear={selectedYear}
          onChange={setSelectedYear}
        />
        <MetricFilter selectedMetric={selectedMetric} onChange={setSelectedMetric} />
      </section>

      <KpiSummary summary={dashboard.summary} selectedYear={selectedYear} />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.75fr)]">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
              Peta Interaktif
            </p>
            <h2 className="text-xl font-bold text-slate-950">Marker Provinsi Sumatera</h2>
          </div>
          <SumateraMap
            data={dashboard.yearlyData}
            metric={selectedMetric}
            onSelectProvince={setSelectedProvince}
          />
        </section>
        <ProvinceRanking
          productionRanking={dashboard.productionRanking}
          productivityRanking={dashboard.productivityRanking}
        />
      </section>

      <section className="grid gap-6 2xl:grid-cols-2">
        <ProductionBarChart data={dashboard.yearlyData} selectedYear={selectedYear} />
        <ClimateTrendChart
          data={dashboard.yearlyData}
          xKey="province"
          title={`Agro-Klimatologi per Provinsi ${selectedYear}`}
          subtitle="Tahun aktif"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <ProductionTrendChart
          data={dashboard.provinceTrendData}
          province={dashboard.trendProvince}
        />
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
          <label htmlFor="trend-province" className="text-sm font-semibold text-slate-700">
            Provinsi Tren
          </label>
          <select
            id="trend-province"
            value={dashboard.trendProvince ?? ""}
            onChange={(event) => setSelectedProvince(event.target.value)}
            className="mt-3 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
          >
            {dashboard.provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Default mengikuti provinsi dengan produksi tertinggi pada tahun aktif.
          </p>
        </div>
      </section>

      <DataExplorerTable
        data={data}
        fixedYear={selectedYear}
        showToolbar={false}
        compact
      />
    </div>
  )
}
