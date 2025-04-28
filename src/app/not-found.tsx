'use client'

import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        홈으로 돌아가기
      </button>
    </section>
  )
}