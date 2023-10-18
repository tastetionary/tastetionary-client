import http from '../http';

interface PostAccountAuthCodeRes {
  data: {
    id: number;
    expiredAt: string;
  };
}

interface PostConfirmAuthCodeRes {
  data: string;
}

interface PostAccountAuthParams {
  identification: string;
  type: 'email';
}

interface PostConfirmAuthCodeParams {
  historyId: number;
  code: string;
}

interface GetRegisterRepository {
  postAccountAuthCode: ({ identification, type }: PostAccountAuthParams) => Promise<PostAccountAuthCodeRes>;
  postConfirmAuthCode: ({ historyId, code }: PostConfirmAuthCodeParams) => Promise<PostConfirmAuthCodeParams>;
  postCompanyAuthCode: ({ identification, type }: PostAccountAuthParams) => Promise<PostAccountAuthCodeRes>;
}

export const getRegisterRepository = (): GetRegisterRepository => {
  return {
    postAccountAuthCode: async ({ identification, type }: PostAccountAuthParams) =>
      await http.post<PostAccountAuthCodeRes, PostAccountAuthParams>('/apis/v1/authentication/account', {
        identification,
        type,
      }),
    postConfirmAuthCode: async ({ historyId, code }: PostConfirmAuthCodeParams) =>
      await http.post<PostConfirmAuthCodeRes, PostConfirmAuthCodeParams>('/apis/v1/authentication/status/done', {
        historyId,
        code,
      }),
    postCompanyAuthCode: async ({ identification, type }: PostAccountAuthParams) =>
      await http.post<PostAccountAuthCodeRes, PostAccountAuthParams>('/apis/v1/authentication/company', {
        identification,
        type,
      }),
  };
};
