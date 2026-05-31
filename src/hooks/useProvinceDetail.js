import { useMemo } from "react"
import { getProvinceInsight, slugifyProvince } from "../utils/calculations"
import { toChartData } from "../utils/dataTransform"

export function useProvinceDetail(data, provinceSlug) {
  return useMemo(() => {
    const provinceData = toChartData(
      data.filter((item) => slugifyProvince(item.province) === provinceSlug),
    ).sort((a, b) => a.year - b.year)

    const latestRecord = provinceData[provinceData.length - 1] ?? null
    const firstRecord = provinceData[0] ?? null
    const insight = getProvinceInsight(provinceData)

    return {
      provinceData,
      latestRecord,
      firstRecord,
      insight,
      notFound: !provinceData.length,
    }
  }, [data, provinceSlug])
}
