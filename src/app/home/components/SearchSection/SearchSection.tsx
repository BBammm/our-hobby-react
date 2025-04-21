'use client'

import { useState } from 'react'
import { XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function SearchSection() {
  const [query, setQuery] = useState('')

  const handleClear = () => setQuery('')

  return (
    <section className="w-full bg-gray-50 border-b py-4 px-6 flex justify-center">
      <div className="relative flex w-full max-w-2xl items-center bg-white rounded-lg shadow-sm border">
        {/* 위치 버튼 */}
        <button
          className="flex items-center gap-1 px-3 py-2 border-r border-gray-200 text-sm text-gray-900"
          onClick={() => alert('위치 검색 기능은 아직 구현되지 않았어요 😄')}
        >
          <MapPinIcon className="w-5 h-5 text-gray-900" />
          내 위치
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