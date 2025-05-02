// next.config.ts
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    typedRoutes: true,
  },
  pwa: { // pwa 설정을 nextConfig 내부로 이동
    dest: 'public',
    disable: isDev,
    register: true,
    skipWaiting: true,
    fallbacks: {
      document: '/offline.html',
    },
  },
};

export default withPWA(nextConfig);