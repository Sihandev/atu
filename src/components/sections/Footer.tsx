import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { brand } from "@/config/data";
const columns = [
    { title: "EKSPLORASI", links: [["Layanan", "/layanan"], ["Cara pengiriman", "/cara-pengiriman"], ["Artikel & panduan", "/artikel"]] },
    { title: "LAYANAN PELANGGAN", links: [["Buat pesanan", "/pesan"], ["Lacak kendaraan", "/tracking"], ["Pertanyaan umum", "/faq"], ["Hubungi kami", "/kontak"]] },
    { title: "PERUSAHAAN", links: [["Tentang Kirim Mobilku", "/tentang"], ["Kebijakan privasi", "/kebijakan-privasi"], ["Syarat & ketentuan", "/syarat-ketentuan"], ["Kebijakan klaim", "/kebijakan-klaim"]] },
];
export function Footer() {
    return <footer className="express-footer"><div className="express-shell"><div className="footer-top"><Link href="/" className="brand-lockup"><BrandLogo onDark /></Link><p>Menghubungkan kendaraan dengan tujuan berikutnya. Dengan perhatian di setiap perjalanan.</p></div><div className="footer-columns"><div><h3>MARI BICARA</h3><a className="footer-phone" href={`https://wa.me/${brand.phone.replace(/\D/g, "")}`}>{brand.phone}</a><p>{brand.address}</p>{brand.email && <a href={`mailto:${brand.email}`}>{brand.email}</a>}</div>{columns.map(column => <div key={column.title}><h3>{column.title}</h3><ul>{column.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} {brand.legalName}. Seluruh hak cipta dilindungi.</span><span>INDONESIA · DIKIRIM DENGAN HATI-HATI</span></div></div><FloatingWhatsApp /></footer>;
}
