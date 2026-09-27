import Link from "next/link";
import { navigation } from "@/content/site";
import { Wordmark } from "./Wordmark";

/** Cabecera de las páginas interiores (productos): logotipo que vuelve a la portada y menú. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-night/10 bg-shell/90 backdrop-blur-md">
      <nav className="flex items-center justify-between gap-6 px-4 py-4 md:px-10" aria-label="Principal">
        <Link href="/" aria-label="Olem Studio, ir a la portada" className="text-xl text-petrol">
          <Wordmark />
        </Link>
        <ul className="flex items-center gap-5 md:gap-10">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="eyebrow text-night/70 transition-colors hover:text-petrol">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
