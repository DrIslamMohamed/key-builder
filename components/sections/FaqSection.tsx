"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqContent, FaqItem, PageMeta, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: FaqContent;
  style?: SectionStyle;
};

const fontSizeClass: Record<NonNullable<SectionStyle["fontSize"]>, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  primary,
  textColor,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  primary: string;
  textColor: string;
}) {
  return (
    <div
      className="border rounded-xl overflow-hidden transition-colors duration-200"
      style={{
        borderColor: isOpen ? `${primary}55` : `${primary}22`,
        backgroundColor: isOpen ? `${primary}08` : "transparent",
      }}
    >
      {/* Question button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-start font-semibold text-sm sm:text-base leading-snug focus-visible:outline-none focus-visible:ring-2 rounded-xl transition-colors duration-200"
        style={{
          color: isOpen ? primary : textColor,
          ["--tw-ring-color" as string]: primary,
        }}
      >
        <span>{item.question}</span>
        <ChevronDown
          className="flex-shrink-0 w-5 h-5 transition-transform duration-300"
          style={{
            color: primary,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        />
      </button>

      {/* Answer panel — CSS height animation via grid trick */}
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div
            className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base leading-relaxed opacity-80"
            style={{ color: textColor }}
          >
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fsClass = style?.fontSize ? fontSizeClass[style.fontSize] : "text-base";

  // Allow multiple items open simultaneously
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`py-12 sm:py-16 px-4 sm:px-6 ${fsClass}`}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Section title */}
        {content.title && (
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10"
            style={{ color: primary }}
          >
            {content.title}
          </h2>
        )}

        {content.items.length === 0 ? (
          <p className="text-center opacity-50 py-8">No questions yet.</p>
        ) : (
          <div className="flex flex-col gap-3" role="list">
            {content.items.map((item) => (
              <div key={item.id} role="listitem">
                <FaqAccordionItem
                  item={item}
                  isOpen={openIds.has(item.id)}
                  onToggle={() => toggle(item.id)}
                  primary={primary}
                  textColor={textColor}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
