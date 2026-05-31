# PRD — SIGAP SUMATERA

## Sistem Informasi Geografis Agro-Klimatologi Padi Sumatera

---

## 1. Informasi Dokumen

| Item            | Keterangan                                                |
| --------------- | --------------------------------------------------------- |
| Nama Produk     | SIGAP SUMATERA                                            |
| Kepanjangan     | Sistem Informasi Geografis Agro-Klimatologi Padi Sumatera |
| Jenis Produk    | Web-based Geographic Information System Dashboard         |
| Framework Utama | React JS                                                  |
| Data Utama      | Data Tanaman Padi Sumatera Siap Visualisasi Peta          |
| Versi Dokumen   | PRD v1.0                                                  |
| Tujuan Dokumen  | Menjadi acuan awal pengembangan aplikasi SIGAP SUMATERA   |

---

## 2. Ringkasan Produk

SIGAP SUMATERA adalah aplikasi sistem informasi geografis berbasis web yang digunakan untuk menampilkan, memantau, dan menganalisis data hasil panen padi di wilayah Sumatera berdasarkan data historis per provinsi dan tahun.

Aplikasi ini menggabungkan data produksi padi, luas panen, curah hujan, kelembapan, suhu rata-rata, serta koordinat ibu kota provinsi untuk divisualisasikan dalam bentuk peta interaktif, dashboard statistik, grafik tren, dan tabel analitik.

Melalui SIGAP SUMATERA, pengguna dapat memahami persebaran produksi padi di Sumatera serta melihat hubungan antara faktor agro-klimatologi dengan hasil produksi padi dari waktu ke waktu.

---

## 3. Latar Belakang

Data hasil panen padi sering kali tersedia dalam bentuk tabel statis, seperti Excel atau CSV. Format tersebut cukup untuk penyimpanan data, tetapi kurang efektif untuk melihat pola wilayah, tren historis, dan hubungan antara kondisi iklim dengan hasil produksi.

Sumatera sebagai salah satu wilayah penting dalam sektor pertanian memiliki karakteristik iklim dan produktivitas padi yang berbeda-beda di setiap provinsi. Oleh karena itu, dibutuhkan sistem digital yang mampu menampilkan data tersebut secara visual dan interaktif.

SIGAP SUMATERA hadir sebagai solusi digitalisasi data pertanian padi berbasis wilayah. Sistem ini tidak hanya menampilkan angka produksi, tetapi juga memberikan konteks spasial dan klimatologis agar data lebih mudah dipahami dan dianalisis.

---

## 4. Permasalahan yang Ingin Diselesaikan

Beberapa permasalahan utama yang ingin diselesaikan melalui SIGAP SUMATERA adalah:

1. Data produksi padi masih sulit dipahami jika hanya disajikan dalam bentuk tabel.
2. Belum ada visualisasi spasial yang menunjukkan persebaran produksi padi per provinsi di Sumatera.
3. Sulit membandingkan performa produksi antarprovinsi dari tahun ke tahun.
4. Hubungan antara produksi padi dan faktor iklim seperti curah hujan, kelembapan, dan suhu belum mudah dianalisis.
5. Pengguna membutuhkan dashboard yang ringkas, informatif, dan mudah digunakan untuk membaca kondisi pertanian padi di Sumatera.

---

## 5. Tujuan Produk

Tujuan utama SIGAP SUMATERA adalah membangun aplikasi web GIS yang mampu:

1. Menampilkan data hasil panen padi Sumatera secara geografis.
2. Menyediakan dashboard analitik untuk membaca produksi padi per provinsi dan tahun.
3. Memudahkan pengguna membandingkan produksi, luas panen, dan produktivitas antarwilayah.
4. Menampilkan hubungan antara data pertanian dan faktor agro-klimatologi.
5. Mengubah data tabular menjadi sistem visual interaktif yang mudah dipahami.
6. Menjadi dasar pengembangan sistem monitoring pertanian yang lebih luas di masa depan.

---

## 6. Ruang Lingkup Data

Data yang digunakan pada tahap awal berasal dari file:

**Data_Tanaman_Padi_Sumatera_siap_metabase.xlsx**

Dataset berisi data historis tanaman padi untuk wilayah Sumatera dengan cakupan:

