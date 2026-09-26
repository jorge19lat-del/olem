import Image from "next/image";
import { story } from "@/content/site";

export function BrandStory() {
  return (
    <section id="origen" className="bg-ink text-parchment" aria-labelledby="origen-titulo">
      <div className="grid grid-cols-12 gap-x-4 px-4 py-20 md:gap-x-8 md:px-10 md:py-32">
        <div className="col-span-12 md:col-span-5">
          <div className="md:sticky md:top-12">
            <p className="eyebrow text-rust">{story.eyebrow}</p>
            <h2 id="origen-titulo" className="display mt-6 text-[18vw] md:text-[7.5vw]">
              {story.heading[0]}
              <br />
              <span className="text-rust">{story.heading[1]}</span>
            </h2>
            <figure className="mt-12 hidden md:block md:w-4/5">
              <div className="relative aspect-[3/4] overflow-hidden bg-ink-soft">
                <Image
                  src="/images/story.jpg"
                  alt={story.imageAlt}
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm italic text-parchment/60">{story.caption}</figcaption>
            </figure>
          </div>
        </div>

        <div className="col-span-12 mt-14 md:col-span-6 md:col-start-7 md:mt-28">
          <ol className="space-y-16 md:space-y-24">
            {story.chapters.map((chapter) => (
              <li key={chapter.number} className="grid grid-cols-6 gap-x-4">
                <span className="display col-span-1 text-4xl text-rust md:text-5xl">{chapter.number}</span>
                <div className="col-span-5">
                  <h3 className="display text-3xl md:text-4xl">{chapter.title}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-parchment/80 md:text-xl">{chapter.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <figure className="mt-16 md:hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
              <Image src="/images/story.jpg" alt={story.imageAlt} fill sizes="92vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-sm italic text-parchment/60">{story.caption}</figcaption>
          </figure>

          <blockquote className="mt-20 border-l-2 border-rust pl-6 md:mt-28 md:-ml-24 md:pl-10">
            <p className="text-3xl leading-tight italic md:text-5xl">“{story.pullQuote}”</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
