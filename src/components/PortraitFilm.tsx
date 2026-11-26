import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HelixMark } from "./Helix";

type Kind = "tiktok" | "youtube" | "image";

export function PortraitFilm({
  kind,
  id,
  title,
  delay = 0,
  start,
  poster,
  crop = "native",
  tone = "navy",
}: {
  kind: Kind;
  id: string;
  title: string;
  delay?: number;
  start?: number;
  poster?: string;
  crop?: "native" | "landscape";
  tone?: "navy" | "rose" | "pine";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const reduce = useReducedMotion();
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!fromThisFilm(event, frame.current)) return;
      const origin = String(event.origin);
      const raw = typeof event.data === "string" ? event.data : JSON.stringify(event.data ?? "");
      if (origin.endsWith("tiktok.com")) {
        if (/errorCode|onPlayerError|"type":"error"|unavailable/i.test(raw)) setFailed(true);
      }
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
          setSrc(kind === "tiktok" ? tiktokSrc(id) : youtubeSrc(id, start));
        }, delay);
      },
      { rootMargin: "160px" },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay, id, kind, reduce, start]);

  const still = poster || (kind === "image" ? id : kind === "youtube" ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "");
  const showStill = Boolean(still) && !posterFailed;
  const frameClass =
    crop === "landscape"
      ? "absolute left-1/2 -top-[12%] h-[128%] w-[405%] max-w-none -translate-x-1/2 border-0"
      : "absolute inset-0 z-[2] h-full w-full border-0";

  return (
    <div ref={ref} className="film-media absolute inset-0 bg-graphite" aria-hidden="true">
      {showStill ? (
        <img
          src={still}
          alt=""
          width={720}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          onError={() => setPosterFailed(true)}
        />
      ) : (
        <div className={`absolute inset-0 ${fallbackTone[tone]}`}>
          <HelixMark className="absolute inset-x-[-18%] top-[16%] w-[136%] text-white/45" />
        </div>
      )}
      {src && !failed && kind !== "image" && (
        <iframe
          ref={frame}
          title={title}
          src={src}
          className={`${frameClass} pointer-events-none opacity-100`}
          loading="lazy"
          tabIndex={-1}
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={(event) => {
            if (kind !== "youtube") return;
            event.currentTarget.contentWindow?.postMessage('{"event":"listening","id":1}', "*");
          }}
        />
      )}
    </div>
  );
}

const fallbackTone = {
  navy: "bg-[radial-gradient(circle_at_50%_30%,#1d4e8c,transparent_55%),linear-gradient(#0c2344,#071018)]",
  rose: "bg-[radial-gradient(circle_at_50%_30%,#e7b4b0,transparent_55%),linear-gradient(#6a3a42,#2a181c)]",
  pine: "bg-[radial-gradient(circle_at_50%_30%,#1f6f62,transparent_55%),linear-gradient(#0c3a32,#041812)]",
};

function fromThisFilm(event: MessageEvent, node: HTMLIFrameElement | null) {
  const mine = node?.contentWindow;
  if (!mine || !event.source) return false;
  if (event.source === mine) return true;
  try {
    let cursor = event.source as Window;
    for (let i = 0; i < 4; i++) {
      if (cursor === mine) return true;
      if (!cursor.parent || cursor.parent === cursor) break;
      cursor = cursor.parent;
    }
  } catch {
    return false;
  }
  return false;
}

function youtubeSrc(id: string, start?: number) {
  const origin = encodeURIComponent(window.location.origin);
  const at = start ? `&start=${start}` : "";
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3&disablekb=1&enablejsapi=1&origin=${origin}${at}`;
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
