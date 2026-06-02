import { AlertCircle } from "lucide-react"
import DataExplorerTable from "../components/table/DataExplorerTable"
import { useRiceData } from "../hooks/useRiceData"

function PageState({ title, text }) {
  return (
    <div className="apple-tile bg-apple-parchment py-16">
      <div className="mx-auto flex min-h-[360px] max-w-[980px] items-center justify-center rounded-[18px] border border-dashed border-apple-hairline bg-white text-center">
        <div>
          <AlertCircle className="mx-auto h-9 w-9 text-apple-muted" aria-hidden="true" />
          <h2 className="apple-display mt-3 text-[28px] font-semibold leading-[1.14] text-apple-ink">
            {title}
          </h2>
          <p className="mt-2 text-[17px] text-apple-muted">{text}</p>
        </div>
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
    <div className="bg-apple-parchment">
      <section className="apple-tile bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1440px]">
          <p className="apple-display text-[21px] font-semibold leading-[1.19] text-apple-ink">
            Data Explorer
          </p>
          <h1 className="apple-display mt-2 text-[40px] font-semibold leading-[1.1] text-apple-ink sm:text-[56px] sm:leading-[1.07]">
            Dataset Padi Sumatera
          </h1>
          <p className="mt-4 max-w-3xl text-[17px] leading-[1.47] text-apple-muted">
            Tabel lengkap produksi, luas panen, produktivitas, data iklim, ibu kota,
            dan koordinat provinsi.
          </p>
        </div>
      </section>

      <section className="apple-tile py-8">
        <div className="mx-auto max-w-[1440px]">
          <DataExplorerTable data={data} />
        </div>
      </section>
    </div>
  )
}
