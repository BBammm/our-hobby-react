export interface RegisterData {
  email: string
  password: string
  nickname: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
}

export interface LoginResponse {
  token: string
  message: string
}