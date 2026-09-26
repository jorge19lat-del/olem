import Image from "next/image";
import { footer, site } from "@/content/site";
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
          className="group flex items-center gap-5 self-start md:mb-6 md:self-auto md:flex-row-reverse"
        >
          <Image
            src={footer.instagram.image.src}
            width={footer.instagram.image.width}
            height={footer.instagram.image.height}
            alt={footer.instagram.imageAlt}
            sizes="96px"
            className="size-20 rounded-full object-cover ring-1 ring-shell/20 transition-transform duration-700 group-hover:rotate-[-20deg] md:size-24"
          />
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
