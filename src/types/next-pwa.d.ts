declare module 'next-pwa' {
  import { NextConfig } from 'next'

  export default function withPWA(config: NextConfig): NextConfig
}

declare module 'next-pwa/cache' {
  const runtimeCaching: any
  export default runtimeCaching
}