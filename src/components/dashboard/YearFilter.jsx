export default function YearFilter({ years, selectedYear, onChange }) {
  const minYear = years[0] ?? 1993
  const maxYear = years[years.length - 1] ?? 2020

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
      <label htmlFor="year-filter" className="text-sm font-semibold text-slate-700">
        Tahun
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          id="year-filter"
          value={selectedYear}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-forest-500 focus:ring-4 focus:ring-forest-100"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={selectedYear}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-2 flex-1 accent-forest-700"
          aria-label="Slider tahun"
        />
      </div>
    </div>
  )
}
