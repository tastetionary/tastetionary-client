import useLogoutMutate from '@/app/login/hooks/useLogoutMutate';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';
import * as S from './page.styeld';

export default function CMyPageUserInfo() {
  const { data, token } = useUser();
  const { openModal, closeModal } = useModal();
  const { mutate: logoutMutate } = useLogoutMutate();
  const router = useRouter();

  const getShortAddress = (address?: string) => {
    if (!address) return;

    return address.split(' ').slice(0, 2).join(' ');
  };

  const logoutModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '로그아웃 하시겠습니까?',
      cancelText: '취소',
      needClose: true,
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      handleConfirm: () => {
        if (token) logoutMutate({ token });
      },
    });
  };

  const areaModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '지역 설정 안내',
      elementMessage: (
        <S.QuestionModalLists>
          <S.QuestionModalList>
            식사 지역 : 식당 추첨 시 기준 위치로 사용되며, 설정한 식사 지역으로부터 700m 이내의 식당을 추천합니다.
          </S.QuestionModalList>

          <S.QuestionModalList>
            활동 지역 : 리뷰 작성 시 기준 위치로 사용되며, 활동 지역으로부터 1km 이내의 식당에 한해 리뷰 작성이
            가능합니다.
          </S.QuestionModalList>
        </S.QuestionModalLists>
      ),
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
    });
  };

  return (
    <S.UserInfoContainer>
      <S.SpaceBetween>
        <S.Nickname>{data?.nickname}</S.Nickname>

        <S.LogoutBtn onClick={logoutModal}>로그아웃 {'>'}</S.LogoutBtn>
      </S.SpaceBetween>

      <S.Email>{data?.authentication?.account_email}</S.Email>

      <S.AreaContainer>
        <S.AreaBox>
          <S.AreaBoxLValue onClick={() => router.push('mypage/region-setting?category=dining_area')}>
            식사 지역
          </S.AreaBoxLValue>

          <S.AreaBoxLValue>{getShortAddress(data?.dining_area?.address)}</S.AreaBoxLValue>
        </S.AreaBox>

        <S.AreaBox>
          <S.AreaBoxLValue onClick={() => router.push('mypage/region-setting?category=activity_area')}>
            활동 지역
          </S.AreaBoxLValue>

          <S.AreaBoxLValue>{getShortAddress(data?.activity_area?.address)}</S.AreaBoxLValue>
        </S.AreaBox>
      </S.AreaContainer>

      <S.QuestionContainer>
        <S.Question onClick={areaModal}>식사 지역과 활동 지역은 어떤 차이인가요?</S.Question>
      </S.QuestionContainer>
    </S.UserInfoContainer>
  );
}
