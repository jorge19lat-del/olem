import { story } from "@/content/site";

// Annobón en curvas de nivel, líneas blancas sobre el chocolate de la sección.
// Las líneas salen de scripts/generate-annobon-topo.py; los nombres van en HTML para usar las fuentes de la web.
// Posiciones en % del dibujo (viewBox 520 × 780); peak = marca de monte.
const places = [
  { name: "San Antonio de Palea", x: 56, y: 3 },
  { name: "Isla Yegany", x: 88, y: 13 },
  { name: "Lago Mazafim", x: 35.5, y: 45 },
  { name: "Quioveo", x: 37.3, y: 55.5, peak: true },
  { name: "San Antonio del Sur", x: 58, y: 97.5 },
];

export function TopoMap() {
  return (
    <div className="relative">
      <img src="/images/annobon-topo.svg" alt={story.map.alt} width={520} height={780} className="block h-auto w-full" />

      {places.map((place) => (
        <span
          key={place.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-sm whitespace-nowrap italic text-shell [text-shadow:0_0_4px_var(--color-night),0_0_8px_var(--color-night),0_0_12px_var(--color-night)] md:text-base"
          style={{ left: `${place.x}%`, top: `${place.y}%` }}
          aria-hidden
        >
          {place.peak && <span className="block text-[0.6em] not-italic">▲</span>}
          {place.name}
        </span>
      ))}
    </div>
  );
}
