import { Car, Truck, Anchor, Plane, ArrowRightCircle, CheckCircle } from "lucide-react";

export const brand = {
  name: "KirimKendaraan",
  phone: "+6281234567890", // placeholder
  email: "hello@kirimkendaraan.co.id",
  whatsappMessage: "Halo, saya ingin bertanya tentang layanan pengiriman kendaraan.",
};

export const navigation = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/layanan" },
  { label: "Rute", href: "/rute" },
  { label: "Cara Pengiriman", href: "/cara-pengiriman" },
  { label: "Artikel", href: "/artikel" },
  { label: "Tracking", href: "/tracking" },
  { label: "Tentang", href: "/tentang" },
];

export const servicesList = [
  {
    id: "kirim-mobil",
    title: "Kirim Mobil",
    description: "Layanan pengiriman mobil dengan berbagai pilihan armada sesuai kebutuhan dan budget Anda.",
    icon: Car,
    hero: "Kirim Mobil Aman dan Terpercaya ke Seluruh Indonesia",
    explanation: "Kami melayani pengiriman mobil untuk berbagai keperluan, dari pindahan, jual beli, hingga kebutuhan dinas. Didukung dengan armada yang memadai dan driver berpengalaman.",
    useCases: ["Pindahan Rumah/Kantor", "Pembelian Mobil Luar Kota", "Mobil Dinas", "Mudik/Liburan Panjang"],
    process: ["Booking & Konsultasi", "Penjemputan / Serah Terima", "Inspeksi Kendaraan", "Perjalanan", "Serah Terima di Tujuan"],
    durationFactors: ["Jarak dan Rute", "Metode Pengiriman", "Cuaca dan Kondisi Alam", "Jadwal Kapal (untuk antar pulau)"],
    priceFactors: ["Jenis dan Dimensi Mobil", "Jarak Pengiriman", "Metode Pengiriman", "Asuransi"],
    docsAndSafety: "Kami mewajibkan dokumen asli atau fotokopi STNK & BPKB (tergantung rute). Kendaraan akan diinspeksi bersama dan didokumentasikan sebelum dan sesudah pengiriman.",
    relatedRoutes: ["jakarta-surabaya", "jakarta-medan", "surabaya-makassar"],
    faq: [
      { question: "Apakah bisa kirim mobil mati/mogok?", answer: "Bisa, menggunakan layanan Towing atau Car Carrier, namun ada penyesuaian biaya untuk proses naik/turun kendaraan." },
      { question: "Apakah barang boleh ditaruh di dalam mobil?", answer: "Barang bawaan ringan diperbolehkan dengan syarat bukan barang terlarang/berbahaya. Namun kami tidak bertanggung jawab atas kehilangan barang di dalam mobil." }
    ]
  },
  {
    id: "kirim-motor",
    title: "Kirim Motor",
    description: "Pengiriman motor aman dan terpercaya ke seluruh pelosok Nusantara.",
    icon: Truck,
    hero: "Solusi Kirim Motor Praktis dan Aman",
    explanation: "Layanan pengiriman motor untuk semua jenis, dari motor bebek, matic, sport, hingga moge. Kami memastikan motor Anda terhindar dari lecet dengan packing standar yang baik.",
    useCases: ["Mahasiswa Baru/Lulus", "Pindahan Kerja", "Touring Antar Pulau", "Jual Beli Motor Bekas"],
    process: ["Booking & Konsultasi", "Penjemputan / Drop ke Pool", "Packing & Inspeksi", "Perjalanan", "Serah Terima"],
    durationFactors: ["Jarak Pengiriman", "Jadwal Truk/Kapal", "Kondisi Cuaca"],
    priceFactors: ["Kapasitas Mesin (CC)", "Jarak Pengiriman", "Layanan Door-to-Door / Port-to-Port"],
    docsAndSafety: "Wajib menyertakan fotokopi STNK dan kunci kontak. Kami menyediakan layanan packing (kardus/bubble wrap/karung) untuk meminimalisir lecet.",
    relatedRoutes: ["jakarta-surabaya", "jakarta-bali", "surabaya-balikpapan"],
    faq: [
      { question: "Apakah bensin harus dikosongkan?", answer: "Ya, bensin harus dikosongkan atau disisakan seminimal mungkin untuk alasan keselamatan selama perjalanan." },
      { question: "Apakah spion dilepas?", answer: "Ya, spion biasanya kami lepas dan simpan di bagasi/dibungkus untuk menghindari patah saat proses muat." }
    ]
  },
  {
    id: "towing",
    title: "Towing",
    description: "Layanan derek eksklusif door-to-door dengan keamanan maksimal untuk kendaraan Anda.",
    icon: Truck,
    hero: "Layanan Towing Eksklusif untuk Kendaraan Anda",
    explanation: "Pengiriman kendaraan menggunakan truk towing (derek gendong) di mana 1 truk hanya mengangkut 1 kendaraan. Sangat cocok untuk mobil mewah, mobil sport, atau mobil klasik.",
    useCases: ["Mobil Mewah/Sport", "Mobil Klasik/Pameran", "Kondisi Darurat/Mogok", "Pengiriman Super Cepat"],
    process: ["Booking Instan/Terjadwal", "Towing Menuju Lokasi", "Menaikkan Kendaraan", "Perjalanan Langsung", "Penurunan di Tujuan"],
    durationFactors: ["Jarak Tempuh", "Kondisi Lalu Lintas"],
    priceFactors: ["Jarak Tempuh", "Jenis Kendaraan", "Tingkat Kesulitan Medan"],
    docsAndSafety: "Dokumentasi ketat saat naik dan turun. Truk towing kami dilengkapi dengan sistem hidrolik dan winch yang aman.",
    relatedRoutes: ["jakarta-surabaya", "jakarta-bandung", "surabaya-malang"],
    faq: [
      { question: "Berapa lama waktu tunggu towing?", answer: "Untuk area dalam kota dan rute utama Jawa, towing bisa standby dalam waktu beberapa jam setelah booking konfirmasi." },
      { question: "Apakah mobil ceper bisa naik towing?", answer: "Bisa, kami memiliki unit towing dengan desain bak yang sesuai untuk mobil ground clearance rendah." }
    ]
  },
  {
    id: "car-carrier",
    title: "Car Carrier",
    description: "Solusi hemat untuk pengiriman kendaraan dalam jumlah besar via truk transporter.",
    icon: Truck,
    hero: "Kirim Mobil Lebih Hemat dengan Car Carrier",
    explanation: "Pengiriman menggunakan truk besar yang dapat mengangkut 4-6 mobil sekaligus. Menjadi solusi paling ekonomis untuk pengiriman antar kota dalam pulau yang sama.",
    useCases: ["Pengiriman Dealer/Showroom", "Mutasi Kendaraan Perusahaan", "Pindahan Hemat"],
    process: ["Booking & Konsultasi", "Kumpul di Pool / Pick-up Lokal", "Loading ke Car Carrier", "Perjalanan Terjadwal", "Bongkar di Pool Tujuan"],
    durationFactors: ["Jarak Pengiriman", "Menunggu Kuota Penuh (Tergantung Rute)", "Kondisi Jalan Raya"],
    priceFactors: ["Ukuran Kendaraan (Mempengaruhi Kapasitas Truk)", "Jarak Pengiriman"],
    docsAndSafety: "Pengikatan roda dilakukan dengan standar keamanan tinggi untuk mencegah pergeseran selama di jalan tol atau jalan bergelombang.",
    relatedRoutes: ["jakarta-surabaya", "jakarta-semarang", "surabaya-denpasar"],
    faq: [
      { question: "Apakah harus diantar ke pool?", answer: "Disarankan antar ke pool untuk biaya termurah. Jika ingin dijemput (door-to-door), akan ada tambahan biaya pick-up lokal (biasanya via towing/self drive lokal)." },
      { question: "Berapa lama harus menunggu car carrier berangkat?", answer: "Untuk rute padat seperti Jakarta-Surabaya, biasanya berangkat setiap 1-2 hari. Rute lain mungkin menunggu 3-5 hari." }
    ]
  },
  {
    id: "self-drive",
    title: "Self Drive",
    description: "Pengiriman kendaraan dengan driver profesional kami, cocok untuk rute darat cepat.",
    icon: Car,
    hero: "Kirim Mobil Cepat dengan Driver Profesional (Self Drive)",
    explanation: "Kendaraan Anda akan dikemudikan langsung oleh driver profesional kami menuju lokasi tujuan. Pilihan tepat untuk pengiriman cepat tanpa menunggu jadwal truk atau kapal.",
    useCases: ["Kebutuhan Mendesak", "Rute Pelosok yang Sulit Dilalui Truk", "Mobil Dinas"],
    process: ["Booking & Konsultasi", "Penjemputan oleh Driver", "Pengecekan Kendaraan", "Perjalanan", "Serah Terima"],
    durationFactors: ["Jarak Tempuh", "Kondisi Fisik Driver (Waktu Istirahat)", "Kondisi Lalu Lintas"],
    priceFactors: ["Jarak Tempuh", "Biaya Operasional (Bensin, Tol, Tiket Penyeberangan)", "Jasa Driver"],
    docsAndSafety: "Kendaraan harus dalam kondisi prima dan laik jalan. Driver kami dilengkapi dengan identitas jelas dan memiliki SIM yang sesuai.",
    relatedRoutes: ["jakarta-surabaya", "jakarta-medan", "surabaya-banyuwangi"],
    faq: [
      { question: "Siapa yang menanggung bensin dan tol?", answer: "Biasanya biaya bensin, tol, dan tiket penyeberangan (jika ada) ditanggung oleh pemilik kendaraan, atau bisa di-bundle dalam satu harga penawaran." },
      { question: "Bagaimana jika terjadi kerusakan di jalan?", answer: "Driver kami berkendara secara profesional. Namun jika terjadi force majeure atau kerusakan mesin karena usia, akan dikoordinasikan langsung dengan pemilik." }
    ]
  },
  {
    id: "antar-pulau",
    title: "Pengiriman Antar Pulau",
    description: "Kombinasi layanan darat dan laut (RoRo/Pelni) untuk jangkauan seluruh Indonesia.",
    icon: Anchor,
    hero: "Kirim Kendaraan ke Seluruh Indonesia via Laut",
    explanation: "Layanan logistik kendaraan antar pulau menggunakan kapal RoRo (Roll-on/Roll-off), kapal Pelni, atau kapal kargo, menghubungkan Jawa, Sumatera, Kalimantan, Sulawesi, hingga Papua.",
    useCases: ["Mutasi Kerja Antar Pulau", "Proyek Luar Pulau", "Jual Beli Kendaraan Nasional"],
    process: ["Penjemputan / Drop di Pelabuhan", "Loading ke Kapal", "Pelayaran", "Bongkar Muat di Pelabuhan Tujuan", "Pengantaran ke Alamat"],
    durationFactors: ["Jadwal Kapal", "Cuaca Perairan", "Antrean Sandar di Pelabuhan", "Jarak Pelayaran"],
    priceFactors: ["Jenis Kendaraan", "Tarif Dasar Penyeberangan/Pelayaran", "Biaya Handling Pelabuhan", "Asuransi Marine"],
    docsAndSafety: "Kendaraan akan di-lashing (diikat) di dalam deck kapal agar tidak bergeser saat ombak besar. Wajib mengosongkan bensin hingga batas aman sesuai regulasi pelayaran.",
    relatedRoutes: ["jakarta-makassar", "jakarta-balikpapan", "surabaya-makassar"],
    faq: [
      { question: "Apakah bisa kirim mobil beserta isinya (barang)?", answer: "Beberapa kapal RoRo melarang keras barang di dalam mobil. Sebaiknya konsultasikan terlebih dahulu jenis barang bawaan Anda." },
      { question: "Kenapa jadwal kapal sering berubah?", answer: "Jadwal kapal sangat bergantung pada kondisi cuaca, pasang surut air laut, dan regulasi otoritas pelabuhan (syahbandar)." }
    ]
  },
];

