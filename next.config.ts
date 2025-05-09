// // next.config.ts
// import withPWA from 'next-pwa';

// const isDev = process.env.NODE_ENV === 'development';

// const nextConfig = {
//   reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: false,
//   },
//   experimental: {
//     typedRoutes: true,
//   },
//   images: {
//     domains: ['tailwindcss.com'], // ✅ 여기에 추가
//   },
//   pwa: { // pwa 설정을 nextConfig 내부로 이동
//     dest: 'public',
//     disable: isDev,
//     register: true,
//     skipWaiting: true,
//     fallbacks: {
//       document: '/offline.html',
//     },
//   },
// };

// export default withPWA(nextConfig);

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 외부 이미지 허용 (필요 시 제한 가능)
      },
    ],
  },
  // turbopack 관련 실험 옵션 제거
}

export default nextConfig