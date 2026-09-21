import http from '@/shared/api/http';
import { WithdrawalTypeEnum } from '@/shared/types/enums';

type WithdrawalType = keyof typeof WithdrawalTypeEnum;

export const deleteUser = async (req: { types: WithdrawalType[] }, token?: string) => {
  return await http.delete<any>('/apis/v1/user', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    // 서버는 enum 키(INCONVENIENT_USAGE)가 아닌 값(inconvenient_usage)을 받는다
    data: { types: req.types.map(type => WithdrawalTypeEnum[type]) },
  });
};
