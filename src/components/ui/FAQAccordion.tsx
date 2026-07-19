"use client";

import { useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

interface FAQAccordionProps {
  question: string;
  answer: string;
  className?: string;
}

export function FAQAccordion({ question, answer, className }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <motion.div variants={fadeInUp} className={cn("border-b border-slate-200", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-lg font-medium text-slate-900">{question}</span>
        <ChevronDown
          className={cn("h-5 w-5 text-slate-500 transition-transform duration-200", isOpen ? "rotate-180" : "")}
        />
      </button>
      <div
        id={contentId}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
}
