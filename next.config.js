/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com', 'www.freeiconspng.com', '*.png']
  }
}

module.exports = nextConfig
