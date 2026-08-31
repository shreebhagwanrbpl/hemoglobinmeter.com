/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["firebase", "firebase-admin"],
  experimental: {
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
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
