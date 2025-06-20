import { create } from 'zustand'
import { authService } from '@/features/auth/services/authService' // 서버에서 쿠키로 로그인 여부를 확인하는 API

interface AuthState {
  isLoggedIn: boolean
  setLoggedIn: (val: boolean) => void
  checkLogin: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (val) => set({ isLoggedIn: val }),
  checkLogin: async () => {
    const me = await authService.getMe()
    set({ isLoggedIn: !!me })
  }
}))