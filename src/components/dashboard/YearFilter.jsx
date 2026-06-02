export default function YearFilter({ years, selectedYear, onChange }) {
  const minYear = years[0] ?? 1993
  const maxYear = years[years.length - 1] ?? 2020

  return (
    <div className="rounded-[18px] border border-apple-hairline bg-white p-6">
      <label htmlFor="year-filter" className="text-[17px] font-semibold text-apple-ink">
        Tahun
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          id="year-filter"
          value={selectedYear}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-11 rounded-full border border-black/10 bg-white px-5 text-[17px] font-normal text-apple-ink outline-none transition focus:border-apple-blueFocus focus:ring-2 focus:ring-apple-blueFocus"
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
          className="h-2 flex-1 accent-apple-blue"
          aria-label="Slider tahun"
        />
      </div>
    </div>
  )
}
