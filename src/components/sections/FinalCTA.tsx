import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { whatsappHref } from "@/components/ui/FloatingWhatsApp";
export function FinalCTA() {
    return <section className="express-final"><div className="express-shell"><span className="eyebrow">RENCANAKAN PENGIRIMAN ANDA</span><div><h2>Kendaraan Anda.<br /><em>Kami atur perjalanannya.</em></h2><div><Link href="/pesan" className="express-button">Mulai pengiriman <ArrowUpRight size={19}/></Link><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="express-text-link">Konsultasi via WhatsApp <ArrowUpRight size={17}/></a></div></div></div></section>;
}
