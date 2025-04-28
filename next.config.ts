import withPWA from 'next-pwa'
import type { NextConfig } from 'next'
import runtimeCaching from 'next-pwa/cache'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: true,  // (있으면 추가)
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development', // 개발 중에는 PWA 비활성화
    fallbacks: {
      document: '/offline.html',
    },
  },
}

// ✅ 꼭 withPWA로 감싸서 export
export default withPWA(nextConfig)