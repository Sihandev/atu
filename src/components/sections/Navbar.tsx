"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navigation, brand } from "@/config/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-3" : "bg-transparent py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo Placeholder */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
            K
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight hidden sm:block">
            {brand.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-5 w-px bg-slate-200" />
          <Button size="sm" asChild>
            <Link href="/cek-tarif">Cek Tarif</Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden relative z-50 p-2 text-slate-600 hover:text-blue-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Drawer */}
        <div
          className={cn(
            "fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transition-transform duration-300 ease-in-out lg:hidden",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <ul className="flex flex-col gap-6 text-lg font-medium text-slate-900">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
            <Button className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/cek-tarif">Cek Tarif Pengiriman</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
