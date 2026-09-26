import Image from "next/image";
import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <nav className="flex items-center justify-between px-4 pt-6 md:px-10 md:pt-8">
        <span className="wordmark text-xl text-night">{site.name}</span>
        <a href="#preventa" className="eyebrow text-night underline-offset-4 hover:text-petrol hover:underline">
          Drop 01 — Preventa
        </a>
      </nav>

      <div className="grid grid-cols-12 gap-x-4 px-4 pt-12 pb-20 md:gap-x-8 md:px-10 md:pt-20 md:pb-32">
        <div className="col-span-12 md:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-stone">
            <span className="inline-block h-px w-10 bg-night" aria-hidden />
            {hero.kicker}
          </p>
          <h1 className="wordmark mt-8 text-[26vw] font-light text-night md:mt-12 md:text-[13vw] lg:text-[12rem]">
            {site.name}
          </h1>
          <div className="mt-10 grid grid-cols-12 gap-x-4 md:mt-14">
            <p className="col-span-12 text-2xl leading-snug font-light italic text-night/80 sm:col-span-10 md:col-span-9 md:col-start-3 md:text-3xl">
              {hero.lede}
            </p>
            <div className="col-span-12 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-9 md:col-start-3">
              <a
                href="#preventa"
                className="eyebrow inline-flex items-center gap-4 bg-petrol px-7 py-4 text-shell transition-colors hover:bg-night"
              >
                {hero.cta}
                <span aria-hidden>⟶</span>
              </a>
              <span className="eyebrow text-stone">{site.coordinates}</span>
            </div>
          </div>
        </div>

        <figure className="col-span-11 col-start-2 mt-16 md:col-span-5 md:col-start-8 md:mt-40">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sage">
            <Image
              src="/images/hero.jpg"
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 92vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-base italic text-stone">{hero.caption}</figcaption>
        </figure>
      </div>
    </header>
  );
}
