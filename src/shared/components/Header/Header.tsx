'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Menu } from '@headlessui/react'
import { UserIcon, Bars3Icon, XMarkIcon, MapPinIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { authService } from '@/features/auth/services/authService'

const products = [
  { name: '취미 둘러보기', description: '사람들의 취미를 공유하는곳', href: 'search', icon: ChatBubbleBottomCenterTextIcon },
]

export default function Header() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn)
  const checkLogin = useAuth((state) => state.checkLogin)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkLogin()
  }, [checkLogin])

  // 로그아웃
  const handleLogout = async () => {
    try {
      await authService.logout()
      await checkLogin()
      router.push('/login')
    } catch (e) {
      alert('로그아웃에 실패했습니다.') // 여기까지 올 일 없음!
    }
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/images/logo.png" alt="우리의 취미" width={60} height={20} />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
              사람들 취미
              <ChevronDownIcon className="size-5 text-gray-400" />
            </PopoverButton>
            <PopoverPanel className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {products.map((item) => (
                  <div key={item.name} className="group flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon className="size-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <Link href="#" className="text-sm font-semibold text-gray-900">우리들 취미</Link>
          <Link href="/my-hobbies" className="text-sm font-semibold text-gray-900">내 취미</Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          {isLoggedIn ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                <UserIcon className="w-5 h-5" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-36 bg-white border rounded shadow z-50">
                <Menu.Item>
                  <Link href="/mypage" className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-600">
                    마이페이지
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-600">
                    로그아웃
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-gray-900">로그인</Link>
              <Link href="/join" className="text-sm font-semibold text-gray-900">회원가입</Link>
            </>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image src="/images/logo.png" alt="우리의 취미" width={40} height={20} />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    사람들 취미
                    <ChevronDownIcon className="size-5 group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {products.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  우리들 취미
                </Link>
                <Link href="/my-hobbies" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  내 취미
                </Link>
              </div>

              <div className="py-6 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link href="/mypage" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block text-left rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
                      로그인
                    </Link>
                    <Link href="/join" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}