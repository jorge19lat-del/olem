import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { SiteHeader } from "@/components/SiteHeader";
import { drop, formatPrice, getProduct, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

// Solo existen las páginas de los productos del drop; cualquier otra dirección da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return drop.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const title = `${product.name} — ${site.title}`;
  const url = `/productos/${product.slug}`;
  const images = [{ url: product.image.src, width: product.image.width, height: product.image.height, alt: product.imageAlt }];
  return {
    title,
    description: product.description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "es_ES", url, siteName: site.name, title, description: product.description, images },
    twitter: { card: "summary_large_image", title, description: product.description, images },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const others = drop.products.filter((p) => p.id !== product.id);

  return (
    <>
      <SiteHeader />
      <main>
        <div className="px-4 pt-6 pb-20 md:px-10 md:pt-8 md:pb-28">
          <nav aria-label="Ruta" className="eyebrow text-stone">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-petrol">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#drop" className="hover:text-petrol">
                  {drop.heading}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-night">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid grid-cols-12 gap-x-4 gap-y-10 md:mt-8 md:gap-x-10 lg:gap-x-16">
            <div className="col-span-12 md:col-span-7">
              <ProductGallery media={product.gallery} name={product.name} />
            </div>

            <div className="col-span-12 md:col-span-5">
              <div className="md:sticky md:top-28">
                <p className="eyebrow text-stone">{drop.heading} · Preventa</p>
                <h1 className="display mt-4 text-5xl text-petrol md:text-6xl">{product.name}</h1>
                <p className="display mt-4 text-3xl italic">{formatPrice(product.price)}</p>
                <p className="mt-6 text-xl leading-relaxed text-night/80">{product.description}</p>

                <div className="mt-8 border-t border-night/15 pt-8">
                  <ProductPurchase product={product} />
                </div>

                <div className="mt-10 border-t border-night/15">
                  {product.info.map((section, i) => (
                    <details key={section.title} open={i === 0} className="group border-b border-night/15">
                      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between py-5 text-night [&::-webkit-details-marker]:hidden">
                        {section.title}
                        <span aria-hidden className="text-base transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="space-y-3 pb-6 text-lg leading-relaxed text-night/80">
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommunitySection />

        {others.length > 0 && (
          <section className="border-t border-night/10 px-4 py-20 md:px-10 md:py-28" aria-labelledby="drop-mas">
            <h2 id="drop-mas" className="eyebrow text-stone">También en el {drop.heading}</h2>
            <ul className="mt-10 grid grid-cols-12 gap-x-4 gap-y-12 md:gap-x-8">
              {others.map((p) => (
                <li key={p.id} className="col-span-12 sm:col-span-6 md:col-span-4">
                  <Link href={`/productos/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-sage/45">
                      <Image
                        src={p.image.src}
                        alt={p.imageAlt}
                        fill
                        sizes="(min-width: 768px) 32vw, (min-width: 640px) 48vw, 92vw"
                        className="object-contain p-[8%] transition-transform duration-1000 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h3 className="display text-3xl text-petrol">
                        {p.name}
                      </h3>
                      <span className="display text-2xl italic">{formatPrice(p.price)}</span>
                    </div>
                    <p className="eyebrow mt-2 text-stone">{p.subtitle}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
