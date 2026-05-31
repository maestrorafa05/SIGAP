import { calculateProductivity, slugifyProvince } from "./calculations"

const numericFields = [
  "year",
  "production",
  "harvestArea",
  "rainfall",
  "humidity",
  "avgTemperature",
  "latitude",
  "longitude",
]

export function normalizeRiceRecord(record) {
  const normalized = {
    id: record.id,
    province: record.province,
    year: record.year,
    production: record.production,
    harvestArea: record.harvestArea,
    rainfall: record.rainfall,
    humidity: record.humidity,
    avgTemperature: record.avgTemperature,
    country: record.country,
    capitalCity: record.capitalCity,
    latitude: record.latitude,
    longitude: record.longitude,
    pinLocation: record.pinLocation,
    coordinateType: record.coordinateType,
    coordinateSource: record.coordinateSource,
  }

  numericFields.forEach((field) => {
    normalized[field] = Number(normalized[field])
  })

  normalized.id = normalized.id || `${slugifyProvince(normalized.province)}-${normalized.year}`
  normalized.productivity = calculateProductivity(
    normalized.production,
    normalized.harvestArea,
  )

  return normalized
}

export function normalizeRiceData(data) {
  if (!Array.isArray(data)) return []

  return data
    .map(normalizeRiceRecord)
    .filter((item) => item.province && Number.isFinite(item.year))
    .sort((a, b) => a.province.localeCompare(b.province, "id-ID") || a.year - b.year)
}

export function getAvailableYears(data) {
  return [...new Set(data.map((item) => item.year))].sort((a, b) => a - b)
}

export function getAvailableProvinces(data) {
  return [...new Set(data.map((item) => item.province))].sort((a, b) =>
    a.localeCompare(b, "id-ID"),
  )
}

export function toChartData(data) {
  return data.map((item) => ({
    ...item,
    productivity: calculateProductivity(item.production, item.harvestArea),
  }))
}
