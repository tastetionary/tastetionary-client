import http from '@/shared/api/http';

interface PostAccountAuthCodeRes {
  id: number;
  expiredAt: string;
}

interface PostConfirmAuthCodeRes {
  authenticationId: number;
}

interface PostAccountAuthParams {
  identification: string;
  type: 'email';
  category?: 'account' | 'password';
}

interface PostConfirmAuthCodeParams {
  historyId: number;
  code: string;
}

/** 서버 스펙: RegisterProfileRequest */
interface PostRegisterUserParams {
  area: {
    address: string;
    latitude: number;
    longitude: number;
  };
  /** 한글/영문/숫자 3~10자 */
  nickname?: string;
  account: {
    identification: string;
    password: string;
    category: 'email';
    authenticationId: number;
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
  postConfirmAuthCode: ({ historyId, code }: PostConfirmAuthCodeParams) => Promise<PostConfirmAuthCodeRes>;
  postCompanyAuthCode: ({ identification, type }: PostAccountAuthParams) => Promise<PostAccountAuthCodeRes>;
  postRegisterUser: (payload: PostRegisterUserParams) => Promise<any>;
}

export const getRegisterRepository = (): GetRegisterRepository => {
  return {
    postAccountAuthCode: async (params: PostAccountAuthParams): Promise<PostAccountAuthCodeRes> => {
      const url = `/apis/v1/authentication/public/${params.category}`;
      return http.post<PostAccountAuthCodeRes, PostAccountAuthParams>(url, params);
    },
    postConfirmAuthCode: async (params: PostConfirmAuthCodeParams): Promise<PostConfirmAuthCodeRes> => {
      const url = '/apis/v1/authentication/public/status/done';
      return http.post<PostConfirmAuthCodeRes, PostConfirmAuthCodeParams>(url, params);
    },
    postCompanyAuthCode: async (params: PostAccountAuthParams): Promise<PostAccountAuthCodeRes> => {
      const url = '/apis/v1/authentication/public/company';
      return http.post<PostAccountAuthCodeRes, PostAccountAuthParams>(url, params);
    },
    postRegisterUser: async (params: PostRegisterUserParams): Promise<PostAccountAuthCodeRes> => {
      const url = '/apis/v1/user';
      return http.post<PostAccountAuthCodeRes, PostRegisterUserParams>(url, params);
    },
  };
};
