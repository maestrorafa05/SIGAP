import { AlertCircle } from "lucide-react"
import DataExplorerTable from "../components/table/DataExplorerTable"
import { useRiceData } from "../hooks/useRiceData"

function PageState({ title, text }) {
  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-center">
      <div>
        <AlertCircle className="mx-auto h-9 w-9 text-slate-400" aria-hidden="true" />
        <h2 className="mt-3 text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-slate-500">{text}</p>
      </div>
    </div>
  )
}

export default function DataExplorer() {
  const { data, loading, error } = useRiceData()

  if (loading) {
    return <PageState title="Memuat data" text="Tabel data historis sedang disiapkan." />
  }

  if (error) {
    return <PageState title="Data gagal dimuat" text={error} />
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
          Data Explorer
        </p>
        <h1 className="mt-1 text-3xl font-black text-slate-950">
          Dataset Padi Sumatera
        </h1>
        <p className="mt-2 max-w-3xl leading-7 text-slate-600">
          Tabel lengkap produksi, luas panen, produktivitas, data iklim, ibu kota, dan
          koordinat provinsi.
        </p>
      </section>

      <DataExplorerTable data={data} />
    </div>
  )
}
