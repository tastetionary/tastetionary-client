import http from '@/shared/api/http';

export type TloginCategory = 'email' | 'kakao' | 'naver' | 'google' | 'apple';

interface PostLoginParams {
  identification?: string;
  password?: string;
  category: TloginCategory;
  code?: string;
  /** 인가 코드를 받을 때 쓴 redirect_uri. 서버가 카카오/구글에 토큰을 요청할 때 그대로 써야 한다. */
  redirectUri?: string;
}

interface GetValidateNicknameParams {
  nickname: string;
}

interface PostLoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: string;
  refreshTokenExpiredAt: string;
}

interface AuthRepository {
  postLogin: ({ identification, password, category, code, redirectUri }: PostLoginParams) => Promise<PostLoginResponse>;
  postLogout: ({ token }: { token: string }) => Promise<any>;
  updatePassword: ({ password, token }: { password: string; token: string }) => Promise<any>;
  resetPassword: ({ historyId, code }: { historyId: number; code: string }) => Promise<any>;
  getValidateNickname: ({ nickname }: GetValidateNicknameParams) => Promise<any>;
}

const authRepository = (): AuthRepository => {
  return {
    postLogin: async ({ identification, password, category, code, redirectUri }) =>
      await http.post<any, PostLoginParams>('/apis/v1/account/tokens', {
        identification,
        password,
        category,
        code,
        redirectUri,
      }),
    postLogout: async ({ token }: { token: string }) =>
      await http.delete('/apis/v1/account/tokens', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    updatePassword: async ({ password, token }) =>
      await http.put(
        '/apis/v1/account/password',
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    resetPassword: async ({ historyId, code }) =>
      await http.put('/apis/v1/account/password/reset', { historyId, code }),
    getValidateNickname: async ({ nickname }: GetValidateNicknameParams) =>
      await http.get(`/apis/v1/user/nickname/validation?name=${nickname}`),
  };
};

export default authRepository;
