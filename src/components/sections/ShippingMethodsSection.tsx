import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { shippingMethods } from "@/config/data";
import { CheckCircle2 } from "lucide-react";

export function ShippingMethodsSection() {
  return (
    <Section className="bg-white py-24 border-t border-slate-200">
      <Container>
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Metode Pengiriman yang Fleksibel</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Kami menyediakan berbagai metode pengiriman yang dapat disesuaikan dengan kebutuhan, jadwal, dan rute tujuan Anda.
              </p>
              <div className="space-y-6">
                {shippingMethods.map((method, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{method.title}</h4>
                      <p className="text-slate-400">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              {/* Decorative visual element for methods */}
              <div className="aspect-video bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent" />
                <div className="relative text-center">
                  <div className="text-4xl font-bold text-white mb-2">Aman & Terjamin</div>
                  <div className="text-blue-400 font-medium">Setiap metode dilengkapi standar operasional tinggi.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
