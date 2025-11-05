// Declare the global interface for the window object
declare global {
  interface Window {
    kakao: any;
    Kakao: any;
    naver: any;
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    requestRewardedAd?: () => void;
    checkAdReady?: () => void;
  }
  const kakao: any;
}

// Export an empty object to satisfy the export {}
export {};
