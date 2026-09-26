// Mapa ilustrado de Annobón (trazado estilizado, no cartográfico).
// Norte arriba; la isla mide unos 6,4 km de norte a sur.

const coast =
  "M118 52 C140 40 170 48 188 66 C205 82 222 96 226 120 C231 146 218 160 222 184 C226 210 214 232 206 256 C198 282 196 304 182 326 C170 346 156 364 140 360 C124 356 120 338 110 322 C98 302 86 290 84 266 C82 242 74 222 78 198 C82 174 70 158 76 132 C82 106 92 96 98 80 C104 64 108 58 118 52 Z";

// Curvas de nivel: la costa encogida hacia el pico Quioveo.
const contours = [0.78, 0.56, 0.34];

export function AnnobonMap({ title, className }: { title: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 420" role="img" aria-label={title} className={className}>
      <title>{title}</title>
      <rect width="300" height="420" className="fill-shell" />

      {/* Mar */}
      <g className="stroke-sky/60" fill="none" strokeWidth="0.75">
        {[28, 44, 380, 396].map((y) => (
          <path key={y} d={`M16 ${y} q 34 -5 68 0 t 68 0 t 68 0 t 68 0`} />
        ))}
      </g>

      <path d={coast} className="fill-sage stroke-petrol" strokeWidth="1.5" />
      <g className="stroke-petrol/40" fill="none" strokeWidth="0.75">
        {contours.map((k) => (
          <path key={k} d={coast} transform={`translate(152 250) scale(${k}) translate(-152 -250)`} />
        ))}
      </g>

      {/* Lago A Pot */}
      <ellipse cx="150" cy="130" rx="16" ry="11" className="fill-sky stroke-petrol" strokeWidth="1" />

      {/* San Antonio de Palé */}
      <circle cx="112" cy="60" r="3" className="fill-night" />
      {/* Pico Quioveo */}
      <path d="M152 254 l6 10 h-12 z" className="fill-night" />

      <g className="fill-night font-sans" fontSize="8" letterSpacing="1.2">
        <text x="102" y="48" textAnchor="end">S. ANTONIO</text>
        <text x="102" y="59" textAnchor="end">DE PALÉ</text>
        <text x="150" y="156" textAnchor="middle">LAGO A POT</text>
        <text x="152" y="280" textAnchor="middle">QUIOVEO</text>
        <text x="152" y="291" textAnchor="middle" className="fill-stone">598 M</text>
      </g>

      {/* Norte */}
      <g className="stroke-night" strokeWidth="1" fill="none">
        <path d="M264 80 V52 M258 62 l6 -10 l6 10" />
      </g>
      <text x="264" y="46" textAnchor="middle" fontSize="9" className="fill-night font-sans">
        N
      </text>

      {/* Escala: ~48 px = 1 km */}
      <g className="stroke-night" strokeWidth="1">
        <path d="M24 352 H72 M24 348 V356 M72 348 V356" />
      </g>
      <text x="48" y="344" textAnchor="middle" fontSize="8" letterSpacing="1.2" className="fill-night font-sans">
        1 KM
      </text>

      <text x="150" y="410" textAnchor="middle" fontSize="15" letterSpacing="4" className="fill-petrol font-display">
        ANNOBÓN
      </text>
      <text x="278" y="352" textAnchor="end" fontSize="7" letterSpacing="1.2" className="fill-stone font-sans">
        1°25′ S
      </text>
      <text x="278" y="362" textAnchor="end" fontSize="7" letterSpacing="1.2" className="fill-stone font-sans">
        5°38′ E
      </text>
    </svg>
  );
}
