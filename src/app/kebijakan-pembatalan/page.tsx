import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function CancellationPolicyPage() {
  const breadcrumbItems = [
    { label: "Kebijakan Pembatalan" }
  ];

  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero title="Kebijakan Pembatalan" />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
             Halaman ini berisi placeholder (draft) dan belum melalui proses legal review.
          </div>
          <h2>Aturan Pembatalan</h2>
          <p>Jika pengirim membatalkan layanan kurang dari 24 jam sebelum waktu penjemputan, kami berhak mengenakan biaya administrasi untuk meng-cover biaya operasional dasar yang sudah terjadi.</p>

          <h2>Prosedur Refund</h2>
          <p>Pembatalan yang memenuhi syarat akan diproses untuk pengembalian dana dalam jangka waktu 7-14 hari kerja.</p>
        </div>
      </Container>

      <Footer />
    </main>
  );
}