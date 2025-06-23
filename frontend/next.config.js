module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000',
  },
  images: {
    domains: ['example.com'], // Add your image domains here
  },
};