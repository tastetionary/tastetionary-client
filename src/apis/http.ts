import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create(this.axiosConfig());
    this.requestInterceptors();
    this.responseInterceptors();
  }

  axiosConfig() {
    return {
      baseURL: '',
      headers: {},
    };
  }

  requestInterceptors() {
    return this.client.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        // 토큰이 없을때 타는 로직
        if (typeof window === undefined) return request;

        if (request.headers.Authorization?.toString().split(' ')[1] === 'null') {
          const token = (sessionStorage as Storage).getItem('token');
          request.headers.Authorization = `Bearer ${token}`;
          return { ...request };
        }

        return request;
      },
      (error: any) => {
        Sentry.captureException(error);
        return Promise.reject(error);
      }
    );
  }

  responseInterceptors() {
    return this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('axios response!!!!');
        return response;
      },
      (error: AxiosError) => {
        const { method, url, params, data: requestData, headers } = error.config ?? {};
        Sentry.setContext('API Request Detail', {
          method,
          url,
          params,
          requestData,
          headers,
        });

        if (error.response) {
          const { data, status } = error.response;
          Sentry.setContext('API Response Detail', {
            status,
            data,
          });
        }

        Sentry.captureException(error);

        return Promise.reject(error);
      }
    );
  }

  responseBody(response: AxiosResponse) {
    return response.data;
  }

  async get<R>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<R>(url, config).then(this.responseBody);
  }

  async post<R, D>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.client.post<R>(url, data, config).then(this.responseBody);
  }

  async put<R, D>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.client.put<R>(url, data, config).then(this.responseBody);
  }

  async delete<R>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<R>(url, config).then(this.responseBody);
  }
}

export default new HttpClient();
