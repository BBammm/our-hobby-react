'use client'

import { useAuth } from '@/lib/auth/useAuth'
import { authService } from '@/lib/api/authService'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuth((state) => state.login) // ✅ zustand 훅 가져오기

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await authService.login({ email, password }) // ✅ 로그인 요청
      login(res.token) // ✅ 이 줄이 핵심! 상태 업데이트 + localStorage 저장
      router.push('/') // 홈 이동
    } catch (err: any) {
      setError(err.message || '로그인 실패')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">로그인</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          로그인
        </button>
      </form>
    </div>
  )
}