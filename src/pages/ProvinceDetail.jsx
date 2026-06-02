import { Link, useParams } from "react-router-dom"
import {
  AlertCircle,
  ArrowLeft,
  CloudRain,
  Droplets,
  MapPin,
  Sprout,
  ThermometerSun,
  Wheat,
} from "lucide-react"
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

function InsightCard({ label, value, detail }) {
  return (
    <div className="rounded-[18px] border border-apple-hairline bg-white p-6">
      <p className="text-[14px] leading-[1.43] text-apple-muted">{label}</p>
      <p className="apple-display mt-2 text-[28px] font-semibold leading-[1.14] text-apple-ink">
        {value}
      </p>
      {detail && <p className="mt-2 text-[14px] leading-[1.43] text-apple-muted">{detail}</p>}
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
    <div className="bg-apple-parchment">
      <section className="apple-tile bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1440px]">
          <Link
            to="/dashboard"
            className="mb-7 inline-flex items-center gap-2 text-[17px] leading-[1.47] text-apple-blue hover:text-apple-blueFocus"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Dashboard
          </Link>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="apple-display text-[21px] font-semibold leading-[1.19] text-apple-ink">
                Detail Provinsi
              </p>
              <h1 className="apple-display mt-2 text-[40px] font-semibold leading-[1.1] text-apple-ink sm:text-[56px] sm:leading-[1.07]">
                {latestRecord.province}
              </h1>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-[17px] leading-[1.47] text-apple-muted">
                <MapPin className="h-4 w-4 text-apple-blue" aria-hidden="true" />
                {latestRecord.capitalCity} | {formatDecimal(latestRecord.latitude, 5)},{" "}
                {formatDecimal(latestRecord.longitude, 5)}
              </p>
            </div>
            <div className="w-fit rounded-full border border-apple-hairline bg-apple-pearl px-5 py-3 text-[14px] text-apple-muted">
              Data terbaru: {latestRecord.year}
            </div>
          </div>
        </div>
      </section>

      <section className="apple-tile py-8">
        <div className="mx-auto max-w-[1440px] space-y-6">
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

          <section>
            <div className="mb-5">
              <p className="text-[14px] leading-[1.43] text-apple-muted">Insight Ringkas</p>
              <h2 className="apple-display mt-1 text-[34px] font-semibold leading-[1.47] text-apple-ink">
                Perubahan Produksi {firstRecord.year}-{latestRecord.year}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <InsightCard
                label="Produksi tertinggi"
                value={insight.highestProductionYear.year}
                detail={`${formatNumber(insight.highestProductionYear.production)} ton`}
              />
              <InsightCard
                label="Produksi terendah"
                value={insight.lowestProductionYear.year}
                detail={`${formatNumber(insight.lowestProductionYear.production)} ton`}
              />
              <InsightCard
                label="Rata-rata produksi"
                value={`${formatNumber(insight.averageProduction)} ton`}
              />
              <InsightCard
                label="Perubahan awal-akhir"
                value={`${formatDecimal(insight.productionChangePercent, 2)}%`}
                detail={`${formatNumber(insight.productionChange)} ton`}
              />
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
