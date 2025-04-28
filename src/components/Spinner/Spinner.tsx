'use client'

import { useLoadingStore } from '@/lib/store/loadingStore'

export default function Spinner() {
  const { isLoading } = useLoadingStore()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50 transition-opacity">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin" />
    </div>
  )
}