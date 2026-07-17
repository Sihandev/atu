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

export const services = [
  {
    id: "kirim-mobil",
    title: "Kirim Mobil",
    description: "Layanan pengiriman mobil dengan berbagai pilihan armada sesuai kebutuhan dan budget Anda.",
    icon: Car,
    useCases: ["Pindah rumah", "Pembelian mobil baru/bekas dari luar kota", "Kendaraan operasional perusahaan"],
    durationFactors: ["Jarak tempuh", "Metode pengiriman", "Kondisi cuaca dan jalur pelayaran"],
    priceFactors: ["Jenis kendaraan (dimensi)", "Metode pengiriman", "Asuransi"],
  },
  {
    id: "kirim-motor",
    title: "Kirim Motor",
    description: "Pengiriman motor aman dan terpercaya ke seluruh pelosok Nusantara.",
    icon: Truck,
    useCases: ["Mudik", "Touring", "Mutasi kendaraan"],
    durationFactors: ["Jarak tempuh", "Jadwal keberangkatan kapal (jika antar pulau)"],
    priceFactors: ["CC motor", "Metode packing", "Asuransi"],
  },
  {
    id: "towing",
    title: "Towing",
    description: "Layanan derek eksklusif door-to-door dengan keamanan maksimal untuk kendaraan Anda.",
    icon: Truck,
    useCases: ["Mobil mewah/sport", "Mobil mogok/kecelakaan", "Pengiriman VIP cepat"],
    durationFactors: ["Jarak", "Kondisi lalu lintas"],
    priceFactors: ["Jarak tempuh", "Jenis mobil (ground clearance dll)"],
  },
  {
    id: "car-carrier",
    title: "Car Carrier",
    description: "Solusi hemat untuk pengiriman kendaraan dalam jumlah besar via truk transporter.",
    icon: Truck,
    useCases: ["Distribusi dealer", "Pengiriman massal perusahaan", "Opsi ekonomis antar kota"],
    durationFactors: ["Waktu konsolidasi muatan", "Rute perjalanan truk"],
    priceFactors: ["Jarak", "Posisi penempatan di carrier"],
  },
  {
    id: "self-drive",
    title: "Self Drive",
    description: "Pengiriman kendaraan dengan driver profesional kami, cocok untuk rute darat cepat.",
    icon: Car,
    useCases: ["Pengiriman mendesak", "Rute yang sulit dijangkau carrier"],
    durationFactors: ["Jarak", "Kondisi fisik driver (waktu istirahat)"],
    priceFactors: ["Jarak", "Biaya operasional (BBM, tol)"],
  },
  {
    id: "antar-pulau",
    title: "Pengiriman Antar Pulau",
    description: "Kombinasi layanan darat dan laut (RoRo/Pelni) untuk jangkauan seluruh Indonesia.",
    icon: Anchor,
    useCases: ["Mutasi tugas beda pulau", "Pengiriman armada luar Jawa"],
    durationFactors: ["Jadwal kapal", "Waktu sandar/bongkar muat"],
    priceFactors: ["Jenis kapal (RoRo/Container)", "Rute pelabuhan"],
  },
];

export const routes = [
  { id: "kirim-mobil-jakarta-makassar", from: "Jakarta", to: "Makassar", time: "4-7 Hari", type: "Laut (RoRo)", methods: ["Car Carrier & RoRo", "Self Drive & RoRo"] },
  { id: "kirim-mobil-jakarta-balikpapan", from: "Jakarta", to: "Balikpapan", time: "3-6 Hari", type: "Laut (RoRo)", methods: ["Car Carrier & RoRo"] },
  { id: "kirim-mobil-jakarta-kendari", from: "Jakarta", to: "Kendari", time: "6-10 Hari", type: "Laut (RoRo)", methods: ["Car Carrier & RoRo"] },
  { id: "kirim-mobil-surabaya-makassar", from: "Surabaya", to: "Makassar", time: "3-5 Hari", type: "Laut (RoRo)", methods: ["Towing & RoRo", "Car Carrier & RoRo"] },
  { id: "kirim-mobil-makassar-balikpapan", from: "Makassar", to: "Balikpapan", time: "3-5 Hari", type: "Laut (RoRo)", methods: ["Car Carrier & RoRo"] },
  { id: "kirim-mobil-jakarta-surabaya", from: "Jakarta", to: "Surabaya", time: "1-2 Hari", type: "Darat", methods: ["Towing", "Car Carrier", "Self Drive"] },
  { id: "kirim-mobil-jakarta-bali", from: "Jakarta", to: "Bali", time: "3-4 Hari", type: "Darat & Laut", methods: ["Car Carrier", "Towing"] },
  { id: "kirim-mobil-jakarta-medan", from: "Jakarta", to: "Medan", time: "4-5 Hari", type: "Darat & Laut", methods: ["Car Carrier", "Kapal Roro"] },
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
    title: "Jalur Laut (Kapal RoRo / Pelni / Container)",
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
    answer: "Biasanya kami membutuhkan fotokopi STNK asli/fotokopi dan KTP pengirim sebagai dokumen pelengkap perjalanan. BPKB tidak diperlukan.",
  },
  {
    question: "Berapa lama estimasi waktu pengiriman?",
    answer: "Waktu pengiriman bervariasi tergantung rute dan metode yang dipilih. Silahkan cek halaman rute atau hubungi kami untuk rute spesifik.",
  },
  {
    question: "Apakah barang boleh ditaruh di dalam mobil saat dikirim?",
    answer: "Sebaiknya hindari menaruh barang berharga. Barang bawaan diperbolehkan dalam batas wajar, namun tidak di-cover oleh asuransi pengiriman kendaraan.",
  }
];

export const articles = [
  {
    id: "cara-kirim-mobil-antar-pulau",
    title: "Cara Kirim Mobil Antar Pulau",
    date: "12 Oct 2023",
    excerpt: "Panduan lengkap prosedur pengiriman mobil antar pulau menggunakan kapal RoRo dan Container.",
    content: "Pengiriman antar pulau memerlukan persiapan khusus. Pertama...",
    image: "/article1.jpg", // placeholder
  },
  {
    id: "perbedaan-towing-dan-car-carrier",
    title: "Perbedaan Towing dan Car Carrier",
    date: "05 Oct 2023",
    excerpt: "Mengenal bedanya layanan derek eksklusif towing dengan truk pengangkut massal car carrier.",
    content: "Towing adalah layanan eksklusif...",
    image: "/article2.jpg", // placeholder
  },
  {
    id: "dokumen-yang-dibutuhkan-untuk-kirim-mobil",
    title: "Dokumen yang Dibutuhkan untuk Kirim Mobil",
    date: "28 Sep 2023",
    excerpt: "Persiapkan dokumen-dokumen ini agar proses pengiriman mobil berjalan lancar.",
    content: "Dokumen utama yang diperlukan adalah...",
    image: "/article3.jpg", // placeholder
  },
];
