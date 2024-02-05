import { getUserCompanyRepository } from '@/apis/user/company';
import useUser from '@/hooks/useUser';
import { useMutation } from '@tanstack/react-query';

interface Props {
  onNext: () => void;
}

export default function useCheckCompanyAuthCode({ onNext }: Props) {
  const { token } = useUser();

  const { data, mutate } = useMutation(getUserCompanyRepository().postCheckCompanyAuthCode, {
    onSuccess: () => onNext(),
  });

  return {
    data,
    mutate,
  };
}
