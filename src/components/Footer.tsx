import { footer, site } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="bg-night px-4 pt-20 pb-8 text-shell md:px-10 md:pt-28">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <p className="text-[24vw] md:text-[12vw]">
          <Wordmark />
        </p>
        <div className="space-y-4 md:pb-6 md:text-right">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow block text-sky underline-offset-4 hover:underline"
          >
            Instagram {site.instagram.handle}
          </a>
          <p className="text-xl italic text-shell/70">{footer.tagline}</p>
        </div>
      </div>
      <div className="eyebrow mt-14 flex justify-between border-t border-shell/15 pt-6 text-shell/50">
        <span>© {new Date().getFullYear()} {site.title}</span>
        <span>{site.coordinates}</span>
      </div>
    </footer>
  );
}
