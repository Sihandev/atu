import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { processSteps } from "@/config/data";

export function HowItWorksSection() {
  return (
    <Section id="cara-pengiriman" className="bg-slate-50">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <SectionHeading
              title="Cara Mudah Kirim Kendaraan"
              subtitle="Proses transparan dari awal hingga akhir. Kami memastikan Anda selalu mengetahui status kendaraan Anda di setiap langkah."
              className="mb-8"
            />
          </div>
          <div className="lg:w-2/3 max-w-2xl">
            {processSteps.map((step, idx) => (
              <ProcessStep
                key={idx}
                step={step.step}
                title={step.title}
                description={step.description}
                isLast={idx === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
