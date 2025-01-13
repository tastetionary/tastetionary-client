import http from '../http';

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
      companyEmail?: string;
    };
  };
  area: {
    // category: 'dining_area' | 'activity_area';
    address: '';
    latitude: number;
    longitude: number;
  };
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
