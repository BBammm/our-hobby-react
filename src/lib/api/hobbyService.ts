import { apiService } from './apiService'

interface HobbyData {
  name: string
  tagId: string
  description: string
  locationType: 'offline' | 'home'
  location: any,
  creator: any
}

export const createHobby = async (data: HobbyData) => {
  const res = await apiService.post('/hobbies', data)
  return res
}

export const getMyHobbies = async (userId: string) => {
  return await apiService.get(`/hobbies/mine?userId=${userId}`)
}