import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HelixMark } from "./Helix";

type Kind = "tiktok" | "youtube" | "image";

export function PortraitFilm({
  kind,
  id,
  title,
  delay = 0,
}: {
  kind: Kind;
  id: string;
  title: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const origin = String(event.origin);
      const raw = typeof event.data === "string" ? event.data : JSON.stringify(event.data ?? "");
      if (origin.endsWith("tiktok.com")) {
        if (/errorCode|onPlayerError|"type":"error"|unavailable/i.test(raw)) setFailed(true);
        if (/onVideoPlay|onStateChange|"type":"play"|video_play/i.test(raw)) setPlaying(true);
      }
      if (origin.includes("youtube.com") && /"info":1(?!\d)/.test(raw)) setPlaying(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (reduce || kind === "image") return;
    const node = ref.current;
    if (!node) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          setSrc(kind === "tiktok" ? tiktokSrc(id) : youtubeSrc(id));
        }, delay);
      },
      { rootMargin: "160px" },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay, id, kind, reduce]);

  const poster = kind === "youtube" || kind === "image" ? (kind === "image" ? id : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`) : undefined;

  return (
    <div ref={ref} className="film-media absolute inset-0 bg-[#071018]">
      {poster ? (
        <img
          src={poster}
          alt=""
          width={480}
          height={360}
          className="absolute left-1/2 top-1/2 h-[145%] w-[260%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#16315c,transparent_55%),linear-gradient(#071426,#071018)]">
          <HelixMark className="absolute inset-x-[-12%] top-[10%] w-[124%] text-white/35" />
        </div>
      )}
      {src && kind === "youtube" && (
        <iframe
          title={title}
          src={src}
          className={`absolute left-1/2 top-1/2 h-[160%] w-[280%] max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={(event) => {
            event.currentTarget.contentWindow?.postMessage('{"event":"listening","id":1}', "*");
          }}
        />
      )}
      {src && kind === "tiktok" && !failed && (
        <iframe
          title={title}
          src={src}
          className={`absolute left-0 top-1/2 h-[178%] w-full -translate-y-1/2 transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}

function youtubeSrc(id: string) {
  const origin = encodeURIComponent(window.location.origin);
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&origin=${origin}`;
}

function tiktokSrc(id: string) {
  const query = new URLSearchParams({
    autoplay: "1",
    muted: "1",
    loop: "1",
    controls: "0",
    progress_bar: "0",
    play_button: "0",
    volume_control: "0",
    fullscreen_button: "0",
    timestamp: "0",
    description: "0",
    music_info: "0",
    rel: "0",
    closed_caption: "0",
  });
  return `https://www.tiktok.com/player/v1/${id}?${query.toString()}`;
}
