import Image from "next/image";
import { story } from "@/content/site";
import { AnnobonMap } from "./AnnobonMap";

// Fig. 02: foto de la isla con el mapa de Annobón superpuesto, como un recorte pegado.
export function IslandCollage({ sizes }: { sizes: string }) {
  return (
    <div className="relative pb-[22%]">
      <div className="relative aspect-[3/4] w-[82%] ml-auto overflow-hidden bg-shell/10">
        <Image
          src="/images/hero.jpg"
          alt={story.collage.photoAlt}
          fill
          sizes={sizes}
          className="object-cover object-[78%_50%]"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-[60%] -rotate-3 bg-shell p-2 shadow-[0_18px_40px_rgb(0_0_0/0.45)]">
        <AnnobonMap title={story.collage.mapAlt} className="block h-auto w-full" />
        {/* Cinta adhesiva */}
        <span
          className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-cream/70 mix-blend-multiply"
          aria-hidden
        />
      </div>
    </div>
  );
}
