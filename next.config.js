/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;
