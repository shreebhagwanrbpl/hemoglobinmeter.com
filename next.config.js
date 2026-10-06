/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/items",
        permanent: true,
      },
      {
        source: "/products/:slug",
        destination: "/items/:slug",
        permanent: true,
      },
      {
        source: "/:district/products",
        destination: "/:district/items",
        permanent: true,
      },
      {
        source: "/:district/products/:slug",
        destination: "/:district/items/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