| Komponen        | Keterangan                                                  |
| --------------- | ----------------------------------------------------------- |
| Jumlah Data     | 224 baris                                                   |
| Jumlah Provinsi | 8 provinsi                                                  |
| Rentang Tahun   | 1993–2020                                                   |
| Level Wilayah   | Provinsi                                                    |
| Jenis Lokasi    | Titik ibu kota provinsi sebagai aproksimasi lokasi provinsi |

### 6.1 Daftar Provinsi

Provinsi yang tersedia dalam dataset:

1. Aceh
2. Sumatera Utara
3. Sumatera Barat
4. Riau
5. Jambi
6. Sumatera Selatan
7. Bengkulu
8. Lampung

### 6.2 Kolom Data Utama

| Kolom             | Fungsi                     |
| ----------------- | -------------------------- |
| Provinsi          | Nama provinsi              |
| Tahun             | Tahun data                 |
| Produksi          | Jumlah produksi padi       |
| Luas Panen        | Luas area panen            |
| Curah hujan       | Data curah hujan           |
| Kelembapan        | Data kelembapan udara      |
| Suhu rata-rata    | Data suhu rata-rata        |
| Negara            | Negara lokasi data         |
| Ibu Kota Provinsi | Nama ibu kota provinsi     |
| Latitude          | Titik koordinat lintang    |
| Longitude         | Titik koordinat bujur      |
| Lokasi Pin        | Nama lokasi pin pada peta  |
| Jenis Koordinat   | Penjelasan jenis koordinat |
| Sumber Koordinat  | Sumber referensi koordinat |

---

## 7. Catatan Penting Data

Koordinat latitude dan longitude pada dataset merepresentasikan titik ibu kota provinsi, bukan batas geografis seluruh provinsi.

Artinya, pada tahap awal aplikasi dapat menampilkan data dalam bentuk:

1. Marker map berdasarkan ibu kota provinsi.
2. Bubble map berdasarkan nilai produksi.
3. Popup informasi per provinsi.
4. Dashboard analitik per wilayah.

Untuk visualisasi peta berbentuk area provinsi atau choropleth map, sistem membutuhkan tambahan file GeoJSON batas provinsi Sumatera.

---

## 8. Target Pengguna

### 8.1 Pengguna Utama

| Pengguna                     | Kebutuhan                                         |
| ---------------------------- | ------------------------------------------------- |
| Mahasiswa / Peneliti         | Menganalisis data produksi padi dan faktor iklim  |
| Pemerintah / Dinas Pertanian | Melihat persebaran dan tren produksi per wilayah  |
| Analis Data                  | Membandingkan performa provinsi dan tren historis |
| Masyarakat Umum              | Melihat informasi pertanian padi secara visual    |
| Admin Sistem                 | Mengelola data dan memperbarui dataset            |

### 8.2 Persona Pengguna

#### Persona 1 — Analis Pertanian

Seorang analis ingin mengetahui provinsi mana yang memiliki produksi padi tertinggi pada tahun tertentu, serta melihat apakah curah hujan dan suhu memiliki hubungan terhadap produksi.

#### Persona 2 — Mahasiswa / Peneliti

Seorang mahasiswa ingin menggunakan SIGAP SUMATERA untuk tugas, penelitian, atau visualisasi data pertanian berbasis GIS.

#### Persona 3 — Pengambil Kebijakan

Seorang pejabat atau staf dinas ingin melihat ringkasan performa produksi padi setiap provinsi dalam bentuk dashboard yang mudah dipahami.

---

## 9. Value Proposition

SIGAP SUMATERA memberikan nilai utama berupa:

1. Data padi lebih mudah dipahami melalui peta dan dashboard.
2. Analisis wilayah menjadi lebih cepat dan visual.
3. Pengguna dapat melihat tren produksi historis dari tahun 1993 sampai 2020.
4. Faktor agro-klimatologi dapat dibandingkan dengan hasil produksi padi.
5. Sistem dapat menjadi prototype digitalisasi data pertanian berbasis GIS.

---

## 10. Fitur Utama

## 10.1 Dashboard Ringkasan

Dashboard menampilkan informasi utama berdasarkan tahun yang dipilih.

### Komponen Dashboard

