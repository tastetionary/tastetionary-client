import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** true 면 공용 인터셉터가 에러 모달을 띄우지 않는다. 호출부가 에러 안내를 직접 할 때 쓴다. */
    skipGlobalErrorModal?: boolean;
  }

  interface AxiosError {
    /** 공용 인터셉터가 이미 에러 모달을 띄웠는지 여부 */
    handledByInterceptor?: boolean;
  }
}
