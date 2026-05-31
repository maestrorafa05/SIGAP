# Struktur Data & Flow UI Dashboard

## SIGAP SUMATERA

### Sistem Informasi Geografis Agro-Klimatologi Padi Sumatera

---

# 1. Dasar Data

File utama yang digunakan:

**Data_Tanaman_Padi_Sumatera_siap_metabase.xlsx**

Sheet utama:

**Data_Siap_Metabase**

Struktur file:

| Bagian                 | Keterangan        |
| ---------------------- | ----------------- |
| Baris 1                | Judul dataset     |
| Baris 2                | Catatan koordinat |
| Baris 3                | Kosong            |
| Baris 4                | Header kolom      |
| Baris 5 dan seterusnya | Data utama        |

Kolom data utama:

| No | Kolom Excel       | Nama Field di Aplikasi |
| -: | ----------------- | ---------------------- |
|  1 | Provinsi          | province               |
|  2 | Tahun             | year                   |
|  3 | Produksi          | production             |
|  4 | Luas Panen        | harvestArea            |
|  5 | Curah hujan       | rainfall               |
|  6 | Kelembapan        | humidity               |
|  7 | Suhu rata-rata    | avgTemperature         |
|  8 | Negara            | country                |
|  9 | Ibu Kota Provinsi | capitalCity            |
| 10 | Latitude          | latitude               |
| 11 | Longitude         | longitude              |
| 12 | Lokasi Pin        | pinLocation            |
| 13 | Jenis Koordinat   | coordinateType         |
| 14 | Sumber Koordinat  | coordinateSource       |

---

# 2. Tujuan Struktur Data

Struktur data SIGAP SUMATERA harus mendukung kebutuhan berikut:

1. Menampilkan data padi per provinsi.
2. Menampilkan data berdasarkan tahun.
3. Menampilkan marker pada peta berdasarkan latitude dan longitude.
4. Menghitung produktivitas padi secara otomatis.
5. Menampilkan grafik tren dari 1993 sampai 2020.
6. Menampilkan ranking provinsi.
7. Menampilkan insight agro-klimatologi berdasarkan curah hujan, kelembapan, dan suhu.
8. Mudah dikembangkan ke GeoJSON/choropleth map pada tahap berikutnya.

---

# 3. Struktur Data Mentah

Data dari Excel perlu dikonversi menjadi file JSON.

Nama file yang disarankan:

```txt
padi-sumatera.json
```

Lokasi file:

```txt
public/data/padi-sumatera.json
```

Contoh struktur satu record:

```json
{
  "id": "aceh-1993",
  "province": "Aceh",
  "year": 1993,
  "production": 1329536,
  "harvestArea": 323589,
  "rainfall": 1627,
  "humidity": 82,
  "avgTemperature": 26.06,
  "country": "Indonesia",
  "capitalCity": "Banda Aceh",
  "latitude": 5.54829,
  "longitude": 95.323753,
  "pinLocation": "Banda Aceh, Aceh, Indonesia",
  "coordinateType": "Titik ibu kota provinsi (aproksimasi untuk data level provinsi)",
  "coordinateSource": "https://www.latlong.net/place/banda-aceh-banda-aceh-city-aceh-indonesia-25259.html"
}
```

---

# 4. Struktur Data Final untuk Frontend

Untuk aplikasi React, struktur data utama sebaiknya tetap berbentuk array agar mudah difilter, dihitung, dan divisualisasikan.

```js
const riceData = [
  {
    id: "aceh-1993",
    province: "Aceh",
    year: 1993,
    production: 1329536,
    harvestArea: 323589,
    rainfall: 1627,
    humidity: 82,
    avgTemperature: 26.06,
    country: "Indonesia",
    capitalCity: "Banda Aceh",
    latitude: 5.54829,
    longitude: 95.323753,
    pinLocation: "Banda Aceh, Aceh, Indonesia",
    coordinateType: "Titik ibu kota provinsi",
    coordinateSource: "https://www.latlong.net/place/banda-aceh-banda-aceh-city-aceh-indonesia-25259.html"
  }
]
```

