import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { brand } from "@/config/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami | KirimKendaraan",
  description: "Hubungi kami untuk informasi lebih lanjut mengenai layanan pengiriman kendaraan.",
};

export default function KontakPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      <Section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Hubungi Kami</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Punya pertanyaan atau butuh bantuan segera? Tim kami siap membantu Anda kapan saja.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Informasi Kontak</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Telepon / WhatsApp</h3>
                    <p className="text-slate-600 mb-2">CS & Booking melayani 24/7</p>
                    <a href={`https://wa.me/\${brand.phone.replace(/[^0-9]/g, '')}`} className="text-xl font-medium text-blue-600 hover:underline">
                      {brand.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600 mb-2">Untuk penawaran korporat atau kerjasama</p>
                    <a href={`mailto:\${brand.email}`} className="text-xl font-medium text-blue-600 hover:underline">
                      {brand.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Jam Operasional Pool</h3>
                    <p className="text-slate-600">Senin - Sabtu: 08:00 - 17:00 WIB</p>
                    <p className="text-slate-600">Minggu: Tutup (Kecuali ada janji temu)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Kantor & Pool Utama</h3>
                    <p className="text-slate-600 leading-relaxed max-w-sm">
                      Jl. Logistik Kendaraan No. 123,<br/>
                      Kelapa Gading, Jakarta Utara 14240<br/>
                      DKI Jakarta, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" placeholder="Masukkan email Anda" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subjek</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" placeholder="Apa yang ingin Anda tanyakan?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Pesan</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" placeholder="Tulis pesan Anda di sini..."></textarea>
                </div>
                <Button className="w-full" size="lg" type="button">
                  Kirim Pesan Sekarang
                </Button>
              </form>
            </div>

          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
