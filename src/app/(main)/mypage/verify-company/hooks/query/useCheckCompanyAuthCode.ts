import { useMutation } from '@tanstack/react-query';
import { getUserCompanyRepository } from '@/shared/api/user/company';

interface Props {
  onNext: () => void;
}

export default function useCheckCompanyAuthCode({ onNext }: Props) {
  const { data, mutate } = useMutation({
    mutationFn: getUserCompanyRepository().postCheckCompanyAuthCode,
    onSuccess: () => onNext(),
  });

  return {
    data,
    mutate,
  };
}
