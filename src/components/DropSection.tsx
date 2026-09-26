import Image from "next/image";
import { drop, formatPrice, type Product } from "@/content/site";
import { ReserveLink } from "./ReserveLink";

function ProductCard({ product, index, className }: { product: Product; index: number; className?: string }) {
  return (
    <article className={className}>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
        <span className="eyebrow absolute top-4 left-4 bg-parchment px-2.5 py-1.5">
          {String(index + 1).padStart(2, "0")} / {String(drop.products.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 border-t border-ink pt-4">
        <div>
          <h3 className="display text-5xl md:text-6xl">{product.name}</h3>
          <p className="eyebrow mt-3 text-stone">{product.subtitle}</p>
        </div>
        <p className="display text-4xl text-rust md:text-5xl">{formatPrice(product.price)}</p>
      </div>

      <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{product.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <ReserveLink productId={product.id}>{drop.cta}</ReserveLink>
        <span className="eyebrow text-stone">Tallas {product.sizes.join(" · ")}</span>
      </div>
    </article>
  );
}

export function DropSection() {
  const [first, second] = drop.products;

  return (
    <section id="drop" className="px-4 py-20 md:px-10 md:py-32" aria-labelledby="drop-titulo">
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-rust">{drop.eyebrow}</p>
          <h2 id="drop-titulo" className="display mt-6 text-[30vw] md:text-[14vw]">
            {drop.heading}
          </h2>
        </div>
        <p className="col-span-12 mt-8 text-xl leading-snug text-ink-soft md:col-span-4 md:col-start-9 md:mt-auto md:pb-4">
          {drop.intro}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-20 md:mt-24 md:gap-x-8">
        <ProductCard product={first} index={0} className="col-span-12 md:col-span-6" />
        <ProductCard product={second} index={1} className="col-span-12 md:col-span-5 md:col-start-8 md:mt-48" />
      </div>
    </section>
  );
}
