import { useEffect, useState } from "react"
import { normalizeRiceData } from "../utils/dataTransform"

export function useRiceData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${import.meta.env.BASE_URL}data/padi-sumatera.json`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error("Data padi Sumatera gagal dimuat.")
        }

        const json = await response.json()
        const normalizedData = normalizeRiceData(json)

        if (!normalizedData.length) {
          throw new Error("Dataset padi Sumatera kosong.")
        }

        setData(normalizedData)
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Terjadi kesalahan saat memuat data.")
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => controller.abort()
  }, [])

  return { data, loading, error }
}
