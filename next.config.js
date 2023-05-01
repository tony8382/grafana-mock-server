/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/api/:slug*",
        headers: [
          {
            key: 'Access-Control-Allow-Headers',
            value: 'accept, content-type',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3000',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
