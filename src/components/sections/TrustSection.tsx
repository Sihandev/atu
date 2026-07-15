import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CheckCircle2 } from "lucide-react";
import { trustPoints } from "@/config/data";

export function TrustSection() {
  return (
    <Section className="bg-slate-50 py-12 border-y border-slate-200">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Kenapa Memilih Kami?</h2>
            <p className="text-slate-600">Proses pengiriman kendaraan yang jelas, aman, dan dapat diandalkan setiap langkahnya.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-800 font-medium leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