---

# 5. TypeScript Interface

Walaupun framework yang digunakan adalah React JS, struktur ini tetap bisa disiapkan dengan pendekatan TypeScript-friendly agar lebih rapi.

```ts
export interface RiceProductionData {
  id: string;
  province: string;
  year: number;
  production: number;
  harvestArea: number;
  rainfall: number;
  humidity: number;
  avgTemperature: number;
  country: string;
  capitalCity: string;
  latitude: number;
  longitude: number;
  pinLocation: string;
  coordinateType: string;
  coordinateSource: string;
}
```

Jika tetap menggunakan JavaScript murni, interface ini bisa dijadikan acuan struktur object saja.

---

# 6. Data Turunan yang Perlu Dihitung

Beberapa data tidak perlu disimpan di Excel, tetapi dihitung langsung oleh sistem.

## 6.1 Produktivitas

```js
productivity = production / harvestArea
```

Contoh hasil:

```js
productivity: 4.11
```

Makna:

```txt
Produktivitas menunjukkan hasil produksi padi dibandingkan luas panen.
```

---

## 6.2 Total Produksi Tahunan

```js
totalProduction = sum(production where year === selectedYear)
```

Digunakan untuk KPI card.

---

## 6.3 Total Luas Panen Tahunan

```js
totalHarvestArea = sum(harvestArea where year === selectedYear)
```

Digunakan untuk KPI card.

---

## 6.4 Rata-rata Produktivitas Tahunan

```js
averageProductivity = totalProduction / totalHarvestArea
```

Digunakan untuk melihat produktivitas agregat Sumatera.

---

## 6.5 Rata-rata Curah Hujan

```js
averageRainfall = average(rainfall where year === selectedYear)
```

---

## 6.6 Rata-rata Kelembapan

```js
averageHumidity = average(humidity where year === selectedYear)
```

---

## 6.7 Rata-rata Suhu

```js
averageTemperature = average(avgTemperature where year === selectedYear)
```

---

# 7. Struktur Data Agregasi Dashboard

Agar dashboard lebih mudah dibangun, buat fungsi transformasi data.

## 7.1 Data Berdasarkan Tahun Aktif

```js
const yearlyData = riceData.filter(
  item => item.year === selectedYear
)
```

Contoh output:

```js
[
  {
    province: "Aceh",
    year: 2020,
    production: 1861567.1,
    harvestArea: 317869.41,
    rainfall: 1627,
    humidity: 80.82,
    avgTemperature: 25.41,
    latitude: 5.54829,
    longitude: 95.323753
  },
  {
    province: "Sumatera Utara",
    year: 2020,
    production: 2076280.01,
    harvestArea: 388591.22,
    rainfall: 2484,
    humidity: 82.1,
    avgTemperature: 26.4,
    latitude: 3.595196,
    longitude: 98.672226
  }
]
```

---

## 7.2 Data Ranking Produksi

```js
const productionRanking = yearlyData
  .sort((a, b) => b.production - a.production)
```

Digunakan untuk ranking provinsi berdasarkan produksi tertinggi.

---

## 7.3 Data Detail Provinsi

```js
const provinceDetailData = riceData.filter(
  item => item.province === selectedProvince
)
```

Digunakan untuk halaman detail provinsi dan grafik tren historis.

---

## 7.4 Data Tren Produksi

```js
const productionTrend = provinceDetailData.map(item => ({
  year: item.year,
  production: item.production
}))
```

---

## 7.5 Data Tren Agro-Klimatologi

```js
const climateTrend = provinceDetailData.map(item => ({
  year: item.year,
  rainfall: item.rainfall,
  humidity: item.humidity,
  avgTemperature: item.avgTemperature
}))
```

---

# 8. Struktur State Aplikasi

