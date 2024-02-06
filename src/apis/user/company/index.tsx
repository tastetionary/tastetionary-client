import http from '@/apis/http';

interface PostAccountAuthCodeRes {
  data: {
    id: number;
    expiredAt: string;
  };
}

interface PostAccountAuthParams {
  identification: string;
  type: 'email';
  token?: string;
}

interface PostRegisterUserParams {
  code: string;
  historyId: number;
  token?: string;
}

interface GetRegisterRepository {
  postRequestCompanyAuthCode: ({ identification, type }: PostAccountAuthParams) => Promise<PostAccountAuthCodeRes>;
  postCheckCompanyAuthCode: (payload: PostRegisterUserParams) => Promise<any>;
}

export const getUserCompanyRepository = (): GetRegisterRepository => {
  return {
    postRequestCompanyAuthCode: async ({ identification, type, token }: PostAccountAuthParams) =>
      await http.post<PostAccountAuthCodeRes, PostAccountAuthParams>(
        '/apis/v1/authentication/company',
        {
          identification,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    postCheckCompanyAuthCode: async (payload: PostRegisterUserParams) =>
      await http.post<PostAccountAuthCodeRes, PostRegisterUserParams>(
        '/apis/v1/authentication/status/done',
        {
          ...payload,
        },
        {
          headers: {
            Authorization: `Bearer ${payload?.token}`,
          },
        }
      ),
  };
};
