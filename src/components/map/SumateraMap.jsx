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
      <div className="flex h-[360px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-center">
        <div>
          <AlertCircle className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
          <p className="mt-2 font-semibold text-slate-700">Data koordinat tidak tersedia</p>
          <p className="text-sm text-slate-500">Peta membutuhkan latitude dan longitude valid.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-lg border border-slate-200 shadow-panel ${className}`}>
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