// Re-export for compatibility
export const services = servicesList;

export const routesList = [
  {
    id: "kirim-mobil-jakarta-makassar",
    title: "Kirim Mobil Jakarta - Makassar",
    origin: "Jakarta",
    destination: "Makassar",
    methods: ["Kapal RoRo", "Self Drive + Kapal"],
    duration: "4 - 7 Hari",
    priceFactors: ["Jenis Mobil", "Asuransi", "Layanan Door-to-Door / Port-to-Port"],
    process: ["Pick-up di Jakarta", "Loading di Pelabuhan Tanjung Priok", "Pelayaran ke Makassar", "Bongkar di Pelabuhan Soekarno-Hatta Makassar", "Delivery ke Alamat"],
    transit: "Biasanya merupakan rute direct (langsung) via laut tanpa transit panjang.",
    relatedRoutes: ["jakarta-balikpapan", "surabaya-makassar"],
    faq: [
      { question: "Apakah jadwal kapal Jakarta-Makassar rutin?", answer: "Ya, jadwal kapal RoRo maupun kargo untuk rute ini cukup rutin, biasanya ada pemberangkatan setiap minggu." }
    ]
  },
  {
    id: "kirim-mobil-jakarta-balikpapan",
    title: "Kirim Mobil Jakarta - Balikpapan",
    origin: "Jakarta",
    destination: "Balikpapan",
    methods: ["Kapal RoRo"],
    duration: "5 - 8 Hari",
    priceFactors: ["Ukuran Kendaraan", "Layanan Tambahan (Door/Port)"],
    process: ["Pick-up", "Pelabuhan Tanjung Priok", "Pelayaran", "Pelabuhan Semayang Balikpapan", "Delivery"],
    transit: "Pelayaran langsung atau kadang singgah sebentar di pelabuhan lain tergantung jadwal kapal.",
    relatedRoutes: ["jakarta-makassar", "surabaya-balikpapan"],
    faq: [
      { question: "Apakah aman dari karat air laut?", answer: "Aman, karena mobil dimasukkan ke dalam deck kapal RoRo yang tertutup, bukan di luar." }
    ]
  },
  {
    id: "kirim-mobil-jakarta-kendari",
    title: "Kirim Mobil Jakarta - Kendari",
    origin: "Jakarta",
    destination: "Kendari",
    methods: ["Kapal RoRo", "Kargo Container"],
    duration: "7 - 12 Hari",
    priceFactors: ["Metode Kapal (RoRo vs Container)", "Asuransi"],
    process: ["Pick-up Jakarta", "Pelabuhan", "Pelayaran", "Pelabuhan Kendari", "Delivery"],
    transit: "Bisa jadi transit di Makassar terlebih dahulu sebelum melanjutkan ke Kendari.",
    relatedRoutes: ["jakarta-makassar", "surabaya-kendari"],
    faq: [
      { question: "Kenapa durasinya cukup lama?", answer: "Karena jarak tempuh yang lebih jauh dan kemungkinan adanya waktu tunggu transit antar kapal." }
    ]
  },
  {
    id: "kirim-mobil-surabaya-makassar",
    title: "Kirim Mobil Surabaya - Makassar",
    origin: "Surabaya",
    destination: "Makassar",
    methods: ["Kapal RoRo"],
    duration: "2 - 4 Hari",
    priceFactors: ["Golongan Kendaraan"],
    process: ["Pick-up Surabaya", "Pelabuhan Tanjung Perak", "Pelayaran", "Pelabuhan Soekarno-Hatta", "Delivery"],
    transit: "Pelayaran langsung yang sangat cepat.",
    relatedRoutes: ["jakarta-makassar", "surabaya-balikpapan"],
    faq: [
      { question: "Apakah bisa kirim hari ini?", answer: "Tergantung ketersediaan jadwal kapal hari tersebut. Sebaiknya booking H-2." }
    ]
  },
  {
    id: "kirim-mobil-makassar-balikpapan",
    title: "Kirim Mobil Makassar - Balikpapan",
    origin: "Makassar",
    destination: "Balikpapan",
    methods: ["Kapal RoRo"],
    duration: "2 - 4 Hari",
    priceFactors: ["Golongan Kendaraan", "Door-to-door"],
    process: ["Pick-up Makassar", "Pelabuhan Makassar", "Pelayaran", "Pelabuhan Balikpapan", "Delivery"],
    transit: "Pelayaran langsung via Selat Makassar.",
    relatedRoutes: ["surabaya-makassar", "surabaya-balikpapan"],
    faq: [
      { question: "Berapa jadwal kapal dalam seminggu?", answer: "Biasanya 1-2 kali seminggu tergantung operator pelayaran." }
    ]
  }
];

