const createNextIntlPlugin = require('next-intl/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Pre-optimized WebP/AVIF in public/; avoids sharp failures on external volumes
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/imprint', destination: '/impressum', permanent: true },
      { source: '/privacy', destination: '/datenschutz', permanent: true },
      { source: '/en/imprint', destination: '/en/impressum', permanent: true },
      { source: '/en/privacy', destination: '/en/datenschutz', permanent: true },
    ]
  },
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

module.exports = withNextIntl(nextConfig)
