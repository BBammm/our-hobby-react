import { apiService } from './apiService'

interface RegisterData {
  email: string
  password: string
  nickname: string
}

interface LoginData {
  email: string
  password: string
}

export const authService = {
  register: (data: RegisterData) => {
    return apiService.post('/auth/register', data)
  },

  login: (data: LoginData) => {
    return apiService.post<{ token: string }>('/auth/login', data)
  },
}