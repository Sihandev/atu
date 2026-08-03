"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation, brand } from "@/config/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* The homepage hero is dark in both themes, so the bar starts transparent
     with light type and swaps to a solid glass bar once it clears the hero. */
  const overHero = pathname === "/" && !scrolled && !isOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        overHero
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-line bg-surface/80 backdrop-blur-2xl"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[var(--container-max)] items-center justify-between gap-6 px-6 md:px-10 lg:px-[var(--spacing-margin-desktop)]">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className={cn(
            "z-50 shrink-0 leading-none transition-colors duration-500",
            overHero ? "text-white" : "text-ink"
          )}
        >
          <span className="block font-display text-xl font-extrabold tracking-[-0.03em]">
            {brand.name}
          </span>
          <span
            className={cn(
              "mt-1 block font-mono text-label-sm uppercase transition-colors duration-500",
              overHero ? "text-white/55" : "text-accent"
            )}
          >
            Kendaraan &amp; Alat Berat
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-1 text-[15px] transition-colors duration-300",
                  active
                    ? overHero
                      ? "font-semibold text-white"
                      : "font-semibold text-brand"
                    : overHero
                      ? "text-white/70 hover:text-white"
                      : "text-ink-2 hover:text-brand"
                )}
              >
                {item.label}
                {active && (
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full",
                      overHero ? "bg-white/70" : "bg-grad-accent"
                    )}
                  />
                )}
              </Link>
            );
          })}

          <ThemeToggle
            className={cn(
              "transition-colors duration-500",
              overHero ? "border-white/25 text-white hover:border-white/60" : "text-ink"
            )}
          />

          <Link href="/cek-tarif" className="u-btn u-btn-primary u-btn-sheen">
            <span className="sheen" />
            Cek Tarif
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle
            className={cn(
              "z-50 transition-colors duration-500",
              overHero ? "border-white/25 text-white" : "text-ink"
            )}
          />
          <button
            type="button"
            className={cn(
              "z-50 -mr-2 p-2 transition-colors duration-500",
              overHero ? "text-white" : "text-ink"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — solid colour first so it can never look see-through */}
      <div
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-40 flex h-screen flex-col overflow-y-auto overscroll-contain bg-bg px-6 pt-28 pb-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        )}
      >
        <ul className="flex flex-col gap-1.5">
          {navigation.map((item, i) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 rounded-2xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-surface hover:text-brand"
              >
                <span className="font-mono text-label-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/cek-tarif"
          onClick={() => setIsOpen(false)}
          className="u-btn u-btn-primary mt-8 w-full py-4"
        >
          Cek Tarif
        </Link>
      </div>
    </nav>
  );
}