State utama yang dibutuhkan pada dashboard:

```js
const [selectedYear, setSelectedYear] = useState(2020)
const [selectedProvince, setSelectedProvince] = useState(null)
const [selectedMetric, setSelectedMetric] = useState("production")
```

Penjelasan:

| State            | Fungsi                                         |
| ---------------- | ---------------------------------------------- |
| selectedYear     | Menentukan tahun data yang aktif               |
| selectedProvince | Menentukan provinsi yang sedang dipilih        |
| selectedMetric   | Menentukan metrik visualisasi pada peta/grafik |

Pilihan `selectedMetric`:

```js
[
  "production",
  "harvestArea",
  "productivity",
  "rainfall",
  "humidity",
  "avgTemperature"
]
```

---

# 9. Struktur Halaman Aplikasi

SIGAP SUMATERA dapat dibuat dengan 4 halaman utama.

```txt
/
├── Home
├── Dashboard
├── Province Detail
├── Data Explorer
└── About
```

---

## 9.1 Home Page

Tujuan:

Menjelaskan apa itu SIGAP SUMATERA dan mengarahkan user ke dashboard.

Komponen:

1. Hero section.
2. Deskripsi singkat aplikasi.
3. Statistik dataset.
4. Preview peta Sumatera.
5. Tombol “Buka Dashboard”.
6. Penjelasan manfaat aplikasi.

Konten utama:

```txt
SIGAP SUMATERA
Sistem Informasi Geografis Agro-Klimatologi Padi Sumatera

Visualisasi data produksi padi, luas panen, dan faktor iklim berbasis wilayah untuk mendukung analisis pertanian Sumatera.
```

---

## 9.2 Dashboard Page

Dashboard adalah halaman utama aplikasi.

Layout yang disarankan:

```txt
┌─────────────────────────────────────────────────────────────┐
│ Header: SIGAP SUMATERA                                      │
│ Filter Tahun | Filter Metrik | Search Provinsi              │
├─────────────────────────────────────────────────────────────┤
│ KPI Card 1 │ KPI Card 2 │ KPI Card 3 │ KPI Card 4            │
├─────────────────────────────────────────────────────────────┤
│ Peta Interaktif Sumatera        │ Ranking Provinsi           │
│                                 │                            │
│                                 │ Top Produksi               │
│                                 │ Top Produktivitas          │
├─────────────────────────────────────────────────────────────┤
│ Grafik Tren Produksi            │ Grafik Agro-Klimatologi     │
├─────────────────────────────────────────────────────────────┤
│ Tabel Data Provinsi Tahun Aktif                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9.3 Province Detail Page

Halaman detail muncul saat user memilih salah satu provinsi.

Layout:

```txt
┌─────────────────────────────────────────────────────────────┐
│ Nama Provinsi + Ibu Kota + Koordinat                         │
├─────────────────────────────────────────────────────────────┤
│ KPI Provinsi: Produksi | Luas Panen | Produktivitas | Iklim  │
├─────────────────────────────────────────────────────────────┤
│ Grafik Tren Produksi 1993–2020                              │
├─────────────────────────────────────────────────────────────┤
│ Grafik Luas Panen & Produktivitas                           │
├─────────────────────────────────────────────────────────────┤
│ Grafik Curah Hujan | Kelembapan | Suhu                      │
├─────────────────────────────────────────────────────────────┤
│ Insight Ringkas Provinsi                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 9.4 Data Explorer Page

Digunakan untuk melihat data dalam bentuk tabel.

Fitur:

1. Search provinsi.
2. Filter tahun.
3. Sorting produksi.
4. Sorting luas panen.
5. Sorting produktivitas.
6. Export CSV.
7. Pagination.

Layout:

