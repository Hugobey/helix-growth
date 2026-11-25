import { useEffect, useRef, useState } from "react";

export function ClientFilm({ id, title }: { id: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const src = ready
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0`
    : undefined;

  return (
    <div ref={ref} className="relative aspect-video overflow-hidden bg-graphite">
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={480}
        height={360}
      />
      {src && (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}
