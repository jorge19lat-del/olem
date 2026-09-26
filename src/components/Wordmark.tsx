import { site } from "@/content/site";

// Logotipo: «Olem» en cursiva sobre «STUDIO» en mayúsculas, centrados.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark inline-flex flex-col items-center ${className ?? ""}`}>
      <span className="italic">{site.wordmark.name}</span>
      <span className="text-[0.62em] uppercase tracking-[0.02em]">{site.wordmark.suffix}</span>
    </span>
  );
}
