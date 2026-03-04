"use client";

import { useEffect, useRef, useState } from "react";
import { PageMeta, VisitorCounterContent, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: VisitorCounterContent;
  style?: SectionStyle;
};

export default function VisitorCounterSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fontSizeClass =
    style?.fontSize === "sm"
      ? "text-sm"
      : style?.fontSize === "lg"
      ? "text-lg"
      : "text-base";

  const [count, setCount] = useState(content.baseCount);
  const countRef = useRef(content.baseCount);

  useEffect(() => {
    countRef.current = content.baseCount;
    setCount(content.baseCount);
  }, [content.baseCount]);

  useEffect(() => {
    const { minCount, maxCount, updateInterval } = content;

    const id = setInterval(() => {
      // Random delta between ±3 and ±15
      const magnitude = Math.floor(Math.random() * 13) + 3; // 3–15
      const delta = Math.random() < 0.5 ? -magnitude : magnitude;
      const next = Math.min(maxCount, Math.max(minCount, countRef.current + delta));
      countRef.current = next;
      setCount(next);
    }, updateInterval);

    return () => clearInterval(id);
  }, [content]);

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`py-8 sm:py-10 px-4 sm:px-6 ${fontSizeClass}`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Notification bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4
                     rounded-2xl px-5 py-4 sm:px-8 sm:py-5 text-center sm:text-start"
          style={{
            backgroundColor: `${primary}15`,
            border: `1px solid ${primary}40`,
          }}
        >
          {/* Pulsing dot */}
          <span className="relative flex-shrink-0 flex items-center justify-center w-4 h-4">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
              style={{ backgroundColor: "#22c55e" }}
            />
            <span
              className="relative inline-flex rounded-full w-3 h-3"
              style={{ backgroundColor: "#22c55e" }}
            />
          </span>

          {/* Count + message */}
          <p className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-2 gap-y-1">
            <span className="text-4xl sm:text-5xl font-extrabold tabular-nums leading-none" style={{ color: primary }}>
              {count.toLocaleString()}
            </span>
            <span className="text-sm sm:text-base opacity-80 font-medium">
              {content.message}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
