import http from '../http';

interface PostAccountAuthCodeRes {
  id: number;
  expiredAt: string;
}

interface PostAccountAuthParams {
  identification: string;
  type: 'email';
}

interface GetPostRepository {
  postAccountAuthCode: ({ identification, type }: PostAccountAuthParams) => Promise<PostAccountAuthCodeRes>;
}

export const getRegisterRepository = (): GetPostRepository => {
  return {
    postAccountAuthCode: async ({ identification, type }: PostAccountAuthParams) =>
      await http.post<PostAccountAuthCodeRes, PostAccountAuthParams>('/v1/authentication/account', {
        identification,
        type,
      }),
  };
};
