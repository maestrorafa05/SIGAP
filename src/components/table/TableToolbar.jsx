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
    <div className="grid gap-3 border-b border-apple-hairline bg-white p-6 lg:grid-cols-[1fr_auto_auto_auto]">
      <label className="relative block">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-apple-muted"
          aria-hidden="true"
        />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari provinsi"
          className="h-11 w-full rounded-full border border-black/10 bg-white pl-12 pr-5 text-[17px] text-apple-ink outline-none transition focus:border-apple-blueFocus focus:ring-2 focus:ring-apple-blueFocus"
        />
      </label>

      {showYearFilter && (
        <select
          value={selectedYear}
          onChange={(event) => onYearChange(event.target.value)}
          className="h-11 rounded-full border border-black/10 bg-white px-5 text-[14px] font-normal text-apple-ink outline-none transition focus:border-apple-blueFocus focus:ring-2 focus:ring-apple-blueFocus"
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
        className="h-11 rounded-full border border-black/10 bg-white px-5 text-[14px] font-normal text-apple-ink outline-none transition focus:border-apple-blueFocus focus:ring-2 focus:ring-apple-blueFocus"
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
        className="apple-pill inline-flex h-11 items-center justify-center gap-2 bg-apple-blue px-[22px] text-[14px] leading-none text-white transition hover:bg-apple-blueFocus"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Export CSV
      </button>
    </div>
  )
}
