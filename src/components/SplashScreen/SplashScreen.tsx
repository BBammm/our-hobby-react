'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches

      if (isStandalone) {
        setVisible(true)

        const timer = setTimeout(() => setVisible(false), 2000) // 2초 후 숨김
        return () => clearTimeout(timer)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999] transition-opacity duration-1000 animate-fadeOut">
      <Image
        src="/icons/icon-512x512.png"
        alt="우리의 취미 로고"
        className="w-32 h-32 animate-fadeIn"
      />
    </div>
  )
}