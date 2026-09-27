"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProductMedia } from "@/content/site";

function MediaTile({ media, priority }: { media: ProductMedia; priority: boolean }) {
  return (
    // Todas las piezas en el mismo recuadro 5/4; fotos y vídeos se recortan para llenarlo.
    <div className={`relative aspect-[5/4] overflow-hidden ${media.kind === "packshot" ? "bg-sage/45" : "bg-night/5"}`}>
      {media.kind === "video" ? (
        <video
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 58vw, 88vw"
          className={media.kind === "packshot" ? "object-contain p-[8%]" : "object-cover"}
        />
      )}
    </div>
  );
}

/** Móvil: carrusel deslizable con contador. Escritorio: todas las piezas en una columna, una debajo de otra. */
export function ProductGallery({ media, name }: { media: ProductMedia[]; name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const onScroll = () => {
    const el = track.current;
    if (!el || !el.firstElementChild) return;
    const step = (el.firstElementChild as HTMLElement).offsetWidth;
    setCurrent(Math.min(media.length - 1, Math.round(el.scrollLeft / step)));
  };

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        role="region"
        aria-label={`Fotos de ${name}`}
        className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-1 md:gap-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {media.map((m, i) => (
          <div key={m.src} className="w-[88vw] shrink-0 snap-center md:w-auto">
            <MediaTile media={m} priority={i === 0} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between md:hidden" aria-hidden>
        <div className="flex gap-1.5">
          {media.map((m, i) => (
            <span key={m.src} className={`h-px w-5 transition-colors ${i === current ? "bg-night" : "bg-night/20"}`} />
          ))}
        </div>
        <span className="eyebrow text-stone">
          {String(current + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
