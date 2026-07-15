import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RouteCard } from "@/components/ui/RouteCard";
import { routes } from "@/config/data";

export function PopularRoutesSection() {
  return (
    <Section id="rute" className="bg-slate-50">
      <Container>
        <SectionHeading
          title="Rute Populer Kami"
          subtitle="Beberapa rute pengiriman kendaraan yang paling sering kami layani dengan jadwal yang rutin dan terstruktur."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, idx) => (
            <RouteCard
              key={idx}
              from={route.from}
              to={route.to}
              time={route.time}
              type={route.type}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
