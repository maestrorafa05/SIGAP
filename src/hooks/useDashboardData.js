import { useMemo } from "react"
import {
  filterByProvince,
  filterByYear,
  getProductionRanking,
  getProductivityRanking,
  getYearlySummary,
} from "../utils/calculations"
import { getAvailableProvinces, getAvailableYears, toChartData } from "../utils/dataTransform"

export function useDashboardData(data, selectedYear, selectedProvince) {
  return useMemo(() => {
    const yearlyData = toChartData(filterByYear(data, selectedYear))
    const productionRanking = getProductionRanking(yearlyData)
    const productivityRanking = getProductivityRanking(yearlyData)
    const summary = getYearlySummary(yearlyData)
    const trendProvince = selectedProvince || productionRanking[0]?.province || null
    const provinceTrendData = trendProvince
      ? toChartData(filterByProvince(data, trendProvince)).sort((a, b) => a.year - b.year)
      : []

    return {
      years: getAvailableYears(data),
      provinces: getAvailableProvinces(data),
      yearlyData,
      summary,
      productionRanking,
      productivityRanking,
      trendProvince,
      provinceTrendData,
    }
  }, [data, selectedYear, selectedProvince])
}
