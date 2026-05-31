import { ABOUT_VARIABLES } from "../data/constants"

export default function About() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
          Tentang
        </p>
        <h1 className="mt-1 text-3xl font-black text-slate-950">SIGAP SUMATERA</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
          SIGAP SUMATERA adalah dashboard GIS web untuk memvisualisasikan data historis
          produksi padi, luas panen, produktivitas, dan faktor agro-klimatologi di
          delapan provinsi Sumatera.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
          <h2 className="text-2xl font-bold text-slate-950">Tujuan Aplikasi</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Aplikasi ini membantu mahasiswa, peneliti, analis data, dan pemangku
            kebijakan membaca persebaran produksi padi Sumatera melalui peta marker,
            KPI, ranking, grafik tren, dan tabel eksplorasi data.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-slate-950">Dataset</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Sumber data MVP berasal dari file Excel
            <span className="font-semibold"> Data_Tanaman_Padi_Sumatera_siap_metabase.xlsx</span>
            , lalu dikonversi menjadi JSON statis pada
            <span className="font-semibold"> public/data/padi-sumatera.json</span>.
            Dataset mencakup 224 baris historis dari tahun 1993 sampai 2020.
          </p>
          <div className="mt-6 rounded-lg border border-harvest-100 bg-harvest-100/60 p-4">
            <p className="font-semibold text-slate-900">Catatan koordinat</p>
            <p className="mt-2 leading-6 text-slate-700">
              Latitude dan longitude merepresentasikan titik ibu kota provinsi, bukan
              batas geografis provinsi. Karena itu MVP menggunakan marker map dan bubble
              map, belum choropleth map.
            </p>
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
          <h2 className="text-2xl font-bold text-slate-950">Batasan MVP</h2>
          <div className="mt-4 space-y-3">
            {[
              "Data bersifat historis dan belum real-time.",
              "Cakupan wilayah berada pada level provinsi.",
              "Koordinat memakai titik ibu kota provinsi.",
              "Belum tersedia GeoJSON batas provinsi untuk choropleth.",
              "Aplikasi belum memakai backend, login, atau admin panel.",
            ].map((item) => (
              <div key={item} className="rounded-lg bg-slate-50 px-4 py-3 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <h2 className="text-2xl font-bold text-slate-950">Variabel Data</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {ABOUT_VARIABLES.map((variable) => {
            const Icon = variable.icon
            return (
              <article key={variable.title} className="rounded-lg bg-slate-50 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-forest-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-slate-950">{variable.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {variable.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
