import { MapContainer, TileLayer } from "react-leaflet"
import { AlertCircle } from "lucide-react"
import ProvinceMarker from "./ProvinceMarker"
import MapLegend from "./MapLegend"

export default function SumateraMap({
  data,
  metric,
  onSelectProvince,
  className = "h-[460px]",
  interactive = true,
}) {
  const validData = data.filter(
    (item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude),
  )

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
        {validData.map((item) => (
          <ProvinceMarker
            key={item.id}
            item={item}
            metric={metric}
            data={validData}
            onSelect={onSelectProvince}
          />
        ))}
      </MapContainer>
      <MapLegend metric={metric} data={validData} />
    </div>
  )
}
