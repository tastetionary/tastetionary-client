'use client';

// 첫번째 컨텐츠
import recommendUrl1_1 from '@/assets/common/contents/banner01/recommendUrl1-1.jpg';
import recommendUrl1_2 from '@/assets/common/contents/banner01/recommendUrl1-2.jpg';
import recommendUrl1_3 from '@/assets/common/contents/banner01/recommendUrl1-3.jpg';
import url1 from '@/assets/common/contents/banner01/url1.png';

// 두번째 컨텐츠
import recommendUrl2_1 from '@/assets/common/contents/banner02/recommendUrl2-1.jpg';
import recommendUrl2_2 from '@/assets/common/contents/banner02/recommendUrl2-2.jpg';
import recommendUrl2_3 from '@/assets/common/contents/banner02/recommendUrl2-3.jpg';
import url2 from '@/assets/common/contents/banner02/url2.jpg';
// 세번째 컨텐츠
import recommendUrl3_1 from '@/assets/common/contents/banner03/recommendUrl3-1.jpg';
import recommendUrl3_3 from '@/assets/common/contents/banner03/recommendUrl3-2.jpg';
import recommendUrl3_2 from '@/assets/common/contents/banner03/recommendUrl3-3.jpg';
import url3 from '@/assets/common/contents/banner03/url3.jpg';
// 네번째 컨텐츠
import recommendUrl4_1 from '@/assets/common/contents/banner04/recommendUrl4-1.jpg';
import recommendUrl4_3 from '@/assets/common/contents/banner04/recommendUrl4-2.jpg';
import recommendUrl4_2 from '@/assets/common/contents/banner04/recommendUrl4-3.jpg';
import url4 from '@/assets/common/contents/banner04/url4.jpg';
// 다섯번째 컨텐츠
// 네번째 컨텐츠
import recommendUrl5_1 from '@/assets/common/contents/banner05/recommendUrl5-1.jpg';
import recommendUrl5_3 from '@/assets/common/contents/banner05/recommendUrl5-2.jpg';
import recommendUrl5_2 from '@/assets/common/contents/banner05/recommendUrl5-3.jpg';
import url5 from '@/assets/common/contents/banner05/url5.jpg';

import DefaultButton from '@/components/Button/DefaultButton';
import CServerHeaderWithChildren from '@/components/c-server-header-with-children';
import Image from 'next/image';

interface Params {
  detail: string[];
}

