/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
};
export default nextConfig;