```txt
┌─────────────────────────────────────────────────────────────┐
│ Data Explorer SIGAP SUMATERA                                │
│ Search | Filter Tahun | Filter Provinsi | Export             │
├─────────────────────────────────────────────────────────────┤
│ Tabel data lengkap                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 9.5 About Page

Berisi informasi:

1. Tentang SIGAP SUMATERA.
2. Sumber data.
3. Penjelasan variabel.
4. Catatan koordinat.
5. Batasan data.
6. Rencana pengembangan.

---

# 10. Flow Dashboard Utama

## 10.1 User Flow

```txt
User membuka aplikasi
        ↓
User masuk ke halaman Home
        ↓
User klik tombol Buka Dashboard
        ↓
Sistem membuka Dashboard
        ↓
Dashboard menampilkan data default tahun 2020
        ↓
User memilih tahun
        ↓
Sistem filter data berdasarkan tahun
        ↓
KPI, peta, ranking, grafik, dan tabel diperbarui
        ↓
User klik marker provinsi di peta
        ↓
Popup detail provinsi muncul
        ↓
User klik Lihat Detail
        ↓
Sistem membuka halaman Province Detail
        ↓
User melihat tren historis provinsi
```

---

# 11. Flow Data di Dashboard

```txt
padi-sumatera.json
        ↓
Load data ke React
        ↓
Simpan ke state/global store
        ↓
Filter berdasarkan selectedYear
        ↓
Hitung KPI tahunan
        ↓
Generate data peta
        ↓
Generate ranking provinsi
        ↓
Generate data grafik
        ↓
Render dashboard
```

---

# 12. Flow Interaksi Filter Tahun

```txt
User memilih tahun dari dropdown/slider
        ↓
selectedYear berubah
        ↓
Sistem menjalankan filter:
data.year === selectedYear
        ↓
Dashboard KPI diperbarui
        ↓
Marker map diperbarui
        ↓
Ranking provinsi diperbarui
        ↓
Grafik perbandingan diperbarui
        ↓
Tabel data diperbarui
```

Default tahun:

```js
selectedYear = 2020
```

Daftar tahun:

```js
const yearOptions = [
  1993, 1994, 1995, 1996, 1997, 1998, 1999,
  2000, 2001, 2002, 2003, 2004, 2005, 2006,
  2007, 2008, 2009, 2010, 2011, 2012, 2013,
  2014, 2015, 2016, 2017, 2018, 2019, 2020
]
```

---

# 13. Flow Interaksi Peta

```txt
Dashboard memuat yearlyData
        ↓
Sistem mengambil latitude dan longitude setiap provinsi
        ↓
Marker ditampilkan pada peta
        ↓
Ukuran/warna marker disesuaikan dengan selectedMetric
        ↓
User klik marker
        ↓
Popup muncul
        ↓
Popup menampilkan informasi provinsi
        ↓
User dapat membuka detail provinsi
```

Isi popup:

```txt
Provinsi
Tahun
Produksi
Luas Panen
Produktivitas
Curah Hujan
Kelembapan
Suhu Rata-rata
Tombol Lihat Detail
```

---

# 14. Flow Detail Provinsi

```txt
User memilih provinsi
        ↓
selectedProvince terisi
        ↓
Sistem filter:
data.province === selectedProvince
        ↓
Sistem mengambil seluruh data 1993–2020
        ↓
Sistem menghitung tren produksi
        ↓
Sistem menghitung tren produktivitas
        ↓
Sistem menampilkan grafik agro-klimatologi
        ↓
