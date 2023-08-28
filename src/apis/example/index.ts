import http from '../http';

interface GetPostsResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface GetPostRepository {
  getPosts: () => Promise<GetPostsResponse>;
}

export const getPostRepository = (): GetPostRepository => {
  return {
    getPosts: async () => await http.get<GetPostsResponse[]>('https://jsonplaceholder.typicode.com/posts'),
  };
};
