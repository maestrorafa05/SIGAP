export function calculateProductivity(production, harvestArea) {
  const productionValue = Number(production)
  const harvestAreaValue = Number(harvestArea)

  if (!Number.isFinite(productionValue) || !Number.isFinite(harvestAreaValue)) {
    return 0
  }

  if (harvestAreaValue <= 0) return 0
  return productionValue / harvestAreaValue
}

export function filterByYear(data, year) {
  return data.filter((item) => item.year === Number(year))
}

export function filterByProvince(data, province) {
  return data.filter((item) => item.province === province)
}

export function getProductionRanking(data) {
  return [...data].sort((a, b) => b.production - a.production)
}

export function getProductivityRanking(data) {
  return [...data].sort(
    (a, b) =>
      calculateProductivity(b.production, b.harvestArea) -
      calculateProductivity(a.production, a.harvestArea),
  )
}

function average(data, key) {
  if (!data.length) return 0
  return data.reduce((sum, item) => sum + Number(item[key] || 0), 0) / data.length
}

export function getYearlySummary(data) {
  if (!data.length) {
    return {
      totalProduction: 0,
      totalHarvestArea: 0,
      averageProductivity: 0,
      averageRainfall: 0,
      averageHumidity: 0,
      averageTemperature: 0,
      highestProductionProvince: null,
      lowestProductionProvince: null,
    }
  }

  const totalProduction = data.reduce((sum, item) => sum + item.production, 0)
  const totalHarvestArea = data.reduce((sum, item) => sum + item.harvestArea, 0)
  const averageProductivity = calculateProductivity(totalProduction, totalHarvestArea)
  const productionRanking = getProductionRanking(data)

  return {
    totalProduction,
    totalHarvestArea,
    averageProductivity,
    averageRainfall: average(data, "rainfall"),
    averageHumidity: average(data, "humidity"),
    averageTemperature: average(data, "avgTemperature"),
    highestProductionProvince: productionRanking[0] ?? null,
    lowestProductionProvince: productionRanking[productionRanking.length - 1] ?? null,
  }
}

export function slugifyProvince(province) {
  return String(province || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getProvinceInsight(provinceData) {
  const sortedData = [...provinceData].sort((a, b) => a.year - b.year)

  if (!sortedData.length) {
    return {
      highestProductionYear: null,
      lowestProductionYear: null,
      averageProduction: 0,
      productionChange: 0,
      productionChangePercent: 0,
    }
  }

  const highestProductionYear = [...sortedData].sort(
    (a, b) => b.production - a.production,
  )[0]
  const lowestProductionYear = [...sortedData].sort(
    (a, b) => a.production - b.production,
  )[0]
  const averageProduction =
    sortedData.reduce((sum, item) => sum + item.production, 0) / sortedData.length
  const firstYear = sortedData[0]
  const lastYear = sortedData[sortedData.length - 1]
  const productionChange = lastYear.production - firstYear.production
  const productionChangePercent =
    firstYear.production > 0 ? (productionChange / firstYear.production) * 100 : 0

  return {
    highestProductionYear,
    lowestProductionYear,
    averageProduction,
    productionChange,
    productionChangePercent,
  }
}
