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

      console.log('App message received:', type, payload);

      switch (type) {
        case 'AD_READY':
          setIsAdReady(payload.ready);
          break;
        case 'AD_REWARD_EARNED':
          // 보상 획득 처리
          handleRewardEarned(payload);
          break;
        case 'AD_CLOSED':
          // 광고 닫힘 처리
          console.log('Ad closed');
          break;
        case 'AD_ERROR':
          // 에러 처리
          console.error('Ad error:', payload.error);
          setIsAdReady(false);
          break;
        case 'AD_NOT_READY':
          setIsAdReady(false);
          alert('광고가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
          break;
      }
    };

    if (checkIfInApp()) {
      window.addEventListener('appMessage', handleAppMessage as EventListener);

      // 초기 광고 준비 상태 확인
      setTimeout(() => {
        (window as any).checkAdReady?.();
      }, 1000);
    }

    return () => {
      if (checkIfInApp()) {
        window.removeEventListener('appMessage', handleAppMessage as EventListener);
      }
    };
  }, [onRewardEarned]);

  // 보상 획득 처리 함수
  const handleRewardEarned = (reward: { type: string; amount: number }) => {
    console.log('[useRewardedAd] Reward earned:', reward);
    console.log('[useRewardedAd] onRewardEarned 콜백 존재 여부:', !!onRewardEarned);

    // 외부에서 전달받은 콜백 실행 (추첨 로직 등)
    if (onRewardEarned) {
      console.log('[useRewardedAd] onRewardEarned 콜백 실행 시작');
      onRewardEarned();
      console.log('[useRewardedAd] onRewardEarned 콜백 실행 완료');
    } else {
      console.warn('[useRewardedAd] onRewardEarned 콜백이 없습니다!');
    }
  };

  // 광고 요청 함수
  const requestAd = () => {
    if (isInApp && (window as any).requestRewardedAd) {
      (window as any).requestRewardedAd();
    } else {
      console.warn('Not in app environment or requestRewardedAd not available');
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
