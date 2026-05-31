import { CircleMarker, Popup } from "react-leaflet"
import { getBubbleRadius, getMetricColor, hasValidCoordinate } from "../../utils/mapUtils"
import MapPopup from "./MapPopup"

export default function ProvinceMarker({ item, metric, data, onSelect }) {
  if (!hasValidCoordinate(item)) return null

  const radius = getBubbleRadius(item, metric, data)
  const color = getMetricColor(item, metric, data)

  return (
    <CircleMarker
      center={[item.latitude, item.longitude]}
      radius={radius}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 0.58,
        opacity: 0.9,
        weight: 2,
      }}
      eventHandlers={{
        click: () => onSelect?.(item.province),
      }}
    >
      <Popup closeButton>
        <MapPopup item={item} />
      </Popup>
    </CircleMarker>
  )
}
