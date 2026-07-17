"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { brand } from "@/config/data";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

type FormData = {
  origin: string;
  pickupLocation: string;
  destination: string;
  deliveryLocation: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  condition: string;
  method: string;
  date: string;
  name: string;
  whatsapp: string;
  email: string;
  notes: string;
};

const initialData: FormData = {
  origin: "", pickupLocation: "", destination: "", deliveryLocation: "",
  vehicleType: "", brand: "", model: "", year: "", condition: "", method: "",
  date: "", name: "", whatsapp: "", email: "", notes: ""
};

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("quoteFormData");
    if (saved) {
      try {
        setTimeout(() => setFormData(JSON.parse(saved)), 0);
      } catch (e) {
        console.error("Error parsing saved form data", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("quoteFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    // Basic validation per step
    if (step === 1 && (!formData.origin || !formData.destination)) {
      alert("Harap isi Asal dan Tujuan.");
      return;
    }
    if (step === 2 && (!formData.vehicleType || !formData.brand || !formData.model || !formData.condition)) {
      alert("Harap isi tipe, merk, model, dan kondisi kendaraan.");
      return;
    }
    if (step === 3 && (!formData.name || !formData.whatsapp)) {
      alert("Harap isi Nama dan Nomor WhatsApp.");
      return;
    }
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    setIsLoading(true);

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      localStorage.removeItem("quoteFormData"); // Clear after success

      const msg = `Halo ${brand.name}, saya ingin cek tarif pengiriman:\n\n` +
        `*RUTE*\nAsal: ${formData.origin}\nPickup: ${formData.pickupLocation || '-'}\nTujuan: ${formData.destination}\nDelivery: ${formData.deliveryLocation || '-'}\n\n` +
        `*KENDARAAN*\nJenis: ${formData.vehicleType}\nMerk/Model: ${formData.brand} ${formData.model} (${formData.year || '-'}) - ${formData.condition}\nMetode: ${formData.method}\nRencana Kirim: ${formData.date}\n\n` +
        `*PENGIRIM*\nNama: ${formData.name}\nWA: ${formData.whatsapp}\nCatatan: ${formData.notes || '-'}`;

      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-[72px]">
      <Navbar />
      <PageHero title="Cek Tarif Pengiriman" description="Isi form berikut untuk mendapatkan estimasi biaya pengiriman yang akurat. Kami akan menghubungi Anda via WhatsApp." />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto">

          {/* Progress Bar */}
          {!isSuccess && (
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                <span className={step >= 1 ? "text-blue-600" : ""}>Rute</span>
                <span className={step >= 2 ? "text-blue-600" : ""}>Kendaraan</span>
                <span className={step >= 3 ? "text-blue-600" : ""}>Kontak</span>
                <span className={step >= 4 ? "text-blue-600" : ""}>Ringkasan</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Permintaan Terkirim!</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Terima kasih, Anda akan segera diarahkan ke WhatsApp untuk mengirimkan detail tersebut kepada tim kami.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline">Kirim Permintaan Lain</Button>
              </div>
            ) : (
              <div className="space-y-6">

                {/* Step 1: Rute */}
                {step === 1 && (
                  <div className="animate-in fade-in">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Informasi Rute</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Kota Asal *</label>
                        <input type="text" name="origin" value={formData.origin} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="Contoh: Jakarta Selatan" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Alamat Penjemputan (Opsional)</label>
                        <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="Detail jalan/kecamatan" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Kota Tujuan *</label>
                        <input type="text" name="destination" value={formData.destination} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="Contoh: Surabaya" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Alamat Pengiriman (Opsional)</label>
                        <input type="text" name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" placeholder="Detail jalan/kecamatan" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Kendaraan */}
                {step === 2 && (
                  <div className="animate-in fade-in">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Detail Kendaraan & Layanan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Kendaraan *</label>
                        <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600">
                          <option value="">Pilih...</option>
                          <option value="Mobil">Mobil</option>
                          <option value="Motor">Motor</option>
                          <option value="Kendaraan Besar / Truk">Kendaraan Besar / Truk</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Kondisi Mesin *</label>
                        <select name="condition" value={formData.condition} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600">
                          <option value="">Pilih...</option>
                          <option value="Hidup / Normal">Hidup / Normal</option>
                          <option value="Mati Total">Mati Total</option>
                          <option value="Kecelakaan / Rusak">Kecelakaan / Rusak</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Merk *</label>
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Contoh: Toyota" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Model *</label>
                        <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Contoh: Avanza G" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tahun (Opsional)</label>
                        <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Contoh: 2022" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Pilihan Metode Pengiriman</label>
                        <select name="method" value={formData.method} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600">
                          <option value="Bebas / Rekomendasikan yang terbaik">Rekomendasikan yang terbaik</option>
                          <option value="Towing / Derek">Towing / Derek (Eksklusif)</option>
                          <option value="Car Carrier">Car Carrier (Lebih hemat)</option>
                          <option value="Self Drive">Self Drive (Cepat)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Rencana Tanggal Kirim (Opsional)</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Kontak */}
                {step === 3 && (
                  <div className="animate-in fade-in">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Informasi Kontak</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nomor WhatsApp *</label>
                        <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email (Opsional)</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Catatan Tambahan (Opsional)</label>
                      <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"></textarea>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div className="animate-in fade-in">
                    <h3 className="text-xl font-bold mb-6 text-slate-900">Ringkasan Permintaan</h3>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 space-y-4 text-sm">
                      <div className="grid grid-cols-3 gap-2 border-b pb-2">
                        <span className="text-slate-500 font-medium">Rute</span>
                        <span className="col-span-2 font-semibold">{formData.origin} <ChevronRight className="inline w-4 h-4 text-slate-400 mx-1"/> {formData.destination}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 border-b pb-2">
                        <span className="text-slate-500 font-medium">Kendaraan</span>
                        <span className="col-span-2">{formData.vehicleType} - {formData.brand} {formData.model} ({formData.condition})</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500 font-medium">Pengirim</span>
                        <span className="col-span-2">{formData.name} ({formData.whatsapp})</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
                    </Button>
                  ) : <div></div>}

                  {step < 4 ? (
                    <Button type="button" onClick={nextStep} className="bg-blue-600">
                      Selanjutnya <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                      {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <MessageCircle className="w-5 h-5 mr-2" />}
                      Kirim via WhatsApp
                    </Button>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}

function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>;
}