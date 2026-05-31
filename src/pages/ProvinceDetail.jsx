import { Link, useParams } from "react-router-dom"
import { AlertCircle, ArrowLeft, CloudRain, Droplets, MapPin, Sprout, ThermometerSun, Wheat } from "lucide-react"
import ClimateTrendChart from "../components/charts/ClimateTrendChart"
import HarvestAreaChart from "../components/charts/HarvestAreaChart"
import ProductionTrendChart from "../components/charts/ProductionTrendChart"
import ProductivityChart from "../components/charts/ProductivityChart"
import KpiCard from "../components/dashboard/KpiCard"
import { useProvinceDetail } from "../hooks/useProvinceDetail"
import { useRiceData } from "../hooks/useRiceData"
import { formatDecimal, formatNumber } from "../utils/formatter"

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

export default function ProvinceDetail() {
  const { provinceSlug } = useParams()
  const { data, loading, error } = useRiceData()
  const { provinceData, latestRecord, firstRecord, insight, notFound } =
    useProvinceDetail(data, provinceSlug)

  if (loading) {
    return <PageState title="Memuat detail" text="Data provinsi sedang disiapkan." />
  }

  if (error) {
    return <PageState title="Data gagal dimuat" text={error} />
  }

  if (notFound) {
    return (
      <PageState
        title="Provinsi tidak ditemukan"
        text="Slug provinsi tidak cocok dengan dataset SIGAP SUMATERA."
      />
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <Link
          to="/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Dashboard
        </Link>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
              Detail Provinsi
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-950">
              {latestRecord.province}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4 text-forest-700" aria-hidden="true" />
              {latestRecord.capitalCity} | {formatDecimal(latestRecord.latitude, 5)},{" "}
              {formatDecimal(latestRecord.longitude, 5)}
            </p>
          </div>
          <div className="rounded-lg border border-forest-100 bg-forest-50 px-4 py-3 text-sm font-semibold text-forest-800">
            Data terbaru: {latestRecord.year}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <KpiCard
          title="Produksi"
          value={`${formatNumber(latestRecord.production)} ton`}
          subtitle={`Tahun ${latestRecord.year}`}
          icon={Sprout}
          tone="green"
        />
        <KpiCard
          title="Luas Panen"
          value={`${formatNumber(latestRecord.harvestArea)} ha`}
          subtitle="Area panen provinsi"
          icon={MapPin}
          tone="gold"
        />
        <KpiCard
          title="Produktivitas"
          value={`${formatDecimal(latestRecord.productivity, 2)} ton/ha`}
          subtitle="Produksi dibagi luas panen"
          icon={Wheat}
          tone="green"
        />
        <KpiCard
          title="Curah Hujan"
          value={`${formatDecimal(latestRecord.rainfall, 1)} mm`}
          subtitle="Variabel agro-klimatologi"
          icon={CloudRain}
          tone="blue"
        />
        <KpiCard
          title="Kelembapan"
          value={`${formatDecimal(latestRecord.humidity, 1)}%`}
          subtitle="Rata-rata kelembapan"
          icon={Droplets}
          tone="blue"
        />
        <KpiCard
          title="Suhu Rata-rata"
          value={`${formatDecimal(latestRecord.avgTemperature, 2)} C`}
          subtitle="Rata-rata suhu"
          icon={ThermometerSun}
          tone="slate"
        />
      </section>

      <ProductionTrendChart data={provinceData} province={latestRecord.province} />

      <section className="grid gap-6 xl:grid-cols-2">
        <HarvestAreaChart data={provinceData} />
        <ProductivityChart data={provinceData} />
      </section>

      <ClimateTrendChart
        data={provinceData}
        title={`Agro-Klimatologi ${latestRecord.province}`}
        subtitle="Tren 1993-2020"
      />

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
          Insight Ringkas
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-950">
          Perubahan Produksi {firstRecord.year}-{latestRecord.year}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Produksi tertinggi</p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {insight.highestProductionYear.year}
            </p>
            <p className="text-sm text-slate-600">
              {formatNumber(insight.highestProductionYear.production)} ton
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Produksi terendah</p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {insight.lowestProductionYear.year}
            </p>
            <p className="text-sm text-slate-600">
              {formatNumber(insight.lowestProductionYear.production)} ton
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Rata-rata produksi</p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatNumber(insight.averageProduction)} ton
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Perubahan awal-akhir</p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatNumber(insight.productionChange)} ton
            </p>
            <p className="text-sm text-slate-600">
              {formatDecimal(insight.productionChangePercent, 2)}%
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
