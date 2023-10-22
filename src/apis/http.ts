import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const sessionStorage = typeof window !== undefined && window.sessionStorage;
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
      headers: {
        Authorization: `Bearer ${(sessionStorage as Storage).getItem('token')}`,
      },
    };
  }

  requestInterceptors() {
    return this.client.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        // 토큰이 없을때 타는 로직
        if (request.headers.Authorization?.toString().split(' ')[1] === 'null') {
          const token = (sessionStorage as Storage).getItem('token');
          request.headers.Authorization = `Bearer ${token}`;
          return { ...request };
        }

        return request;
      },
      (error: any) => {
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
      (error: any) => {
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
