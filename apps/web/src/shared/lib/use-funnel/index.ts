'use client';

import { AnyFunnelState, createUseFunnel } from '@use-funnel/core';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

/**
 * Next App Router 용 @use-funnel 라우터.
 *
 * 공식 패키지를 그대로 쓸 수 없어서 @use-funnel/core 의 createUseFunnel 로 라우터만 직접 붙였다.
 * - @use-funnel/next 는 next/router(Pages Router) 전용이다.
 * - @use-funnel/browser 는 컨텍스트를 history.state 에 담는데, App Router 는 페이지를 새로 불러올 때
 *   history.state 를 자기 값({ __NA, tree })으로 덮어쓴다. 그래서 새로고침을 두 번 하면 컨텍스트가 사라진다.
 *
 * 그래서 현재 단계는 URL(`{id}.step`)에, 단계별 컨텍스트는 sessionStorage 에 둔다.
 * URL 은 window.history.pushState 로 바꾼다. Next 가 이를 useSearchParams 와 동기화해 준다.
 * (node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md 의 Native History API)
 */
type FunnelState = AnyFunnelState;
type Contexts = Record<string, FunnelState['context']>;

const storageKey = (id: string) => `funnel:${id}`;

const readContexts = (id: string): Contexts => {
  try {
    return JSON.parse(sessionStorage.getItem(storageKey(id)) ?? '{}');
  } catch {
    return {};
  }
};

const writeContexts = (id: string, contexts: Contexts) => {
  try {
    sessionStorage.setItem(storageKey(id), JSON.stringify(contexts));
  } catch {
    // 저장소를 못 쓰면 새로고침 복구만 포기한다. 같은 화면 안에서는 state 로 계속 동작한다.
  }
};

/**
 * 퍼널이 끝났을 때 앞 단계에서 모은 값을 지운다.
 * keepStep 을 주면 그 단계만 빈 컨텍스트로 남긴다. (완료 화면에서 새로고침해도 완료 화면이 보이도록)
 */
export const clearFunnel = (id: string, keepStep?: string) => {
  try {
    if (keepStep) return sessionStorage.setItem(storageKey(id), JSON.stringify({ [keepStep]: {} }));

    sessionStorage.removeItem(storageKey(id));
  } catch {
    // noop
  }
};

export const useFunnel = createUseFunnel(({ id, initialState }) => {
  const searchParams = useSearchParams();
  const step = searchParams.get(`${id}.step`);
  const [contexts, setContexts] = useState<Contexts>(() => readContexts(id));

  // 컨텍스트가 없는 단계(다른 탭에서 연 링크, 저장소가 비워진 경우)는 첫 단계로 돌린다.
  const currentState: FunnelState = useMemo(
    () => (step != null && contexts[step] != null ? { step, context: contexts[step] } : initialState),
    [step, contexts, initialState]
  );

  const transition = useCallback(
    (method: 'pushState' | 'replaceState', state: FunnelState) => {
      setContexts(prev => {
        const next = { ...prev, [state.step]: state.context };
        writeContexts(id, next);
        return next;
      });

      const params = new URLSearchParams(window.location.search);
      params.set(`${id}.step`, state.step);
      window.history[method](null, '', `?${params.toString()}`);
    },
    [id]
  );

  return useMemo(
    () => ({
      // 단계 기록은 브라우저 히스토리가 들고 있다. 뒤로가기/앞으로가기는 URL 의 step 으로 복원된다.
      history: [currentState],
      currentIndex: 0,
      push: (state: FunnelState) => transition('pushState', state),
      replace: (state: FunnelState) => transition('replaceState', state),
      go: (delta: number) => window.history.go(delta),
      // 약관 보기처럼 퍼널 밖으로 나갔다 돌아와도 이어서 진행할 수 있게, 언마운트 때는 지우지 않는다.
      cleanup: () => {},
    }),
    [currentState, transition]
  );
});
