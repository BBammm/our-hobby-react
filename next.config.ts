import withPWA from 'next-pwa'
import type { NextConfig } from 'next'
import runtimeCaching from 'next-pwa/cache'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: true,
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
      document: '/offline.html',
    },
  },
}

export default withPWA(nextConfig) // ✅ 단일 호출