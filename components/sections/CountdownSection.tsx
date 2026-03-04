"use client";

import { useEffect, useState } from "react";
import { PageMeta, CountdownContent, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: CountdownContent;
  style?: SectionStyle;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: string): TimeLeft | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

const UNIT_LABELS: [keyof TimeLeft, string][] = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minutes"],
  ["seconds", "Seconds"],
];

export default function CountdownSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fontSizeClass =
    style?.fontSize === "sm"
      ? "text-sm"
      : style?.fontSize === "lg"
      ? "text-lg"
      : "text-base";

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    getTimeLeft(content.targetDate)
  );

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(content.targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [content.targetDate]);

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`py-12 sm:py-16 px-4 sm:px-6 ${fontSizeClass}`}
    >
      <div className="max-w-3xl mx-auto text-center space-y-8 sm:space-y-10">
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: primary }}
        >
          {content.title}
        </h2>

        {/* Countdown blocks or "started" message */}
        {timeLeft === null ? (
          <div
            className="inline-block px-6 py-4 rounded-2xl text-xl sm:text-2xl font-bold border-2"
            style={{ borderColor: primary, color: primary }}
          >
            🎉 Event has started!
          </div>
        ) : (
          <div className="flex justify-center gap-2 sm:gap-4">
            {UNIT_LABELS.map(([unit, label]) => (
              <div key={unit} className="flex flex-col items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-xl font-extrabold tabular-nums
                             w-16 h-16 text-2xl
                             sm:w-20 sm:h-20 sm:text-3xl
                             md:w-24 md:h-24 md:text-4xl"
                  style={{
                    backgroundColor: `${primary}20`,
                    color: primary,
                    border: `2px solid ${primary}50`,
                  }}
                >
                  {pad(timeLeft[unit])}
                </div>
                <span
                  className="text-xs sm:text-sm font-medium uppercase tracking-widest opacity-70"
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Label */}
        {content.label && (
          <p className="text-sm sm:text-base opacity-70">{content.label}</p>
        )}
      </div>
    </section>
  );
}
