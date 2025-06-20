'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { hobbyService } from '@/features/my-hobbies/services/hobbyService'
import { useAuth } from '@/features/auth/hooks/useAuth'
import CardItem from '@/features/my-hobbies/components/CardItem/CardItem'

interface Hobby {
  _id: string
  name: string
  description: string
  image?: string
}

export default function MyHobbyHome() {
  const router = useRouter()
  const isLoggedIn = useAuth((state) => state.isLoggedIn)
  const checkLogin = useAuth((state) => state.checkLogin)
  const [myHobbies, setMyHobbies] = useState<Hobby[]>([])

  // ✅ 마운트시 로그인 상태 체크(쿠키 기반)
  useEffect(() => {
    checkLogin()
  }, [checkLogin])

  // ✅ 로그인 상태 아니면 로그인 페이지로 이동
  useEffect(() => {
    if (isLoggedIn === false) {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  // ✅ 내 취미 목록 불러오기 (userId 넘길 필요 없이 서버에서 인증된 유저 기준으로 반환)
  useEffect(() => {
    if (!isLoggedIn) return

    const fetch = async () => {
      try {
        const res: any = await hobbyService.getMyHobbies() // userId 인자 필요 없음!
        setMyHobbies(res)
      } catch (err) {
        console.error('내 취미 불러오기 실패:', err)
      }
    }

    fetch()
  }, [isLoggedIn])

  return (
    <section className="px-4 py-6 max-w-[1200px] mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">내가 만든 취미</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {myHobbies.map((hobby) => (
          <CardItem
            key={hobby._id}
            title={hobby.name}
            description={hobby.description}
            image={hobby.image || 'https://placehold.co/300x200?text=No+Image'}
            href={`/hobbies/${hobby._id}`}
          />
        ))}
      </div>
    </section>
  )
}