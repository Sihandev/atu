import { Car, Truck, Anchor, Plane, ArrowRightCircle, CheckCircle } from "lucide-react";

export const brand = {
  name: "KirimKendaraan",
  phone: "+6281234567890", // placeholder
  email: "hello@kirimkendaraan.co.id",
  whatsappMessage: "Halo, saya ingin bertanya tentang layanan pengiriman kendaraan.",
};

export const navigation = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "#layanan" },
  { label: "Rute", href: "#rute" },
  { label: "Cara Pengiriman", href: "#cara-pengiriman" },
  { label: "Artikel", href: "#artikel" },
  { label: "Tracking", href: "#tracking" },
  { label: "Tentang", href: "#tentang" },
];

export const services = [
  {
    title: "Kirim Mobil",
    description: "Layanan pengiriman mobil dengan berbagai pilihan armada sesuai kebutuhan dan budget Anda.",
    icon: Car,
  },
  {
    title: "Kirim Motor",
    description: "Pengiriman motor aman dan terpercaya ke seluruh pelosok Nusantara.",
    icon: Truck,
  },
  {
    title: "Towing",
    description: "Layanan derek eksklusif door-to-door dengan keamanan maksimal untuk kendaraan Anda.",
    icon: Truck,
  },
  {
    title: "Car Carrier",
    description: "Solusi hemat untuk pengiriman kendaraan dalam jumlah besar via truk transporter.",
    icon: Truck,
  },
  {
    title: "Self Drive",
    description: "Pengiriman kendaraan dengan driver profesional kami, cocok untuk rute darat cepat.",
    icon: Car,
  },
  {
    title: "Pengiriman Antar Pulau",
    description: "Kombinasi layanan darat dan laut (RoRo/Pelni) untuk jangkauan seluruh Indonesia.",
    icon: Anchor,
  },
];

export const routes = [
  { from: "Jakarta", to: "Surabaya", time: "1-2 Hari", type: "Darat" },
  { from: "Jakarta", to: "Bali", time: "3-4 Hari", type: "Darat & Laut" },
  { from: "Jakarta", to: "Medan", time: "4-5 Hari", type: "Darat & Laut" },
  { from: "Surabaya", to: "Makassar", time: "3-5 Hari", type: "Laut" },
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
    answer: "Biasanya kami membutuhkan fotokopi STNK dan KTP pengirim sebagai dokumen pelengkap perjalanan.",
  },
  {
    question: "Berapa lama estimasi waktu pengiriman?",
    answer: "Waktu pengiriman bervariasi tergantung rute dan metode yang dipilih. Rute Jawa-Bali umumnya memakan waktu 2-4 hari.",
  },
];

export const articles = [
  {
    title: "Tips Mempersiapkan Mobil Sebelum Dikirim via Towing",
    date: "12 Oct 2023",
    image: "/article1.jpg", // placeholder
  },
  {
    title: "Perbedaan Kapal RoRo dan Container untuk Pengiriman Mobil",
    date: "05 Oct 2023",
    image: "/article2.jpg", // placeholder
  },
  {
    title: "Panduan Lengkap Kirim Motor Antar Pulau",
    date: "28 Sep 2023",
    image: "/article3.jpg", // placeholder
  },
];