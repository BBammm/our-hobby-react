// next.config.ts
import withPWA from 'next-pwa'
import type { NextConfig } from 'next'
import runtimeCaching from 'next-pwa/cache'

const baseConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: true,
  },
}

const configWithPWA = withPWA({
  ...baseConfig,
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
      document: '/offline.html',
    },
  }
})

export default configWithPWA