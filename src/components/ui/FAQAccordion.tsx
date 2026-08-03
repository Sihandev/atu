"use client";

import { useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  question: string;
  answer: string;
  className?: string;
}

export function FAQAccordion({ question, answer, className }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className={cn("border-b border-outline-variant/50", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-6 rounded-md py-6 text-left focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-lg font-medium text-on-surface">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-on-surface-variant transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={contentId}
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="leading-relaxed text-on-surface-variant">{answer}</p>
        </div>
      </div>
    </div>
  );
}
