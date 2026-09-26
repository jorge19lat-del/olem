// Genera imágenes placeholder con la paleta de Olem en public/images.
// Sustituye cada archivo por la foto real con el mismo nombre (y proporción 4:5 o 3:4) y listo.
// Las fotos reales se listan en REAL_PHOTOS y no se sobrescriben (usa --force para regenerarlas).
import sharp from "sharp";

const REAL_PHOTOS = new Set(["hero.jpg"]);
const force = process.argv.includes("--force");

const C = {
  shell: "#f6f3ec",
  cream: "#f1f1cb",
  sage: "#dcdfcb",
  sky: "#83d0e0",
  petrol: "#1b5b6f",
  petrolDeep: "#123f4e",
  olive: "#8e9c5b",
  night: "#12030b",
  stone: "#6b6a60",
};

const label = (text, color, w, h) =>
  `<text x="${w / 2}" y="${h - 60}" text-anchor="middle" font-family="Georgia, serif" font-size="26" letter-spacing="8" fill="${color}">${text}</text>`;

const waves = (w, y0, n, gap, color, opacity) =>
  Array.from(
    { length: n },
    (_, i) =>
      `<path d="M0 ${y0 + i * gap} Q ${w * 0.25} ${y0 + i * gap - 10} ${w * 0.5} ${y0 + i * gap} T ${w} ${y0 + i * gap}" fill="none" stroke="${color}" stroke-width="2" opacity="${opacity - i * (opacity / n)}"/>`,
  ).join("");

const images = {
  "hero.jpg": [2400, 1350, (w, h) => `
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.sage}"/><stop offset="1" stop-color="${C.sky}"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h * 0.55}" fill="url(#sky)"/>
    <path d="M${w * 0.55} ${h * 0.55} L${w * 0.72} ${h * 0.43} L${w * 0.8} ${h * 0.47} L${w} ${h * 0.4} L${w} ${h * 0.55} Z" fill="${C.olive}" opacity="0.7"/>
    <rect y="${h * 0.55}" width="${w}" height="${h * 0.45}" fill="${C.petrol}"/>
    ${waves(w, h * 0.6, 9, 55, C.shell, 0.35)}
    ${label("OLEM — IMAGEN HERO", C.shell, w, h)}`],
  "story.jpg": [1200, 1600, (w, h) => `
    <rect width="${w}" height="${h}" fill="${C.petrolDeep}"/>
    ${waves(w, h * 0.15, 18, 70, C.sky, 0.45)}
    <circle cx="${w / 2}" cy="${h * 0.42}" r="${w * 0.2}" fill="none" stroke="${C.cream}" stroke-width="2" opacity="0.6"/>
    ${label("OLEM — IMAGEN ORIGEN", C.shell, w, h)}`],
};

for (const [file, [w, h, draw]] of Object.entries(images)) {
  if (REAL_PHOTOS.has(file) && !force) {
    console.log("· ", file, "(foto real, se mantiene)");
    continue;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${draw(w, h)}</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(`public/images/${file}`);
  console.log("✓", file);
}