| Komponen                    | Keterangan                                               |
| --------------------------- | -------------------------------------------------------- |
| Total Produksi              | Total produksi padi seluruh provinsi pada tahun terpilih |
| Total Luas Panen            | Total luas panen seluruh provinsi pada tahun terpilih    |
| Rata-rata Produktivitas     | Produksi dibagi luas panen                               |
| Provinsi Produksi Tertinggi | Provinsi dengan produksi tertinggi                       |
| Provinsi Produksi Terendah  | Provinsi dengan produksi terendah                        |
| Rata-rata Curah Hujan       | Rata-rata curah hujan seluruh provinsi                   |
| Rata-rata Kelembapan        | Rata-rata kelembapan seluruh provinsi                    |
| Rata-rata Suhu              | Rata-rata suhu seluruh provinsi                          |

### Acceptance Criteria

1. User dapat melihat total produksi berdasarkan tahun.
2. User dapat melihat provinsi dengan produksi tertinggi.
3. Semua angka berubah otomatis saat filter tahun diubah.
4. Data ditampilkan dalam format yang mudah dibaca.

---

## 10.2 Peta Interaktif Sumatera

Peta digunakan untuk menampilkan persebaran data padi per provinsi berdasarkan titik koordinat ibu kota provinsi.

### Fitur Peta

1. Menampilkan marker untuk setiap provinsi.
2. Marker berada pada latitude dan longitude dari dataset.
3. Ukuran atau warna marker dapat merepresentasikan nilai produksi.
4. User dapat klik marker untuk melihat detail provinsi.
5. Peta dapat di-zoom dan digeser.
6. Peta menampilkan popup informasi.

### Informasi Popup

Saat user klik marker provinsi, sistem menampilkan:

| Informasi      | Keterangan            |
| -------------- | --------------------- |
| Provinsi       | Nama provinsi         |
| Tahun          | Tahun aktif           |
| Produksi       | Produksi padi         |
| Luas Panen     | Luas panen            |
| Produktivitas  | Produksi / luas panen |
| Curah Hujan    | Data curah hujan      |
| Kelembapan     | Data kelembapan       |
| Suhu Rata-rata | Data suhu rata-rata   |

### Acceptance Criteria

1. Semua provinsi pada dataset muncul sebagai marker.
2. Marker berubah sesuai filter tahun.
3. Popup menampilkan data sesuai provinsi dan tahun yang dipilih.
4. Tidak ada marker kosong tanpa data.

---

## 10.3 Filter Tahun

Filter tahun digunakan untuk memilih data historis dari tahun 1993 sampai 2020.

### Fitur Filter

1. Dropdown tahun.
2. Slider tahun.
3. Default tahun menampilkan tahun terbaru, yaitu 2020.
4. Ketika tahun berubah, dashboard, peta, grafik, dan tabel ikut berubah.

### Acceptance Criteria

1. User dapat memilih tahun dari 1993 sampai 2020.
2. Data berubah sesuai tahun yang dipilih.
3. Tahun aktif terlihat jelas pada dashboard.

---

## 10.4 Grafik Tren Produksi

Grafik ini menampilkan perkembangan produksi padi dari tahun ke tahun.

### Fitur

1. Line chart produksi per provinsi.
2. User dapat memilih satu provinsi.
3. Sistem menampilkan tren produksi 1993–2020.
4. Grafik dapat membandingkan beberapa provinsi jika diperlukan.

### Acceptance Criteria

1. Grafik menampilkan data historis sesuai provinsi.
2. Sumbu X menampilkan tahun.
3. Sumbu Y menampilkan produksi.
4. Grafik mudah dibaca dan responsif.

---

## 10.5 Grafik Luas Panen dan Produktivitas

Produktivitas dihitung dengan rumus:

**Produktivitas = Produksi / Luas Panen**

### Fitur

1. Menampilkan luas panen per provinsi.
2. Menampilkan produktivitas per provinsi.
3. Membandingkan produksi dengan luas panen.
4. Membantu melihat efisiensi hasil panen.

### Acceptance Criteria

1. Produktivitas dihitung otomatis oleh sistem.
2. User dapat melihat provinsi dengan produktivitas tertinggi.
3. Grafik berubah sesuai tahun atau provinsi yang dipilih.

