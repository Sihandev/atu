"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/config/data";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";

export function ServicesSection() {
  return (
    <Section id="layanan" className="bg-white">
      <Container>
        <SectionHeading
          title="Layanan Pengiriman Kendaraan"
          subtitle="Pilihan metode pengiriman terlengkap untuk berbagai jenis kendaraan, disesuaikan dengan kebutuhan waktu dan anggaran Anda."
          centered
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
