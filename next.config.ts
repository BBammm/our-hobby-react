import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache'
import type { NextConfig } from 'next'

const baseConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    typedRoutes: true,
  },
}

const nextConfigWithPWA = withPWA({
  ...baseConfig,
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
      document: '/offline.html',
    },
  },
})

export default nextConfigWithPWA