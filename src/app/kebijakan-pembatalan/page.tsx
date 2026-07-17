import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Pembatalan | KirimKendaraan",
  description: "Kebijakan pembatalan pesanan layanan pengiriman kendaraan.",
};

export default function KebijakanPembatalanPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />
      <Section className="bg-slate-50 border-b border-slate-200 py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Kebijakan Pembatalan</h1>
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
            <h2>1. Waktu Pembatalan</h2>
            <p>Pembatalan dapat dilakukan tanpa biaya jika dilakukan setidaknya 48 jam sebelum jadwal penjemputan kendaraan. Pembatalan yang dilakukan kurang dari 48 jam sebelum penjemputan dapat dikenakan biaya pembatalan.</p>

            <h2>2. Proses Refund (Pengembalian Dana)</h2>
            <p>Jika Anda memenuhi syarat untuk pengembalian dana, proses tersebut akan memakan waktu 7-14 hari kerja untuk dikembalikan ke metode pembayaran asli Anda.</p>

            <h2>3. Pembatalan oleh Pihak Kami</h2>
            <p>Kami berhak membatalkan pengiriman dengan alasan keamanan, force majeure, atau kendala operasional yang tidak dapat dihindari. Dalam kasus ini, Anda akan menerima pengembalian dana penuh atas jumlah yang telah dibayarkan.</p>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
