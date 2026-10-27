"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
const fleet = [
    { id: "car-carrier", title: "Car Carrier", kind: "DISTRIBUSI & ANTARKOTA", image: "/img/hero-car-carrier.jpg", description: "Perjalanan bersama, penanganan personal. Solusi pengangkutan beberapa kendaraan dalam satu armada untuk rute antarkota.", features: ["Pengangkutan multi-unit", "Cocok untuk distribusi kendaraan", "Jadwal dikonfirmasi oleh tim"] },
    { id: "towing", title: "Towing", kind: "SATU ARMADA UNTUK ANDA", image: "/img/towing.jpg", description: "Ruang khusus untuk kendaraan Anda. Pilihan pengiriman dengan satu unit kendaraan di atas armada towing.", features: ["Pengiriman satu kendaraan", "Pilihan untuk mobil premium", "Penjemputan sesuai kesepakatan"] },
    { id: "antar-pulau", title: "Antar Pulau", kind: "MELINTASI DARAT & LAUT", image: "/img/roro.jpg", description: "Pulau yang berbeda, tujuan yang terhubung. Kombinasi perjalanan darat dan laut disesuaikan dengan rute kendaraan Anda.", features: ["Koordinasi pengiriman lintas pulau", "Pilihan layanan pelabuhan", "Informasi jadwal keberangkatan"] },
    { id: "self-drive", title: "Self Drive", kind: "DIKEMUDIKAN DENGAN CERMAT", image: "/img/self-drive.jpg", description: "Kendaraan melaju menuju tujuan bersama pengemudi. Opsi fleksibel untuk kendaraan yang siap jalan dan rute yang sesuai.", features: ["Untuk kendaraan siap jalan", "Rute dan waktu disepakati", "Serah terima terkoordinasi"] },
];
export function FleetShowcase() {
    const [selected, setSelected] = useState(0);
    const item = fleet[selected];
    return <div className="fleet-showcase"><div className="fleet-tabs" role="tablist" aria-label="Metode pengiriman">{fleet.map((service, i) => <button key={service.id} id={`fleet-tab-${i}`} role="tab" aria-selected={i === selected} aria-controls="fleet-panel" tabIndex={i === selected ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const next = (i + (event.key === "ArrowRight" ? 1 : -1) + fleet.length) % fleet.length;
        setSelected(next);
        document.getElementById(`fleet-tab-${next}`)?.focus();
    } }}><span>0{i + 1}</span>{service.title}<ArrowUpRight size={17}/></button>)}</div><div id="fleet-panel" className="fleet-panel" role="tabpanel" aria-labelledby={`fleet-tab-${selected}`}><div className="fleet-image"><Image key={item.image} src={item.image} alt={`Layanan ${item.title} Kirim Mobilku`} fill unoptimized sizes="(max-width: 760px) 100vw, 60vw"/><span>KIRIM MOBILKU / {item.title.toUpperCase()}</span></div><div className="fleet-detail"><span className="eyebrow">{item.kind}</span><h3>{item.title}<span>.</span></h3><p>{item.description}</p><ul>{item.features.map(feature => <li key={feature}><Check size={15}/>{feature}</li>)}</ul><Link href={`/layanan/${item.id}`} className="express-text-link">Detail layanan <ArrowUpRight size={18}/></Link></div></div></div>;
}