// For backward compatibility on the home page if needed
export const routes = [
  { from: "Jakarta", to: "Surabaya", time: "1-2 Hari", type: "Darat", id: "kirim-mobil-jakarta-surabaya" },
  { from: "Jakarta", to: "Bali", time: "3-4 Hari", type: "Darat & Laut", id: "kirim-mobil-jakarta-bali" },
  { from: "Jakarta", to: "Medan", time: "4-5 Hari", type: "Darat & Laut", id: "kirim-mobil-jakarta-medan" },
  { from: "Surabaya", to: "Makassar", time: "3-5 Hari", type: "Laut", id: "kirim-mobil-surabaya-makassar" },
];

export const processSteps = [
  {
    step: "01",
    title: "Minta Estimasi Harga",
    description: "Hubungi kami via WhatsApp atau isi form untuk mendapatkan penawaran harga terbaik.",
  },
  {
    step: "02",
    title: "Pilih Metode Pengiriman",
    description: "Konsultasikan dan pilih metode pengiriman yang paling sesuai dengan kebutuhan Anda.",
  },
  {
    step: "03",
    title: "Penjemputan / Serah Terima",
    description: "Tim kami akan melakukan pengecekan kondisi kendaraan sebelum proses pengiriman dimulai.",
  },
  {
    step: "04",
    title: "Proses Pengiriman",
    description: "Kendaraan Anda dalam perjalanan. Anda dapat memantau status pengiriman secara berkala.",
  },
  {
    step: "05",
    title: "Serah Terima Akhir",
    description: "Kendaraan tiba di tujuan dan diserahterimakan dengan pengecekan akhir bersama.",
  },
];

