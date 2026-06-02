import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  AlertCircle,
  BarChart3,
  CloudRain,
  Database,
  LineChart,
  ListOrdered,
  MapPinned,
  PanelsTopLeft,
  Sprout,
} from "lucide-react"
import ClimateTrendChart from "../components/charts/ClimateTrendChart"
import ProductionBarChart from "../components/charts/ProductionBarChart"
import ProductionTrendChart from "../components/charts/ProductionTrendChart"
import FeatureSidebar from "../components/dashboard/FeatureSidebar"
import KpiSummary from "../components/dashboard/KpiSummary"
import ProvinceRanking from "../components/dashboard/ProvinceRanking"
import SumateraMap from "../components/map/SumateraMap"
import DataExplorerTable from "../components/table/DataExplorerTable"
import { DEFAULT_METRIC, DEFAULT_YEAR, METRIC_OPTIONS } from "../data/constants"
import { useDashboardData } from "../hooks/useDashboardData"
import { useRiceData } from "../hooks/useRiceData"
import { calculateProductivity, slugifyProvince } from "../utils/calculations"
import { formatDecimal, formatNumber } from "../utils/formatter"

const DASHBOARD_FEATURES = [
  {
    id: "map",
    label: "Peta",
    description: "Marker, bubble, popup, dan lokasi provinsi.",
    icon: MapPinned,
  },
  {
    id: "summary",
    label: "Ringkasan",
    description: "KPI produksi, panen, produktivitas, dan iklim.",
    icon: PanelsTopLeft,
  },
  {
    id: "ranking",
    label: "Ranking",
    description: "Urutan provinsi berdasarkan performa.",
    icon: ListOrdered,
  },
  {
    id: "production",
    label: "Produksi",
    description: "Perbandingan produksi dan tren historis.",
    icon: Sprout,
  },
  {
    id: "climate",
    label: "Iklim",
    description: "Curah hujan, kelembapan, dan suhu.",
    icon: CloudRain,
  },
  {
    id: "trend",
    label: "Tren Provinsi",
    description: "Analisis historis provinsi terpilih.",
    icon: LineChart,
  },
  {
    id: "table",
    label: "Tabel Data",
    description: "Data tahun aktif dalam format tabular.",
    icon: Database,
  },
]

function PageState({ title, text }) {
  return (
    <div className="apple-tile bg-apple-parchment py-16">
      <div className="mx-auto flex min-h-[360px] max-w-[980px] items-center justify-center rounded-[18px] border border-dashed border-apple-hairline bg-white text-center">
        <div>
          <AlertCircle className="mx-auto h-9 w-9 text-apple-muted" aria-hidden="true" />
          <h2 className="apple-display mt-3 text-[28px] font-semibold leading-[1.14] text-apple-ink">
            {title}
          </h2>
          <p className="mt-2 text-[17px] text-apple-muted">{text}</p>
        </div>
      </div>
    </div>
  )
}

