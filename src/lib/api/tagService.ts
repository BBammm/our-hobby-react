import { apiService } from './apiService'

interface Tag {
  _id: string
  name: string
}

// 🔍 자동완성: 태그 목록 검색
export const getTags = async (query: string): Promise<Tag[]> => {
  try {
    const res: any = await apiService.get(`/tags?q=${query}`)
    return res;
  } catch (error) {
    console.error('[getTags] 태그 검색 실패', error)
    return []
  }
}

// ➕ 새로운 태그 생성
export const createTag = async (name: string): Promise<Tag | null> => {
  try {
    const res: any = await apiService.post('/tags', { name })
    return res
  } catch (error) {
    console.error('[createTag] 태그 생성 실패', error)
    return null
  }
}