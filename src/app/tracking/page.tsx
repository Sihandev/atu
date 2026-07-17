"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Search, MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function TrackingPage() {
  const [resi, setResi] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "not-found">("idle");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resi.trim()) return;

    setStatus("loading");

    // Mock API simulation
    setTimeout(() => {
      if (resi.toUpperCase() === "DEMO-123") {
        setStatus("success");
      } else if (resi.toUpperCase() === "ERROR") {
        setStatus("error");
      } else {
        setStatus("not-found");
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-[72px]">
      <Navbar />
      <PageHero
        title="Lacak Pengiriman Anda"
        description="Masukkan nomor resi pengiriman untuk mengetahui status dan posisi kendaraan Anda saat ini secara real-time."
      />

      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 mb-10">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Masukkan Nomor Resi (Coba: DEMO-123)"
                  value={resi}
                  onChange={(e) => setResi(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-lg"
                />
              </div>
              <Button type="submit" size="lg" disabled={status === "loading"} className="h-auto py-4 px-10 text-lg">
                {status === "loading" ? "Mencari..." : "Lacak Status"}
              </Button>
            </form>
          </div>

          {/* Results Area */}
          <div className="min-h-[400px]">
            {status === "idle" && (
               <div className="flex flex-col items-center justify-center text-slate-400 py-20 text-center">
                 <Search className="h-16 w-16 mb-4 opacity-20" />
                 <p className="text-lg">Silakan masukkan nomor resi Anda untuk memulai pencarian.</p>
               </div>
            )}

            {status === "loading" && (
               <div className="flex flex-col items-center justify-center py-20 text-blue-600">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                 <p className="text-lg font-medium">Mengambil data pengiriman...</p>
               </div>
            )}

            {status === "not-found" && (
               <div className="flex flex-col items-center justify-center py-20 text-center">
                 <AlertCircle className="h-16 w-16 text-amber-500 mb-4" />
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Resi Tidak Ditemukan</h3>
                 <p className="text-slate-600 max-w-md">Kami tidak dapat menemukan data untuk nomor resi tersebut. Pastikan nomor yang dimasukkan sudah benar atau hubungi customer service kami.</p>
               </div>
            )}

            {status === "error" && (
               <div className="flex flex-col items-center justify-center py-20 text-center">
                 <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Sistem Sedang Sibuk</h3>
                 <p className="text-slate-600 max-w-md">Terjadi kesalahan saat menghubungi server. Mohon coba beberapa saat lagi.</p>
               </div>
            )}

            {status === "success" && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Nomor Resi</p>
                        <h2 className="text-2xl font-bold text-slate-900">{resi.toUpperCase()}</h2>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        Dalam Perjalanan
                      </div>
                    </div>

                    {/* Summary Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 border-b border-slate-100">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Kendaraan</p>
                        <p className="font-semibold text-slate-900">Toyota Innova Reborn (Hitam)</p>
                      </div>
                      <div>
                         <p className="text-sm text-slate-500 mb-1">Rute</p>
                         <p className="font-semibold text-slate-900 flex items-center gap-2">
                            Jakarta <ChevronRight className="w-4 h-4 text-slate-400" /> Bali
                         </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Estimasi Tiba</p>
                        <p className="font-semibold text-slate-900">18 Oktober 2023</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="p-6 md:p-8">
                      <h3 className="text-lg font-bold text-slate-900 mb-8">Riwayat Perjalanan</h3>

                      <div className="space-y-8">
                        {/* Step 1: Active/Current */}
                        <div className="flex gap-4 md:gap-6 relative">
                          <div className="flex flex-col items-center z-10">
                            <div className="h-8 w-8 rounded-full border-4 border-blue-100 bg-blue-600 flex items-center justify-center">
                              <div className="h-2 w-2 bg-white rounded-full" />
                            </div>
                            <div className="w-0.5 h-full bg-slate-200 mt-2 absolute top-8 bottom-[-2rem] z-0" />
                          </div>
                          <div className="pb-4">
                            <p className="font-bold text-lg text-slate-900">Kapal Berangkat dari Pelabuhan Ketapang</p>
                            <p className="text-slate-500 flex items-center gap-2 mt-1">
                               <Clock className="w-4 h-4" /> 16 Okt 2023, 14:30 WIB
                            </p>
                            <div className="mt-3 bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-800">
                              Kapal RoRo (KMP Marina) telah diberangkatkan menuju Gilimanuk.
                            </div>
                          </div>
                        </div>

                        {/* Step 2: Completed */}
                        <div className="flex gap-4 md:gap-6 relative">
                          <div className="flex flex-col items-center z-10">
                            <CheckCircle2 className="h-8 w-8 text-green-500 bg-white" />
                            <div className="w-0.5 h-full bg-slate-200 mt-2 absolute top-8 bottom-[-2rem] z-0" />
                          </div>
                          <div className="pb-4">
                            <p className="font-semibold text-slate-900">Tiba di Pool Transit Banyuwangi</p>
                            <p className="text-slate-500 flex items-center gap-2 mt-1">
                               <Clock className="w-4 h-4" /> 15 Okt 2023, 20:15 WIB
                            </p>
                          </div>
                        </div>

                        {/* Step 3: Completed */}
                        <div className="flex gap-4 md:gap-6 relative">
                          <div className="flex flex-col items-center z-10">
                            <CheckCircle2 className="h-8 w-8 text-green-500 bg-white" />
                            <div className="w-0.5 h-full bg-slate-200 mt-2 absolute top-8 bottom-[-2rem] z-0" />
                          </div>
                          <div className="pb-4">
                            <p className="font-semibold text-slate-900">Kendaraan Berangkat via Car Carrier</p>
                            <p className="text-slate-500 flex items-center gap-2 mt-1">
                               <Clock className="w-4 h-4" /> 14 Okt 2023, 08:00 WIB
                            </p>
                          </div>
                        </div>

                        {/* Step 4: Completed/Initial */}
                        <div className="flex gap-4 md:gap-6 relative">
                          <div className="flex flex-col items-center z-10">
                            <CheckCircle2 className="h-8 w-8 text-green-500 bg-white" />
                          </div>
                          <div className="pb-4">
                            <p className="font-semibold text-slate-900">Kendaraan Diserahterimakan (Pool Jakarta)</p>
                            <p className="text-slate-500 flex items-center gap-2 mt-1">
                               <Clock className="w-4 h-4" /> 13 Okt 2023, 10:00 WIB
                            </p>
                            <p className="text-sm text-slate-500 mt-2">Pengecekan fisik awal dan dokumentasi selesai.</p>
                          </div>
                        </div>

                      </div>
                    </div>
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

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
}