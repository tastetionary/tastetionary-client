'use client'; // Next.js 13+ App Router 사용시

import { useEffect, useState } from 'react';

// 앱 메시지 타입 정의
interface AppMessage {
  type: 'AD_READY' | 'AD_REWARD_EARNED' | 'AD_CLOSED' | 'AD_ERROR' | 'AD_NOT_READY';
  payload: any;
}

// React Hook으로 광고 기능 사용
export function useRewardedAd(onRewardEarned?: () => void) {
  const [isAdReady, setIsAdReady] = useState(false);
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    // 앱 환경인지 확인
    const checkIfInApp = () => {
      return typeof window !== 'undefined' && (window as any).ReactNativeWebView !== undefined;
    };

    setIsInApp(checkIfInApp());

    // 앱으로부터 메시지 수신
    const handleAppMessage = (event: CustomEvent<AppMessage>) => {
      const { type, payload } = event.detail;

      switch (type) {
        case 'AD_READY':
          setIsAdReady(payload.ready);
          break;
        case 'AD_REWARD_EARNED':
          handleRewardEarned(payload);

          setIsAdReady(false);
          setTimeout(() => {
            (window as any).loadRewardedAd?.();
          }, 1000);
          break;
        case 'AD_CLOSED':
          setIsAdReady(false);

          setTimeout(() => {
            (window as any).loadRewardedAd?.();
          }, 1000);
          break;
        case 'AD_ERROR':
          setIsAdReady(false);

          setTimeout(() => {
            (window as any).loadRewardedAd?.();
          }, 3000);
          break;
        case 'AD_NOT_READY':
          setIsAdReady(false);

          setTimeout(() => {
            (window as any).loadRewardedAd?.();
          }, 500);

          break;
      }
    };

    if (checkIfInApp()) {
      window.addEventListener('appMessage', handleAppMessage as EventListener);

      setTimeout(() => {
        (window as any).loadRewardedAd?.();
      }, 500);

      setTimeout(() => {
        (window as any).checkAdReady?.();
      }, 2000);
    }

    return () => {
      if (checkIfInApp()) {
        window.removeEventListener('appMessage', handleAppMessage as EventListener);
      }
    };
  }, [onRewardEarned]);

  // 보상 획득 처리 함수
  const handleRewardEarned = (_reward: { type: string; amount: number }) => {
    if (onRewardEarned) {
      onRewardEarned();
    }
  };

  // 광고 요청 함수
  const requestAd = () => {
    if (isInApp && (window as any).requestRewardedAd) {
      (window as any).requestRewardedAd();
    }
  };

  // 광고 준비 상태 확인 함수
  const checkAdReady = () => {
    if (isInApp && (window as any).checkAdReady) {
      (window as any).checkAdReady();
    }
  };

  return {
    isAdReady,
    isInApp,
    requestAd,
    checkAdReady,
  };
}
