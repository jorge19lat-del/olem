import Image from "next/image";
import { community, site } from "@/content/site";

/** Personas con sus piezas de Olem. Mientras no haya fotos, invita a compartir la tuya. */
export function CommunitySection() {
  const { posts } = community;
  // Siempre al menos cuatro recuadros: las fotos que haya y, el resto, huecos que invitan a participar.
  const empty = Math.max(0, 4 - posts.length);

  return (
    <section className="border-t border-night/10 px-4 py-20 md:px-10 md:py-28" aria-labelledby="comunidad-titulo">
      <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-x-8">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-stone">{community.eyebrow}</p>
          <h2 id="comunidad-titulo" className="display mt-6 text-6xl text-petrol md:text-7xl">
            {community.heading}
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 md:self-end">
          <p className="text-xl leading-relaxed text-night/80">{community.body}</p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-6 inline-flex items-center gap-4 border border-petrol px-6 py-3.5 text-petrol transition-colors hover:bg-petrol hover:text-shell"
          >
            {community.cta}
            <span aria-hidden>⟶</span>
          </a>
        </div>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {posts.map((post) => (
          <li key={post.src} className="relative aspect-[4/5] overflow-hidden bg-night/5">
            <Image src={post.src} alt={post.alt} fill sizes="(min-width: 768px) 24vw, 48vw" className="object-cover" />
            <span className="eyebrow absolute bottom-3 left-3 bg-shell/85 px-2 py-1 normal-case tracking-[0.08em] text-night">
              {post.handle}
            </span>
          </li>
        ))}
        {Array.from({ length: empty }, (_, i) => (
          <li
            key={`hueco-${i}`}
            aria-hidden
            className="flex aspect-[4/5] flex-col items-center justify-center gap-3 border border-dashed border-night/20 bg-sage/30 p-4 text-center"
          >
            <span className="display text-3xl italic text-petrol/70">Tu pieza</span>
            <span className="eyebrow text-stone">{site.instagram.handle}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
