import { footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink px-4 pt-16 pb-8 text-parchment md:px-10 md:pt-24">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <p className="display text-[30vw] md:text-[16vw]">{site.name}</p>
        <div className="space-y-4 md:pb-6 md:text-right">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow block text-rust underline-offset-4 hover:underline"
          >
            Instagram {site.instagram.handle}
          </a>
          <p className="italic text-parchment/70">{footer.tagline}</p>
        </div>
      </div>
      <div className="mt-12 flex justify-between border-t border-parchment/20 pt-5 text-sm text-parchment/50">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.coordinates}</span>
      </div>
    </footer>
  );
}
