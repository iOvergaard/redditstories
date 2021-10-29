/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    urlImports: ["https://cdn.skypack.dev"],
  },
};
