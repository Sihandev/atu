"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  question: string;
  answer: string;
  className?: string;
}

export function FAQAccordion({ question, answer, className }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("border-b border-slate-200", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-slate-900">{question}</span>
        <ChevronDown
          className={cn("h-5 w-5 text-slate-500 transition-transform duration-200", isOpen ? "rotate-180" : "")}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
