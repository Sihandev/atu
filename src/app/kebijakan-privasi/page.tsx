import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | KirimKendaraan",
  description: "Kebijakan Privasi layanan pengiriman kendaraan kami.",
};

export default function KebijakanPrivasiPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />
      <Section className="bg-slate-50 border-b border-slate-200 py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Kebijakan Privasi</h1>
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
            <h2>1. Pengumpulan Informasi</h2>
            <p>Kami mengumpulkan informasi pribadi yang Anda berikan secara langsung kepada kami, seperti saat Anda membuat akun, meminta penawaran, atau menghubungi layanan pelanggan kami. Informasi ini dapat mencakup nama, alamat email, nomor telepon, dan alamat fisik Anda.</p>

            <h2>2. Penggunaan Informasi</h2>
            <p>Informasi yang kami kumpulkan digunakan untuk menyediakan, memelihara, dan meningkatkan layanan kami. Ini termasuk untuk memproses transaksi, mengirimkan pembaruan pengiriman, dan menanggapi permintaan layanan pelanggan.</p>

            <h2>3. Berbagi Informasi</h2>
            <p>Kami tidak menjual, memperdagangkan, atau menyewakan informasi identitas pribadi Anda kepada orang lain. Kami dapat membagikan informasi demografis gabungan umum yang tidak terkait dengan informasi identitas pribadi apa pun mengenai pengunjung dan pengguna dengan mitra bisnis, afiliasi tepercaya, dan pengiklan kami untuk tujuan yang diuraikan di atas.</p>

            <h2>4. Keamanan Data</h2>
            <p>Kami menerapkan praktik pengumpulan, penyimpanan, dan pemrosesan data yang sesuai serta langkah-langkah keamanan untuk melindungi dari akses, perubahan, pengungkapan, atau perusakan yang tidak sah atas informasi pribadi Anda.</p>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
