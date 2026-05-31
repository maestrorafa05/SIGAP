import { METRIC_OPTIONS } from "../data/constants"
import { calculateProductivity } from "./calculations"

export function getMetricConfig(metric) {
  return METRIC_OPTIONS.find((item) => item.key === metric) ?? METRIC_OPTIONS[0]
}

export function getMetricValue(item, metric) {
  if (!item) return 0
  if (metric === "productivity") {
    return calculateProductivity(item.production, item.harvestArea)
  }

  return Number(item[metric] || 0)
}

export function hasValidCoordinate(item) {
  return (
    Number.isFinite(Number(item.latitude)) &&
    Number.isFinite(Number(item.longitude)) &&
    Math.abs(Number(item.latitude)) <= 90 &&
    Math.abs(Number(item.longitude)) <= 180
  )
}

export function getBubbleRadius(item, metric, data) {
  const values = data.map((row) => getMetricValue(row, metric)).filter(Number.isFinite)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const value = getMetricValue(item, metric)

  if (!Number.isFinite(value) || max === min) return 12

  const ratio = (value - min) / (max - min)
  return 9 + ratio * 19
}

export function getMetricColor(item, metric, data) {
  const config = getMetricConfig(metric)
  const values = data.map((row) => getMetricValue(row, metric)).filter(Number.isFinite)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const value = getMetricValue(item, metric)

  if (!Number.isFinite(value) || max === min) return config.color

  const ratio = (value - min) / (max - min)

  if (ratio > 0.66) return config.color
  if (ratio > 0.33) return "#e4b52d"
  return "#2498d8"
}
