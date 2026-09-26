import Image from "next/image";
import { story } from "@/content/site";

export function BrandStory() {
  return (
    <section id="origen" className="bg-petrol text-shell" aria-labelledby="origen-titulo">
      <div className="grid grid-cols-12 gap-x-4 px-4 py-24 md:gap-x-8 md:px-10 md:py-36">
        <div className="col-span-12 md:col-span-5">
          <div className="md:sticky md:top-12">
            <p className="eyebrow text-sky">{story.eyebrow}</p>
            <h2 id="origen-titulo" className="display mt-8 text-[17vw] md:text-[7vw]">
              {story.heading[0]}
              <br />
              <span className="italic text-sky">{story.heading[1]}</span>
            </h2>
            <figure className="mt-14 hidden md:block md:w-4/5">
              <div className="relative aspect-[3/4] overflow-hidden bg-petrol-deep">
                <Image
                  src="/images/story.jpg"
                  alt={story.imageAlt}
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-base italic text-shell/60">{story.caption}</figcaption>
            </figure>
          </div>
        </div>

        <div className="col-span-12 mt-16 md:col-span-6 md:col-start-7 md:mt-32">
          <ol className="space-y-16 md:space-y-24">
            {story.chapters.map((chapter) => (
              <li key={chapter.number} className="grid grid-cols-6 gap-x-4">
                <span className="display col-span-1 text-3xl italic text-sky md:text-4xl">{chapter.number}</span>
                <div className="col-span-5 border-t border-shell/20 pt-5">
                  <h3 className="display text-4xl md:text-5xl">{chapter.title}</h3>
                  <p className="mt-5 text-xl leading-relaxed text-shell/80 md:text-[1.375rem]">{chapter.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <figure className="mt-16 md:hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-petrol-deep">
              <Image src="/images/story.jpg" alt={story.imageAlt} fill sizes="92vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-base italic text-shell/60">{story.caption}</figcaption>
          </figure>

          <blockquote className="mt-24 border-l border-sky pl-6 md:mt-32 md:-ml-24 md:pl-10">
            <p className="display text-4xl leading-tight italic md:text-6xl">“{story.pullQuote}”</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
