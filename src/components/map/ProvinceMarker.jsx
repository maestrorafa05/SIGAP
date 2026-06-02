import { Fragment, useMemo } from "react"
import L from "leaflet"
import { Circle, Marker, Popup } from "react-leaflet"
import {
  getCoverageRadius,
  getMetricColor,
  hasValidCoordinate,
} from "../../utils/mapUtils"
import MapPopup from "./MapPopup"

export default function ProvinceMarker({ item, metric, data, onSelect, active = false }) {
  if (!hasValidCoordinate(item)) return null

  const color = getMetricColor(item, metric, data)
  const coverageRadius = getCoverageRadius(item, metric, data)
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "sigap-pin-icon",
        html: `
          <div class="sigap-pin ${active ? "sigap-pin-active" : ""}" style="--pin-color:${color}">
            <div class="sigap-pin-head">
              <span class="sigap-pin-dot"></span>
            </div>
            <div class="sigap-pin-tip"></div>
          </div>
        `,
        iconSize: active ? [42, 54] : [32, 44],
        iconAnchor: active ? [21, 52] : [16, 42],
        popupAnchor: [0, active ? -48 : -40],
      }),
    [active, color],
  )

  return (
    <Fragment>
      {active && (
        <Circle
          center={[item.latitude, item.longitude]}
          radius={coverageRadius}
          pathOptions={{
            color,
            fillColor: color,
            fillOpacity: 0.12,
            opacity: 0.34,
            weight: 2,
            dashArray: "8 8",
          }}
        />
      )}

      <Marker
        position={[item.latitude, item.longitude]}
        icon={icon}
        zIndexOffset={active ? 1000 : 0}
        eventHandlers={{
          click: () => onSelect?.(item.province),
        }}
      >
        <Popup closeButton autoPan={false}>
          <MapPopup item={item} showCoverageNote={active} />
        </Popup>
      </Marker>
    </Fragment>
  )
}
