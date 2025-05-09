// src/lib/api/tagService.ts
import { apiService } from './apiService'

export interface Tag {
  _id: string
  name: string
}

export const tagService = {
  /**
   * 태그 자동완성용 검색 (query 기반)
   */
  getTags: (query: string): Promise<Tag[]> => {
    return apiService.get<Tag[]>(`/tags?q=${query}`)
  },

  /**
   * 새 태그 생성
   */
  createTag: (name: string): Promise<Tag> => {
    return apiService.post<Tag>('/tags', { name })
  },

  /**
   * 최신 태그 목록 조회 (최대 10개)
   */
  getAllTags: (): Promise<Tag[]> => {
    return apiService.get<Tag[]>('/tags')
  },
}