export const shippingMethods = [
  {
    title: "Jalur Darat (Towing / Car Carrier / Self Drive)",
    description: "Metode paling umum untuk pengiriman dalam pulau Jawa dan Sumatera.",
  },
  {
    title: "Jalur Laut (Kapal RoRo / Pelni)",
    description: "Solusi utama untuk pengiriman kendaraan antar pulau di seluruh Indonesia.",
  },
];

export const trustPoints = [
  "Dokumentasi lengkap sebelum pengiriman",
  "Metode pengiriman yang jelas",
  "Komunikasi terpusat dan responsif",
  "Update status pengiriman berkala",
  "Proses serah terima yang terstruktur",
];

export const faqs = [
  {
    question: "Apakah ada asuransi untuk kendaraan yang dikirim?",
    answer: "Ya, kami menyediakan opsi asuransi pengiriman untuk memberikan ketenangan pikiran tambahan bagi Anda.",
  },
  {
    question: "Dokumen apa saja yang dibutuhkan?",
    answer: "Biasanya kami membutuhkan fotokopi STNK dan KTP pengirim sebagai dokumen pelengkap perjalanan. BPKB asli tidak diperlukan.",
  },
  {
    question: "Berapa lama estimasi waktu pengiriman?",
    answer: "Waktu pengiriman bervariasi tergantung rute dan metode yang dipilih. Rute Jawa-Bali umumnya memakan waktu 2-4 hari.",
  },
  {
    question: "Bagaimana cara mengecek status pengiriman?",
    answer: "Anda dapat menggunakan fitur Tracking di website kami dengan memasukkan nomor resi, atau langsung menanyakan kepada admin via WhatsApp."
  },
  {
    question: "Apakah melayani pengiriman dari dan ke seluruh Indonesia?",
    answer: "Ya, kami melayani pengiriman ke hampir seluruh wilayah di Indonesia, baik pulau Jawa, Sumatera, Kalimantan, Sulawesi, Bali, NTB, NTT, hingga Papua."
  }
];

