import http from '../http';

interface PostLoginParams {
  identification?: string;
  password?: string;
  category: 'email' | 'kakao' | 'naver' | 'google';
  code?: string;
}

interface AuthRepository {
  postLogin: ({ identification, password, category, code }: PostLoginParams) => Promise<any>;
  postLogout: ({ token }: { token: string }) => Promise<any>;
}

const authRepository = (): AuthRepository => {
  return {
    postLogin: async ({ identification, password, category, code }) =>
      await http.post<any, PostLoginParams>('/apis/v1/account/tokens', {
        identification,
        password,
        category,
        code,
      }),
    postLogout: async ({ token }) =>
      await http.delete('/apis/v1/account/tokens', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  };
};

export default authRepository;
