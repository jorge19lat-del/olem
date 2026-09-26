// Genera imágenes placeholder con la paleta de Olem en public/images.
// Sustituye cada archivo por la foto real con el mismo nombre (y proporción 4:5 o 3:4) y listo.
import sharp from "sharp";

const C = { parchment: "#f2ede6", sand: "#e6ddd1", ink: "#151311", inkSoft: "#2a2622", rust: "#b4532a", stone: "#6f665c" };

const label = (text, color, w, h) =>
  `<text x="${w / 2}" y="${h - 60}" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-size="30" letter-spacing="6" fill="${color}">${text}</text>`;

const tee = (fill, cx, cy, s) => `
  <path transform="translate(${cx} ${cy}) scale(${s})" fill="${fill}"
    d="M-90 -150 L-40 -170 Q0 -140 40 -170 L90 -150 L160 -90 L120 -40 L90 -60 L90 170 L-90 170 L-90 -60 L-120 -40 L-160 -90 Z"/>`;

const images = {
  "hero.jpg": [1200, 1500, (w, h) => `
    <rect width="${w}" height="${h}" fill="${C.ink}"/>
    <circle cx="${w * 0.62}" cy="${h * 0.42}" r="${w * 0.26}" fill="${C.rust}"/>
    <rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="${C.inkSoft}"/>
    ${[0, 1, 2, 3].map((i) => `<rect y="${h * 0.66 + i * 70}" x="${w * 0.1 + i * 60}" width="${w * 0.8 - i * 120}" height="6" fill="${C.parchment}" opacity="${0.25 - i * 0.05}"/>`).join("")}
    ${label("OLEM — IMAGEN HERO", C.parchment, w, h)}`],
  "story.jpg": [1200, 1600, (w, h) => `
    <rect width="${w}" height="${h}" fill="${C.inkSoft}"/>
    ${Array.from({ length: 14 }, (_, i) => `<rect y="${h * 0.2 + i * 70}" width="${w}" height="${30 + (i % 3) * 8}" fill="${i % 4 === 0 ? C.rust : C.stone}" opacity="${0.15 + (i % 5) * 0.06}"/>`).join("")}
    ${label("OLEM — IMAGEN ORIGEN", C.parchment, w, h)}`],
  "pufferfish.jpg": [1200, 1500, (w, h) => `
    <rect width="${w}" height="${h}" fill="${C.sand}"/>
    ${tee(C.ink, w / 2, h / 2 - 40, 2.6)}
    <circle cx="${w / 2}" cy="${h / 2 - 150}" r="70" fill="none" stroke="${C.rust}" stroke-width="14"/>
    ${label("FOTO PRODUCTO — PUFFERFISH", C.stone, w, h)}`],
  "baby-tee.jpg": [1200, 1500, (w, h) => `
    <rect width="${w}" height="${h}" fill="#dcd1c3"/>
    ${tee(C.rust, w / 2, h / 2 - 60, 2.1)}
    <text x="${w / 2}" y="${h / 2 - 170}" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="bold" font-size="56" fill="${C.parchment}">OLEM</text>
    ${label("FOTO PRODUCTO — BABY TEE", C.stone, w, h)}`],
};

for (const [file, [w, h, draw]] of Object.entries(images)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${draw(w, h)}</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(`public/images/${file}`);
  console.log("✓", file);
}
