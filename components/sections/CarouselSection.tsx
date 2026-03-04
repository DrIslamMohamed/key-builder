"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CarouselContent, PageMeta, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: CarouselContent;
  style?: SectionStyle;
};

const fontSizeClass: Record<NonNullable<SectionStyle["fontSize"]>, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function CarouselSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fsClass = style?.fontSize ? fontSizeClass[style.fontSize] : "text-base";

  const slides = content.slides;
  const slideCount = slides.length;
  const autoplaySpeed = content.autoplaySpeed ?? 4000;

  const [current, setCurrent] = useState(0);
  const isHovering = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount]
  );

  const goNext = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (slideCount <= 1) return;
    timerRef.current = setTimeout(() => {
      if (!isHovering.current) {
        setCurrent((c) => (c + 1) % slideCount);
      }
    }, autoplaySpeed);
  }, [autoplaySpeed, slideCount]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, resetTimer]);

  if (slideCount === 0) {
    return (
      <section
        style={{ backgroundColor: bgColor, color: textColor }}
        className={`py-12 px-4 ${fsClass}`}
      >
        <div className="max-w-5xl mx-auto text-center opacity-50">
          No slides to display.
        </div>
      </section>
    );
  }

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`py-10 sm:py-14 px-4 sm:px-6 ${fsClass}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        {content.title && (
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
            style={{ color: primary }}
          >
            {content.title}
          </h2>
        )}

        {/* Carousel container */}
        <div
          className="relative w-full overflow-hidden rounded-2xl select-none"
          style={{ height: undefined }}
          onMouseEnter={() => {
            isHovering.current = true;
          }}
          onMouseLeave={() => {
            isHovering.current = false;
            resetTimer();
          }}
          onTouchStart={() => {
            isHovering.current = true;
          }}
          onTouchEnd={() => {
            isHovering.current = false;
            resetTimer();
          }}
          role="region"
          aria-label="Image carousel"
        >
          {/* Slides track */}
          <div
            className="flex h-[250px] sm:h-[400px]"
            style={{
              transform: `translateX(${current * -100}%)`,
              transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              width: `${slideCount * 100}%`,
            }}
            aria-live="polite"
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="relative flex-shrink-0"
                style={{ width: `${100 / slideCount}%` }}
                aria-hidden={idx !== current}
              >
                {/* Background image or gradient placeholder */}
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={slide.caption || `Slide ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${primary}55 0%, ${primary}22 50%, ${bgColor} 100%)`,
                    }}
                  />
                )}

                {/* Dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Caption overlay */}
                {(slide.caption || slide.subcaption) && (
                  <div className="absolute bottom-0 inset-x-0 px-5 pb-5 pt-8">
                    {slide.caption && (
                      <p className="text-white font-bold text-lg sm:text-xl drop-shadow leading-snug">
                        {slide.caption}
                      </p>
                    )}
                    {slide.subcaption && (
                      <p className="text-white/80 text-sm sm:text-base mt-1 drop-shadow leading-snug">
                        {slide.subcaption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Left arrow */}
          {slideCount > 1 && (
            <button
              onClick={goPrev}
              className="absolute start-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 transition-colors"
              style={{ ["--tw-ring-color" as string]: primary }}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon />
            </button>
          )}

          {/* Right arrow */}
          {slideCount > 1 && (
            <button
              onClick={goNext}
              className="absolute end-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 transition-colors"
              style={{ ["--tw-ring-color" as string]: primary }}
              aria-label="Next slide"
            >
              <ChevronRightIcon />
            </button>
          )}
        </div>

        {/* Dot navigation */}
        {slideCount > 1 && (
          <div
            className="flex justify-center items-center gap-2 mt-4"
            role="tablist"
            aria-label="Carousel navigation"
          >
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                role="tab"
                aria-selected={idx === current}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => goTo(idx)}
                className="rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2"
                style={{
                  width: idx === current ? "24px" : "8px",
                  height: "8px",
                  backgroundColor: idx === current ? primary : `${primary}55`,
                  ["--tw-ring-color" as string]: primary,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
