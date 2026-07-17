"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { brand } from "@/config/data";

interface QuoteData {
  name: string;
  whatsapp: string;
  email: string;
  origin: string;
  pickupLocation: string;
  destination: string;
  deliveryLocation: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  runningCondition: string;
  preferredMethod: string;
  preferredDate: string;
  notes: string;
}

const initialData: QuoteData = {
  name: "", whatsapp: "", email: "",
  origin: "", pickupLocation: "",
  destination: "", deliveryLocation: "",
  vehicleType: "", brand: "", model: "", year: "", runningCondition: "Jalan Normal",
  preferredMethod: "", preferredDate: "", notes: ""
};

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteData>(initialData);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("quoteFormData");
    if (saved) {
      try { setFormData(JSON.parse(saved)); } catch (e) { /* ignore */ }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("quoteFormData", JSON.stringify(formData));
  }, [formData]);

  // Handle Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate small delay for loading state
    setTimeout(() => {
      // Build WhatsApp message
      const msg = `Halo \${brand.name},\n\nSaya ingin meminta penawaran harga (Cek Tarif) dengan detail berikut:\n\n` +
        `*DATA PENGIRIM*\n` +
        `- Nama: \${formData.name}\n` +
        `- WhatsApp: \${formData.whatsapp}\n` +
        (formData.email ? `- Email: \${formData.email}\n` : '') +
        `\n*RUTE PENGIRIMAN*\n` +
        `- Kota Asal: \${formData.origin}\n` +
        (formData.pickupLocation ? `- Detail Penjemputan: \${formData.pickupLocation}\n` : '') +
        `- Kota Tujuan: \${formData.destination}\n` +
        (formData.deliveryLocation ? `- Detail Pengantaran: \${formData.deliveryLocation}\n` : '') +
        `\n*DATA KENDARAAN*\n` +
        `- Jenis: \${formData.vehicleType}\n` +
        `- Merk & Model: \${formData.brand} \${formData.model}\n` +
        (formData.year ? `- Tahun: \${formData.year}\n` : '') +
        `- Kondisi: \${formData.runningCondition}\n` +
        `\n*PREFERENSI PENGIRIMAN*\n` +
        (formData.preferredMethod ? `- Metode: \${formData.preferredMethod}\n` : '') +
        (formData.preferredDate ? `- Rencana Tanggal: \${formData.preferredDate}\n` : '') +
        (formData.notes ? `\n*Catatan Tambahan:*\n\${formData.notes}\n` : '') +
        `\nMohon informasi estimasi harga dan jadwal terdekat. Terima kasih.`;

      const encodedMsg = encodeURIComponent(msg);
      const url = `https://wa.me/\${brand.phone.replace(/[^0-9]/g, '')}?text=\${encodedMsg}`;

      setIsLoading(false);
      localStorage.removeItem("quoteFormData"); // Clear form after success
      window.open(url, '_blank');
    }, 800);
  };

  return (
    <main className="min-h-screen pt-[72px] bg-slate-50">
      <Navbar />

      <Section className="py-12 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cek Tarif Pengiriman</h1>
              <p className="text-slate-600">Lengkapi formulir di bawah ini untuk mendapatkan penawaran harga yang akurat sesuai kebutuhan spesifik Anda.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center mb-10">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold \${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
              <div className={`w-16 h-1 \${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold \${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10">

              {step === 1 && (
                <form onSubmit={handleNext} className="space-y-8">
                  {/* Rute */}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Informasi Rute</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Kota Asal <span className="text-red-500">*</span></label>
                        <input required name="origin" value={formData.origin} onChange={handleChange} placeholder="Contoh: Jakarta Selatan" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Kota Tujuan <span className="text-red-500">*</span></label>
                        <input required name="destination" value={formData.destination} onChange={handleChange} placeholder="Contoh: Makassar" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Alamat Penjemputan (Opsional)</label>
                        <input name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Detail alamat atau patokan" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Alamat Pengantaran (Opsional)</label>
                        <input name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} placeholder="Detail alamat tujuan" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Kendaraan */}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Informasi Kendaraan</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Jenis Kendaraan <span className="text-red-500">*</span></label>
                        <select required name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none bg-white">
                          <option value="">Pilih Jenis</option>
                          <option value="Mobil Kecil / City Car">Mobil Kecil / City Car</option>
                          <option value="Mobil Keluarga / MPV">Mobil Keluarga / MPV</option>
                          <option value="Mobil SUV">Mobil SUV</option>
                          <option value="Mobil Mewah / Sport">Mobil Mewah / Sport</option>
                          <option value="Motor Bebek / Matic">Motor Bebek / Matic</option>
                          <option value="Motor Sport / Moge">Motor Sport / Moge</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Kondisi Kendaraan <span className="text-red-500">*</span></label>
                        <select required name="runningCondition" value={formData.runningCondition} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none bg-white">
                          <option value="Jalan Normal">Jalan Normal</option>
                          <option value="Mogok / Mati Total">Mogok / Mati Total</option>
                          <option value="Kecelakaan / Rusak Berat">Kecelakaan / Rusak Berat</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Merk (Brand) <span className="text-red-500">*</span></label>
                        <input required name="brand" value={formData.brand} onChange={handleChange} placeholder="Contoh: Honda" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Model Kendaraan <span className="text-red-500">*</span></label>
                        <input required name="model" value={formData.model} onChange={handleChange} placeholder="Contoh: CR-V" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Tahun Pembuatan (Opsional)</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Contoh: 2021" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="submit" size="lg">Lanjut ke Data Diri</Button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Data Diri */}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Informasi Kontak</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Nama Lengkap <span className="text-red-500">*</span></label>
                        <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Nomor WhatsApp <span className="text-red-500">*</span></label>
                        <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="0812..." className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Email (Opsional)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Preferensi Opsional */}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Preferensi (Opsional)</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Metode Pengiriman</label>
                        <select name="preferredMethod" value={formData.preferredMethod} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none bg-white">
                          <option value="">Bebas (Rekomendasi Terbaik)</option>
                          <option value="Towing (Derek Gendong)">Towing (Derek Gendong)</option>
                          <option value="Car Carrier (Truk Transporter)">Car Carrier (Truk Transporter)</option>
                          <option value="Self Drive (Disetir)">Self Drive (Disetir)</option>
                          <option value="Kapal RoRo">Kapal RoRo</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Rencana Tanggal Pengiriman</label>
                        <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none bg-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Catatan Tambahan (Ada barang bawaan? Akses jalan sempit?)</label>
                      <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none"></textarea>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm">
                    <strong>Perhatian:</strong> Harga otomatis tidak ditampilkan karena sangat bergantung pada detail spesifik dan asuransi. Anda akan diarahkan ke WhatsApp untuk mendapatkan penawaran akurat langsung dari tim kami.
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button type="button" onClick={handleBack} className="text-slate-600 font-medium hover:text-slate-900 px-4 py-2">
                      Kembali
                    </button>
                    <Button type="submit" size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                      {isLoading ? "Memproses..." : "Kirim Permintaan ke WhatsApp"}
                    </Button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
