"use client";

import { useState } from "react";
import { PageMeta, RegistrationFormContent, SectionStyle } from "@/lib/types";

const fontSizeClass = { sm: "text-sm", base: "text-base", lg: "text-lg" } as const;

type Props = {
  meta: PageMeta;
  content: RegistrationFormContent;
  pageId: string;
  isPreview?: boolean;
  style?: SectionStyle;
};

export default function RegistrationFormSection({ meta, content, pageId, isPreview, style }: Props) {
  const { primary, background, text } = meta.colorTheme;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPreview) return;
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const res = await fetch(`/api/submit/${pageId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  const bgAlt = background === "#0a0a0a" ? "#111111" : `${background}cc`;
  const bg = style?.bgColor ?? bgAlt;
  const fg = style?.textColor ?? text;
  const sizeClass = fontSizeClass[style?.fontSize ?? "base"];

  return (
    <section
      id="register"
      style={{ backgroundColor: bg, color: fg }}
      className={`py-14 sm:py-20 px-4 sm:px-6 ${sizeClass}`}
    >
      <div className="max-w-md mx-auto w-full">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
          style={{ color: primary }}
        >
          {content.title}
        </h2>

        {submitted ? (
          <div
            className="text-center p-6 sm:p-8 rounded-2xl border"
            style={{ borderColor: primary, backgroundColor: `${primary}11` }}
          >
            <div className="text-4xl mb-4">✅</div>
            <p className="text-base sm:text-lg font-medium">{content.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* text-base (16px) prevents iOS auto-zoom on focus */}
            <input
              name="name"
              required
              placeholder="Full Name"
              autoComplete="name"
              className="w-full px-4 py-3.5 rounded-xl border outline-none focus:ring-2 text-base text-black bg-white"
              style={{ borderColor: `${primary}66` }}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              autoComplete="email"
              inputMode="email"
              className="w-full px-4 py-3.5 rounded-xl border outline-none focus:ring-2 text-base text-black bg-white"
              style={{ borderColor: `${primary}66` }}
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone / WhatsApp"
              autoComplete="tel"
              inputMode="tel"
              className="w-full px-4 py-3.5 rounded-xl border outline-none focus:ring-2 text-base text-black bg-white"
              style={{ borderColor: `${primary}66` }}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || isPreview}
              className="w-full py-4 rounded-xl font-bold text-base sm:text-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: primary, color: background }}
            >
              {loading ? "Submitting..." : content.submitButtonText}
            </button>
            {isPreview && (
              <p className="text-center text-xs opacity-50">Form disabled in preview</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
