import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 se usa en la foto del hero, que ocupa toda la pantalla.
    qualities: [75, 90],
  },
};

export default nextConfig;
