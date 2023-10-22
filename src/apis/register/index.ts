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
  category?: 'account' | 'company';
}

interface PostConfirmAuthCodeParams {
  historyId: number;
  code: string;
}

interface PostRegisterUserParams {
  userProperty: {
    companyData?: {
      companyName: string;
      companyEmail: string;
    };
  };
  areas: [
    {
      category: 'dining_area' | 'activity_area';
      address: '';
      latitude: number;
      longitude: number;
    },
  ];
  account: {
    identification: string;
    password: string;
    category: 'email';
  };
  agreements: [
    {
      category: 'personal_information';
      is_agree: boolean;
    },
  ];
}

interface GetRegisterRepository {
  postAccountAuthCode: ({ identification, type }: PostAccountAuthParams) => Promise<PostAccountAuthCodeRes>;
  postConfirmAuthCode: ({ historyId, code }: PostConfirmAuthCodeParams) => Promise<PostConfirmAuthCodeParams>;
  postCompanyAuthCode: ({ identification, type }: PostAccountAuthParams) => Promise<PostAccountAuthCodeRes>;
  postRegisterUser: (payload: PostRegisterUserParams) => Promise<any>;
}

export const getRegisterRepository = (): GetRegisterRepository => {
  return {
    postAccountAuthCode: async ({ identification, type, category }: PostAccountAuthParams) =>
      await http.post<PostAccountAuthCodeRes, PostAccountAuthParams>('/apis/v1/authentication/account', {
        identification,
        type,
        category,
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
    postRegisterUser: async (payload: PostRegisterUserParams) =>
      await http.post<PostAccountAuthCodeRes, PostRegisterUserParams>('/apis/v1/user', {
        ...payload,
      }),
  };
};
