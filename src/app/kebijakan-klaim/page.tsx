import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Klaim Asuransi | KirimKendaraan",
  description: "Prosedur dan kebijakan klaim asuransi pengiriman kendaraan.",
};

export default function KebijakanKlaimPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />
      <Section className="bg-slate-50 border-b border-slate-200 py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Kebijakan Klaim</h1>
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
            <h2>1. Waktu Pelaporan</h2>
            <p>Segala bentuk klaim atas kerusakan atau kehilangan harus dilaporkan secara tertulis paling lambat 1x24 jam setelah kendaraan diterima di lokasi tujuan, dibuktikan dengan berita acara serah terima.</p>

            <h2>2. Syarat Dokumen Klaim</h2>
            <p>Untuk memproses klaim, Anda harus menyertakan dokumen berikut:</p>
            <ul>
              <li>Resi pengiriman asli</li>
              <li>Berita acara serah terima (sebelum dan sesudah)</li>
              <li>Foto/video bukti kerusakan yang jelas</li>
              <li>Salinan identitas diri (KTP)</li>
            </ul>

            <h2>3. Proses Investigasi</h2>
            <p>Setelah dokumen klaim diterima, tim kami dan pihak asuransi (jika menggunakan asuransi tambahan) akan melakukan investigasi dalam waktu maksimal 14 hari kerja.</p>

            <h2>4. Pengecualian Klaim</h2>
            <p>Klaim tidak berlaku untuk:</p>
            <ul>
              <li>Kerusakan mesin internal yang tidak berkaitan langsung dengan proses pengiriman fisik.</li>
              <li>Kehilangan barang pribadi yang ditinggalkan di dalam kendaraan.</li>
              <li>Kerusakan akibat force majeure (bencana alam, huru-hara, dll).</li>
            </ul>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
