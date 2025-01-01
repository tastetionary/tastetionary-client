import { WithdrawalTypeEnum } from '@taehoya/tastetionary/lib/domain/user/user.enum';
import http from '../http';

type WithdrawalType = keyof typeof WithdrawalTypeEnum;

export const deleteUser = async (req: { types: WithdrawalType[] }, token?: string) => {
  return await http.delete<any>(
    '/apis/v1/user',
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: req, // 변환된 데이터 전송
        }
      : undefined
  );
};
