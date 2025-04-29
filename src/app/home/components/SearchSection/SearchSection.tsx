'use client'

import { useState } from 'react'
import { XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'


export default function SearchSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const [loadingLocation, setLoadingLocation] = useState(false)
  const handleClear = () => setQuery('')
  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      alert('브라우저가 위치 정보를 지원하지 않습니다.')
      return
    }

    setLoadingLocation(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        // 👉 여기서 좌표를 주소로 변환해야 함 (Google Maps API / Kakao API)
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/geocode?lat=${latitude}&lng=${longitude}`)
          const data = await res.json()
          const address = data.results[0]?.formatted_address || ''

          if (address) {
            setQuery(address)
            router.push(`/search?query=${encodeURIComponent(address)}`) // ✅ 자동 검색 이동
          } else {
            alert('주소를 가져올 수 없습니다.')
          }
        } catch (err) {
          console.error(err)
          alert('주소 변환에 실패했습니다.')
        } finally {
          setLoadingLocation(false)
        }
      },
      (error) => {
        console.error(error)
        alert('위치 정보를 가져올 수 없습니다.')
        setLoadingLocation(false)
      }
    )
  }

  return (
    <section className="w-full bg-gray-50 border-b py-4 px-6 flex justify-center">
      <div className="relative flex w-full max-w-2xl items-center bg-white rounded-lg shadow-sm border">
        {/* 위치 버튼 */}
        <button
          className="flex items-center gap-1 px-3 py-2 border-r border-gray-200 text-sm text-gray-900 disabled:opacity-50"
          onClick={handleGetLocation}
          disabled={loadingLocation}
        >
          <MapPinIcon className="w-5 h-5 text-gray-900" />
          {loadingLocation ? '위치 찾는 중...' : '내 위치'}
        </button>

        {/* 입력창 */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="모임이나 장소를 검색해보세요"
          className="flex-1 px-4 py-2 text-sm outline-none text-gray-600"
        />

        {/* clear 버튼 */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  )
}