"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RouteCard } from "@/components/ui/RouteCard";
import { routes } from "@/config/data";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";

export function PopularRoutesSection() {
  return (
    <Section id="rute" className="bg-slate-50">
      <Container>
        <SectionHeading
          title="Rute Populer Kami"
          subtitle="Beberapa rute pengiriman kendaraan yang paling sering kami layani dengan jadwal yang rutin dan terstruktur."
          centered
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {routes.map((route, idx) => (
            <RouteCard
              key={idx}
              from={route.from}
              to={route.to}
              time={route.time}
              type={route.type}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
