// Declare the global interface for the window object
declare global {
  interface Window {
    kakao: any;
    Kakao: KakaoSDK;
    naver: any;
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    requestRewardedAd?: () => void;
    checkAdReady?: () => void;
  }
  const kakao: any;
}

// Kakao SDK 타입 정의
interface KakaoSDK {
  Share: any;
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: {
    authorize: (settings: KakaoAuthSettings) => void;
    setAccessToken: (token: string) => void;
    getAccessToken: () => string | null;
    logout: () => Promise<any>;
  };
  API: {
    request: (settings: KakaoAPISettings) => Promise<any>;
  };
}

interface KakaoAuthSettings {
  redirectUri: string;
  scope?: string;
  prompt?: 'login' | 'none' | 'select_account';
  serviceTerms?: string;
  loginHint?: string;
  state?: string;
}

interface KakaoAPISettings {
  url: string;
  data?: Record<string, any>;
}

// Export an empty object to satisfy the export {}
export { };

