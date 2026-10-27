import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { brand } from "@/config/data";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Hubungi Kirim Mobilku", description: "Konsultasikan rencana pengiriman kendaraan Anda bersama tim Kirim Mobilku." };
export default function KontakPage() {
    return <><Navbar /><main className="express-shell pt-40 pb-24"><span className="eyebrow">KONTAK / KIRIM MOBILKU</span><div className="section-heading"><h1 className="font-display text-5xl md:text-7xl font-medium tracking-tighter leading-[1.05]">Perjalanan baik,<br /><span className="text-ink-3">dimulai dari percakapan.</span></h1></div><div className="grid md:grid-cols-2 gap-8 mt-16"><section className="bg-surface border border-line p-8 md:p-12"><MessageCircle className="text-brand mb-8" size={30}/><h2 className="text-2xl font-display font-medium">Bicara dengan tim kami</h2><p className="text-ink-2 text-sm leading-7 my-5">Konsultasikan rute, kendaraan, jadwal, dan pilihan pengiriman. Tim kami membantu menyusun penawaran sesuai kebutuhan Anda.</p><a className="express-text-link text-brand" href={`https://wa.me/${brand.phone.replace(/\D/g, "")}?text=${encodeURIComponent(brand.whatsappMessage)}`}>{brand.phone}<ArrowUpRight size={18}/></a></section><section className="bg-surface border border-line p-8 md:p-12"><MapPin className="text-brand mb-8" size={30}/><h2 className="text-2xl font-display font-medium">{brand.legalName}</h2><p className="text-ink-2 text-sm leading-7 my-5">{brand.address}</p><p className="text-ink-2 text-xs mb-5">Hubungi tim terlebih dahulu untuk mengatur kunjungan atau serah terima kendaraan.</p><Link href="/pesan" className="express-text-link text-brand">Isi formulir pengiriman<ArrowUpRight size={18}/></Link></section></div></main><Footer /></>;
}
