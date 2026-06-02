import { useEffect } from "react"
import L from "leaflet"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import { AlertCircle, Bot, Crosshair } from "lucide-react"
import { getCoverageRadius, getMetricConfig, getMetricValue } from "../../utils/mapUtils"
import { calculateProductivity } from "../../utils/calculations"
import { formatDecimal, formatMetric, formatNumber } from "../../utils/formatter"
import ProvinceMarker from "./ProvinceMarker"
import MapLegend from "./MapLegend"

function MapFocusController({ item, metric, data }) {
  const map = useMap()

  useEffect(() => {
    if (!item) return

    const radius = getCoverageRadius(item, metric, data)
    const center = L.latLng(item.latitude, item.longitude)
    const bounds = center.toBounds(radius * 2.4)

    map.flyToBounds(bounds, {
      animate: true,
      duration: 0.85,
      maxZoom: 7,
      paddingTopLeft: [80, 80],
      paddingBottomRight: [80, 80],
    })
  }, [data, item, map, metric])

  return null
}

export default function SumateraMap({
  data,
  metric,
  onSelectProvince,
  selectedProvince,
  className = "h-[460px]",
  interactive = true,
  showWorkspaceUi = interactive,
}) {
  const validData = data.filter(
    (item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude),
  )
  const activeItem = selectedProvince
    ? validData.find((item) => item.province === selectedProvince)
    : null
  const metricConfig = getMetricConfig(metric)
  const metricRanking = [...validData].sort(
    (a, b) => getMetricValue(b, metric) - getMetricValue(a, metric),
  )
  const activeRank = activeItem
    ? metricRanking.findIndex((item) => item.province === activeItem.province) + 1
    : 0
  const activeMetricValue = activeItem ? getMetricValue(activeItem, metric) : 0
  const activeProductivity = activeItem
    ? calculateProductivity(activeItem.production, activeItem.harvestArea)
    : 0

  const insightText = activeItem
    ? activeRank <= 2
      ? `${activeItem.province} berada di kelompok atas untuk ${metricConfig.label.toLowerCase()} pada ${activeItem.year}.`
      : activeRank >= validData.length - 1
        ? `${activeItem.province} perlu dicermati karena berada di kelompok bawah untuk metrik aktif.`
        : `${activeItem.province} berada di posisi tengah; bandingkan dengan ranking dan tren historis.`
    : "Pilih salah satu pin untuk melihat fokus wilayah, cakupan indikatif, dan insight otomatis."

  if (!validData.length) {
    return (
      <div className="flex h-[360px] items-center justify-center rounded-[18px] border border-dashed border-apple-hairline bg-white text-center">
        <div>
          <AlertCircle className="mx-auto h-8 w-8 text-apple-muted" aria-hidden="true" />
          <p className="mt-2 font-semibold text-apple-ink">Data koordinat tidak tersedia</p>
          <p className="text-[14px] text-apple-muted">Peta membutuhkan latitude dan longitude valid.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`sigap-map relative isolate z-0 overflow-hidden rounded-[18px] border border-apple-hairline ${className}`}>
      <MapContainer
        center={[0.45, 101.6]}
        zoom={5}
        minZoom={4}
        maxZoom={9}
        scrollWheelZoom={interactive}
        dragging={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        attributionControl={interactive}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFocusController item={activeItem} metric={metric} data={validData} />
        {validData.map((item) => (
          <ProvinceMarker
            key={item.id}
            item={item}
            metric={metric}
            data={validData}
            onSelect={onSelectProvince}
            active={selectedProvince === item.province}
          />
        ))}
      </MapContainer>

      {showWorkspaceUi && (
        <>
          <div className="absolute bottom-24 right-4 z-30 w-[calc(100%-2rem)] max-w-sm md:bottom-auto md:top-4">
            <div className="rounded-[22px] border border-white/70 bg-white/90 p-4 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-apple-pearl text-apple-blue">
                  {activeItem ? (
                    <Crosshair className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Bot className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] leading-none text-apple-muted">
                    {activeItem ? "Fokus Wilayah" : "AI Insight"}
                  </p>
                  <h3 className="apple-display mt-1 truncate text-[22px] font-semibold leading-[1.14] text-apple-ink">
                    {activeItem?.province ?? "Pilih pin provinsi"}
                  </h3>
                  {activeItem && (
                    <p className="mt-1 text-[12px] text-apple-muted">
                      {activeItem.capitalCity} | peringkat #{activeRank} {metricConfig.label}
                    </p>
                  )}
                </div>
              </div>

              {activeItem && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-[16px] bg-apple-pearl p-3">
                    <p className="text-[11px] text-apple-muted">{metricConfig.label}</p>
                    <p className="mt-1 text-[14px] font-semibold text-apple-ink">
                      {formatMetric(activeMetricValue, metric, metricConfig.unit)}
                    </p>
                  </div>
                  <div className="rounded-[16px] bg-apple-pearl p-3">
                    <p className="text-[11px] text-apple-muted">Produktivitas</p>
                    <p className="mt-1 text-[14px] font-semibold text-apple-ink">
                      {formatDecimal(activeProductivity, 2)} ton/ha
                    </p>
                  </div>
                  <div className="rounded-[16px] bg-apple-pearl p-3">
                    <p className="text-[11px] text-apple-muted">Produksi</p>
                    <p className="mt-1 text-[14px] font-semibold text-apple-ink">
                      {formatNumber(activeItem.production)} ton
                    </p>
                  </div>
                  <div className="rounded-[16px] bg-apple-pearl p-3">
                    <p className="text-[11px] text-apple-muted">Cakupan</p>
                    <p className="mt-1 text-[14px] font-semibold text-apple-ink">
                      Indikatif
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-3 rounded-[16px] bg-apple-pearl p-3">
                <p className="text-[12px] font-semibold text-apple-ink">AI Insight</p>
                <p className="mt-1 text-[12px] leading-[1.35] text-apple-muted">
                  {insightText}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <MapLegend
        metric={metric}
        data={validData}
        className={showWorkspaceUi ? "bottom-4 left-4 hidden sm:block" : "bottom-4 left-4"}
      />
    </div>
  )
}
