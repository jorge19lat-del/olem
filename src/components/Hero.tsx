import Image from "next/image";
import Link from "next/link";
import { hero, navigation, site } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Hero() {
  return (
    <header className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night text-shell">
      <Image
        src="/images/hero.jpg"
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className="-z-20 object-cover object-[75%_50%] md:object-center"
      />
      {/* Degradado para que el texto se lea sobre cualquier foto. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-petrol-deep/80 via-petrol-deep/30 to-petrol-deep/10 md:bg-gradient-to-r md:from-petrol-deep/65 md:via-petrol-deep/20 md:to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-petrol-deep/40 to-transparent" aria-hidden />

      <nav className="flex items-center justify-between gap-6 px-4 pt-6 md:px-10 md:pt-8" aria-label="Principal">
        <Wordmark className="text-2xl" />
        <ul className="flex items-center gap-5 md:gap-10">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="eyebrow text-shell/85 transition-colors hover:text-shell">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto grid grid-cols-12 gap-x-4 px-4 pt-24 pb-10 md:gap-x-8 md:px-10 md:pb-16">
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <h1 className="[text-shadow:0_2px_24px_rgb(18_63_78/0.35)] text-[26vw] text-cream md:text-[13vw] lg:text-[12rem]">
            <Wordmark />
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
