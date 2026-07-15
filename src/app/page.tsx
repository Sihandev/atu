import { Navbar } from "@/components/sections/Navbar";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { TrustSection } from "@/components/sections/TrustSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ShippingMethodsSection } from "@/components/sections/ShippingMethodsSection";
import { PopularRoutesSection } from "@/components/sections/PopularRoutesSection";
import { TrackingPreview } from "@/components/sections/TrackingPreview";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { ThreeHero } from "@/components/3d/ThreeHero";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen pt-[72px]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 py-12 md:py-20 lg:py-24">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2" />

        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                Layanan Terpercaya se-Indonesia
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Kirim Kendaraan Antar Kota dan Antar Pulau dengan Proses yang Lebih Jelas
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Kami memastikan kendaraan Anda aman dengan layanan door-to-door, asuransi, dan update status pengiriman yang transparan setiap saat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <WhatsAppButton size="lg" className="w-full sm:w-auto text-base">
                  Konsultasi via WhatsApp
                </WhatsAppButton>
              </div>
            </div>

            <div className="lg:w-1/2 w-full relative z-10">
              <ThreeHero />
            </div>
          </div>
        </Container>
      </section>

      {/* Quote Form Overlay Section */}
      <section id="cek-tarif" className="relative -mt-12 md:-mt-16 z-20 px-4 md:px-6 lg:px-8 mb-16 md:mb-24">
         <QuoteForm />
      </section>

      <TrustSection />
      <ServicesSection />
      <HowItWorksSection />
      <ShippingMethodsSection />
      <PopularRoutesSection />
      <TrackingPreview />
      <FAQPreview />
      <ArticlesPreview />
      <FinalCTA />

      <Footer />
    </main>
  );
}
