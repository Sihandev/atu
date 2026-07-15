import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function FinalCTA() {
  return (
    <Section className="bg-blue-600 border-t border-blue-700 py-20 lg:py-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2" />

      <Container className="relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Siap Mengirim Kendaraan Anda?
        </h2>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Dapatkan penawaran terbaik hari ini. Tim kami siap membantu memberikan solusi pengiriman yang aman dan terpercaya.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <WhatsAppButton size="lg" className="text-lg bg-green-500 hover:bg-green-600 shadow-xl shadow-green-900/20 border-none" />
        </div>
      </Container>
    </Section>
  );
}
