import {
  BarChart3,
  CloudRain,
  Database,
  Droplets,
  Home,
  Info,
  LayoutDashboard,
  MapPinned,
  Sprout,
  SunMedium,
  ThermometerSun,
} from "lucide-react"

export const DEFAULT_YEAR = 2020
export const DEFAULT_METRIC = "production"

export const YEAR_OPTIONS = Array.from({ length: 28 }, (_, index) => 1993 + index)

export const METRIC_OPTIONS = [
  {
    key: "production",
    label: "Produksi",
    shortLabel: "Produksi",
    unit: "ton",
    color: "#17623a",
    icon: Sprout,
  },
  {
    key: "harvestArea",
    label: "Luas Panen",
    shortLabel: "Luas",
    unit: "ha",
    color: "#b98312",
    icon: MapPinned,
  },
  {
    key: "productivity",
    label: "Produktivitas",
    shortLabel: "Produktivitas",
    unit: "ton/ha",
    color: "#2f8f52",
    icon: BarChart3,
  },
  {
    key: "rainfall",
    label: "Curah Hujan",
    shortLabel: "Hujan",
    unit: "mm",
    color: "#2498d8",
    icon: CloudRain,
  },
  {
    key: "humidity",
    label: "Kelembapan",
    shortLabel: "Kelembapan",
    unit: "%",
    color: "#15699d",
    icon: Droplets,
  },
  {
    key: "avgTemperature",
    label: "Suhu Rata-rata",
    shortLabel: "Suhu",
    unit: "C",
    color: "#e4b52d",
    icon: ThermometerSun,
  },
]

export const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Data Explorer", path: "/data", icon: Database },
  { label: "About", path: "/about", icon: Info },
]

export const DATASET_STATS = [
  { label: "Provinsi", value: "8" },
  { label: "Rentang Tahun", value: "1993-2020" },
  { label: "Data Historis", value: "224" },
  { label: "Variabel", value: "Produksi, panen, iklim" },
]

export const CHART_COLORS = {
  production: "#17623a",
  harvestArea: "#b98312",
  productivity: "#2f8f52",
  rainfall: "#2498d8",
  humidity: "#15699d",
  avgTemperature: "#e4b52d",
  grid: "#dce6df",
  axis: "#64748b",
}

export const ABOUT_VARIABLES = [
  {
    title: "Produksi",
    description: "Jumlah produksi padi tahunan pada level provinsi.",
    icon: Sprout,
  },
  {
    title: "Luas Panen",
    description: "Luas area panen yang menjadi dasar produktivitas.",
    icon: MapPinned,
  },
  {
    title: "Curah Hujan",
    description: "Volume curah hujan historis yang berkaitan dengan kondisi tanam.",
    icon: CloudRain,
  },
  {
    title: "Kelembapan",
    description: "Rata-rata kelembapan udara pada data agro-klimatologi.",
    icon: Droplets,
  },
  {
    title: "Suhu Rata-rata",
    description: "Rata-rata suhu historis per provinsi dan tahun.",
    icon: SunMedium,
  },
]
