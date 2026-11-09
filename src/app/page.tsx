import Image from "next/image";
import { InteractiveFleet } from "@/components/3d/InteractiveFleet";
import { JourneyMotion } from "@/components/ui/JourneyMotion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ClipboardCheck, MapPin, MessageCircle, ScanSearch, ShieldCheck, Truck } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FleetShowcase } from "@/components/sections/FleetShowcase";
import { whatsappHref } from "@/components/ui/FloatingWhatsApp";
const steps = [
    { title: "Ceritakan rencana Anda.", text: "Pilih kendaraan, kota asal, dan tujuan. Kirim detailnya melalui formulir pemesanan.", icon: ClipboardCheck },
    { title: "Kami atur perjalanannya.", text: "Tim mengonfirmasi tarif, metode pengiriman, dan jadwal sebelum kendaraan diserahkan.", icon: Truck },
    { title: "Pantau sampai tujuan.", text: "Simpan nomor resi Anda untuk melihat pembaruan status dan proses serah terima.", icon: MapPin },
];
const faqs = [
    ["Bagaimana cara mendapatkan tarif pengiriman?", "Isi formulir dengan jenis kendaraan serta kota asal dan tujuan. Tim Kirim Mobilku akan menghubungi Anda untuk memberikan penawaran sesuai rute dan metode pengiriman."],
    ["Apakah kendaraan bisa dijemput di rumah?", "Layanan penjemputan dapat diatur sesuai area, akses lokasi, dan metode pengiriman. Sertakan alamat lengkap saat melakukan pemesanan agar tim dapat mengonfirmasi ketersediaannya."],
    ["Bagaimana saya memantau pengiriman?", "Setelah pesanan berhasil dibuat, Anda mendapatkan nomor resi. Masukkan nomor tersebut di halaman Tracking untuk melihat status yang telah diperbarui oleh tim operasional."],
    ["Apakah tersedia perlindungan asuransi?", "Tanyakan pilihan asuransi saat konsultasi. Cakupan, nilai pertanggungan, biaya, dan ketentuan klaim perlu dikonfirmasi dalam penawaran sebelum pengiriman."],
];
export default function Home() {
    return <><Navbar /><JourneyMotion /><main id="main-content" className="editorial-home">
    <section className="express-hero">
      <div className="hero-frame">
        <Image src="/img/hero-car-carrier.jpg" alt="Car carrier membawa kendaraan melintasi jembatan menuju pelabuhan" fill priority unoptimized sizes="100vw" className="hero-photo" />
        <div className="hero-copy">
          <span className="hero-pill"><i />Jasa kirim kendaraan · Seluruh Indonesia</span>
          <h1>Kirim kendaraan.<br />Antar kota.<br /><em>Antar pulau.</em></h1>
          <p>Pengiriman mobil, motor, dan alat berat melalui darat dan laut. Pilih armada yang sesuai, dapatkan penawaran, dan pantau status kendaraan dalam satu tempat.</p>
          <div className="hero-actions">
            <Link href="/pesan" className="express-button">Minta penawaran <ArrowUpRight size={18} /></Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="express-text-link"><MessageCircle size={18} /> Tanya via WhatsApp</a>
          </div>
          <ul className="hero-points">
            <li><ShieldCheck size={18} />Konsultasi gratis</li>
            <li><Check size={18} />Tarif dikonfirmasi di awal</li>
            <li><ScanSearch size={18} />Lacak dengan nomor resi</li>
          </ul>
        </div>
      </div>
    </section>
    <section className="quick-track" aria-label="Lacak pengiriman">
      <div><span className="eyebrow">Sudah dalam perjalanan?</span><h2>Kabar kendaraan Anda, satu resi saja.</h2></div>
      <form action="/tracking" method="get"><label htmlFor="home-resi">Nomor resi pengiriman</label><div><input id="home-resi" name="resi" placeholder="Contoh: AAL-XXXX-XXXX" required autoComplete="off" /><button type="submit" aria-label="Lacak nomor resi"><span>Lacak</span><ArrowRight size={18} /></button></div></form>
    </section>
    <section id="layanan" className="express-section express-shell">
      <div className="section-top"><span className="eyebrow">01 / Layanan</span><span className="section-aside">Dirancang untuk kendaraan Anda</span></div>
      <div className="section-heading"><h2>Armada yang tepat.<br /><span>Untuk setiap kebutuhan.</span></h2><p>Pilih cara terbaik untuk memindahkan kendaraan Anda. Dari satu unit kesayangan hingga kebutuhan distribusi bisnis.</p></div>
      <FleetShowcase />
    </section>
    <section className="express-shell" aria-label="Armada interaktif">
      <div className="stage-card">
        <div className="stage-copy">
          <span className="eyebrow">Armada kami</span>
          <h2>Kenali armadanya<br /><em>sebelum berangkat.</em></h2>
          <p>Putar model truk car carrier kami untuk melihat bagaimana beberapa kendaraan ditata dalam satu armada.</p>
          <ul>
            <li><Check size={17} />Pengangkutan beberapa kendaraan sekaligus</li>
            <li><Check size={17} />Rute antarkota dan lintas pulau</li>
            <li><Check size={17} />Jadwal dikonfirmasi oleh tim</li>
          </ul>
        </div>
        <InteractiveFleet />
      </div>
    </section>
    <section className="care-section" style={{ marginTop: 112 }}><div className="express-shell care-grid"><div className="care-photo"><Image src="/img/self-drive.jpg" alt="Kendaraan siap untuk perjalanan pengiriman" fill unoptimized sizes="(max-width: 760px) 100vw, 45vw"/><span>BUKAN SEKADAR MEMINDAHKAN.</span></div><div className="care-copy"><span className="eyebrow">02 / Standar Kirim Mobilku</span><h2>Setiap pengiriman,<br /><em>ditangani dengan terencana.</em></h2><p>Di balik setiap kendaraan, ada rencana yang harus berjalan. Karena itu, kami mengutamakan detail dari konsultasi pertama hingga serah terima.</p>{["Metode pengiriman sesuai kondisi kendaraan", "Detail biaya dan jadwal dikonfirmasi di awal", "Status pengiriman mudah diakses dengan resi"].map((text, i) => <div className="care-point" key={text}><span>0{i + 1}</span><p>{text}</p><ArrowUpRight size={18}/></div>)}<Link href="/tentang" className="express-text-link">Kenal lebih dekat <ArrowUpRight size={17}/></Link></div></div></section>
    <section className="process-section"><div className="express-shell express-section"><div className="section-top"><span className="eyebrow">03 / Cara kerja</span><span className="section-aside">Langkah jelas. Perjalanan tenang.</span></div><div className="section-heading"><h2>Mulai dengan mudah.<br /><span>Kami bantu selebihnya.</span></h2><Link href="/cara-pengiriman" className="express-text-link">Panduan pengiriman <ArrowUpRight size={18}/></Link></div><div className="process-grid">{steps.map((step, i) => <article key={step.title}><div><span>0{i + 1}</span><step.icon size={28} strokeWidth={1.4}/></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="process-cta"><Link href="/pesan" className="express-button">Mulai pesan sekarang <ArrowUpRight size={18}/></Link><span>Cukup isi data kendaraan dan rute. Tim kami menghubungi Anda untuk konfirmasi tarif.</span></div></div></section>
    <section className="express-shell express-section faq-editorial"><div><span className="eyebrow">Sebelum berangkat</span><h2>Ada yang<br /><span>ingin ditanyakan?</span></h2><a className="express-text-link" href={whatsappHref} target="_blank" rel="noopener noreferrer">Ngobrol dengan tim kami <ArrowUpRight size={17}/></a></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <FinalCTA /></main><Footer /></>;
}
