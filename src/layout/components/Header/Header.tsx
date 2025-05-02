'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { useAuth } from '@/lib/auth/useAuth'
import { UserIcon } from '@heroicons/react/24/outline'

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
} from '@headlessui/react';
import {
  Bars3Icon,
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const products = [
  { name: '내 지역의 취미', description: '내 지역의 취미를 보는곳', href: '#', icon: MapPinIcon },
  { name: '취미 둘러보기', description: '사람들의 취미를 공유하는곳', href: '#', icon: ChatBubbleBottomCenterTextIcon },
]

export interface HeaderProps {
  prop?: string;
}

export default function Header() {
  const { isLoggedIn, logout, checkToken } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // ✅ 페이지 진입 시 토큰 확인 → 상태 동기화
  useEffect(() => {
    checkToken()
  }, [])

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <Image src="/images/logo.png" alt="우리의 취미" width={60} height={20} />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              사람들 취미
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
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

          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            우리들 취미
          </a>
          <a href="/my-hobbies" className="text-sm/6 font-semibold text-gray-900">
            내 취미
          </a>
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
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-600">
                    로그아웃
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm font-semibold text-gray-900">로그인</Link>
              <Link href="/auth/join" className="text-sm font-semibold text-gray-900">회원가입</Link>
            </>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  우리들 취미
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  내 취미
                </a>
              </div>
              <div className="py-6 flex flex-col gap-2">
              <Link
                href="/auth/login"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                로그인
              </Link>
              <Link
                href="/auth/join"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                회원가입
              </Link>
            </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}