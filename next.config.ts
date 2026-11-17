import type { NextConfig } from "next";

// The site is built as plain files (the "out" folder) so it can be hosted
// on GitHub Pages. It still works the same on Vercel.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
