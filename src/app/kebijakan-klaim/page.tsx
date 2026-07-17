import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function ClaimPolicyPage() {
  const breadcrumbItems = [
    { label: "Kebijakan Klaim Asuransi" }
  ];

  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero title="Kebijakan Klaim" />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
             Halaman ini berisi placeholder (draft) dan belum melalui proses legal review.
          </div>
          <h2>Persyaratan Klaim</h2>
          <p>Klaim atas kerusakan hanya berlaku apabila kendaraan telah diasuransikan sebelum perjalanan, dan terdapat perbedaan yang tercatat antara Checklist Kondisi Kendaraan di awal dengan kondisi saat serah terima akhir.</p>

          <h2>Prosedur Pelaporan</h2>
          <p>Laporan klaim harus diajukan maksimal 1x24 jam setelah kendaraan diterima di lokasi tujuan dengan menyertakan bukti foto terkait.</p>
        </div>
      </Container>

      <Footer />
    </main>
  );
}