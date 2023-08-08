import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios;
    }

    responseBody<T>(response: AxiosResponse<T>) {
        return response.data;
    }

    get<T>(url: string, config?: AxiosRequestConfig) {
        return this.client.get<T>(url, config).then(this.responseBody);
    }

    post<T, D>(url: string, data?: D, config?: AxiosRequestConfig) {
        return this.client.post<T>(url, data, config).then(this.responseBody);
    }

    put<T, D>(url: string, data?: D, config?: AxiosRequestConfig) {
        return this.client.put<T>(url, data, config).then(this.responseBody);
    }

    delete<T>(url: string, config?: AxiosRequestConfig) {
        return this.client.delete<T>(url, config).then(this.responseBody);
    }
}

export default HttpClient;
