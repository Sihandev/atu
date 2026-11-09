import Image from "next/image";

const ALT = "Kirim Mobilku — CV. Alyssa Trans Utama";

/** Original supplied artwork, framed with CSS without redrawing the logo.
 *  Both marks are transparent PNGs: navy-and-red for light surfaces and
 *  light-on-dark for dark ones, so neither ever sits in a white box. */
export function BrandLogo({ full = false, onDark = false }: { full?: boolean; onDark?: boolean }) {
  if (onDark) return <span className="official-logo-dark">
    <Image src="/img/kirim-mobilku-logo-dark.png" alt={ALT} width={854} height={603} unoptimized loading="lazy" />
  </span>;
  return <span className={full ? "official-logo official-logo-full" : "official-logo"}>
    <Image className="logo-light" src="/img/kirim-mobilku-logo-light.png" alt={ALT} width={740} height={769} unoptimized loading="eager" />
    <Image className="logo-dark" src="/img/kirim-mobilku-logo-dark.png" alt={ALT} width={854} height={603} unoptimized loading="eager" aria-hidden="true" />
  </span>;
}
