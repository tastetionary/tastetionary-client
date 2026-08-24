import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const isServer = typeof window === 'undefined';

/**
 * Base URL 설정.
 *
 * 브라우저에서는 빈 문자열(= 상대 경로)을 쓴다.
 * 요청이 지금 보고 있는 origin 으로 그대로 나가서 next.config 의 `/apis/:path*` 리라이트를 타고,
 * 도메인이 tastetionary.com 이든 *.vercel.app 이든 항상 같은 origin 이라 CORS 와
 * 쿠키(token) 도메인 불일치가 생기지 않는다.
 * (특정 도메인을 박아두면 그 도메인이 아닌 곳에서 접속했을 때 크로스 오리진이 된다.)
 */
const baseUrl = '';

/**
 * 서버(SSR prefetch)용 백엔드 주소.
 *
 * 서버에는 리라이트를 태울 origin 이 없고, 자기 배포 주소로 되돌아 호출할 수도 없다.
 * `next build` 가 select-menu / select-restaurant 를 프리렌더할 때는 그 배포가 아직 서빙 전이라
 * 자기 자신을 부르면 실패한다. 그래서 서버에서는 리라이트를 건너뛰고 백엔드로 바로 간다.
 *
 * next.config 의 `/apis/:path*` -> NEXT_PUBLIC_SERVER_URL 리라이트와 같은 결과가 되도록,
 * 환경변수 끝의 `:path*` 자리표시자만 떼어내 origin 으로 쓴다.
 * (예: https://example.up.railway.app/:path* -> https://example.up.railway.app)
 */
const serverApiOrigin = (process.env.NEXT_PUBLIC_SERVER_URL ?? '').replace(/\/?:path\*$/, '').replace(/\/$/, '');

const API_PREFIX = '/apis';

// Axios 인스턴스 생성
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  if (!isServer || !config.url?.startsWith(`${API_PREFIX}/`)) return config;

  return { ...config, url: `${serverApiOrigin}${config.url.slice(API_PREFIX.length)}` };
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
