import Image from "next/image";
import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <header className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night text-shell">
      <Image
        src="/images/hero.jpg"
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Degradado para que el texto se lea sobre cualquier foto. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-night/75 via-night/25 to-night/40 md:bg-gradient-to-r md:from-night/70 md:via-night/30 md:to-night/0"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-night/50 to-transparent" aria-hidden />

      <nav className="flex items-center justify-between px-4 pt-6 md:px-10 md:pt-8">
        <span className="wordmark text-xl">{site.name}</span>
        <a href="#preventa" className="eyebrow underline-offset-4 hover:underline">
          Drop 01 — Preventa
        </a>
      </nav>

      <div className="mt-auto grid grid-cols-12 gap-x-4 px-4 pt-24 pb-10 md:gap-x-8 md:px-10 md:pb-16">
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-shell/80">
            <span className="inline-block h-px w-10 bg-shell/80" aria-hidden />
            {hero.kicker}
          </p>
          <h1 className="wordmark mt-6 text-[26vw] font-light md:mt-8 md:text-[13vw] lg:text-[12rem]">
            {site.name}
          </h1>
          <p className="mt-8 max-w-xl text-2xl leading-snug font-light italic text-shell/90 md:mt-10 md:text-3xl">
            {hero.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#preventa"
              className="eyebrow inline-flex items-center gap-4 bg-shell px-7 py-4 text-night transition-colors hover:bg-petrol hover:text-shell"
            >
              {hero.cta}
              <span aria-hidden>⟶</span>
            </a>
            <span className="eyebrow text-shell/70">{site.coordinates}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
