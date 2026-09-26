import { BrandStory } from "@/components/BrandStory";
import { DropSection } from "@/components/DropSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <BrandStory />
        <DropSection />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
