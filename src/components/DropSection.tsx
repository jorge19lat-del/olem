import Image from "next/image";
import Link from "next/link";
import { drop, formatPrice, type Product } from "@/content/site";
import { ReserveLink } from "./ReserveLink";

function ProductCard({ product, index, className }: { product: Product; index: number; className?: string }) {
  const href = `/productos/${product.slug}`;
  return (
    <article className={className}>
      <p className="eyebrow mb-6 text-stone">
        {String(index + 1).padStart(2, "0")} / {String(drop.products.length).padStart(2, "0")}
      </p>
      <Link href={href} className="block" tabIndex={-1} aria-hidden>
        <Image
          src={product.image.src}
          width={product.image.width}
          height={product.image.height}
          alt={product.imageAlt}
          sizes="(min-width: 768px) 45vw, 92vw"
          className="h-auto w-full transition-transform duration-1000 hover:scale-[1.02]"
        />
      </Link>

      <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-night/15 pt-5">
        <div>
          <h3 className="display text-5xl text-petrol md:text-6xl">
            <Link href={href} className="underline-offset-8 hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="eyebrow mt-3 text-stone">{product.subtitle}</p>
        </div>
        <p className="display text-3xl italic md:text-4xl">{formatPrice(product.price)}</p>
      </div>

      <p className="mt-5 max-w-md text-xl leading-relaxed text-night/80">{product.description}</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link
          href={href}
          className="eyebrow inline-flex items-center gap-4 bg-petrol px-6 py-3.5 text-shell transition-colors hover:bg-night"
        >
          Ver producto
          <span aria-hidden>⟶</span>
        </Link>
        <ReserveLink productId={product.id}>{drop.cta}</ReserveLink>
        <span className="eyebrow text-stone">
          Tallas {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
        </span>
      </div>
    </article>
  );
}

export function DropSection() {
  const [first, second] = drop.products;

  return (
    <section id="drop" className="px-4 py-24 md:px-10 md:py-36" aria-labelledby="drop-titulo">
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-stone">{drop.eyebrow}</p>
          <h2 id="drop-titulo" className="display mt-8 text-[24vw] text-petrol md:text-[11vw]">
            {drop.heading}
          </h2>
        </div>
        <p className="col-span-12 mt-8 text-2xl leading-snug font-light italic text-night/80 md:col-span-4 md:col-start-9 md:mt-auto md:pb-4">
          {drop.intro}
        </p>
      </div>

      <div className="mt-20 grid grid-cols-12 gap-x-4 gap-y-24 md:mt-28 md:gap-x-8">
        <ProductCard product={first} index={0} className="col-span-12 md:col-span-6" />
        <ProductCard product={second} index={1} className="col-span-12 md:col-span-5 md:col-start-8 md:mt-48" />
      </div>
    </section>
  );
}
