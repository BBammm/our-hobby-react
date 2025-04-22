'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/api/authService'

export default function JoinPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authService.register({ email, password, nickname })
      router.push('/auth/login') // 회원가입 후 로그인 페이지로 이동
    } catch (err: any) {
      setError(err.message || '회원가입 실패')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600 border-gray-300"
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600 border-gray-300"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600 border-gray-300"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          가입하기
        </button>
      </form>
    </div>
  )
}