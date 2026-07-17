import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: "Kebijakan Privasi" }
  ];

  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero title="Kebijakan Privasi" />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
             Halaman ini berisi placeholder (draft) dan belum melalui proses legal review.
          </div>
          <h2>Pengumpulan Data</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk saat Anda meminta estimasi harga, membuat akun, memperbarui profil, dan lain sebagainya. Data ini mencakup nama dan nomor WhatsApp Anda.</p>

          <h2>Penggunaan Data</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk menyediakan layanan pengiriman kendaraan, memproses transaksi Anda, serta untuk keperluan layanan pelanggan kami agar komunikasi dapat berjalan dengan responsif.</p>
        </div>
      </Container>

      <Footer />
    </main>
  );
}