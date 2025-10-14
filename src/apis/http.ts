import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base URL 설정
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.tastetionary.com';

// Axios 인스턴스 생성
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data && response.data.data) {
      return {
        ...response,
        data: response.data.data, // 데이터 가공
      };
    }
    return response;
  },
  error => Promise.reject(error)
);

// 요청 메서드 정의 (config 추가 지원)
const getRequest = async <TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.get(url, config);
  return response.data;
};

const postRequest = async <TResponse, TRequest>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.post<TResponse, AxiosResponse<TResponse>, TRequest>(
    url,
    data,
    config
  );
  return response.data;
};

const putRequest = async <TResponse, TRequest>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.put<TResponse, AxiosResponse<TResponse>, TRequest>(
    url,
    data,
    config
  );
  return response.data;
};

const deleteRequest = async <TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.delete(url, config);
  return response.data;
};

// Export: API 호출 유틸리티
const http = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default http;
