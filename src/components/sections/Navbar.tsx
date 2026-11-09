"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation } from "@/config/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        "border-b border-line bg-bg/85 backdrop-blur-2xl"
      )}
    >
      <div className="express-shell express-nav flex items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="z-50 shrink-0 leading-none text-ink"
        >
          <BrandLogo />
        </Link>

        <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navigation.filter(item => item.href !== "/" && item.href !== "/artikel").map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-1 text-[12px] transition-colors duration-300",
                  active ? "font-semibold text-brand" : "text-ink-2 hover:text-brand"
                )}
              >
                {item.label}
                {active && (
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full",
                      "bg-brand"
                    )}
                  />
                )}
              </Link>
            );
          })}

          <ThemeToggle className="text-ink" />

          <Link href="/pesan" className="u-btn u-btn-primary u-btn-sheen text-xs">
            <span className="sheen" />
            Cek Tarif
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className="z-50 text-ink" />
          <button
            type="button"
            className="z-50 -mr-2 p-2 text-ink"
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
        inert={!isOpen}
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
          href="/pesan"
          onClick={() => setIsOpen(false)}
          className="u-btn u-btn-primary mt-8 w-full py-4"
        >
          Cek Tarif
        </Link>
      </div>
    </nav>
  );
}
