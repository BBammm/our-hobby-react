// next.config.ts
import withPWA from 'next-pwa'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    typedRoutes: true,
  },
}

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    disable: isDev,
    fallbacks: {
      document: '/offline.html',
    },
  },
})