---

## 10.6 Grafik Agro-Klimatologi

Grafik agro-klimatologi digunakan untuk melihat faktor iklim yang berhubungan dengan produksi padi.

### Variabel yang Ditampilkan

1. Curah hujan
2. Kelembapan
3. Suhu rata-rata

### Fitur

1. Menampilkan tren curah hujan per provinsi.
2. Menampilkan tren kelembapan per provinsi.
3. Menampilkan tren suhu rata-rata per provinsi.
4. Membandingkan faktor iklim dengan produksi padi.

### Acceptance Criteria

1. User dapat melihat grafik iklim per provinsi.
2. Data iklim sesuai dengan tahun dan provinsi yang dipilih.
3. Grafik dapat membantu analisis hubungan produksi dengan kondisi iklim.

---

## 10.7 Ranking Provinsi

Fitur ranking digunakan untuk membandingkan performa provinsi pada tahun tertentu.

### Ranking yang Ditampilkan

1. Ranking produksi tertinggi.
2. Ranking luas panen terbesar.
3. Ranking produktivitas tertinggi.
4. Ranking curah hujan tertinggi.
5. Ranking suhu rata-rata tertinggi.

### Acceptance Criteria

1. Ranking berubah sesuai tahun yang dipilih.
2. User dapat melihat urutan provinsi secara jelas.
3. Tabel ranking dapat diurutkan berdasarkan kolom tertentu.

---

## 10.8 Tabel Data

Tabel data digunakan untuk melihat detail dataset dalam format tabular.

### Fitur Tabel

1. Search nama provinsi.
2. Filter tahun.
3. Sorting kolom.
4. Pagination.
5. Export data ke CSV, jika diperlukan.
6. Menampilkan semua kolom penting dari dataset.

### Acceptance Criteria

1. User dapat mencari provinsi.
2. User dapat filter tahun.
3. User dapat sort berdasarkan produksi, luas panen, atau produktivitas.
4. Data tabel konsisten dengan dashboard dan peta.

---

## 10.9 Halaman Detail Provinsi

Halaman detail provinsi menampilkan analisis lengkap untuk satu provinsi.

### Isi Halaman

1. Nama provinsi.
2. Ibu kota provinsi.
3. Koordinat lokasi.
4. Total produksi tahun terbaru.
5. Tren produksi 1993–2020.
6. Tren luas panen.
7. Tren curah hujan.
8. Tren kelembapan.
9. Tren suhu rata-rata.
10. Ringkasan insight provinsi.

### Acceptance Criteria

1. User dapat membuka halaman detail dari marker peta atau tabel.
2. Data yang ditampilkan hanya milik provinsi yang dipilih.
3. Grafik historis tampil lengkap dari 1993 sampai 2020.

---

## 11. User Flow

## 11.1 Flow Utama Pengguna

1. User membuka aplikasi SIGAP SUMATERA.
2. User melihat dashboard ringkasan tahun terbaru.
3. User memilih tahun melalui filter.
4. Sistem memperbarui data dashboard, peta, grafik, dan tabel.
5. User klik marker provinsi pada peta.
6. Sistem menampilkan popup detail provinsi.
7. User membuka halaman detail provinsi.
8. User melihat tren historis dan data agro-klimatologi.

---

## 12. Struktur Halaman Aplikasi

### 12.1 Home / Landing Page

Berisi pengenalan aplikasi SIGAP SUMATERA.

Komponen:

1. Hero section.
2. Deskripsi singkat sistem.
3. Statistik singkat dataset.
4. Tombol menuju dashboard.
5. Ringkasan manfaat aplikasi.

### 12.2 Dashboard Page

Halaman utama aplikasi.

Komponen:

1. KPI cards.
2. Filter tahun.
3. Peta interaktif.
4. Grafik produksi.
5. Ranking provinsi.
6. Tabel data.

### 12.3 Province Detail Page

Halaman analisis per provinsi.

Komponen:

1. Informasi provinsi.
2. Grafik tren produksi.
3. Grafik luas panen.
4. Grafik produktivitas.
5. Grafik agro-klimatologi.
6. Ringkasan insight.

### 12.4 Data Table Page

Halaman eksplorasi data.

Komponen:

