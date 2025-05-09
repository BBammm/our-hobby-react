import { apiService } from './apiService'

// Hobby 생성 요청 타입
export interface CreateHobbyInput {
  name: string
  tagId: string
  description: string
  locationType: 'offline' | 'home'
  location: {
    lat: number
    lng: number
    address: string
  }
  creator: string
}

// Hobby 응답 타입
export interface Hobby {
  _id: string
  name: string
  description: string
  locationType: 'offline' | 'home'
  location: {
    lat: number
    lng: number
    address: string
  }
  tag: string
  creator: string
  createdAt: string
  updatedAt: string
}

export const hobbyService = {
  createHobby: (data: CreateHobbyInput) => {
    return apiService.post<{ message: string }>('/hobbies', data)
  },

  getMyHobbies: (userId: string) => {
    return apiService.get<Hobby[]>(`/hobbies/mine?userId=${userId}`)
  },

  getNearbyHobbies: (lat: number, lng: number) => {
    return apiService.get<Hobby[]>(`/hobbies/search?lat=${lat}&lng=${lng}`)
  },

  getHobbyById: (id: string) => {
    return apiService.get<Hobby>(`/hobbies/${id}`)
  },
}