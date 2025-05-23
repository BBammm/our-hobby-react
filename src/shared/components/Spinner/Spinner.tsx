'use client'

import { useLoadingStore } from '@/shared/lib/store/loadingStore'
import { useEffect, useState } from 'react'

export default function Spinner() {
  const { isLoading } = useLoadingStore()
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isLoading) {
      setShowSpinner(true)
    } else {
      // 로딩 끝나도 살짝 delay를 주고 사라지게
      timeout = setTimeout(() => setShowSpinner(false), 300) // 0.3초 부드럽게
    }

    return () => clearTimeout(timeout)
  }, [isLoading])

  if (!showSpinner) return null

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center
        bg-white/40 backdrop-blur-sm z-50
        transition-opacity duration-500
        ${isLoading ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin" />
    </div>
  )
}