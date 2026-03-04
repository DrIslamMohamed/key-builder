"use client";

import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { PageMeta, GalleryContent, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: GalleryContent;
  style?: SectionStyle;
};

const fontSizeClass: Record<NonNullable<SectionStyle["fontSize"]>, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

export default function GallerySection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fsClass = style?.fontSize ? fontSizeClass[style.fontSize] : "text-base";

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + content.images.length) % content.images.length
    );
  }, [lightboxIndex, content.images.length]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % content.images.length);
  }, [lightboxIndex, content.images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goPrev, goNext]);

  const activeImage =
    lightboxIndex !== null ? content.images[lightboxIndex] : null;

  return (
    <>
      <section
        style={{ backgroundColor: bgColor, color: textColor }}
        className={`py-12 sm:py-16 px-4 sm:px-6 ${fsClass}`}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10"
            style={{ color: primary }}
          >
            {content.title}
          </h2>

          {content.images.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-3 py-16 rounded-2xl border border-dashed opacity-50"
              style={{ borderColor: primary }}
            >
              <Images size={40} style={{ color: primary }} />
              <p className="text-sm">No images added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {content.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => openLightbox(index)}
                  className="relative overflow-hidden rounded-xl aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group"
                  style={
                    { "--tw-ring-color": primary } as React.CSSProperties
                  }
                  aria-label={`Open image: ${image.alt}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: primary }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox overlay */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 end-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Prev button */}
          {content.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute start-4 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            {activeImage.alt && (
              <p className="absolute bottom-0 inset-x-0 text-center text-white text-sm py-2 px-4 bg-black/50 rounded-b-lg">
                {activeImage.alt}
              </p>
            )}
          </div>

          {/* Next button */}
          {content.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute end-4 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Indicator dots */}
          {content.images.length > 1 && (
            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
              {content.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor:
                      i === lightboxIndex ? primary : "rgba(255,255,255,0.4)",
                    transform: i === lightboxIndex ? "scale(1.3)" : "scale(1)",
                  }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
