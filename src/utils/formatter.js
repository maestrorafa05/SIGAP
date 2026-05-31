const numberFormatter = new Intl.NumberFormat("id-ID")

export function formatNumber(value) {
  if (!Number.isFinite(Number(value))) return "0"
  return numberFormatter.format(Number(value))
}

export function formatDecimal(value, digits = 2) {
  if (!Number.isFinite(Number(value))) return "0"
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number(value))
}

export function formatCompactNumber(value) {
  if (!Number.isFinite(Number(value))) return "0"
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value))
}

export function formatMetric(value, metric, unit = "") {
  if (metric === "productivity" || metric === "avgTemperature") {
    return `${formatDecimal(value, 2)}${unit ? ` ${unit}` : ""}`
  }

  if (metric === "humidity") {
    return `${formatDecimal(value, 1)}${unit ? ` ${unit}` : ""}`
  }

  return `${formatNumber(value)}${unit ? ` ${unit}` : ""}`
}