1. Tabel seluruh data.
2. Search.
3. Filter tahun.
4. Filter provinsi.
5. Sorting.
6. Export data.

### 12.5 About Page

Halaman penjelasan tentang aplikasi, dataset, metodologi, dan batasan data.

---

## 13. Kebutuhan Teknis

## 13.1 Frontend

| Kebutuhan        | Rekomendasi                        |
| ---------------- | ---------------------------------- |
| Framework        | React JS                           |
| Build Tool       | Vite                               |
| Styling          | Tailwind CSS                       |
| Map Library      | React Leaflet                      |
| Chart Library    | Recharts                           |
| Table            | TanStack Table                     |
| State Management | Zustand / Context API              |
| Routing          | React Router                       |
| Data Format      | JSON hasil konversi dari Excel/CSV |

---

## 13.2 Backend

Untuk MVP, backend belum wajib karena data masih bersifat statis dan dapat disimpan sebagai file JSON di folder public.

Namun untuk pengembangan lanjutan, backend dapat menggunakan:

| Kebutuhan   | Rekomendasi               |
| ----------- | ------------------------- |
| Database    | Supabase / PostgreSQL     |
| API         | Express JS / Supabase API |
| Auth        | Supabase Auth             |
| Admin Panel | Custom Admin Dashboard    |

---

## 14. Struktur Data Aplikasi

Contoh struktur data yang digunakan aplikasi:

```json
{
  "provinsi": "Aceh",
  "tahun": 2020,
  "produksi": 1861567.1,
  "luas_panen": 317869.41,
  "curah_hujan": 1627,
  "kelembapan": 80.82,
  "suhu_rata_rata": 25.41,
  "negara": "Indonesia",
  "ibu_kota_provinsi": "Banda Aceh",
  "latitude": 5.54829,
  "longitude": 95.323753,
  "lokasi_pin": "Banda Aceh, Aceh, Indonesia"
}
```

---

## 15. Perhitungan Data Turunan

Sistem perlu menghitung beberapa metrik turunan.

### 15.1 Produktivitas

Rumus:

**Produktivitas = Produksi / Luas Panen**

Fungsi:

Mengetahui efisiensi produksi padi berdasarkan luas panen.

### 15.2 Total Produksi Tahunan

Rumus:

**Total Produksi Tahun Tertentu = Jumlah Produksi Seluruh Provinsi pada Tahun Terpilih**

### 15.3 Rata-rata Iklim

Rumus:

**Rata-rata Curah Hujan = Jumlah Curah Hujan Semua Provinsi / Jumlah Provinsi**

Hal yang sama berlaku untuk kelembapan dan suhu rata-rata.

---

## 16. Kebutuhan Visualisasi

### 16.1 Peta

Jenis peta untuk MVP:

1. Marker map.
2. Bubble map.
3. Popup map.

Jenis peta untuk pengembangan lanjutan:

1. Choropleth map.
2. GeoJSON province boundary map.
3. Heatmap produksi.

### 16.2 Grafik

Jenis grafik yang dibutuhkan:

| Grafik        | Fungsi                                                  |
| ------------- | ------------------------------------------------------- |
| Line Chart    | Melihat tren produksi dari tahun ke tahun               |
| Bar Chart     | Membandingkan provinsi pada tahun tertentu              |
| Area Chart    | Melihat pola perkembangan historis                      |
| Scatter Plot  | Melihat hubungan produksi dengan curah hujan/suhu       |
| Ranking Table | Menampilkan urutan provinsi berdasarkan metrik tertentu |

---

## 17. Desain UI/UX

Karakter visual SIGAP SUMATERA:

1. Modern.
2. Clean.
3. Informatif.
4. Bernuansa pertanian dan geospasial.
5. Mudah dipahami oleh pengguna non-teknis.

### 17.1 Warna Utama

Rekomendasi warna:

| Warna            | Makna                          |
| ---------------- | ------------------------------ |
| Hijau            | Pertanian, padi, produktivitas |
| Kuning Keemasan  | Panen, padi matang             |
| Biru             | Data iklim, curah hujan        |
| Putih / Abu Muda | Clean dashboard background     |
| Hijau Tua        | Highlight data penting         |

### 17.2 Gaya Tampilan

