import React from 'react';

import styles from './Footer.module.scss';

export interface FooterProps {
  prop?: string;
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 text-sm py-10 px-6 mt-12 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-2">우리의 취미</h2>
          <p>사람들과 취미를 나누는 새로운 공간</p>
          <p className="mt-1">© 2025 Our Hobby. All rights reserved.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">서비스</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">홈</a></li>
              <li><a href="#" className="hover:underline">모임 찾기</a></li>
              <li><a href="#" className="hover:underline">커뮤니티</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">회사</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">소개</a></li>
              <li><a href="#" className="hover:underline">이용약관</a></li>
              <li><a href="#" className="hover:underline">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}