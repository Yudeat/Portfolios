import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Helps Turbopack / RSC resolve three + R3F (ESM `exports` map). */
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
