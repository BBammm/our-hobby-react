import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/shared/components/Header/Header";
import Footer from "@/shared/components/Footer/Footer";
import LoadingProgress from "@/shared/components/LoadingProgress/LoadingProgress";
import SplashScreen from '@/shared/components/SplashScreen/SplashScreen'  // ✅ 추가
import Spinner from '@/shared/components/Spinner/Spinner'
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: '우리의 취미',
    template: '%s | 우리의 취미',
  },
  description: '당신의 취미를 기록하고 공유해보세요. 전국의 다양한 취미를 한눈에!',
  manifest: '/manifest.json', // ✅ 이 줄 추가
  themeColor: '#3B82F6',
  keywords: ['취미', '모임', '우리의 취미', '소셜링', '우리 동네 취미'],
  authors: [{ name: '우리의 취미 팀', url: 'https://yourdomain.com' }],
  creator: '우리의 취미',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://yourdomain.com',
    title: '우리의 취미',
    description: '전국의 다양한 취미 모임을 소개하고 함께할 수 있는 플랫폼',
    siteName: '우리의 취미',
    images: [
      {
        url: 'https://placehold.co/1200x630?text=우리의+취미+미리보기',
        width: 1200,
        height: 630,
        alt: '우리의 취미 대표 이미지',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SplashScreen />
        <LoadingProgress />
        <Spinner />
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}