'use client';

import { getPostRepository } from '@/apis/example';
import { useEffect } from 'react';

export default function ExampleAxios() {
  useEffect(() => {
    (async () => {
      const result = await getPostRepository().getPosts();
      console.log('result', result);
    })();
  }, []);

  return <div>axios - example</div>;
}
