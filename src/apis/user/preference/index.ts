import http from '@/apis/http';

interface PreferenceCategory {
  category: 'bookmark' | 'excluded';
}

interface GetPreferenceParams extends PreferenceCategory {
  token: string;
}

interface PostPreferenceParams extends PreferenceCategory {
  token: string;
  restaurantId: number;
}

interface PreferenceRepository {
  getPreference: ({ category, token }: GetPreferenceParams) => Promise<any>;
  postPreference: ({ category, restaurantId, token }: PostPreferenceParams) => Promise<any>;
  deletePreference: ({ category, restaurantId, token }: PostPreferenceParams) => Promise<any>;
}

const preferenceRepository = (): PreferenceRepository => {
  return {
    getPreference: async ({ category, token }: GetPreferenceParams) =>
      await http.get(`/apis/v1/user/preference/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    postPreference: async ({ category, token, restaurantId }: PostPreferenceParams) =>
      await http.post(
        `/apis/v1/user/preference/${category}`,
        {
          restaurantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    deletePreference: async ({ category, token, restaurantId }: PostPreferenceParams) =>
      await http.delete(`/apis/v1/user/preference/${category}/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  };
};

export default preferenceRepository;
