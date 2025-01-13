import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { ComponentType } from 'react';

type WithAuthProps = {
  token?: string;
};

/**
 * Auth HOC
 */
export function withAuth<T extends object>(
  Component: ComponentType<T & WithAuthProps>, // 컴포넌트를 타입으로 명시
  redirectPath?: string
) {
  // HOC의 반환값
  return async (props: T) => {
    // 쿠키에서 토큰 가져오기
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    console.log('💫 token form hoc', token);

    // 토큰이 없으면 리디렉션
    if (!token) {
      if (redirectPath) {
        return redirect(redirectPath);
      }

      // redirectPath가 없으면 토큰 없이 컴포넌트를 렌더링
      return React.createElement(Component, { ...props });
    }

    // 토큰이 있으면 컴포넌트 렌더링
    return React.createElement(Component, { ...props, token });
  };
}

/**
 * Auth HOC
 */
export function withNoAuth<T extends object>(
  Component: ComponentType<T>, // 컴포넌트를 타입으로 명시
  redirectPath?: string
) {
  // HOC의 반환값
  return async (props: T) => {
    // 쿠키에서 토큰 가져오기
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    // 토큰이 없으면 리디렉션
    if (token && redirectPath) return redirect(redirectPath);

    // 토큰이 있으면 컴포넌트 렌더링
    return React.createElement(Component, { ...props });
  };
}
