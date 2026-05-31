import { Download, Search } from "lucide-react"

export default function TableToolbar({
  search,
  onSearchChange,
  years,
  selectedYear,
  onYearChange,
  provinces,
  selectedProvince,
  onProvinceChange,
  onExport,
  showYearFilter = true,
}) {
  return (
    <div className="grid gap-3 border-b border-slate-200 bg-white p-4 lg:grid-cols-[1fr_auto_auto_auto]">
      <label className="relative block">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari provinsi"
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-forest-500 focus:bg-white focus:ring-4 focus:ring-forest-100"
        />
      </label>

      {showYearFilter && (
        <select
          value={selectedYear}
          onChange={(event) => onYearChange(event.target.value)}
          className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
          aria-label="Filter tahun tabel"
        >
          <option value="all">Semua Tahun</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}

      <select
        value={selectedProvince}
        onChange={(event) => onProvinceChange(event.target.value)}
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
        aria-label="Filter provinsi tabel"
      >
        <option value="all">Semua Provinsi</option>
        {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onExport}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-forest-700 px-4 text-sm font-semibold text-white transition hover:bg-forest-900"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Export CSV
      </button>
    </div>
  )
}
