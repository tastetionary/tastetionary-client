import http from '../http';

interface PostLoginParams {
  identification: string;
  password: string;
  category: 'email';
}

interface AuthRepository {
  postLogin: ({ identification, password, category }: PostLoginParams) => Promise<any>;
}

const authRepository = (): AuthRepository => {
  return {
    postLogin: async ({ identification, password, category }) =>
      await http.post<any, PostLoginParams>('/apis/v1/account/tokens', {
        identification,
        password,
        category,
      }),
  };
};

export default authRepository;
