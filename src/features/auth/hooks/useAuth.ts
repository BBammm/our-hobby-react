'use client'

import { create } from 'zustand'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  email?: string
  nickname?: string
}

interface AuthState {
  user: JwtPayload | null
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
  checkToken: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (token) => {
    localStorage.setItem('userToken', token)
    const decoded = jwt.decode(token) as JwtPayload | null
    if (decoded) {
      set({ user: decoded, isLoggedIn: true })
    }
  },

  logout: () => {
    localStorage.removeItem('userToken')
    set({ user: null, isLoggedIn: false })
  },

  checkToken: () => {
    const token = localStorage.getItem('userToken')
    if (!token) {
      set({ user: null, isLoggedIn: false })
      return false
    }
  
    try {
      const decoded = jwt.decode(token) as JwtPayload | null
      if (decoded) {
        set({ user: decoded, isLoggedIn: true })
        return true
      } else {
        set({ user: null, isLoggedIn: false })
        return false
      }
    } catch {
      set({ user: null, isLoggedIn: false })
      return false
    }
  }
}))