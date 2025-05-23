'use client'

import { useAuth } from '@/shared/lib/auth/useAuth'
import { authService } from '@/shared/lib/api/authService'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const login = useAuth((state) => state.login)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authService.login(data)
      login(res.token)
      router.push('/')
    } catch (err) {
      const error = err as { message?: string }
      alert(error.message || '로그인 실패')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          {...register('email', { required: '이메일을 입력하세요.' })}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="비밀번호"
          {...register('password', { required: '비밀번호를 입력하세요.' })}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          로그인
        </button>
      </form>
    </div>
  )
}
