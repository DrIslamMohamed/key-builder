"use client";

import { useEffect, useRef, useState } from "react";
import { PageMeta, LimitedSeatsContent, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: LimitedSeatsContent;
  style?: SectionStyle;
};

const MAX_DECREMENTS = 5;
// Intervals in ms: first drop after 3 s, then every 10 s
const FIRST_DROP_DELAY = 3_000;
const SUBSEQUENT_DROP_DELAY = 10_000;

export default function LimitedSeatsSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fontSizeClass =
    style?.fontSize === "sm"
      ? "text-sm"
      : style?.fontSize === "lg"
      ? "text-lg"
      : "text-base";

  const [remaining, setRemaining] = useState(content.remainingSeats);
  const [flash, setFlash] = useState(false);
  const decrementsRef = useRef(0);

  // Trigger "flash" animation when remaining drops
  const decrement = () => {
    if (decrementsRef.current >= MAX_DECREMENTS) return;
    decrementsRef.current += 1;
    setRemaining((prev) => Math.max(0, prev - 1));
    setFlash(true);
    setTimeout(() => setFlash(false), 800);
  };

  useEffect(() => {
    // Reset on content change
    setRemaining(content.remainingSeats);
    decrementsRef.current = 0;

    const firstTimer = setTimeout(() => {
      decrement();
      const intervalId = setInterval(() => {
        if (decrementsRef.current >= MAX_DECREMENTS) {
          clearInterval(intervalId);
          return;
        }
        decrement();
      }, SUBSEQUENT_DROP_DELAY);

      return () => clearInterval(intervalId);
    }, FIRST_DROP_DELAY);

    return () => clearTimeout(firstTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.remainingSeats, content.totalSeats]);

  const taken = content.totalSeats - remaining;
  const fillPct = Math.min(100, Math.round((taken / content.totalSeats) * 100));

  // Replace {remaining} placeholder in message
  const displayMessage = content.message.replace("{remaining}", String(remaining));

  // Urgency color: use a warm red-orange if no primary override, else primary
  const urgencyColor = "#ef4444";

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`py-12 sm:py-16 px-4 sm:px-6 ${fontSizeClass}`}
    >
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Main remaining count */}
        <div className="text-center space-y-3">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest"
            style={{ backgroundColor: `${urgencyColor}20`, color: urgencyColor }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ backgroundColor: urgencyColor }} />
            Limited Availability
          </div>

          <p
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold transition-all duration-300 ${
              flash ? "scale-110" : "scale-100"
            }`}
            style={{ color: flash ? urgencyColor : primary }}
          >
            {displayMessage}
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm opacity-70">
            <span>{taken} registered</span>
            <span>{remaining} remaining of {content.totalSeats}</span>
          </div>

          {/* Track */}
          <div
            className="relative w-full h-4 sm:h-5 rounded-full overflow-hidden"
            style={{ backgroundColor: `${primary}20` }}
            role="progressbar"
            aria-valuenow={fillPct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* Fill */}
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${fillPct}%`,
                background: `linear-gradient(90deg, ${primary}, ${urgencyColor})`,
              }}
            />
          </div>

          <p className="text-end text-xs sm:text-sm font-semibold" style={{ color: urgencyColor }}>
            {fillPct}% full
          </p>
        </div>

        {/* Urgency message */}
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3 sm:px-5 sm:py-4 border-s-4"
          style={{
            borderColor: urgencyColor,
            backgroundColor: `${urgencyColor}10`,
            color: urgencyColor,
          }}
        >
          <span className="text-lg flex-shrink-0 mt-0.5">🔥</span>
          <p className="text-sm sm:text-base font-medium">{content.urgencyMessage}</p>
        </div>
      </div>
    </section>
  );
}
