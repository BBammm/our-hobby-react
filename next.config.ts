import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
      document: '/offline.html',
    },
  },
})