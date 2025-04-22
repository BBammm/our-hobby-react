'use client'

import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
  checkToken: () => void
}

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,

  login: (token) => {
    localStorage.setItem('userToken', token)
    set({ isLoggedIn: true })
  },

  logout: () => {
    localStorage.removeItem('userToken')
    set({ isLoggedIn: false })
  },

  checkToken: () => {
    const token = localStorage.getItem('userToken')
    set({ isLoggedIn: !!token })
  },
}))