export const articlesList = [
  {
    id: "cara-kirim-mobil-antar-pulau",
    title: "Cara Kirim Mobil Antar Pulau: Panduan Lengkap",
    date: "12 Oct 2023",
    image: "/article1.jpg",
    excerpt: "Memahami proses, syarat, dan estimasi biaya pengiriman mobil antar pulau menggunakan kapal laut.",
    content: "Pengiriman mobil antar pulau merupakan kebutuhan yang semakin tinggi seiring dengan mobilitas masyarakat Indonesia. Baik untuk keperluan pindah tugas, jual-beli kendaraan, maupun liburan, mengirimkan mobil menggunakan jasa ekspedisi terpercaya adalah pilihan tepat.\n\n### Metode Pengiriman Antar Pulau\nMetode yang paling umum digunakan adalah **Kapal RoRo (Roll-on/Roll-off)**. Kapal ini didesain khusus agar kendaraan dapat masuk (roll-on) dan keluar (roll-off) dengan penggeraknya sendiri.\n\n### Persiapan Sebelum Mengirim Mobil\n1. **Kosongkan Barang Berharga**: Pastikan tidak ada barang berharga yang tertinggal di dalam mobil.\n2. **Sisakan Sedikit BBM**: Jangan mengisi tangki bensin penuh, sisakan seperempat saja untuk keamanan pelayaran.\n3. **Cek Kondisi Kendaraan**: Periksa tekanan angin ban, rem, dan aki.\n4. **Siapkan Dokumen**: Fotokopi STNK, KTP Pengirim & Penerima.\n\n### Keuntungan Menggunakan Jasa Kami\nKami menyediakan layanan door-to-door, di mana Anda cukup menunggu di rumah, dan mobil akan kami jemput lalu kami antar sampai ke alamat tujuan dengan aman."
  },
  {
    id: "perbedaan-towing-dan-car-carrier",
    title: "Perbedaan Towing dan Car Carrier, Pilih Mana?",
    date: "05 Oct 2023",
    image: "/article2.jpg",
    excerpt: "Ketahui perbedaan layanan towing dan car carrier agar Anda dapat memilih sesuai kebutuhan dan budget.",
    content: "Saat ingin mengirim mobil via darat, Anda sering dihadapkan pada dua pilihan utama: Towing dan Car Carrier. Apa perbedaannya?\n\n### Towing (Derek Gendong)\nTowing adalah layanan di mana satu truk hanya mengangkut satu mobil. Mobil Anda akan dinaikkan ke atas bak truk dan diantar langsung ke tujuan.\n\n**Kelebihan Towing:**\n- Pengiriman lebih cepat karena langsung berangkat.\n- Sangat aman dan eksklusif.\n- Cocok untuk mobil mewah, mobil sport, atau mobil mogok.\n\n### Car Carrier\nCar carrier adalah truk trailer besar yang dapat mengangkut 4 hingga 6 mobil sekaligus dalam satu perjalanan.\n\n**Kelebihan Car Carrier:**\n- Harga jauh lebih ekonomis.\n- Cocok untuk pengiriman jarak jauh dalam pulau yang sama.\n\n**Kesimpulan:** Jika Anda butuh cepat dan eksklusif, pilih Towing. Jika Anda mencari efisiensi biaya dan tidak terburu-buru, Car Carrier adalah jawabannya."
  },
  {
    id: "dokumen-yang-dibutuhkan-untuk-kirim-mobil",
    title: "Dokumen yang Dibutuhkan untuk Kirim Mobil",
    date: "28 Sep 2023",
    image: "/article3.jpg",
    excerpt: "Persiapkan dokumen-dokumen ini sebelum Anda menyerahkan kendaraan kepada pihak ekspedisi.",
    content: "Pengiriman kendaraan memerlukan keabsahan dokumen untuk menghindari masalah hukum di perjalanan, terutama saat ada pemeriksaan oleh pihak berwajib atau saat akan menyeberang menggunakan kapal.\n\n### Dokumen Utama\n1. **STNK Asli / Fotokopi**: Untuk pengiriman darat dalam pulau, fotokopi STNK biasanya cukup. Namun untuk penyeberangan antar pulau, beberapa pelabuhan mewajibkan STNK asli (akan dikembalikan bersama mobil).\n2. **Fotokopi KTP Pengirim dan Penerima**: Digunakan untuk verifikasi identitas.\n3. **Surat Jalan dari Kepolisian**: Terkadang dibutuhkan untuk pengiriman antar pulau tertentu atau jika STNK sedang dalam proses perpanjangan/mutasi.\n\n### Dokumen Tambahan (Opsional)\n- **Surat Pelepasan (Untuk Kendaraan Perusahaan)**.\n- **Faktur Pembelian** (Jika mobil baru dan belum ada STNK).\n\nSelalu konsultasikan dengan admin kami mengenai syarat dokumen spesifik untuk rute pengiriman Anda."
  },
  {
    id: "apakah-barang-boleh-ditinggal-di-mobil",
    title: "Apakah Barang Boleh Ditinggal di Mobil Saat Dikirim?",
    date: "15 Sep 2023",
    image: "/article1.jpg",
    excerpt: "Pertanyaan yang paling sering ditanyakan pelanggan. Temukan jawabannya di sini.",
    content: "Banyak pelanggan yang memanfaatkan pengiriman mobil sekaligus untuk mengirim barang-barang pindahan dengan cara menaruhnya di dalam mobil. Bolehkah hal ini dilakukan?\n\n### Kebijakan Umum\nSecara umum, kami **tidak merekomendasikan** meninggalkan barang di dalam mobil. Namun, kami memaklumi jika ada barang bawaan ringan (misalnya pakaian atau dokumen tidak berharga).\n\n### Syarat Jika Membawa Barang\n1. **Bukan Barang Berharga / Mudah Pecah**: Jangan tinggalkan laptop, perhiasan, atau barang elektronik mahal.\n2. **Bukan Barang Terlarang**: Senjata, narkoba, bahan mudah terbakar (termasuk parfum gas) sangat dilarang.\n3. **Tidak Menutupi Pandangan Driver**: Jika dikirim via car carrier atau kapal RoRo, petugas harus bisa memindahkan mobil. Barang yang terlalu penuh hingga menutupi kaca spion dalam atau jendela sangat membahayakan.\n\n### Disclaimer\nPihak ekspedisi dan asuransi **tidak menanggung kehilangan atau kerusakan barang** yang ditaruh di dalam mobil. Asuransi hanya mencakup fisik kendaraan itu sendiri."
  },
  {
    id: "penyebab-pengiriman-kendaraan-terlambat",
    title: "Penyebab Pengiriman Kendaraan Terlambat",
    date: "02 Sep 2023",
    image: "/article2.jpg",
    excerpt: "Memahami faktor-faktor yang bisa menyebabkan estimasi waktu pengiriman bergeser.",
    content: "Meskipun kami selalu berusaha menepati estimasi waktu yang diberikan, ada kalanya pengiriman kendaraan mengalami keterlambatan. Hal ini biasanya disebabkan oleh faktor *Force Majeure* atau hal di luar kendali kami.\n\n### Faktor Alam dan Cuaca\nIni adalah penyebab paling umum, terutama untuk rute laut. Cuaca buruk, ombak tinggi, atau badai dapat membuat syahbandar melarang kapal berlayar hingga kondisi aman.\n\n### Kendala Teknis Kendaraan Pengangkut\nMeskipun armada kami dirawat secara rutin, kerusakan tak terduga pada truk (seperti pecah ban di jalan tol atau masalah mesin) bisa terjadi dan memakan waktu perbaikan.\n\n### Kemacetan Lalu Lintas\nPada musim liburan panjang atau mudik lebaran, jalur darat akan mengalami kemacetan parah yang berdampak pada waktu tempuh towing atau car carrier.\n\n### Antrean Pelabuhan\nKadang kala, kepadatan di pelabuhan membuat truk pengangkut atau kapal harus mengantre berjam-jam bahkan berhari-hari untuk bisa bongkar muat."
  },
  {
    id: "tips-memilih-jasa-kirim-mobil",
    title: "Tips Memilih Jasa Kirim Mobil yang Aman",
    date: "20 Aug 2023",
    image: "/article3.jpg",
    excerpt: "Jangan salah pilih. Ikuti panduan ini untuk mendapatkan layanan logistik kendaraan yang terbaik.",
    content: "Mempercayakan aset bernilai puluhan hingga ratusan juta rupiah kepada pihak lain tentu membutuhkan kehati-hatian. Berikut adalah tips memilih jasa pengiriman mobil yang terpercaya.\n\n### 1. Cek Legalitas Perusahaan\nPastikan perusahaan memiliki izin usaha yang jelas, alamat kantor fisik yang valid, dan nomor kontak yang responsif.\n\n### 2. Transparansi Harga\nHindari jasa yang memberikan harga sangat murah di awal namun banyak biaya tersembunyi (hidden cost) di akhir. Jasa yang baik akan merinci biaya dari awal (termasuk asuransi, biaya pelabuhan, dll).\n\n### 3. Fasilitas Asuransi\nPastikan mereka bekerja sama dengan perusahaan asuransi terpercaya untuk perlindungan *Marine Cargo* atau asuransi perjalanan.\n\n### 4. Sistem Tracking\nJasa ekspedisi profesional biasanya memiliki sistem tracking atau customer service yang siap memberikan update posisi kendaraan Anda setiap saat.\n\n### 5. Dokumentasi Serah Terima\nPerhatikan bagaimana mereka melakukan proses serah terima. Perusahaan yang baik akan melakukan inspeksi fisik kendaraan secara detail dan mencatatnya dalam formulir serah terima."
  },
  {
    id: "cara-kirim-mobil-hasil-pembelian-dari-luar-kota",
    title: "Cara Kirim Mobil Hasil Pembelian dari Luar Kota",
    date: "10 Aug 2023",
    image: "/article1.jpg",
    excerpt: "Membeli mobil impian dari kota lain? Begini cara amannya untuk membawa mobil tersebut pulang.",
    content: "Di era digital, membeli mobil bekas impian tak lagi terbatas pada kota tempat tinggal Anda. Namun, bagaimana cara membawa mobil tersebut pulang jika Anda tidak sempat mengambilnya sendiri?\n\n### Langkah-langkah Pengiriman\n1. **Selesaikan Transaksi Jual Beli**: Pastikan transaksi dengan penjual sudah selesai dan dokumen kendaraan sudah lengkap.\n2. **Hubungi Jasa Pengiriman Terpercaya**: Kami dapat membantu mengambil mobil tersebut langsung dari lokasi penjual (Door to Door).\n3. **Inspeksi oleh Tim Kami**: Saat penjemputan, tim kami akan melakukan inspeksi fisik eksterior dan mencocokkan dokumen. Kami akan mengirimkan foto/video kondisi mobil kepada Anda secara real-time.\n4. **Proses Pengiriman**: Mobil akan dikirim menggunakan Towing (untuk keamanan maksimal) atau Car Carrier menuju kota Anda.\n5. **Penerimaan**: Anda tinggal menunggu di rumah hingga mobil impian tiba.\n\nDengan layanan ini, proses beli mobil antar kota menjadi jauh lebih praktis dan bebas repot."
  }
];

// For backward compatibility on the home page if needed
export const articles = [
  {
    title: articlesList[0].title,
    date: articlesList[0].date,
    image: articlesList[0].image,
    id: articlesList[0].id,
  },
  {
    title: articlesList[1].title,
    date: articlesList[1].date,
    image: articlesList[1].image,
    id: articlesList[1].id,
  },
  {
    title: articlesList[2].title,
    date: articlesList[2].date,
    image: articlesList[2].image,
    id: articlesList[2].id,
  },
];
