import http from '../http';

export type TloginCategory = 'email' | 'kakao' | 'naver' | 'google' | 'apple';

interface PostLoginParams {
  identification?: string;
  password?: string;
  category: TloginCategory;
  code?: string;
}

interface GetValidateNicknameParams {
  nickname: string;
}

interface AuthRepository {
  postLogin: ({ identification, password, category, code }: PostLoginParams) => Promise<any>;
  postLogout: ({ token }: { token: string }) => Promise<any>;
  getValidateNickname: ({ nickname }: GetValidateNicknameParams) => Promise<any>;
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
    postLogout: async ({ token }: { token: string }) =>
      await http.delete('/apis/v1/account/tokens', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    getValidateNickname: async ({ nickname }: GetValidateNicknameParams) =>
      await http.get(`/apis/v1/user/nickname/validation?name=${nickname}`),
  };
};

export default authRepository;