export default function ContentDetail({ params }: { params: Params }) {
  console.log('params', params.detail[0]);
  const contents = [
    {
      params: 'banner01',
      url: url1,
      title: '혹시 어제, 과음하셨나요?',
      subTitle: '속이 편안해지는 해장 메뉴 추천',
      createdAt: '2025.04.07',
      desc: '어제 과음했는데, 오늘 점심 뭐 먹지 고민되시죠? 🍺\n 속이 허하고 얼큰한 국물 한 입이 간절해지는 그런 날엔 해장이 답입니다. \n판교 직장인이라면 꼭 한 번 가볼만한 해장 메뉴 맛집을 추천해드릴게요.',
      recommendBtn1: '해장하기 좋은 메뉴 추천 1 : 순대국',
      recommendUrl1: recommendUrl1_1,
      recommendDesc1:
        '해장이 필요할 땐 뭐니뭐니해도 순댓국이 떠올라요. \n\n 진하게 우려낸 돼지뼈 육수는 녹진하니 입 안에 깊은 풍미를 남기고, 듬뿍 들어간 순대와 머릿고기는 고소하고 든든해서 한 끼 식사로도 손색이 없습니다. 특히 속이 예민한 날엔 자극적인 음식보다 이런 진하고 구수한 국물이 훨씬 위안을 주죠. \n\n 먹기 전, 들깨가루 한 스푼과 새우젓을 취향껏 넣어 간을 맞추면 한층 더 부드럽고 편안한 맛으로 완성되죠. 시원한 맛의 깍두기랑 먹으면 더 개운하게 마무리할 수 있고요.',
      recommendBtn2: '해장하기 좋은 메뉴 추천 2 : 짬뽕',
      recommendUrl2: recommendUrl1_2,
      recommendDesc2:
        '속이 답답하고 얼큰한 게 당기는 날엔, 짬뽕만한 해장 메뉴도 드물죠. \n\n 강한 불맛이 느껴지는 시원한 해물 육수에 푸짐하게 들어간 말랑한 오징어, 홍합, 채소가 조화를 이루며 국물 한 입 했을 때 첫 숟가락부터 속을 확 풀어주는 기분! 국물 한 숟가락에 정신이 번쩍 들고, 매콤함 속에 숨은 시원한 감칠맛으로 숙취로 무거운 속을 한 번 뚫어보는 건 어떠세요? \n\n 면발까지 쫄깃해서 한 그릇 다 비우고나면 어느새 몸도 마음도 가벼워지는 듯한 만족감! 해장도 하고, 입맛도 제대로 돌고 싶은 날이라면 짬뽕이 제격입니다.',
      recommendBtn3: '해장하기 좋은 메뉴 추천 3 : 부대찌개',
      recommendUrl3: recommendUrl1_3,
      recommendDesc3:
        '칼칼하고 푸짐한 한 그릇을 원한다면 단연 부대찌개가 제격입니다. \n\n 햄과 소시지, 라면사리, 두부, 각종 메뉴가 가득한 얼큰한 국물은 그야말로 속을 시원하게 풀어주는 복합 해장세트 같은 느낌이에요! 한 입 먹는 순간 햄에서 나온 고소한 육류의 풍미와 매콤한 양념이 밥을 부르거든요. 과음으로 지친 위장을 슬며시 깨워줍니다. \n\n 특히 라면사리를 추가해서 먹는 조합은 포만감까지 확실히 채울 수 있어 점심 한 끼로도 아주 만족스러워요. 혼자 먹어도 좋지만, 팀원들과 둘러 앉아 나눠먹으면 더 맛있는 메뉴이기도 해요. 속도 풀고, 팀 분위기도 살리는 메뉴로 강력 추천합니다.',
    },
    {
      params: 'banner02',
      url: url2,
      title: '혹시 어제, 과음하셨나요?',
      subTitle: '속이 편안해지는 해장 메뉴 추천',
      createdAt: '2025.04.07',
      desc: '어제 과음했는데, 오늘 점심 뭐 먹지 고민되시죠? 🍺\n 속이 허하고 얼큰한 국물 한 입이 간절해지는 그런 날엔 해장이 답입니다. \n판교 직장인이라면 꼭 한 번 가볼만한 해장 메뉴 맛집을 추천해드릴게요.',
      recommendBtn1: '해장하기 좋은 메뉴 추천 1 : 순대국',
      recommendUrl1: recommendUrl2_1,
      recommendDesc1:
        '해장이 필요할 땐 뭐니뭐니해도 순댓국이 떠올라요. \n\n 진하게 우려낸 돼지뼈 육수는 녹진하니 입 안에 깊은 풍미를 남기고, 듬뿍 들어간 순대와 머릿고기는 고소하고 든든해서 한 끼 식사로도 손색이 없습니다. 특히 속이 예민한 날엔 자극적인 음식보다 이런 진하고 구수한 국물이 훨씬 위안을 주죠. \n\n 먹기 전, 들깨가루 한 스푼과 새우젓을 취향껏 넣어 간을 맞추면 한층 더 부드럽고 편안한 맛으로 완성되죠. 시원한 맛의 깍두기랑 먹으면 더 개운하게 마무리할 수 있고요.',
      recommendBtn2: '해장하기 좋은 메뉴 추천 2 : 짬뽕',
      recommendUrl2: recommendUrl2_2,
      recommendDesc2:
        '속이 답답하고 얼큰한 게 당기는 날엔, 짬뽕만한 해장 메뉴도 드물죠. \n\n 강한 불맛이 느껴지는 시원한 해물 육수에 푸짐하게 들어간 말랑한 오징어, 홍합, 채소가 조화를 이루며 국물 한 입 했을 때 첫 숟가락부터 속을 확 풀어주는 기분! 국물 한 숟가락에 정신이 번쩍 들고, 매콤함 속에 숨은 시원한 감칠맛으로 숙취로 무거운 속을 한 번 뚫어보는 건 어떠세요? \n\n 면발까지 쫄깃해서 한 그릇 다 비우고나면 어느새 몸도 마음도 가벼워지는 듯한 만족감! 해장도 하고, 입맛도 제대로 돌고 싶은 날이라면 짬뽕이 제격입니다.',
      recommendBtn3: '해장하기 좋은 메뉴 추천 3 : 부대찌개',
      recommendUrl3: recommendUrl2_3,
      recommendDesc3:
        '칼칼하고 푸짐한 한 그릇을 원한다면 단연 부대찌개가 제격입니다. \n\n 햄과 소시지, 라면사리, 두부, 각종 메뉴가 가득한 얼큰한 국물은 그야말로 속을 시원하게 풀어주는 복합 해장세트 같은 느낌이에요! 한 입 먹는 순간 햄에서 나온 고소한 육류의 풍미와 매콤한 양념이 밥을 부르거든요. 과음으로 지친 위장을 슬며시 깨워줍니다. \n\n 특히 라면사리를 추가해서 먹는 조합은 포만감까지 확실히 채울 수 있어 점심 한 끼로도 아주 만족스러워요. 혼자 먹어도 좋지만, 팀원들과 둘러 앉아 나눠먹으면 더 맛있는 메뉴이기도 해요. 속도 풀고, 팀 분위기도 살리는 메뉴로 강력 추천합니다.',
    },
    {
      params: 'banner03',
      url: url3,
      title: '혹시 어제, 과음하셨나요?',
      subTitle: '속이 편안해지는 해장 메뉴 추천',
      createdAt: '2025.04.07',
      desc: '어제 과음했는데, 오늘 점심 뭐 먹지 고민되시죠? 🍺\n 속이 허하고 얼큰한 국물 한 입이 간절해지는 그런 날엔 해장이 답입니다. \n판교 직장인이라면 꼭 한 번 가볼만한 해장 메뉴 맛집을 추천해드릴게요.',
      recommendBtn1: '해장하기 좋은 메뉴 추천 1 : 순대국',
      recommendUrl1: recommendUrl3_1,
      recommendDesc1:
        '해장이 필요할 땐 뭐니뭐니해도 순댓국이 떠올라요. \n\n 진하게 우려낸 돼지뼈 육수는 녹진하니 입 안에 깊은 풍미를 남기고, 듬뿍 들어간 순대와 머릿고기는 고소하고 든든해서 한 끼 식사로도 손색이 없습니다. 특히 속이 예민한 날엔 자극적인 음식보다 이런 진하고 구수한 국물이 훨씬 위안을 주죠. \n\n 먹기 전, 들깨가루 한 스푼과 새우젓을 취향껏 넣어 간을 맞추면 한층 더 부드럽고 편안한 맛으로 완성되죠. 시원한 맛의 깍두기랑 먹으면 더 개운하게 마무리할 수 있고요.',
      recommendBtn2: '해장하기 좋은 메뉴 추천 2 : 짬뽕',
      recommendUrl2: recommendUrl3_2,
      recommendDesc2:
        '속이 답답하고 얼큰한 게 당기는 날엔, 짬뽕만한 해장 메뉴도 드물죠. \n\n 강한 불맛이 느껴지는 시원한 해물 육수에 푸짐하게 들어간 말랑한 오징어, 홍합, 채소가 조화를 이루며 국물 한 입 했을 때 첫 숟가락부터 속을 확 풀어주는 기분! 국물 한 숟가락에 정신이 번쩍 들고, 매콤함 속에 숨은 시원한 감칠맛으로 숙취로 무거운 속을 한 번 뚫어보는 건 어떠세요? \n\n 면발까지 쫄깃해서 한 그릇 다 비우고나면 어느새 몸도 마음도 가벼워지는 듯한 만족감! 해장도 하고, 입맛도 제대로 돌고 싶은 날이라면 짬뽕이 제격입니다.',
      recommendBtn3: '해장하기 좋은 메뉴 추천 3 : 부대찌개',
      recommendUrl3: recommendUrl3_3,
      recommendDesc3:
        '칼칼하고 푸짐한 한 그릇을 원한다면 단연 부대찌개가 제격입니다. \n\n 햄과 소시지, 라면사리, 두부, 각종 메뉴가 가득한 얼큰한 국물은 그야말로 속을 시원하게 풀어주는 복합 해장세트 같은 느낌이에요! 한 입 먹는 순간 햄에서 나온 고소한 육류의 풍미와 매콤한 양념이 밥을 부르거든요. 과음으로 지친 위장을 슬며시 깨워줍니다. \n\n 특히 라면사리를 추가해서 먹는 조합은 포만감까지 확실히 채울 수 있어 점심 한 끼로도 아주 만족스러워요. 혼자 먹어도 좋지만, 팀원들과 둘러 앉아 나눠먹으면 더 맛있는 메뉴이기도 해요. 속도 풀고, 팀 분위기도 살리는 메뉴로 강력 추천합니다.',
    },
    {
      params: 'banner04',
      url: url4,
      title: '혹시 어제, 과음하셨나요?',
      subTitle: '속이 편안해지는 해장 메뉴 추천',
      createdAt: '2025.04.07',
      desc: '어제 과음했는데, 오늘 점심 뭐 먹지 고민되시죠? 🍺\n 속이 허하고 얼큰한 국물 한 입이 간절해지는 그런 날엔 해장이 답입니다. \n판교 직장인이라면 꼭 한 번 가볼만한 해장 메뉴 맛집을 추천해드릴게요.',
      recommendBtn1: '해장하기 좋은 메뉴 추천 1 : 순대국',
      recommendUrl1: recommendUrl4_1,
      recommendDesc1:
        '해장이 필요할 땐 뭐니뭐니해도 순댓국이 떠올라요. \n\n 진하게 우려낸 돼지뼈 육수는 녹진하니 입 안에 깊은 풍미를 남기고, 듬뿍 들어간 순대와 머릿고기는 고소하고 든든해서 한 끼 식사로도 손색이 없습니다. 특히 속이 예민한 날엔 자극적인 음식보다 이런 진하고 구수한 국물이 훨씬 위안을 주죠. \n\n 먹기 전, 들깨가루 한 스푼과 새우젓을 취향껏 넣어 간을 맞추면 한층 더 부드럽고 편안한 맛으로 완성되죠. 시원한 맛의 깍두기랑 먹으면 더 개운하게 마무리할 수 있고요.',
      recommendBtn2: '해장하기 좋은 메뉴 추천 2 : 짬뽕',
      recommendUrl2: recommendUrl4_2,
      recommendDesc2:
        '속이 답답하고 얼큰한 게 당기는 날엔, 짬뽕만한 해장 메뉴도 드물죠. \n\n 강한 불맛이 느껴지는 시원한 해물 육수에 푸짐하게 들어간 말랑한 오징어, 홍합, 채소가 조화를 이루며 국물 한 입 했을 때 첫 숟가락부터 속을 확 풀어주는 기분! 국물 한 숟가락에 정신이 번쩍 들고, 매콤함 속에 숨은 시원한 감칠맛으로 숙취로 무거운 속을 한 번 뚫어보는 건 어떠세요? \n\n 면발까지 쫄깃해서 한 그릇 다 비우고나면 어느새 몸도 마음도 가벼워지는 듯한 만족감! 해장도 하고, 입맛도 제대로 돌고 싶은 날이라면 짬뽕이 제격입니다.',
      recommendBtn3: '해장하기 좋은 메뉴 추천 3 : 부대찌개',
      recommendUrl3: recommendUrl4_3,
      recommendDesc3:
        '칼칼하고 푸짐한 한 그릇을 원한다면 단연 부대찌개가 제격입니다. \n\n 햄과 소시지, 라면사리, 두부, 각종 메뉴가 가득한 얼큰한 국물은 그야말로 속을 시원하게 풀어주는 복합 해장세트 같은 느낌이에요! 한 입 먹는 순간 햄에서 나온 고소한 육류의 풍미와 매콤한 양념이 밥을 부르거든요. 과음으로 지친 위장을 슬며시 깨워줍니다. \n\n 특히 라면사리를 추가해서 먹는 조합은 포만감까지 확실히 채울 수 있어 점심 한 끼로도 아주 만족스러워요. 혼자 먹어도 좋지만, 팀원들과 둘러 앉아 나눠먹으면 더 맛있는 메뉴이기도 해요. 속도 풀고, 팀 분위기도 살리는 메뉴로 강력 추천합니다.',
    },
    {
      params: 'banner05',
      url: url5,
      title: '혹시 어제, 과음하셨나요?',
      subTitle: '속이 편안해지는 해장 메뉴 추천',
      createdAt: '2025.04.07',
      desc: '어제 과음했는데, 오늘 점심 뭐 먹지 고민되시죠? 🍺\n 속이 허하고 얼큰한 국물 한 입이 간절해지는 그런 날엔 해장이 답입니다. \n판교 직장인이라면 꼭 한 번 가볼만한 해장 메뉴 맛집을 추천해드릴게요.',
      recommendBtn1: '해장하기 좋은 메뉴 추천 1 : 순대국',
      recommendUrl1: recommendUrl5_1,
      recommendDesc1:
        '해장이 필요할 땐 뭐니뭐니해도 순댓국이 떠올라요. \n\n 진하게 우려낸 돼지뼈 육수는 녹진하니 입 안에 깊은 풍미를 남기고, 듬뿍 들어간 순대와 머릿고기는 고소하고 든든해서 한 끼 식사로도 손색이 없습니다. 특히 속이 예민한 날엔 자극적인 음식보다 이런 진하고 구수한 국물이 훨씬 위안을 주죠. \n\n 먹기 전, 들깨가루 한 스푼과 새우젓을 취향껏 넣어 간을 맞추면 한층 더 부드럽고 편안한 맛으로 완성되죠. 시원한 맛의 깍두기랑 먹으면 더 개운하게 마무리할 수 있고요.',
      recommendBtn2: '해장하기 좋은 메뉴 추천 2 : 짬뽕',
      recommendUrl2: recommendUrl5_2,
      recommendDesc2:
        '속이 답답하고 얼큰한 게 당기는 날엔, 짬뽕만한 해장 메뉴도 드물죠. \n\n 강한 불맛이 느껴지는 시원한 해물 육수에 푸짐하게 들어간 말랑한 오징어, 홍합, 채소가 조화를 이루며 국물 한 입 했을 때 첫 숟가락부터 속을 확 풀어주는 기분! 국물 한 숟가락에 정신이 번쩍 들고, 매콤함 속에 숨은 시원한 감칠맛으로 숙취로 무거운 속을 한 번 뚫어보는 건 어떠세요? \n\n 면발까지 쫄깃해서 한 그릇 다 비우고나면 어느새 몸도 마음도 가벼워지는 듯한 만족감! 해장도 하고, 입맛도 제대로 돌고 싶은 날이라면 짬뽕이 제격입니다.',
      recommendBtn3: '해장하기 좋은 메뉴 추천 3 : 부대찌개',
      recommendUrl3: recommendUrl5_3,
      recommendDesc3:
        '칼칼하고 푸짐한 한 그릇을 원한다면 단연 부대찌개가 제격입니다. \n\n 햄과 소시지, 라면사리, 두부, 각종 메뉴가 가득한 얼큰한 국물은 그야말로 속을 시원하게 풀어주는 복합 해장세트 같은 느낌이에요! 한 입 먹는 순간 햄에서 나온 고소한 육류의 풍미와 매콤한 양념이 밥을 부르거든요. 과음으로 지친 위장을 슬며시 깨워줍니다. \n\n 특히 라면사리를 추가해서 먹는 조합은 포만감까지 확실히 채울 수 있어 점심 한 끼로도 아주 만족스러워요. 혼자 먹어도 좋지만, 팀원들과 둘러 앉아 나눠먹으면 더 맛있는 메뉴이기도 해요. 속도 풀고, 팀 분위기도 살리는 메뉴로 강력 추천합니다.',
    },
  ];

  return (
    <CServerHeaderWithChildren title="맛셔너리" isLogo>
      {contents.map(content => {
        return (
          <>
            <Image src={content.url} alt="content" style={{ width: '100%' }} />
            <div className="mb-4 ml-8 mr-8 mt-12">
              <p className="title4 font-bold">{content.title}</p>
              <p className="title3 mt-1 font-bold">{content.subTitle}</p>
              <p className="body2 mt-3">작성일 : {content.createdAt}</p>
              <p className="body2 mt-8 whitespace-pre-line">{content.desc}</p>
              <DefaultButton
                bgColor="orange"
                customStyle="flex w-full py-[12px] px-[16px] mt-8"
                onClick={() => console.log('123')}
                type="button"
              >
                <span className="!font-pretendard text-white">{content.recommendBtn1}</span>
              </DefaultButton>
            </div>
            {/* 첫번째 추천 메뉴 */}
            <Image src={content.recommendUrl1} alt="content" style={{ width: '100%' }} />
            <div className="mb-4 ml-8 mr-8 mt-4">
              <p className="body2 whitespace-pre-line">{content.recommendDesc1}</p>
              <DefaultButton
                bgColor="orange"
                customStyle="flex w-full py-[12px] px-[16px] mt-8"
                onClick={() => console.log('123')}
                type="button"
              >
                <span className="!font-pretendard text-white">{content.recommendBtn2}</span>
              </DefaultButton>
            </div>
            {/* 두번째 추천 메뉴 */}
            <Image src={content.recommendUrl2} alt="content" style={{ width: '100%' }} />
            <div className="mb-4 ml-8 mr-8 mt-4">
              <p className="body2 whitespace-pre-line">{content.recommendDesc2}</p>
              <DefaultButton
                bgColor="orange"
                customStyle="flex w-full py-[12px] px-[16px] mt-8"
                onClick={() => console.log('123')}
                type="button"
              >
                <span className="!font-pretendard text-white">{content.recommendBtn3}</span>
              </DefaultButton>
            </div>
            {/* 세번째 추천 메뉴 */}
            <Image src={content.recommendUrl3} alt="content" style={{ width: '100%' }} />
            <div className="mb-4 ml-8 mr-8 mt-4">
              <p className="body2 whitespace-pre-line">{content.recommendDesc3}</p>
            </div>

            <div className="flex w-full justify-center">
              <DefaultButton
                bgColor="yellow"
                customStyle="flex py-[12px] px-[16px] mt-[81px] mb-[33px] mx-4 md:mx-8 lg:mx-12 w-3/5 md:w-2/3 lg:w-1/2"
                onClick={() => console.log('여기')}
                type="button"
              >
                <span className="!font-pretendard text-white">다른 메뉴도 고르러 가기</span>
              </DefaultButton>
            </div>
          </>
        );
      })}
    </CServerHeaderWithChildren>
  );
}
