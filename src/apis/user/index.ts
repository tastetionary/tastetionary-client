import http from '../http';

interface PutProfileParams {
  nickname: string;
  token: string;
}

interface UserRepository {
  putProfile: ({ nickname, token }: PutProfileParams) => Promise<any>;
}

const userRepository = (): UserRepository => {
  return {
    putProfile: async ({ nickname, token }) =>
      await http.put<any, { nickname: string }>(
        '/apis/v1/user/profile',
        {
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
  };
};

export default userRepository;
