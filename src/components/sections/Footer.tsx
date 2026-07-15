import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brand, navigation, services, routes } from "@/config/data";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                K
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {brand.name}
              </span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-sm">
              Solusi pengiriman kendaraan antar kota dan antar pulau terpercaya, aman, dan transparan untuk seluruh wilayah Indonesia.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <p>Email: <a href={`mailto:${brand.email}`} className="text-white hover:text-blue-400 transition-colors">{brand.email}</a></p>
              <p>Telepon: <span className="text-white">{brand.phone}</span></p>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Perusahaan</h4>
            <ul className="flex flex-col gap-4 text-sm">
              {navigation.filter(item => ["Beranda", "Tentang", "Artikel", "Layanan"].includes(item.label)).map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Layanan Kami</h4>
            <ul className="flex flex-col gap-4 text-sm">
              {services.slice(0, 4).map((service) => (
                <li key={service.title}>
                  <Link href="#layanan" className="hover:text-blue-400 transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Routes Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Rute Populer</h4>
            <ul className="flex flex-col gap-4 text-sm">
              {routes.map((route, idx) => (
                <li key={idx}>
                  <Link href="#rute" className="hover:text-blue-400 transition-colors">
                    {route.from} - {route.to}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {brand.name}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
