import Image from "next/image";
import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <nav className="flex items-center justify-between px-4 pt-5 md:px-10 md:pt-8">
        <span className="eyebrow">{site.name}</span>
        <a href="#preventa" className="eyebrow text-rust underline-offset-4 hover:underline">
          Drop 01 — Preventa
        </a>
      </nav>

      <div className="grid grid-cols-12 gap-x-4 px-4 pt-10 pb-16 md:gap-x-8 md:px-10 md:pt-16 md:pb-28">
        <div className="col-span-12 md:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-rust">
            <span className="inline-block h-px w-10 bg-rust" aria-hidden />
            {hero.kicker}
          </p>
          <h1 className="display mt-6 text-[44vw] md:mt-10 md:text-[19vw] lg:text-[17rem]">
            {site.name}
          </h1>
          <div className="mt-8 grid grid-cols-12 gap-x-4 md:mt-12">
            <p className="col-span-12 text-xl leading-snug text-ink-soft sm:col-span-10 md:col-span-9 md:col-start-3 md:text-2xl">
              {hero.lede}
            </p>
            <div className="col-span-12 mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-9 md:col-start-3">
              <a
                href="#preventa"
                className="eyebrow inline-flex items-center gap-3 bg-ink px-6 py-4 text-parchment transition-colors hover:bg-rust"
              >
                {hero.cta}
                <span aria-hidden>→</span>
              </a>
              <span className="eyebrow text-stone">{site.coordinates}</span>
            </div>
          </div>
        </div>

        <figure className="col-span-11 col-start-2 mt-14 md:col-span-5 md:col-start-8 md:mt-40">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
            <Image
              src="/images/hero.jpg"
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 92vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm italic text-stone">{hero.caption}</figcaption>
        </figure>
      </div>
    </header>
  );
}
