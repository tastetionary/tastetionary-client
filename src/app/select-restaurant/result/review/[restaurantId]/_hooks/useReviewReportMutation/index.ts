import reviewRepository from '@/apis/restaurant/review/comment';
import { useMutation } from '@tanstack/react-query';

const useReviewReportMutation = () => {
  const { mutate: postReportMutate } = useMutation({ mutationFn: reviewRepository().postReport });

  return { postReportMutate };
};

export default useReviewReportMutation;
