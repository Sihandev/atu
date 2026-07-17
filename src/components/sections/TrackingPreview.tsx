"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Search, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function TrackingPreview() {
  const [resi, setResi] = useState("DEMO-12345");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resi) return;

    setIsSearching(true);
    setShowResult(false);

    // Simulate network request
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1000);
  };

  return (
    <Section id="tracking" className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Lacak Pengiriman Anda"
            subtitle="Pantau status pengiriman kendaraan Anda secara real-time dengan memasukkan nomor resi (Coba klik lacak untuk demo)."
            centered
            className="mb-8"
          />

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Masukkan Nomor Resi..."
                value={resi}
                onChange={(e) => setResi(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-lg shadow-sm"
              />
            </div>
            <Button type="submit" size="lg" disabled={isSearching} className="w-full sm:w-auto px-8">
              {isSearching ? "Mencari..." : "Lacak"}
            </Button>
          </form>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 text-left max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Nomor Resi (DEMO)</p>
                  <p className="text-xl font-bold text-slate-900">{resi}</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 font-medium text-sm rounded-full">
                  Dalam Perjalanan
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="h-6 w-6 text-green-500 bg-white" />
                    <div className="w-px h-full bg-green-500 my-1" />
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-slate-900">Kendaraan Diterima di Pool Jakarta</p>
                    <p className="text-sm text-slate-500">12 Okt 2023, 08:30 WIB</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full" />
                    </div>
                    <div className="w-px h-full bg-slate-200 my-1" />
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-slate-900">Berangkat menuju Surabaya</p>
                    <p className="text-sm text-slate-500">13 Okt 2023, 10:15 WIB</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <MapPin className="h-6 w-6 text-slate-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-400">Tiba di Pool Surabaya (Estimasi)</p>
                    <p className="text-sm text-slate-400">14 Okt 2023</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </Section>
  );
}
