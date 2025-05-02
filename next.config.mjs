// next.config.mjs
import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: isDev,
    fallbacks: {
      document: '/offline.html',
    },
  },
})