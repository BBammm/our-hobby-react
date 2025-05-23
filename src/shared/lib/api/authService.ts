// src/lib/api/authService.ts
'use client'

import { apiService } from './apiService'

export interface RegisterData {
  email: string
  password: string
  nickname: string
}

export interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

interface RegisterResponse {
  message: string
}

export const authService = {
  register: (data: RegisterData) => {
    return apiService.post<RegisterResponse>('/auth/register', data)
  },

  login: (data: LoginData) => {
    return apiService.post<LoginResponse>('/auth/login', data)
  },
}