1. Sidebar navigation.
2. Dashboard card dengan rounded corner.
3. Peta besar sebagai pusat visual.
4. Grafik ringkas dan mudah dibaca.
5. Tabel data dengan filter yang jelas.
6. Responsif untuk laptop dan tablet.

---

## 18. Functional Requirements

| Kode   | Requirement                                                           | Prioritas |
| ------ | --------------------------------------------------------------------- | --------- |
| FR-001 | Sistem menampilkan dashboard utama                                    | High      |
| FR-002 | Sistem menampilkan peta interaktif Sumatera                           | High      |
| FR-003 | Sistem menampilkan marker provinsi berdasarkan latitude dan longitude | High      |
| FR-004 | Sistem menyediakan filter tahun                                       | High      |
| FR-005 | Sistem memperbarui data berdasarkan tahun yang dipilih                | High      |
| FR-006 | Sistem menampilkan popup detail provinsi                              | High      |
| FR-007 | Sistem menampilkan grafik tren produksi                               | High      |
| FR-008 | Sistem menampilkan ranking provinsi                                   | Medium    |
| FR-009 | Sistem menampilkan tabel data lengkap                                 | Medium    |
| FR-010 | Sistem menyediakan halaman detail provinsi                            | Medium    |
| FR-011 | Sistem menghitung produktivitas otomatis                              | High      |
| FR-012 | Sistem menampilkan grafik agro-klimatologi                            | Medium    |
| FR-013 | Sistem menyediakan fitur search dan sorting data                      | Medium    |
| FR-014 | Sistem dapat dikembangkan dengan GeoJSON untuk choropleth map         | Low       |

---

## 19. Non-Functional Requirements

| Kode    | Requirement      | Keterangan                                              |
| ------- | ---------------- | ------------------------------------------------------- |
| NFR-001 | Performance      | Dashboard harus dapat dimuat dengan cepat               |
| NFR-002 | Responsiveness   | Tampilan harus rapi di desktop dan tablet               |
| NFR-003 | Usability        | Mudah digunakan oleh pengguna non-teknis                |
| NFR-004 | Maintainability  | Struktur kode mudah dikembangkan                        |
| NFR-005 | Data Consistency | Data dashboard, peta, grafik, dan tabel harus konsisten |
| NFR-006 | Scalability      | Sistem dapat dikembangkan untuk provinsi/kabupaten lain |
| NFR-007 | Accessibility    | Warna dan teks harus mudah dibaca                       |
| NFR-008 | Reliability      | Sistem tidak error saat filter data berubah             |

---

## 20. Batasan MVP

MVP SIGAP SUMATERA memiliki beberapa batasan:

1. Data masih bersifat historis, bukan real-time.
2. Data wilayah masih pada level provinsi.
3. Koordinat menggunakan titik ibu kota provinsi sebagai aproksimasi.
4. Peta awal menggunakan marker, bukan batas area provinsi.
5. Tidak ada input data dari user pada tahap awal.
6. Backend belum wajib pada tahap MVP.
7. Belum ada sistem login pada tahap awal.

---

## 21. Pengembangan Lanjutan

Fitur yang dapat dikembangkan setelah MVP:

1. Integrasi GeoJSON batas provinsi.
2. Choropleth map berdasarkan produksi padi.
3. Upload data Excel oleh admin.
4. Login admin.
5. Database Supabase.
6. Analisis korelasi produksi dengan faktor iklim.
7. Prediksi produksi padi menggunakan machine learning.
8. Data level kabupaten/kota.
9. Export laporan PDF.
10. Dashboard perbandingan antarprovinsi.
11. Sistem rekomendasi wilayah prioritas.
12. Integrasi API cuaca.

---

## 22. Success Metrics

Keberhasilan SIGAP SUMATERA dapat diukur dari:

1. User dapat memahami persebaran produksi padi melalui peta.
2. User dapat memilih tahun dan melihat perubahan data.
3. User dapat membandingkan produksi antarprovinsi.
4. User dapat melihat tren produksi dari tahun 1993–2020.
5. User dapat melihat hubungan awal antara faktor iklim dan hasil panen.
6. Aplikasi dapat berjalan stabil dengan data yang tersedia.
7. UI mudah digunakan dan informatif.

---

## 23. Acceptance Criteria Utama MVP

