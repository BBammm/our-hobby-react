// components/RequireLoginButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface RequireLoginButtonProps {
  to: string;           // 로그인 후 이동할 url
  children: React.ReactNode; // 버튼 텍스트(혹은 JSX)
  className?: string;   // (옵션) 추가 스타일
}

export default function RequireLoginButton({
  to,
  children,
  className = "",
}: RequireLoginButtonProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(to)}`);
    } else {
      router.push(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={
        className ||
        "mt-6 px-10 py-4 rounded-xl bg-[#434A57] text-white text-lg font-semibold hover:bg-[#2e3440] transition"
      }
    >
      {children}
    </button>
  );
}