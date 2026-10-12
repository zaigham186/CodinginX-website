import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt =
  "CodinginX. Engineering ideas into intelligent digital products.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/instrument-sans-500.ttf"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B1220",
        fontFamily: "Instrument Sans",
        color: "#F6F4EF",
        padding: "68px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 36 }}>
        Codingin<span style={{ color: "#2F6BFF" }}>X</span>
      </div>
      <div style={{ fontSize: 68, lineHeight: 1.08, maxWidth: 1000 }}>
        Engineering ideas into intelligent digital products.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#B9C5D6",
          fontSize: 24,
        }}
      >
        <span>SOFTWARE ENGINEERING + AI</span>
        <span>codinginx.com</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Instrument Sans",
          data: font.buffer.slice(
            font.byteOffset,
            font.byteOffset + font.byteLength,
          ) as ArrayBuffer,
          weight: 500,
          style: "normal",
        },
      ],
    },
  );
}
