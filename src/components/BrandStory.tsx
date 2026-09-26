import { story } from "@/content/site";
import { TopoMap } from "./TopoMap";

// Escritorio: los capítulos rodean el mapa en zigzag sin taparlo — Origen arriba a la derecha (junto a
// San Antonio), Construirse a media isla a la izquierda y Nuestra filosofía abajo a la derecha.
// Móvil: Origen, mapa, Construirse y Nuestra filosofía, cada uno arrimado a su lado.
const placement = [
  "order-1 ml-auto md:order-none md:col-start-3 md:row-start-1 md:self-start",
  "order-3 mr-auto md:order-none md:col-start-1 md:row-span-2 md:row-start-1 md:self-center",
  "order-4 ml-auto md:order-none md:col-start-3 md:row-start-2 md:self-end",
];

export function BrandStory() {
  return (
    <section id="origen" className="bg-night text-shell" aria-label="Origen">
      <div className="mx-auto grid max-w-6xl gap-y-14 px-4 py-20 md:grid-cols-[1fr_minmax(0,28rem)_1fr] md:gap-x-12 md:gap-y-24 md:px-10 md:py-28">
        {story.chapters.map((chapter, i) => (
          <article key={chapter.number} className={`max-w-[85%] md:max-w-sm ${placement[i]}`}>
            <p className="display text-2xl italic text-cream">{chapter.number}</p>
            <h2 className="display mt-2 text-3xl md:text-4xl">{chapter.title}</h2>
            <div className="mt-4 space-y-3 text-lg leading-relaxed text-shell/80">
              {chapter.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}

        <div className="order-2 mx-auto w-full max-w-xs md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-none md:self-center">
          <TopoMap />
        </div>
      </div>
    </section>
  );
}
