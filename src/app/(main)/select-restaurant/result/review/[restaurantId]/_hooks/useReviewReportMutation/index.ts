import { useMutation } from '@tanstack/react-query';
import reviewRepository from '@/features/reviews/api/comment';

const useReviewReportMutation = () => {
  const { mutate: postReportMutate } = useMutation({ mutationFn: reviewRepository().postReport });

  return { postReportMutate };
};

export default useReviewReportMutation;
