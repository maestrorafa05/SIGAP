import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"
import { calculateProductivity, slugifyProvince } from "../../utils/calculations"
import { getAvailableProvinces, getAvailableYears } from "../../utils/dataTransform"
import { formatDecimal, formatNumber } from "../../utils/formatter"
import TableToolbar from "./TableToolbar"

function csvEscape(value) {
  const stringValue = String(value ?? "")
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

function exportRows(rows) {
  const headers = [
    "Provinsi",
    "Tahun",
    "Produksi",
    "Luas Panen",
    "Produktivitas",
    "Curah Hujan",
    "Kelembapan",
    "Suhu Rata-rata",
    "Ibu Kota Provinsi",
    "Latitude",
    "Longitude",
  ]

  const body = rows.map((item) => [
    item.province,
    item.year,
    item.production,
    item.harvestArea,
    calculateProductivity(item.production, item.harvestArea),
    item.rainfall,
    item.humidity,
    item.avgTemperature,
    item.capitalCity,
    item.latitude,
    item.longitude,
  ])

  const csv = [headers, ...body].map((row) => row.map(csvEscape).join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "padi-sumatera.csv"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function DataExplorerTable({
  data,
  fixedYear = null,
  showToolbar = true,
  compact = false,
}) {
  const [search, setSearch] = useState("")
  const [selectedYear, setSelectedYear] = useState(fixedYear ?? "all")
  const [selectedProvince, setSelectedProvince] = useState("all")
  const [sorting, setSorting] = useState([{ id: "production", desc: true }])
  const years = useMemo(() => getAvailableYears(data), [data])
  const provinces = useMemo(() => getAvailableProvinces(data), [data])

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const activeYear = fixedYear ?? selectedYear

    return data.filter((item) => {
      const matchesSearch =
        !normalizedSearch || item.province.toLowerCase().includes(normalizedSearch)
      const matchesYear = activeYear === "all" || item.year === Number(activeYear)
      const matchesProvince =
        selectedProvince === "all" || item.province === selectedProvince

      return matchesSearch && matchesYear && matchesProvince
    })
  }, [data, fixedYear, search, selectedProvince, selectedYear])

  const columns = useMemo(
    () => [
      {
        accessorKey: "province",
        header: "Provinsi",
        cell: ({ row }) => (
          <Link
            to={`/province/${slugifyProvince(row.original.province)}`}
            className="font-semibold text-apple-blue hover:text-apple-blueFocus"
          >
            {row.original.province}
          </Link>
        ),
      },
      {
        accessorKey: "year",
        header: "Tahun",
      },
      {
        accessorKey: "production",
        header: "Produksi",
        cell: ({ getValue }) => `${formatNumber(getValue())} ton`,
      },
      {
        accessorKey: "harvestArea",
        header: "Luas Panen",
        cell: ({ getValue }) => `${formatNumber(getValue())} ha`,
      },
      {
        id: "productivity",
        header: "Produktivitas",
        accessorFn: (row) => calculateProductivity(row.production, row.harvestArea),
        cell: ({ getValue }) => `${formatDecimal(getValue(), 2)} ton/ha`,
      },
      {
        accessorKey: "rainfall",
        header: "Curah Hujan",
        cell: ({ getValue }) => `${formatDecimal(getValue(), 1)} mm`,
      },
      {
        accessorKey: "humidity",
        header: "Kelembapan",
        cell: ({ getValue }) => `${formatDecimal(getValue(), 1)}%`,
      },
      {
        accessorKey: "avgTemperature",
        header: "Suhu Rata-rata",
        cell: ({ getValue }) => `${formatDecimal(getValue(), 2)} C`,
      },
      {
        accessorKey: "capitalCity",
        header: "Ibu Kota",
      },
      {
        accessorKey: "latitude",
        header: "Latitude",
        cell: ({ getValue }) => formatDecimal(getValue(), 5),
      },
      {
        accessorKey: "longitude",
        header: "Longitude",
        cell: ({ getValue }) => formatDecimal(getValue(), 5),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: compact ? 8 : 12,
      },
    },
  })

  const sortedRows = table.getSortedRowModel().rows.map((row) => row.original)

  return (
    <section className="overflow-hidden rounded-[18px] border border-apple-hairline bg-white">
      {showToolbar && (
        <TableToolbar
          search={search}
          onSearchChange={setSearch}
          years={years}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          provinces={provinces}
          selectedProvince={selectedProvince}
          onProvinceChange={setSelectedProvince}
          onExport={() => exportRows(sortedRows)}
          showYearFilter={fixedYear === null}
        />
      )}

      {!showToolbar && (
        <div className="border-b border-apple-hairline p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[14px] font-normal leading-[1.43] text-apple-muted">
                Tabel Tahun Aktif
              </p>
              <h2 className="apple-display text-[28px] font-semibold leading-[1.14] text-apple-ink">
                Data Provinsi {fixedYear}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => exportRows(sortedRows)}
              className="apple-pill inline-flex h-10 items-center justify-center border border-apple-blue px-5 text-[14px] text-apple-blue transition hover:bg-apple-pearl"
            >
              Export CSV
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full border-collapse text-left text-[14px]">
          <thead className="bg-apple-parchment text-[12px] text-apple-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted()

                  return (
                    <th key={header.id} className="px-4 py-3 font-semibold">
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sorted === "asc" ? (
                          <ChevronDown className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
                        ) : sorted === "desc" ? (
                          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <ChevronsUpDown className="h-3.5 w-3.5 text-apple-muted" aria-hidden="true" />
                        )}
                      </button>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-apple-hairline">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-apple-pearl">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-apple-ink">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!table.getRowModel().rows.length && (
        <div className="border-t border-apple-hairline px-4 py-12 text-center">
          <p className="font-semibold text-apple-ink">Data tidak ditemukan</p>
          <p className="text-[14px] text-apple-muted">Ubah filter untuk melihat data lain.</p>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-apple-hairline bg-apple-parchment px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] text-apple-muted">
          {filteredData.length} baris data
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-apple-hairline bg-white text-apple-ink disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="min-w-28 text-center text-[14px] font-semibold text-apple-ink">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-apple-hairline bg-white text-apple-ink disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
