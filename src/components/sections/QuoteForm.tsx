"use client";

import { useState } from "react";
import { brand } from "@/config/data";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { Loader2 } from "lucide-react";

export function QuoteForm() {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    vehicleType: "",
    name: "",
    whatsapp: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate validation/loading delay for premium feel
    setTimeout(() => {
      // Construct WhatsApp message
      const message = `Halo ${brand.name},\n\nSaya ingin cek tarif pengiriman kendaraan dengan detail berikut:\n\n` +
        `- Nama: ${formData.name}\n` +
        `- Asal: ${formData.origin}\n` +
        `- Tujuan: ${formData.destination}\n` +
        `- Jenis Kendaraan: ${formData.vehicleType}\n\n` +
        `Mohon informasi harga dan jadwalnya. Terima kasih.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
      setIsLoading(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 relative z-10 w-full max-w-lg mx-auto"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Cek Tarif Cepat</h3>
        <p className="text-slate-600 text-sm">Dapatkan estimasi harga akurat langsung via WhatsApp.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="origin" className="text-sm font-medium text-slate-700">Kota Asal</label>
            <input
              type="text"
              id="origin"
              name="origin"
              required
              aria-label="Kota Asal"
              placeholder="Contoh: Jakarta"
              value={formData.origin}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="destination" className="text-sm font-medium text-slate-700">Kota Tujuan</label>
            <input
              type="text"
              id="destination"
              name="destination"
              required
              aria-label="Kota Tujuan"
              placeholder="Contoh: Surabaya"
              value={formData.destination}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="vehicleType" className="text-sm font-medium text-slate-700">Jenis Kendaraan</label>
          <select
            id="vehicleType"
            name="vehicleType"
            required
            aria-label="Jenis Kendaraan"
            value={formData.vehicleType}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 bg-white disabled:opacity-50"
          >
            <option value="" disabled>Pilih Jenis Kendaraan</option>
            <option value="Mobil Kecil / City Car">Mobil Kecil / City Car</option>
            <option value="Mobil Keluarga / MPV">Mobil Keluarga / MPV</option>
            <option value="Mobil SUV">Mobil SUV</option>
            <option value="Mobil Mewah / Sport">Mobil Mewah / Sport</option>
            <option value="Motor Kecil (Metic/Bebek)">Motor Kecil (Metic/Bebek)</option>
            <option value="Motor Besar (Moge/Sport)">Motor Besar (Moge/Sport)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Anda</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              aria-label="Nama Anda"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="text-sm font-medium text-slate-700">No. WhatsApp</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              required
              aria-label="No. WhatsApp"
              placeholder="0812..."
              value={formData.whatsapp}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" aria-live="polite" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-medium">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Memproses...
              </>
            ) : (
              "Kirim Permintaan Cek Tarif"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
