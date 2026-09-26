import { footer, site } from "@/content/site";
import { Caracola } from "./Caracola";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="bg-night px-4 pt-20 pb-8 text-shell md:px-10 md:pt-28">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <p className="text-[24vw] md:text-[12vw]">
          <Wordmark />
        </p>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${footer.instagram.label} en Instagram`}
          className="group flex flex-col items-start gap-5 md:mb-6 md:items-end md:text-right"
        >
          <Caracola className="h-auto w-28 text-cream transition-transform duration-1000 group-hover:-rotate-12 md:w-36" />
          <span className="text-2xl italic text-shell underline-offset-4 group-hover:underline md:text-3xl">
            {footer.instagram.label}
            <span className="eyebrow mt-2 block not-italic text-sky">Instagram ⟶</span>
          </span>
        </a>
      </div>
      <div className="eyebrow mt-14 flex justify-between border-t border-shell/15 pt-6 text-shell/50">
        <span>© {new Date().getFullYear()} {site.title}</span>
        <span>{site.coordinates}</span>
      </div>
    </footer>
  );
}
