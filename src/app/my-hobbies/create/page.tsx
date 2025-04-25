'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ComboboxTagSelector from '@/components/ComboboxTagSelector/ComboboxTagSelector'
import MapLocationSelector from '@/components/MapLocationSelector/MapLocationSelector'
import { createHobby } from '@/lib/api/hobbyService'
import { useAuth } from '@/lib/auth/useAuth'

export default function CreateHobbyPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [tag, setTag] = useState('')
  const [description, setDescription] = useState('')
  const [locationType, setLocationType] = useState<'offline' | 'home'>('offline')
  const [manualLocation, setManualLocation] = useState('')
  const [error, setError] = useState('')

  const { user, checkToken } = useAuth()
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null)
  const [selectedTag, setSelectedTag] = useState<any | null>(null)

  useEffect(() => {
    checkToken() // 새로고침 시 로그인 유지 상태 보정
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!name || !selectedTag || !description) {
      setError('모든 필드를 입력해주세요.')
      return
    }
    if (name.length > 30) {
      setError('모임 이름은 30자 이내로 입력해주세요.')
      return
    }
  
    const finalLocation =
      locationType === 'home' ? manualLocation : location
  
    try {
      await createHobby({
        name,
        tagId: selectedTag._id,
        description,
        locationType,
        location: finalLocation,
        creator: user?.userId
      })
  
      alert('모임 생성 완료!')
      router.push('/my-hobbies')
    } catch (err) {
      console.error(err)
      setError('서버에 저장하는 데 실패했어요.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">취미모임 만들기</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-800">모임 이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 placeholder-gray-500"
            placeholder="예: 주말 등산 모임"
          />
          <p className="text-sm text-gray-500 text-right">{name.length}/30</p>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-800">모임 태그 (1개 선택)</label>
          <div>
          {selectedTag ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
              <span>{selectedTag.name}</span>
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="text-sm text-blue-500 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          ) : (
            <ComboboxTagSelector value={selectedTag} onChange={setSelectedTag} />
          )}
        </div>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-800">모임 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded h-28 resize-none text-gray-900 placeholder-gray-500"
            placeholder="모임의 취지와 활동 내용을 적어주세요."
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-800">모임 위치</label>
          <div className="flex gap-4 mb-3 text-gray-800">
            <label>
              <input
                type="radio"
                name="locationType"
                value="offline"
                checked={locationType === 'offline'}
                onChange={() => setLocationType('offline')}
              />{' '}
              지도에서 선택
            </label>
            <label>
              <input
                type="radio"
                name="locationType"
                value="home"
                checked={locationType === 'home'}
                onChange={() => setLocationType('home')}
              />{' '}
              집에서 하는 취미
            </label>
          </div>

          {locationType === 'offline' ? (
            <div className="border border-gray-300 p-3 rounded text-sm text-gray-800">
              {/* TODO: Google Map 컴포넌트 들어올 자리 */}
              <MapLocationSelector onChange={(loc) => setLocation(loc)} />
            </div>
          ) : (
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              className="w-full border border-gray-300 px-2 py-2 rounded text-gray-900 placeholder-gray-500"
              placeholder="집에서 하는 취미 위치 입력"
            />
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          만들기
        </button>
      </form>
    </div>
  )
}
