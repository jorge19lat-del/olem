import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontPath = (weight: number) =>
  join(process.cwd(), `node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-${weight}-normal.woff`);

export default async function OpengraphImage() {
  const [bold, black] = await Promise.all([readFile(fontPath(700)), readFile(fontPath(800))]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f2ede6", fontFamily: "Barlow" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 5, color: "#b4532a" }}>
            CASA CULTURAL · ANNOBÓN
          </div>
          <div style={{ display: "flex", fontSize: 330, fontWeight: 800, lineHeight: 0.8, color: "#151311" }}>OLEM</div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 4, color: "#151311" }}>
            DROP 01 — PREVENTA ABIERTA
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: 320, background: "#151311", padding: 48 }}>
          <div style={{ display: "flex", width: 80, height: 8, background: "#b4532a", marginBottom: 28 }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 50, fontWeight: 800, lineHeight: 0.9, color: "#f2ede6" }}>
            <span>CONVERTIRSE</span>
            <span style={{ color: "#b4532a" }}>EN.</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow", data: bold, weight: 700, style: "normal" },
        { name: "Barlow", data: black, weight: 800, style: "normal" },
      ],
    },
  );
}
