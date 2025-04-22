import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

// localStorage에서 userToken 가져오기
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('userToken')
}

// 헤더 설정 (Authorization 자동 포함)
const setHeaders = (): Record<string, string> => {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// 공통 에러 핸들러
const handleError = (error: any): never => {
  const message = error.response?.data?.error || error.message || '네트워크 오류'
  console.error('[API Error]', message)
  throw new Error(message)
}

// 공통 요청 함수
const request = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  config: any = {}
): Promise<T> => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      withCredentials: true, // ✅ 브라우저 쿠키 포함 + CORS 대응
      headers: {
        ...setHeaders(),
        ...(config.headers || {}),
      },
      ...config,
    })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

// API 메서드별 함수 정리
export const apiService = {
  get: <T>(url: string, config?: any) => request<T>('get', url, null, config),
  post: <T>(url: string, data?: any, config?: any) => request<T>('post', url, data, config),
  put: <T>(url: string, data?: any, config?: any) => request<T>('put', url, data, config),
  delete: <T>(url: string, config?: any) => request<T>('delete', url, null, config),
}