import { ABOUT_VARIABLES } from "../data/constants"

export default function About() {
  return (
    <div>
      <section className="apple-tile bg-apple-tile py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="apple-display text-[21px] font-semibold leading-[1.19]">
            Tentang
          </p>
          <h1 className="apple-display mt-3 text-[42px] font-semibold leading-[1.07] sm:text-[56px]">
            SIGAP SUMATERA
          </h1>
          <p className="mt-5 text-[21px] leading-[1.47] text-[#cccccc] sm:text-[24px] sm:font-light sm:leading-[1.5]">
            Dashboard GIS web untuk memvisualisasikan data historis produksi padi,
            luas panen, produktivitas, dan faktor agro-klimatologi di delapan provinsi
            Sumatera.
          </p>
        </div>
      </section>

      <section className="apple-tile bg-apple-parchment py-16">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[1fr_0.85fr]">
          <article className="rounded-[18px] border border-apple-hairline bg-white p-6">
            <h2 className="apple-display text-[34px] font-semibold leading-[1.47] text-apple-ink">
              Tujuan Aplikasi
            </h2>
            <p className="mt-3 text-[17px] leading-[1.47] text-apple-muted">
              Aplikasi ini membantu mahasiswa, peneliti, analis data, dan pemangku
              kebijakan membaca persebaran produksi padi Sumatera melalui peta marker,
              KPI, ranking, grafik tren, dan tabel eksplorasi data.
            </p>
            <h2 className="apple-display mt-8 text-[34px] font-semibold leading-[1.47] text-apple-ink">
              Dataset
            </h2>
            <p className="mt-3 text-[17px] leading-[1.47] text-apple-muted">
              Sumber data MVP berasal dari file Excel
              <span className="font-semibold text-apple-ink"> Data_Tanaman_Padi_Sumatera_siap_metabase.xlsx</span>
              , lalu dikonversi menjadi JSON statis pada
              <span className="font-semibold text-apple-ink"> public/data/padi-sumatera.json</span>.
              Dataset mencakup 224 baris historis dari tahun 1993 sampai 2020.
            </p>
            <div className="mt-6 rounded-[18px] border border-apple-hairline bg-apple-pearl p-5">
              <p className="font-semibold text-apple-ink">Catatan koordinat</p>
              <p className="mt-2 text-[17px] leading-[1.47] text-apple-muted">
                Latitude dan longitude merepresentasikan titik ibu kota provinsi, bukan
                batas geografis provinsi. Karena itu MVP menggunakan marker map dan
                bubble map, belum choropleth map.
              </p>
            </div>
          </article>

          <article className="rounded-[18px] border border-apple-hairline bg-white p-6">
            <h2 className="apple-display text-[34px] font-semibold leading-[1.47] text-apple-ink">
              Batasan MVP
            </h2>
            <div className="mt-4 space-y-3">
              {[
                "Data bersifat historis dan belum real-time.",
                "Cakupan wilayah berada pada level provinsi.",
                "Koordinat memakai titik ibu kota provinsi.",
                "Belum tersedia GeoJSON batas provinsi untuk choropleth.",
                "Aplikasi belum memakai backend, login, atau admin panel.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-apple-hairline bg-apple-pearl px-5 py-4 text-[17px] leading-[1.47] text-apple-muted"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="apple-tile bg-white py-16">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="apple-display text-[40px] font-semibold leading-[1.1] text-apple-ink">
            Variabel Data
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {ABOUT_VARIABLES.map((variable) => {
              const Icon = variable.icon
              return (
                <article
                  key={variable.title}
                  className="rounded-[18px] border border-apple-hairline bg-white p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-apple-pearl text-apple-blue">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold leading-[1.24] text-apple-ink">
                    {variable.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.43] text-apple-muted">
                    {variable.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
