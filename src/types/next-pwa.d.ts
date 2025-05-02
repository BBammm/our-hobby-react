declare module 'next-pwa' {
  import { NextConfig } from 'next'
  const withPWA: (config: NextConfig) => NextConfig
  export default withPWA
}

declare module 'next-pwa/cache' {
  import type { RuntimeCaching } from 'next-pwa'
  const runtimeCaching: RuntimeCaching[]
  export default runtimeCaching
}
