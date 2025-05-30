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
}