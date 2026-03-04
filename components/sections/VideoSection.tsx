import { PlayCircle } from "lucide-react";
import { PageMeta, VideoContent, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: VideoContent;
  style?: SectionStyle;
};

type VideoType =
  | { kind: "youtube"; videoId: string }
  | { kind: "vimeo"; videoId: string }
  | { kind: "direct"; src: string }
  | { kind: "empty" };

const fontSizeClass: Record<NonNullable<SectionStyle["fontSize"]>, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

function parseVideoUrl(url: string): VideoType {
  const trimmed = url.trim();
  if (!trimmed) return { kind: "empty" };

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");

    // YouTube long form: youtube.com/watch?v=VIDEO_ID
    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return { kind: "youtube", videoId };
      // YouTube embed or shorts: youtube.com/embed/ID, youtube.com/shorts/ID
      const pathMatch = parsed.pathname.match(
        /^\/(embed|shorts|v)\/([a-zA-Z0-9_-]{11})/
      );
      if (pathMatch) return { kind: "youtube", videoId: pathMatch[2] };
    }

    // YouTube short form: youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      const videoId = parsed.pathname.slice(1).split("?")[0];
      if (videoId) return { kind: "youtube", videoId };
    }

    // Vimeo: vimeo.com/VIDEO_ID or player.vimeo.com/video/VIDEO_ID
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const pathMatch = parsed.pathname.match(/\/(?:video\/)?(\d+)/);
      if (pathMatch) return { kind: "vimeo", videoId: pathMatch[1] };
    }

    // Fallback: treat as direct video URL
    return { kind: "direct", src: trimmed };
  } catch {
    // Not a valid URL — treat as direct src anyway (relative paths, etc.)
    return { kind: "direct", src: trimmed };
  }
}

export default function VideoSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fsClass = style?.fontSize ? fontSizeClass[style.fontSize] : "text-base";

  const video = parseVideoUrl(content.videoUrl);

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`py-12 sm:py-16 px-4 sm:px-6 ${fsClass}`}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10"
          style={{ color: primary }}
        >
          {content.title}
        </h2>

        <div className="w-full" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {video.kind === "youtube" && (
            /* 16:9 aspect ratio wrapper */
            <div
              className="relative w-full overflow-hidden rounded-2xl shadow-lg"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={content.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}

          {video.kind === "vimeo" && (
            <div
              className="relative w-full overflow-hidden rounded-2xl shadow-lg"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://player.vimeo.com/video/${video.videoId}`}
                title={content.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}

          {video.kind === "direct" && (
            <div className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-black">
              <video
                className="w-full"
                src={video.src}
                controls
                preload="metadata"
                style={{ display: "block" }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {video.kind === "empty" && (
            <div
              className="relative w-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed"
              style={{
                paddingBottom: "56.25%",
                borderColor: `${primary}55`,
                backgroundColor: `${primary}0d`,
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-60">
                <PlayCircle size={56} style={{ color: primary }} />
                <p className="text-sm font-medium">No video URL set</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
