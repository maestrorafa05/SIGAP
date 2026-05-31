import { CloudRain, MapPinned, Sprout, ThermometerSun, Trophy, Wheat } from "lucide-react"
import { formatDecimal, formatNumber } from "../../utils/formatter"
import KpiCard from "./KpiCard"

export default function KpiSummary({ summary, selectedYear }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <KpiCard
        title="Total Produksi"
        value={`${formatNumber(summary.totalProduction)} ton`}
        subtitle={`Akumulasi seluruh provinsi pada ${selectedYear}`}
        icon={Sprout}
        tone="green"
      />
      <KpiCard
        title="Total Luas Panen"
        value={`${formatNumber(summary.totalHarvestArea)} ha`}
        subtitle="Luas panen agregat Sumatera"
        icon={MapPinned}
        tone="gold"
      />
      <KpiCard
        title="Produktivitas Rata-rata"
        value={`${formatDecimal(summary.averageProductivity, 2)} ton/ha`}
        subtitle="Total produksi dibagi total luas panen"
        icon={Wheat}
        tone="green"
      />
      <KpiCard
        title="Produksi Tertinggi"
        value={summary.highestProductionProvince?.province ?? "-"}
        subtitle={
          summary.highestProductionProvince
            ? `${formatNumber(summary.highestProductionProvince.production)} ton`
            : "Tidak ada data"
        }
        icon={Trophy}
        tone="gold"
      />
      <KpiCard
        title="Rata-rata Curah Hujan"
        value={`${formatDecimal(summary.averageRainfall, 1)} mm`}
        subtitle="Rata-rata lintas provinsi"
        icon={CloudRain}
        tone="blue"
      />
      <KpiCard
        title="Rata-rata Suhu"
        value={`${formatDecimal(summary.averageTemperature, 2)} C`}
        subtitle={`Rata-rata suhu pada ${selectedYear}`}
        icon={ThermometerSun}
        tone="slate"
      />
    </section>
  )
}
