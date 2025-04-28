import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('userToken')
}

const setHeaders = (): Record<string, string> => {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

const handleError = (error: any): never => {
  const status = error?.response?.status
  const serverMessage = error?.response?.data?.error
  const fallbackMessage = error?.message || '알 수 없는 오류가 발생했어요'
  const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null

  // 공통 메시지 매핑
  const defaultMessages: Record<number, string> = {
    400: '요청 형식이 잘못되었습니다.',
    401: token ? '접근 권한이 없습니다.' : '로그인이 필요합니다.',
    403: '이 기능을 사용할 권한이 없습니다.',
    404: '요청한 리소스를 찾을 수 없습니다.',
    409: '이미 등록된 항목입니다.',
    422: '입력값을 확인해주세요.',
    429: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    500: '서버 오류가 발생했습니다.',
    503: '서비스가 일시적으로 중단되었습니다.',
  }

  const finalMessage = defaultMessages[status] || serverMessage || fallbackMessage

  // 사용자 피드백
  if (typeof window !== 'undefined') {
    toast.error(finalMessage)

    // 라우팅 동작
    switch (status) {
      case 401:
        if (!token) {
          window.location.href = '/auth/login'
        }
        break
      case 404:
        window.location.href = '/404'
        break
    }
  }

  throw new Error(finalMessage)
}

const request = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
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

export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) => request<T>('get', url, null, config),
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => request<T>('post', url, data, config),
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => request<T>('put', url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => request<T>('delete', url, null, config),
}