User membaca insight provinsi
```

---

# 15. Komponen Dashboard

## 15.1 Komponen Layout

```txt
AppLayout
Sidebar
Topbar
PageContainer
SectionCard
```

---

## 15.2 Komponen Dashboard

```txt
DashboardPage
KpiSummary
YearFilter
MetricFilter
SumateraMap
ProvinceRanking
ProductionTrendChart
ClimateChart
DataTable
```

---

## 15.3 Komponen Peta

```txt
MapContainer
ProvinceMarker
MapPopup
MapLegend
MetricColorScale
```

---

## 15.4 Komponen Grafik

```txt
ProductionBarChart
ProductionTrendChart
HarvestAreaChart
ProductivityChart
ClimateTrendChart
ProvinceComparisonChart
```

---

## 15.5 Komponen Data

```txt
DataExplorerTable
SearchInput
ProvinceFilter
YearDropdown
ExportButton
Pagination
```

---

# 16. Struktur Folder React JS

```txt
sigap-sumatera/
├── public/
│   └── data/
│       └── padi-sumatera.json
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── KpiSummary.jsx
│   │   │   ├── KpiCard.jsx
│   │   │   ├── YearFilter.jsx
│   │   │   ├── MetricFilter.jsx
│   │   │   └── ProvinceRanking.jsx
│   │   │
│   │   ├── map/
│   │   │   ├── SumateraMap.jsx
│   │   │   ├── ProvinceMarker.jsx
│   │   │   ├── MapPopup.jsx
│   │   │   └── MapLegend.jsx
│   │   │
│   │   ├── charts/
│   │   │   ├── ProductionTrendChart.jsx
│   │   │   ├── HarvestAreaChart.jsx
│   │   │   ├── ProductivityChart.jsx
│   │   │   └── ClimateTrendChart.jsx
│   │   │
│   │   └── table/
│   │       ├── DataExplorerTable.jsx
│   │       └── TableToolbar.jsx
│   │
│   ├── data/
│   │   └── constants.js
│   │
│   ├── hooks/
│   │   ├── useRiceData.js
│   │   ├── useDashboardData.js
│   │   └── useProvinceDetail.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProvinceDetail.jsx
│   │   ├── DataExplorer.jsx
│   │   └── About.jsx
│   │
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── dataTransform.js
│   │   ├── formatter.js
│   │   └── mapUtils.js
│   │
│   ├── App.jsx
│   └── main.jsx
```

---

# 17. Utility Function yang Dibutuhkan

## 17.1 Menghitung Produktivitas

```js
export function calculateProductivity(production, harvestArea) {
  if (!harvestArea || harvestArea === 0) return 0
  return production / harvestArea
}
```

---

## 17.2 Format Angka

```js
export function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value)
}
```

---

## 17.3 Format Produktivitas

```js
export function formatProductivity(value) {
  return value.toFixed(2)
}
```

---

## 17.4 Filter Data Berdasarkan Tahun

```js
export function filterByYear(data, year) {
  return data.filter(item => item.year === year)
}
```

---

## 17.5 Filter Data Berdasarkan Provinsi

```js
export function filterByProvince(data, province) {
  return data.filter(item => item.province === province)
}
```

---

## 17.6 Mengambil Ranking Produksi

```js
export function getProductionRanking(data) {
  return [...data].sort((a, b) => b.production - a.production)
}
```

---

## 17.7 Menghitung KPI Tahunan

```js
export function getYearlySummary(data) {
  const totalProduction = data.reduce((sum, item) => sum + item.production, 0)
  const totalHarvestArea = data.reduce((sum, item) => sum + item.harvestArea, 0)

  const averageProductivity =
    totalHarvestArea > 0 ? totalProduction / totalHarvestArea : 0

  const averageRainfall =
    data.reduce((sum, item) => sum + item.rainfall, 0) / data.length

  const averageHumidity =
    data.reduce((sum, item) => sum + item.humidity, 0) / data.length

  const averageTemperature =
    data.reduce((sum, item) => sum + item.avgTemperature, 0) / data.length

  return {
    totalProduction,
    totalHarvestArea,
    averageProductivity,
    averageRainfall,
    averageHumidity,
    averageTemperature
  }
}
```

---

# 18. Dashboard KPI yang Ditampilkan

KPI utama:

| KPI                     | Sumber Data                        | Keterangan                                       |
| ----------------------- | ---------------------------------- | ------------------------------------------------ |
| Total Produksi          | Sum production                     | Total produksi semua provinsi pada tahun aktif   |
| Total Luas Panen        | Sum harvestArea                    | Total luas panen semua provinsi pada tahun aktif |
| Produktivitas Rata-rata | totalProduction / totalHarvestArea | Efisiensi produksi                               |
| Provinsi Tertinggi      | Max production                     | Provinsi dengan produksi terbesar                |
| Rata-rata Curah Hujan   | Average rainfall                   | Rata-rata curah hujan                            |
| Rata-rata Suhu          | Average avgTemperature             | Rata-rata suhu                                   |

---

# 19. Desain Dashboard yang Direkomendasikan

## 19.1 Header

Isi:

```txt
SIGAP SUMATERA
Sistem Informasi Geografis Agro-Klimatologi Padi Sumatera
```

Kontrol:

```txt
Filter Tahun
Filter Metrik
Search Provinsi
```

---

## 19.2 KPI Section

Card yang ditampilkan:

```txt
Total Produksi
Total Luas Panen
Produktivitas Rata-rata
Provinsi Produksi Tertinggi
```

---

## 19.3 Map Section

Peta menampilkan:

```txt
Marker provinsi
Bubble size berdasarkan metrik
Popup data provinsi
Legend warna/ukuran marker
```

Default metrik peta:

```txt
Produksi
```

---

## 19.4 Analytics Section

Grafik yang ditampilkan:

```txt
Bar chart produksi per provinsi
Line chart tren produksi
Line chart faktor agro-klimatologi
Ranking table
```

---

## 19.5 Data Table Section

Tabel menampilkan:

```txt
Provinsi
Tahun
Produksi
Luas Panen
Produktivitas
Curah Hujan
Kelembapan
Suhu Rata-rata
Ibu Kota Provinsi
Koordinat
```

---

# 20. Flow Visual Dashboard

```txt
[Topbar]
SIGAP SUMATERA + Filter Tahun

