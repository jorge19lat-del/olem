import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontPath = (weight: number, style: "normal" | "italic") =>
  join(
    process.cwd(),
    `node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-${weight}-${style}.woff`,
  );

export default async function OpengraphImage() {
  const [light, italic] = await Promise.all([readFile(fontPath(300, "normal")), readFile(fontPath(300, "italic"))]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f6f3ec", fontFamily: "Cormorant" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, flex: 1 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#6b6a60" }}>
            CASA CULTURAL · ANNOBÓN
          </div>
          <div style={{ display: "flex", fontSize: 220, letterSpacing: 28, lineHeight: 0.9, color: "#1b5b6f" }}>OLEM</div>
          <div style={{ display: "flex", fontSize: 40, fontStyle: "italic", color: "#12030b" }}>
            Drop 01 — preventa abierta
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: 340,
            background: "#1b5b6f",
            padding: 48,
          }}
        >
          <div style={{ display: "flex", width: 80, height: 1, background: "#83d0e0", marginBottom: 28 }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 56, lineHeight: 1, color: "#f6f3ec" }}>
            <span>Convertirse</span>
            <span style={{ fontStyle: "italic", color: "#83d0e0" }}>en.</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: light, weight: 300, style: "normal" },
        { name: "Cormorant", data: italic, weight: 300, style: "italic" },
      ],
    },
  );
}