MVP dianggap selesai apabila:

1. Aplikasi berhasil menampilkan dashboard utama.
2. Data tahun 1993–2020 berhasil dimuat.
3. Delapan provinsi Sumatera berhasil ditampilkan.
4. Peta menampilkan marker berdasarkan latitude dan longitude.
5. Filter tahun berjalan dengan benar.
6. Popup marker menampilkan data provinsi sesuai tahun.
7. Grafik produksi historis berhasil ditampilkan.
8. Ranking provinsi berdasarkan produksi berhasil ditampilkan.
9. Tabel data dapat dicari, difilter, dan diurutkan.
10. Tampilan aplikasi responsif dan layak untuk dipresentasikan.

---

## 24. Roadmap Pengembangan

### Phase 1 — Data Preparation

1. Membersihkan data Excel.
2. Mengonversi data menjadi JSON.
3. Menstandarkan nama kolom.
4. Menambahkan perhitungan produktivitas.
5. Menyiapkan struktur data untuk frontend.

### Phase 2 — Frontend Foundation

1. Membuat project React JS dengan Vite.
2. Setup Tailwind CSS.
3. Setup routing.
4. Membuat layout dashboard.
5. Membuat komponen reusable.

### Phase 3 — Dashboard & Map

1. Membuat KPI cards.
2. Membuat filter tahun.
3. Membuat peta interaktif.
4. Menampilkan marker provinsi.
5. Membuat popup informasi provinsi.

### Phase 4 — Analytics & Charts

1. Membuat grafik tren produksi.
2. Membuat grafik luas panen.
3. Membuat grafik produktivitas.
4. Membuat grafik agro-klimatologi.
5. Membuat ranking provinsi.

### Phase 5 — Finalization

1. Membuat halaman detail provinsi.
2. Membuat tabel data.
3. Memperbaiki UI/UX.
4. Testing filter dan konsistensi data.
5. Deploy aplikasi.

---

## 25. Rekomendasi Struktur Folder

```txt
sigap-sumatera/
├── public/
│   └── data/
│       └── padi-sumatera.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── charts/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── map/
│   │   └── table/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProvinceDetail.jsx
│   │   ├── DataTable.jsx
│   │   └── About.jsx
│   ├── utils/
│   │   ├── dataTransform.js
│   │   ├── formatter.js
│   │   └── calculations.js
│   ├── App.jsx
│   └── main.jsx
```

---

## 26. Risiko dan Mitigasi

| Risiko                                  | Dampak                                             | Mitigasi                                                                 |
| --------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| Data koordinat hanya titik ibu kota     | Peta belum merepresentasikan luas wilayah provinsi | Jelaskan sebagai aproksimasi dan tambahkan GeoJSON pada versi berikutnya |
| Data tidak real-time                    | Tidak bisa digunakan untuk monitoring langsung     | Posisikan sebagai monitoring historis dan analitik                       |
| Nama provinsi tidak konsisten           | Data gagal dicocokkan dengan peta                  | Standarisasi nama provinsi saat data preparation                         |
| Grafik terlalu ramai                    | User sulit membaca insight                         | Batasi jumlah grafik per halaman dan gunakan filter                      |
| User non-teknis kesulitan memahami data | Aplikasi kurang efektif                            | Gunakan KPI, warna, tooltip, dan penjelasan sederhana                    |

---

## 27. Kesimpulan

SIGAP SUMATERA merupakan sistem informasi geografis berbasis web yang bertujuan untuk mendigitalisasi data hasil panen padi di wilayah Sumatera dengan pendekatan agro-klimatologi.

Dengan memanfaatkan data produksi, luas panen, curah hujan, kelembapan, suhu rata-rata, serta koordinat lokasi, aplikasi ini dapat membantu pengguna memahami persebaran dan tren produksi padi secara lebih visual, interaktif, dan informatif.

Pada tahap MVP, SIGAP SUMATERA akan fokus pada dashboard, peta marker, filter tahun, grafik tren, ranking provinsi, dan tabel data. Setelah MVP selesai, sistem dapat dikembangkan lebih lanjut menjadi platform GIS pertanian yang lebih komprehensif dengan dukungan GeoJSON, database, admin panel, dan analisis prediktif.
