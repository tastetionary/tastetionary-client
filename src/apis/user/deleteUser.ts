import http from '../http';

interface IDeleteUserReq {
  type: string;
}

export const deleteUser = async (req: IDeleteUserReq, token?: string) => {
  const res = await http.delete<{ data?: any }>(
    '/apis/v1/user',
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: req,
        }
      : undefined
  );

  if (res?.data) {
    return res?.data;
  }
};