function FeatureHeader({ eyebrow, title, description, children }) {
  return (
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-[14px] leading-[1.43] text-apple-muted">{eyebrow}</p>
        <h2 className="apple-display text-[34px] font-semibold leading-[1.18] text-apple-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-3xl text-[14px] leading-[1.43] text-apple-muted">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

function SelectedProvincePanel({ province }) {
  if (!province) {
    return (
      <section className="rounded-[18px] border border-apple-hairline bg-white p-6">
        <p className="text-[14px] text-apple-muted">Provinsi Terpilih</p>
        <h2 className="apple-display mt-1 text-[28px] font-semibold leading-[1.14] text-apple-ink">
          Klik marker pada peta
        </h2>
        <p className="mt-3 text-[14px] leading-[1.43] text-apple-muted">
          Popup peta dan panel ini akan menampilkan ringkasan provinsi aktif.
        </p>
      </section>
    )
  }

  const productivity = calculateProductivity(province.production, province.harvestArea)

  return (
    <section className="rounded-[18px] border border-apple-hairline bg-white p-6">
      <p className="text-[14px] text-apple-muted">Provinsi Terpilih</p>
      <div className="mt-1 flex items-start justify-between gap-3">
        <div>
          <h2 className="apple-display text-[28px] font-semibold leading-[1.14] text-apple-ink">
            {province.province}
          </h2>
          <p className="mt-1 text-[14px] text-apple-muted">{province.capitalCity}</p>
        </div>
        <span className="rounded-full bg-apple-pearl px-3 py-1 text-[12px] text-apple-muted">
          {province.year}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[18px] bg-apple-pearl p-4">
          <p className="text-[12px] text-apple-muted">Produksi</p>
          <p className="mt-1 text-[17px] font-semibold text-apple-ink">
            {formatNumber(province.production)} ton
          </p>
        </div>
        <div className="rounded-[18px] bg-apple-pearl p-4">
          <p className="text-[12px] text-apple-muted">Produktivitas</p>
          <p className="mt-1 text-[17px] font-semibold text-apple-ink">
            {formatDecimal(productivity, 2)} ton/ha
          </p>
        </div>
        <div className="rounded-[18px] bg-apple-pearl p-4">
          <p className="text-[12px] text-apple-muted">Curah Hujan</p>
          <p className="mt-1 text-[17px] font-semibold text-apple-ink">
            {formatDecimal(province.rainfall, 1)} mm
          </p>
        </div>
        <div className="rounded-[18px] bg-apple-pearl p-4">
          <p className="text-[12px] text-apple-muted">Suhu</p>
          <p className="mt-1 text-[17px] font-semibold text-apple-ink">
            {formatDecimal(province.avgTemperature, 2)} C
          </p>
        </div>
      </div>

      <Link
        to={`/province/${slugifyProvince(province.province)}`}
        className="apple-pill mt-5 inline-flex w-full items-center justify-center bg-apple-blue px-[22px] py-[11px] text-[14px] leading-none text-white transition hover:bg-apple-blueFocus"
      >
        Buka Detail Provinsi
      </Link>
    </section>
  )
}

function ControlsPanel({
  years,
  selectedYear,
  setSelectedYear,
  selectedMetric,
  setSelectedMetric,
}) {
  const minYear = years[0] ?? 1993
  const maxYear = years[years.length - 1] ?? 2020

  return (
    <div className="mb-5 rounded-[18px] border border-apple-hairline bg-white p-4">
      <div className="grid gap-4 2xl:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <label htmlFor="dashboard-year" className="text-[14px] font-semibold text-apple-ink">
            Tahun
          </label>
          <div className="mt-2 flex items-center gap-3">
            <select
              id="dashboard-year"
              value={selectedYear}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
              className="h-10 rounded-full border border-black/10 bg-white px-4 text-[14px] text-apple-ink outline-none transition focus:border-apple-blueFocus focus:ring-2 focus:ring-apple-blueFocus"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={selectedYear}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
              className="h-2 min-w-0 flex-1 accent-apple-blue"
              aria-label="Slider tahun"
            />
          </div>
        </div>

        <div>
          <p className="text-[14px] font-semibold text-apple-ink">Metrik Peta</p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {METRIC_OPTIONS.map((metric) => {
              const Icon = metric.icon
              const active = selectedMetric === metric.key

              return (
                <button
                  key={metric.key}
                  type="button"
                  onClick={() => setSelectedMetric(metric.key)}
                  className={[
                    "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-[14px] transition",
                    active
                      ? "border-apple-blue bg-apple-blue text-white"
                      : "border-black/10 bg-white text-apple-ink hover:border-apple-blue hover:text-apple-blue",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {metric.shortLabel}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { data, loading, error } = useRiceData()
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR)
  const [selectedMetric, setSelectedMetric] = useState(DEFAULT_METRIC)
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [activeFeature, setActiveFeature] = useState("map")
  const dashboard = useDashboardData(data, selectedYear, selectedProvince)
  const activeMetric = useMemo(
    () => METRIC_OPTIONS.find((metric) => metric.key === selectedMetric) ?? METRIC_OPTIONS[0],
    [selectedMetric],
  )

  const activeProvince = useMemo(() => {
    if (!dashboard.yearlyData.length) return null
    return (
      dashboard.yearlyData.find((item) => item.province === selectedProvince) ??
      dashboard.summary.highestProductionProvince ??
      dashboard.yearlyData[0]
    )
  }, [dashboard.summary.highestProductionProvince, dashboard.yearlyData, selectedProvince])

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

  function renderFeature() {
    if (activeFeature === "summary") {
      return (
        <section>
          <FeatureHeader
            eyebrow="Fitur Ringkasan"
            title={`KPI utama tahun ${selectedYear}`}
            description="Ringkasan ini membantu user memahami skala produksi, luas panen, produktivitas, dan kondisi iklim sebelum membuka analitik lebih detail."
          />
          <KpiSummary summary={dashboard.summary} selectedYear={selectedYear} />
        </section>
      )
    }

    if (activeFeature === "ranking") {
      return (
        <section>
          <FeatureHeader
            eyebrow="Fitur Ranking"
            title="Bandingkan performa provinsi"
            description="Ranking memudahkan user melihat provinsi unggulan berdasarkan produksi dan produktivitas pada tahun aktif."
          />
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            <ProvinceRanking
              productionRanking={dashboard.productionRanking}
              productivityRanking={dashboard.productivityRanking}
            />
            <SelectedProvincePanel province={activeProvince} />
          </div>
        </section>
      )
    }

    if (activeFeature === "production") {
      return (
        <section>
          <FeatureHeader
            eyebrow="Fitur Produksi"
            title="Produksi padi dan tren historis"
            description="Gunakan grafik ini untuk membandingkan produksi antarprovinsi dan melihat tren provinsi terpilih dari 1993 sampai 2020."
          />
          <div className="grid gap-6 2xl:grid-cols-2">
            <ProductionBarChart data={dashboard.yearlyData} selectedYear={selectedYear} />
            <ProductionTrendChart
              data={dashboard.provinceTrendData}
              province={dashboard.trendProvince}
            />
          </div>
        </section>
      )
    }

    if (activeFeature === "climate") {
      return (
        <section>
          <FeatureHeader
            eyebrow="Fitur Iklim"
            title="Agro-klimatologi tahun aktif"
            description="Panel ini menampilkan curah hujan, kelembapan, dan suhu rata-rata per provinsi untuk membantu membaca konteks iklim produksi."
          />
          <ClimateTrendChart
            data={dashboard.yearlyData}
            xKey="province"
            title={`Agro-Klimatologi per Provinsi ${selectedYear}`}
            subtitle="Tahun aktif"
          />
        </section>
      )
    }

    if (activeFeature === "trend") {
      return (
        <section>
          <FeatureHeader
            eyebrow="Fitur Tren Provinsi"
            title={`Tren historis ${dashboard.trendProvince}`}
            description="Pilih provinsi dari kontrol di bawah atau klik marker peta untuk membaca perubahan produksi dari tahun ke tahun."
          >
            <select
              value={dashboard.trendProvince ?? ""}
              onChange={(event) => setSelectedProvince(event.target.value)}
              className="h-11 min-w-60 rounded-full border border-black/10 bg-white px-5 text-[17px] font-normal text-apple-ink outline-none transition focus:border-apple-blueFocus focus:ring-2 focus:ring-apple-blueFocus"
              aria-label="Pilih provinsi tren"
            >
              {dashboard.provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </FeatureHeader>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            <ProductionTrendChart
              data={dashboard.provinceTrendData}
              province={dashboard.trendProvince}
            />
            <SelectedProvincePanel province={activeProvince} />
          </div>
        </section>
      )
    }

    if (activeFeature === "table") {
      return (
        <section>
          <FeatureHeader
            eyebrow="Fitur Tabel Data"
            title={`Data tabular tahun ${selectedYear}`}
            description="Tabel ini dipakai untuk verifikasi angka detail setelah user membaca peta, KPI, ranking, dan grafik."
          />
          <DataExplorerTable data={data} fixedYear={selectedYear} showToolbar={false} compact />
        </section>
      )
    }

    return (
      <section className="min-h-0">
        <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[14px] leading-[1.43] text-apple-muted">Fitur Peta</p>
            <h2 className="apple-display text-[34px] font-semibold leading-[1.18] text-apple-ink">
              Sebaran padi Sumatera
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-4 py-2 text-[14px] text-apple-muted">
              Bubble: {activeMetric.label}
            </span>
            {activeProvince && (
              <span className="rounded-full bg-white px-4 py-2 text-[14px] text-apple-muted">
                Fokus: {activeProvince.province}
              </span>
            )}
          </div>
        </div>

        <SumateraMap
          data={dashboard.yearlyData}
          metric={selectedMetric}
          onSelectProvince={setSelectedProvince}
          className="h-[calc(100dvh-300px)]"
        />
      </section>
    )
  }

  return (
    <div className="bg-apple-parchment">
      <section className="apple-tile py-5">
        <div className="mx-auto grid max-w-[1680px] gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="xl:fixed xl:left-6 xl:top-[60px] xl:z-40 xl:w-[260px]">
            <FeatureSidebar
              features={DASHBOARD_FEATURES}
              activeFeature={activeFeature}
              onFeatureChange={setActiveFeature}
            />
          </aside>

          <main className="min-w-0 xl:col-start-2">
            <ControlsPanel
              years={dashboard.years}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
            />
            {renderFeature()}
          </main>
        </div>
      </section>
    </div>
  )
}
