"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Search, MapPin, Truck, CheckCircle2, PackageCheck, AlertCircle } from "lucide-react";

// Mock tracking data logic based on the TrackingPreview component logic
type TrackingStatus = 'idle' | 'loading' | 'found' | 'not-found';

export default function TrackingPage() {
  const [resi, setResi] = useState("");
  const [status, setStatus] = useState<TrackingStatus>("idle");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resi.trim()) return;

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      if (resi.toLowerCase() === "kk12345678") {
        setStatus("found");
      } else {
        setStatus("not-found");
      }
    }, 1200);
  };

  return (
    <main className="min-h-screen pt-[72px] bg-slate-50 flex flex-col">
      <Navbar />

      <Section className="py-12 md:py-20 flex-grow flex flex-col">
        <Container className="flex-grow flex flex-col items-center">

          <div className="w-full max-w-2xl mx-auto text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lacak Pengiriman Anda</h1>
            <p className="text-slate-600">
              Masukkan nomor resi yang Anda dapatkan melalui WhatsApp atau email untuk melihat status terkini kendaraan Anda.
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Contoh: KK12345678"
                  value={resi}
                  onChange={(e) => setResi(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 font-medium placeholder:font-normal"
                />
              </div>
              <Button type="submit" size="lg" className="sm:w-auto h-[52px] sm:h-auto whitespace-nowrap" disabled={status === "loading"}>
                {status === "loading" ? "Mencari..." : "Lacak Sekarang"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-slate-500">Coba masukkan <strong className="text-slate-700">KK12345678</strong> untuk melihat demo.</p>
            </div>
          </div>

          {/* Results Area */}
          <div className="w-full max-w-3xl mx-auto flex-grow">

            {status === "loading" && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p>Mengambil data dari server...</p>
              </div>
            )}

            {status === "not-found" && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Resi Tidak Ditemukan</h3>
                <p className="text-slate-600 mb-6">
                  Kami tidak dapat menemukan data untuk nomor resi <strong className="text-slate-900">{resi}</strong>. Pastikan nomor yang dimasukkan benar.
                </p>
                <p className="text-sm text-slate-500">Jika Anda baru saja melakukan booking, data mungkin membutuhkan waktu hingga 2 jam untuk masuk ke sistem.</p>
              </div>
            )}

            {status === "found" && (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-blue-600 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-blue-200 text-sm mb-1">Nomor Resi</div>
                    <div className="text-2xl font-bold font-mono">KK12345678</div>
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm self-start md:self-auto">
                    <div className="text-blue-100 text-xs uppercase font-semibold tracking-wider mb-0.5">Status Pengiriman</div>
                    <div className="font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      Sedang Dalam Perjalanan
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Basic Info */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-10 pb-8 border-b border-slate-100">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Kendaraan</div>
                      <div className="font-medium text-slate-900">Honda CR-V (B 1234 XYZ)</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Layanan</div>
                      <div className="font-medium text-slate-900">Car Carrier (Jakarta - Surabaya)</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

                    <div className="space-y-8 relative">
                      {/* Current Step */}
                      <div className="flex gap-4 sm:gap-6 relative z-10">
                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-blue-100 border-4 border-white shadow-sm flex items-center justify-center">
                          <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="pt-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                            <h4 className="font-bold text-slate-900 text-lg">Tiba di Checkpoint Semarang</h4>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 self-start">Terbaru</span>
                          </div>
                          <p className="text-slate-600 text-sm mb-1">Truk pembawa kendaraan sedang melakukan istirahat dan pengecekan rutin di Pool Semarang.</p>
                          <div className="text-xs font-medium text-slate-500">14 Okt 2023, 15:30 WIB</div>
                        </div>
                      </div>

                      {/* Past Steps */}
                      <div className="flex gap-4 sm:gap-6 relative z-10 opacity-70">
                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="pt-2">
                          <h4 className="font-bold text-slate-700">Berangkat dari Pool Jakarta</h4>
                          <div className="text-xs font-medium text-slate-500 mt-1">13 Okt 2023, 20:00 WIB</div>
                        </div>
                      </div>

                      <div className="flex gap-4 sm:gap-6 relative z-10 opacity-70">
                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="pt-2">
                          <h4 className="font-bold text-slate-700">Loading ke Car Carrier</h4>
                          <div className="text-xs font-medium text-slate-500 mt-1">13 Okt 2023, 14:00 WIB</div>
                        </div>
                      </div>

                      <div className="flex gap-4 sm:gap-6 relative z-10 opacity-70">
                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center">
                          <PackageCheck className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="pt-2">
                          <h4 className="font-bold text-slate-700">Kendaraan Diterima di Pool (Serah Terima Awal)</h4>
                          <div className="text-xs font-medium text-slate-500 mt-1">13 Okt 2023, 09:15 WIB</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
