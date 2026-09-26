import { story } from "@/content/site";

// Fig. 02: Annobón en curvas de nivel, líneas blancas sobre el chocolate de la sección.
// Las líneas salen de scripts/generate-annobon-topo.py; las etiquetas van en HTML para usar las fuentes de la web.
// Posiciones en % del dibujo (viewBox 600 × 800): punto en el mapa y dónde empieza la etiqueta, fuera de la isla.
const labels = [
  { text: ["S. Antonio", "de Palé"], x: 44, y: 12, labelX: 22 },
  { text: ["Lago A Pot"], x: 52, y: 31, labelX: 78 },
  { text: ["Quioveo", "598 m"], x: 48, y: 65.5, labelX: 72 },
];

export function TopoMap() {
  return (
    <div className="relative">
      <img src="/images/annobon-topo.svg" alt={story.map.alt} width={600} height={800} className="block h-auto w-full" />

      {labels.map((label) => {
        const left = label.labelX < label.x;
        return (
          <div key={label.text[0]} aria-hidden>
            <span
              className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-shell"
              style={{ left: `${label.x}%`, top: `${label.y}%` }}
            />
            <span
              className="absolute h-px bg-shell/50"
              style={{
                left: `${Math.min(label.x, label.labelX)}%`,
                width: `${Math.abs(label.labelX - label.x)}%`,
                top: `${label.y}%`,
              }}
            />
            <span
              className={`eyebrow absolute -translate-y-1/2 px-2 text-[0.5625rem] leading-relaxed text-shell/80 ${
                left ? "-translate-x-full text-right" : ""
              }`}
              style={{ left: `${label.labelX}%`, top: `${label.y}%` }}
            >
              {label.text.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </span>
          </div>
        );
      })}

      <span className="eyebrow absolute top-0 right-0 flex flex-col items-center gap-1 text-shell/80" aria-hidden>
        N<span className="h-6 w-px bg-shell/80" />
      </span>
      <div className="absolute right-0 bottom-0 text-right" aria-hidden>
        <p className="display text-2xl italic text-shell">Annobón</p>
        <p className="eyebrow mt-2 text-[0.5625rem] text-shell/60">1°25′ S · 5°38′ E</p>
      </div>
    </div>
  );
}
