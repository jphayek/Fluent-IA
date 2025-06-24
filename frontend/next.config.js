/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = {
  ...nextConfig,
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3002',
  },
  images: {
    domains: ['example.com'], // Add your image domains here
  },
};