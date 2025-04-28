'use client'

import NextNProgress from 'nextjs-progressbar'

export default function LoadingProgress() {
  return (
    <NextNProgress
      color="#3B82F6"
      startPosition={0.3}
      stopDelayMs={800}  // ✅ 로딩 느리게 보이게
      height={3}
      showOnShallow
    />
  )
}