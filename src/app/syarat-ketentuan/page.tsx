import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function TermsPage() {
  const breadcrumbItems = [
    { label: "Syarat & Ketentuan" }
  ];

  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero title="Syarat dan Ketentuan" />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
             Halaman ini berisi placeholder (draft) dan belum melalui proses legal review.
          </div>
          <h2>1. Ketentuan Umum</h2>
          <p>Syarat dan ketentuan ini mengatur penggunaan layanan logistik pengiriman kendaraan. Dengan menggunakan layanan kami, Anda menyetujui syarat-syarat yang berlaku.</p>

          <h2>2. Kewajiban Pengirim</h2>
          <p>Pengirim wajib memberikan data kendaraan yang akurat, tidak menempatkan barang terlarang dalam kendaraan, serta menyediakan dokumen legal perjalanan seperti fotokopi STNK.</p>

          <h2>3. Tanggung Jawab Ekspedisi</h2>
          <p>Kami bertanggung jawab memfasilitasi pengiriman dari titik penjemputan awal menuju titik tujuan akhir sesuai dengan metode yang telah disepakati.</p>
        </div>
      </Container>

      <Footer />
    </main>
  );
}