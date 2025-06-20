import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useLoadingStore } from '@/shared/lib/store/loadingStore'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

// 토큰 관리/헤더 모두 필요없음! withCredentials만 필수
const request = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const { startLoading, stopLoading } = useLoadingStore.getState()
  startLoading()

  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers || {}),
      },
      withCredentials: true, // 여기가 핵심! 쿠키 자동 첨부
      ...config,
    })
    return response.data
  } catch (error: unknown) {
    return handleError(error)
  } finally {
    stopLoading()
  }
}

// handleError, apiService 그대로 (단, 401 등 처리시 로컬스토리지 관련 부분만 삭제)
const handleError = (error: unknown): never => {
  const axiosError = error as AxiosError<{ error: string }>
  const status = axiosError?.response?.status
  const serverMessage = axiosError?.response?.data?.error
  const fallbackMessage = axiosError?.message || '알 수 없는 오류가 발생했어요'

  const defaultMessages: Record<number, string> = {
    400: '요청 형식이 잘못되었습니다.',
    401: '로그인이 필요합니다.',
    403: '이 기능을 사용할 권한이 없습니다.',
    404: '요청한 리소스를 찾을 수 없습니다.',
    409: '이미 등록된 항목입니다.',
    422: '입력값을 확인해주세요.',
    429: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    500: '서버 오류가 발생했습니다.',
    503: '서비스가 일시적으로 중단되었습니다.',
  }

  const finalMessage = status && defaultMessages[status]
    ? defaultMessages[status]
    : serverMessage || fallbackMessage

  if (typeof window !== 'undefined') {
    toast.error(finalMessage)

    switch (status) {
      // case 401:
      //   window.location.href = '/login'
      //   break
      case 404:
        window.location.href = '/404'
        break
    }
  }

  throw new Error(finalMessage)
}

export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>('get', url, undefined, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>('post', url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>('put', url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>('delete', url, undefined, config),
}