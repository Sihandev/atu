import Image from "next/image";

/** Original supplied artwork, framed with CSS without redrawing the logo. */
export function BrandLogo({ full = false, onDark = false }: { full?: boolean; onDark?: boolean }) {
  if (onDark) return <span className="official-logo-dark">
    <Image src="/img/kirim-mobilku-logo-dark.png" alt="Kirim Mobilku — CV. Alyssa Trans Utama" width={854} height={603} unoptimized loading="lazy" />
  </span>;
  return <span className={full ? "official-logo official-logo-full" : "official-logo"}>
    <Image src="/img/kirim-mobilku-logo.jpeg" alt="Kirim Mobilku — CV. Alyssa Trans Utama" width={1230} height={1278} unoptimized loading="eager" />
  </span>;
}
