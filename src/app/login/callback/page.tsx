'use client';

import { useEffect, useState } from 'react';

export default function LoginCallback() {
  const [query, setQuery] = useState<string | null>(null);
  const [hash, setHash] = useState('');

  console.log('query', query);
  console.log('hash', hash);

  useEffect(() => {
    // window.location.search로 쿼리 문자열을 가져옴
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('code'); // 'code'라는 파라미터 값 추출

    setQuery(queryParam); // kakao / google

    const handleHashChange = () => {
      setHash(window.location.hash); // URL의 hash 값 추출
    };

    // 처음 렌더링 시 hash 값 설정
    handleHashChange();

    // hash 값이 변경될 때마다 값을 업데이트
    window.addEventListener('hashchange', handleHashChange);

    // cleanup 이벤트 리스너
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return <div>로그인 중입니다</div>;
}
