'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { clsx } from 'clsx'

export default function MyHobbiesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const tabs = [
    { name: '홈', href: '/my-hobbies' },
    { name: '가입한 취미', href: '/my-hobbies/joined' },
    { name: '나의 활동', href: '/my-hobbies/activity' },
    { name: '찜한 취미', href: '/my-hobbies/bookmarked' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">내 취미</h1>

        {/* ✅ 데스크탑용 버튼 */}
        <Link
          href="/my-hobbies/create"
          className="hidden sm:inline-block bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
        >
          + 취미모임 만들기
        </Link>
      </div>

      {/* 데스크탑 탭 */}
      <nav className="hidden sm:flex gap-4 mb-6 border-b pb-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              'text-sm font-medium pb-2 border-b-2',
              pathname === tab.href
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-black hover:border-gray-300'
            )}
          >
            {tab.name}
          </Link>
        ))}
      </nav>

      {/* 모바일용 하단 고정 탭 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden flex justify-around py-2 z-50">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              'text-xs text-center',
              pathname === tab.href ? 'text-blue-600 font-semibold' : 'text-gray-500'
            )}
          >
            {tab.name}
          </Link>
        ))}
      </nav>

      {/* ✅ 모바일용 floating 버튼 */}
      <Link
        href="/my-hobbies/create"
        className="sm:hidden fixed bottom-16 right-4 bg-blue-600 text-white px-4 py-2 text-sm rounded-full shadow-lg z-50"
      >
        + 만들기
      </Link>

      <div className="pb-20 sm:pb-0">{children}</div>
    </div>
  )
}