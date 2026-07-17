import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan | KirimKendaraan",
  description: "Syarat dan Ketentuan penggunaan layanan pengiriman kendaraan kami.",
};

export default function SyaratKetentuanPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />
      <Section className="bg-slate-50 border-b border-slate-200 py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Syarat & Ketentuan</h1>
            <p className="text-lg text-slate-600">Terakhir diperbarui: 15 Oktober 2023</p>
          </div>
        </Container>
      </Section>
      <Section className="py-12 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8">
              <strong>Catatan:</strong> Dokumen ini merupakan placeholder dan memerlukan tinjauan hukum resmi sebelum digunakan untuk publik.
            </div>
            <h2>1. Penerimaan Syarat</h2>
            <p>Dengan mengakses dan menggunakan layanan kami, Anda menerima dan setuju untuk terikat oleh syarat dan ketentuan perjanjian ini.</p>

            <h2>2. Layanan Pengiriman</h2>
            <p>Kami menyediakan layanan logistik pengiriman kendaraan. Waktu pengiriman yang diberikan adalah estimasi dan bukan jaminan pasti, karena dapat dipengaruhi oleh faktor eksternal seperti cuaca, lalu lintas, dan kondisi operasional lainnya.</p>

            <h2>3. Tanggung Jawab Pengguna</h2>
            <p>Anda bertanggung jawab untuk memastikan kendaraan dalam kondisi yang layak untuk dikirim sesuai kesepakatan dan memastikan tidak ada barang ilegal atau berbahaya di dalam kendaraan.</p>

            <h2>4. Pembatasan Tanggung Jawab</h2>
            <p>Kecuali ditentukan lain dalam polis asuransi tambahan, tanggung jawab kami atas kehilangan atau kerusakan terbatas pada syarat yang tercantum dalam dokumen resi pengiriman standar.</p>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
