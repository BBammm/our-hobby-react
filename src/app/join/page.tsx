'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { authService } from '@/shared/lib/api/authService'

interface FormData {
  email: string
  nickname: string
  password: string
}

export default function JoinPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await authService.register(data)
      router.push('/auth/login') // 회원가입 후 로그인 페이지로 이동
    } catch (err: any) {
      alert(err.message || '회원가입 실패')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          {...register('email', { required: '이메일을 입력하세요.' })}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600 border-gray-300"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="text"
          placeholder="닉네임"
          {...register('nickname', { required: '닉네임을 입력하세요.' })}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600 border-gray-300"
        />
        {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname.message}</p>}

        <input
          type="password"
          placeholder="비밀번호"
          {...register('password', { required: '비밀번호를 입력하세요.', minLength: { value: 6, message: '6자 이상 입력하세요.' } })}
          className="w-full px-3 py-2 border rounded placeholder-gray-400 text-gray-600 border-gray-300"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          가입하기
        </button>
      </form>
    </div>
  )
}