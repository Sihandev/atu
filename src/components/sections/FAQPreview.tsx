"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqs } from "@/config/data";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";

export function FAQPreview() {
  return (
    <Section className="bg-slate-50 border-t border-slate-200">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title="Pertanyaan yang Sering Diajukan"
            subtitle="Temukan jawaban cepat untuk pertanyaan umum seputar layanan pengiriman kendaraan kami."
            centered
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
          >
            {faqs.map((faq, idx) => (
              <FAQAccordion
                key={idx}
                question={faq.question}
                answer={faq.answer}
                className={idx === faqs.length - 1 ? "border-b-0" : ""}
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
