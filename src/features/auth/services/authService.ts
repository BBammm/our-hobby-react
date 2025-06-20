'use client'

import { apiService } from '@/shared/lib/api/apiService'
import {
  RegisterData,
  RegisterResponse,
  LoginData,
  LoginResponse,
} from '../types/auth'

export const authService = {
  register: (data: RegisterData) => {
    return apiService.post<RegisterResponse>('/auth/register', data)
  },

  login: (data: LoginData) => {
    return apiService.post<LoginResponse>('/auth/login', data)
  },

  getMe: async () => {
    try {
      return await apiService.get('/auth/me')
    } catch (e: any) {
      // 401 에러는 로그인 안 된 상태로 간주하고 null 반환
      if (e.message?.includes('로그인이 필요합니다')) return null
      throw e
    }
  },

  logout: () => {
    return apiService.post('/auth/logout')
  }
}