[KPI Cards]
Total Produksi | Luas Panen | Produktivitas | Provinsi Tertinggi

[Main Content]
Kiri  : Peta Sumatera
Kanan : Ranking Provinsi

[Chart Section]
Tren Produksi | Agro-Klimatologi

[Table Section]
Data lengkap tahun aktif
```

---

# 21. MVP Dashboard Scope

Untuk versi pertama, fitur yang harus dibuat:

1. Load data JSON.
2. Tampilkan dashboard utama.
3. Tampilkan filter tahun.
4. Tampilkan KPI summary.
5. Tampilkan peta marker provinsi.
6. Tampilkan popup detail provinsi.
7. Tampilkan ranking produksi.
8. Tampilkan grafik produksi per provinsi.
9. Tampilkan tabel data.
10. Tampilkan halaman detail provinsi.

---

# 22. Catatan Pengembangan

Untuk MVP, peta menggunakan latitude dan longitude dari ibu kota provinsi. Artinya visualisasi awal berupa marker map atau bubble map.

Untuk versi lanjutan, aplikasi dapat ditingkatkan menjadi choropleth map dengan menambahkan file GeoJSON batas provinsi Sumatera.

Struktur lanjutan:

```txt
padi-sumatera.json
        +
sumatera-provinsi.geojson
        ↓
Choropleth Map Produksi Padi
```

---

# 23. Kesimpulan

Struktur data SIGAP SUMATERA dibuat berbasis record tahunan per provinsi. Setiap record berisi data produksi padi, luas panen, faktor iklim, serta koordinat lokasi.

Flow dashboard berpusat pada filter tahun. Ketika user memilih tahun, seluruh komponen dashboard seperti KPI, peta, ranking, grafik, dan tabel akan berubah secara otomatis.

Dengan struktur ini, SIGAP SUMATERA dapat dibangun secara bertahap menggunakan React JS, dimulai dari MVP berbasis marker map, lalu dikembangkan menjadi sistem GIS yang lebih lengkap dengan GeoJSON, database, admin panel, dan analisis prediktif.
