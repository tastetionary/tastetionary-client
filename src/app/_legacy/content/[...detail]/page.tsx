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
import recommendUrl3_2 from '@/assets/common/contents/banner03/recommendUrl3-2.jpg';
import recommendUrl3_3 from '@/assets/common/contents/banner03/recommendUrl3-3.jpg';
import url3 from '@/assets/common/contents/banner03/url3.jpg';
// 네번째 컨텐츠
import recommendUrl4_1 from '@/assets/common/contents/banner04/recommendUrl4-1.jpg';
import recommendUrl4_2 from '@/assets/common/contents/banner04/recommendUrl4-2.jpg';
import recommendUrl4_3 from '@/assets/common/contents/banner04/recommendUrl4-3.jpg';
import url4 from '@/assets/common/contents/banner04/url4.jpg';
// 다섯번째 컨텐츠
import recommendUrl5_1 from '@/assets/common/contents/banner05/recommendUrl5-1.jpg';
import recommendUrl5_2 from '@/assets/common/contents/banner05/recommendUrl5-2.jpg';
import recommendUrl5_3 from '@/assets/common/contents/banner05/recommendUrl5-3.jpg';
import url5 from '@/assets/common/contents/banner05/url5.jpg';

import DefaultButton from '@/components/Button/DefaultButton';
import CServerHeaderWithChildren from '@/components/c-server-header-with-children';
import DefaultTextBox from '@/components/c-text-box';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, use } from 'react';

interface Params {
  detail: string[];
}

export default function ContentDetail({ params }: { params: Promise<Params> }) {
  const paramsDetail = use(params).detail[0];
  const router = useRouter();
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
      title: '비 오는 날, 이런 메뉴 어때요?',
      subTitle: '직장인이 추천하는 비오는 날 맛집',
      createdAt: '2025.04.14',
      desc: '비 오는 날의 점심 메뉴는 조금 더 고민하게 됩니다. ☔️ \n 괜히 뜨끈한 국물 한 입이 생각나는 그런 날엔, 속까지 따뜻해지는 메뉴가 필요하\n기 때문인데요. 판교직장인들에게 추천하는, 비 오는 날 먹기 좋은 메뉴와 맛집을 소개해드릴게요.',
      recommendBtn1: '비오는 날 먹기 좋은 메뉴 1 : 낙곱새',
      recommendUrl1: recommendUrl2_1,
      recommendDesc1:
        '비 오는 날엔 자연스럽게 매콤한 게 땡기죠. 그럴 때 딱 떠오르는 메뉴가 바로 낙곱새예요.\n\n 쫄깃한 낙지, 고소한 곱창, 부드러운 새우가 얼큰한 양념에 자작하게 끓여져 나오면, 밥 비벼 먹기엔 그야말로 최고의 조합입니다. 비 오는 날 특유의 눅눅한 기분까지 매콤한 양념 한 입으로 싹 날려주는 느낌. 남은 양념에 볶음밥까지 마무리하면 그야말로 완벽한 해방식 한 끼가 되죠. \n\n 조금 힘든 하루거나 스트레스 풀고 싶은 날, 팀원들과 함께 나눠먹기에도 딱 좋은 메뉴입니다.',
      recommendBtn2: '비오는 날 먹기 좋은 메뉴 2 : 칼국수 / 우동',
      recommendUrl2: recommendUrl2_2,
      recommendDesc2:
        '촉촉하게 내리는 비 소리에 어울리는 따뜻한 메뉴라면 단연 칼국수나 우동을 추천하고 싶어요. \n\n 부드러운 면발과 속을 편안하게 채워주는 따끈한 국물은, 과하지 않고 부담 없이 즐기기 딱 좋죠. 멸치 육수의 깔끔한 맛이나 닭육수의 진한 국물맛 덕분에 직장인 혼밥 메뉴로도 인기가 높아요. \n\n 바쁜 점심시간에 빨리 먹고 돌아가기에도 좋아서 비 오는 날 가장 많이 찾게 되는 한 끼입니다. 특히 우산 들고 식당에 들어섰을 때, 김이 모락모락 나는 그릇이 주는 위안은 은근 크거든요.',
      recommendBtn3: '비오는 날 먹기 좋은 메뉴 3 : 제육볶음',
      recommendUrl3: recommendUrl2_3,
      recommendDesc3:
        '아무리 비가 와도 밥심은 포기 못하는 직장인에게는 역시 제육볶음만 한 게 없어요. \n\n 자극적이지 않으면서도 매콤달콤한 양념이 입맛을 확 살려주고, 따끈한 흰밥 위에 고기를 척척 올려 먹는 그 순간만큼은 비 오는 날의 우울함도 잠시 잊게 되죠. \n\n 깔끔하게 반찬 구성도 좋고, 빠르고 든든하게 한 끼 해결하기 딱 좋은 국민 점심 메뉴입니다. 특히 비 오는 날엔 고기 굽는 소리조차 더 맛있게 들리는 마법이 있잖아요.',
    },
    {
      params: 'banner03',
      url: url3,
      title: '스트레스 받을 때에는 역시 매운 게 딱이죠.',
      subTitle: '맵고 화끈한 맛으로 장전! 매운 맛 메뉴 리스트',
      createdAt: '2025.04.14',
      desc: '스트레스 받는 날엔 괜히 매운 게 더 땡기죠. 🌶️ 🔥\n 입 안 가득 얼얼하게 퍼지는 매운맛은 잠깐이나마 쌓인 답답함을 날려주기에 충분\n해요. 오늘은 속이 시원~해지는 매운 메뉴 추천 리스트를 준비해봤어요.',
      recommendBtn1: '맵고 화끈한 메뉴 추천 1 : 마라탕',
      recommendUrl1: recommendUrl3_1,
      recommendDesc1:
        '뭔가 독특하면서도 화끈하게 매운 게 먹고 싶은 날엔 마라탕이 최고예요. \n\n 얼얼한 마라 특유의 향신료와 매운 국물이 어우러져 먹을수록 중독되는 맛이 매력적이죠. 좋아하는 재료를 골라 내 스타일로 만들어 먹는 재미도 있고, 국물 한 모금 마실 때마다 스트레스까지 같이 날아가는 기분. 특히 비 오는 날, 기분 전환이 필요하거나 평소와 다른 매운맛이 땡기는 날엔 마라탕만큼 속이 시원해지는 메뉴도 없어요. \n\n 혼자 먹어도 좋고, 동료랑 함께 가도 만족도가 높은 요즘 인기 점심 메뉴입니다.',
      recommendBtn2: '맵고 화끈한 메뉴 추천 2 : 김치찌개',
      recommendUrl2: recommendUrl3_2,
      recommendDesc2:
        '비 오는 날, 매콤하면서도 익숙한 집밥 같은 메뉴가 당긴다면 역시 김치찌개만 한 게 없어요. \n\n 잘 익은 묵은지의 깊은 맛에 돼지고기, 두부, 채소가 푸짐하게 들어가 국물 한 숟갈 뜨는 순간 속까지 따뜻해지는 기분. 자극적이지 않으면서도 칼칼하고 개운한 맛 덕분에 해장용으로도, 스트레스 날릴 점심 메뉴로도 최고죠. \n\n 직장인 점심 메뉴로 김치찌개는 언제 먹어도 실패 없는 안전한 선택이자, 오늘 같은 날 더 생각나는 그런 메뉴입니다.',
      recommendBtn3: '맵고 화끈한 메뉴 추천 3 : 해물찜',
      recommendUrl3: recommendUrl3_3,
      recommendDesc3:
        '스트레스가 쌓였을 땐 뭔가 화끈하게 풀어줄 음식이 간절하죠. 그럴 때 딱 떠오르는 메뉴가 바로 해물찜이에요. \n\n 문어, 오징어, 새우, 홍합 같은 신선한 해산물에 매콤한 양념이 가득 배어들어 있어 한 입 먹는 순간 입안이 얼얼해지고, 답답했던 기분까지 싹 풀리는 느낌. \n\n 쫄깃한 해물 식감 덕분에 씹는 재미도 좋고, 남은 양념에 밥이나 볶음밥까지 마무리하면 완벽 그 자체예요. 스트레스를 확 날려버리고 싶은 날, 팀원들과 나눠 먹기 딱 좋은 메뉴입니다.',
    },
    {
      params: 'banner04',
      url: url4,
      title: '간단하게 혼밥하고 싶을 때에는.',
      subTitle: '혼자도 부담 없는 혼밥 가능한 메뉴 리스트',
      createdAt: '2025.04.14',
      desc: '가끔은 말 없이 조용히, 혼자서 밥 한 끼 먹고 싶은 날이 있어요. 🍂\n 누구 눈치도 보지 않고, 메뉴 고르기조차 귀찮은 그런 날엔 간단하고 익숙한 메뉴\n가 최고죠.\n혼밥도 편하게, 맛은 포기하지 않고 즐길 수 있는 메뉴를 모아봤어요.',
      recommendBtn1: '혼밥하기 좋은 메뉴 추천 1 : 라멘',
      recommendUrl1: recommendUrl4_1,
      recommendDesc1:
        '조용한 시간 속에서 나 혼자만의 리듬으로 식사하고 싶을 땐 라멘이 딱이에요.\n\n 따끈한 국물에 면을 후루룩 넘기다 보면, 별생각 없이 식사에만 집중할 수 있어서 마음까지 정리되는 느낌이 들어요. 라멘 전문점의 1인 테이블 구성이나 빠른 서비스도 혼밥에 어울리는 요소 중 하나고요.\n\n 종류도 다양해서 그날의 컨디션에 따라 돈코츠, 쇼유, 매운맛 등 골라 먹는 재미도 있어요. 혼자 조용히, 아주 자연스럽게 한 끼를 해결하고 싶을 때 찾게 되는 메뉴입니다.',
      recommendBtn2: '혼밥하기 좋은 메뉴 추천 2 : 카레',
      recommendUrl2: recommendUrl4_2,
      recommendDesc2:
        '혼밥이 필요한 날엔 자극적이지 않으면서도 따뜻하게 속을 채워주는 카레가 참 잘 어울려요. \n\n 밥 한 숟갈에 걸쭉하게 얹어서 천천히 퍼먹는 느낌, 말없이 먹기 좋은 그 여유가 카레의 매력이죠. 한 그릇에 담백함, 포만감, 익숙한 향까지 다 들어 있어서 메뉴 고민 없이 고르기에도 좋아요. 특히 카레는 스타일이 정말 다양해서 골라 먹는 재미도 있어요. 일식 카레처럼 진하고 부드러운 맛, 인도 카레처럼 향신료 가득한 맛, 한식 느낌의 카레라이스는 물론이고 카레우동, 카레라멘 같은 변주 메뉴도 많아서 그날의 기분이나 취향에 따라 선택할 수 있다는 게 큰 장점이에요.\n\n 말 그대로 ‘무난하고 좋은’ 혼밥 메뉴를 찾는다면, 카레만 한 게 없어요. 어떤 스타일이든 결국 따뜻하고 든든한 한 그릇이니까요.',
      recommendBtn3: '혼밥하기 좋은 메뉴 추천 3 : 햄버거',
      recommendUrl3: recommendUrl4_3,
      recommendDesc3:
        '가끔은 딱히 무슨 이유가 있는 것도 아닌데, 그냥 혼자 조용히 밥 먹고 싶을 때가 있죠. 그럴 땐 햄버거처럼 빠르고 익숙한 메뉴가 제일 편해요. \n\n 복잡한 고민 없이 들어가서, 빠르게 주문하고, 간단하게 한 끼 해결할 수 있다는 점이 큰 장점이죠.\n\n 요즘은 프리미엄 수제버거부터 가성비 좋은 프랜차이즈까지 선택지도 다양해서 기분에 따라 골라 먹는 재미도 쏠쏠하죠. 조용히 먹고 후딱 나올 수 있는 메뉴가 필요할 땐 역시 햄버거만 한 게 없어요.',
    },
    {
      params: 'banner05',
      url: url5,
      title: '다이어트 중이지만 맛있는 건 먹고 싶어.',
      subTitle: '다이어터도 타협 가능한 건강한 메뉴 추천',
      createdAt: '2025.04.14',
      desc: '다이어트 중이라고 외식을 포기할 순 없잖아요. 🥗 \n 회식, 점심 약속, 혼밥까지 피할 수 없는 외식 자리는 많지만, 잘 고르면 체중 관리\n도 충분히 할 수 있어요. 오늘은 칼로리는 낮추고, 포만감은 챙길 수 있는 다이어\n트 외식 메뉴를 추천해드릴게요.',
      recommendBtn1: '다이어터의 외식 메뉴 추천 1 : 샤브샤브',
      recommendUrl1: recommendUrl5_1,
      recommendDesc1:
        '다이어트 중인데 외식을 해야 할 때, 메뉴 고민 없이 가장 먼저 떠오르는 게 바로 샤브샤브예요. \n\n 채소와 고기를 원하는 만큼 먹을 수 있고, 탄수화물은 조절하기 쉬워서 식단 관리하기에도 부담이 적어요. 국물도 깔끔하고 담백한 편이라 속도 편하고, 테이블에 앉아서 천천히 익혀 먹다 보면 자연스럽게 식사 속도도 조절돼요.\n\n 특히 야채를 듬뿍 먹고 단백질을 충분히 챙길 수 있어서 회식 자리나 단체 외식에서도 실패 없는 다이어트 외식 메뉴입니다.',
      recommendBtn2: '다이어터의 외식 메뉴 추천 2 : 나물 비빔밥',
      recommendUrl2: recommendUrl5_2,
      recommendDesc2:
        '기름진 음식이나 자극적인 메뉴가 부담스러울 땐 나물비빔밥만큼 좋은 한 끼 식사도 없어요.\n\n 여러 가지 나물과 채소에 고추장 살짝, 참기름 한 방울 더해 비벼 먹는 한 그릇은속도 편하고 칼로리 부담도 적어서 다이어트 중 외식 메뉴로 늘 인기예요. 밥 양만 조금 조절하면 포만감은 충분하면서도 깔끔하게 먹을 수 있어 혼밥 메뉴로도, 직장인 점심 메뉴로도 딱 좋은 선택입니다.\n\n 식이섬유 가득한 채소 덕분에 속도 든든하게 채워주는 건강식 느낌이 좋아요.',
      recommendBtn3: '다이어터의 외식 메뉴 추천 3 : 불고기 쌈밥',
      recommendUrl3: recommendUrl5_3,
      recommendDesc3:
        '직장인 외식 메뉴 중 다이어터들이 가장 선호하는 메뉴를 꼽자면 아마 불고기 쌈밥일 거예요. \n\n 양념된 불고기에 각종 채소를 쌈 싸서 먹다 보면 탄수화물 섭취는 자연스럽게 줄어들고, 포만감은 오히려 더 높아지거든요. 밥은 반 공기 정도만 덜어 먹고 쌈채소와 단백질 위주로 식사를 구성하면, 맛있게 먹으면서도 식단 조절이 가능해요.\n\n 소스나 반찬 선택만 살짝 신경 쓰면 충분히 다이어트 외식 메뉴로 즐길 수 있어서 회식 자리나 점심 약속에서도 안전한 메뉴입니다.',
    },
  ];

  const getFindContents = () => {
    return contents.filter(content => content.params === paramsDetail);
  };

  return (
    <CServerHeaderWithChildren title="맛셔너리" isLogo>
      {getFindContents().map((content, idx) => {
        return (
          <Fragment key={`content-detail-${idx}`}>
            <Image src={content.url} alt="content" style={{ width: '100%' }} />
            <div className="mb-4 ml-8 mr-8 mt-12">
              <p className="title4 font-bold">{content.title}</p>
              <p className="title3 mt-1 font-bold">{content.subTitle}</p>
              <p className="body2 mt-3">작성일 : {content.createdAt}</p>
              <p className="body2 mt-8 whitespace-pre-line">{content.desc}</p>
              <DefaultTextBox bgColor="orange" customStyle="flex w-full py-[12px] px-[16px] mt-8">
                <span className="!font-pretendard text-white">{content.recommendBtn1}</span>
              </DefaultTextBox>
            </div>
            {/* 첫번째 추천 메뉴 */}
            <Image src={content.recommendUrl1} alt="content" style={{ width: '100%' }} />
            <div className="mb-4 ml-8 mr-8 mt-4">
              <p className="body2 whitespace-pre-line">{content.recommendDesc1}</p>
              <DefaultTextBox bgColor="orange" customStyle="flex w-full py-[12px] px-[16px] mt-8">
                <span className="!font-pretendard text-white">{content.recommendBtn2}</span>
              </DefaultTextBox>
            </div>
            {/* 두번째 추천 메뉴 */}
            <Image src={content.recommendUrl2} alt="content" style={{ width: '100%' }} />
            <div className="mb-4 ml-8 mr-8 mt-4">
              <p className="body2 whitespace-pre-line">{content.recommendDesc2}</p>
              <DefaultTextBox bgColor="orange" customStyle="flex w-full py-[12px] px-[16px] mt-8">
                <span className="!font-pretendard text-white">{content.recommendBtn3}</span>
              </DefaultTextBox>
            </div>
            {/* 세번째 추천 메뉴 */}
            <Image src={content.recommendUrl3} alt="content" style={{ width: '100%' }} />
            <div className="ml-8 mr-8 mt-4">
              <p className="body2 whitespace-pre-line">{content.recommendDesc3}</p>
            </div>

            <div className="flex w-full justify-center">
              <DefaultButton
                bgColor="yellow"
                customStyle="flex py-[12px] px-[16px] mt-[81px] mb-[33px] mx-4 md:mx-8 lg:mx-12 w-3/5 md:w-2/3 lg:w-1/2"
                onClick={() => router.push('/select-menu')}
                type="button"
              >
                <span className="!font-pretendard text-white">다른 메뉴도 고르러 가기</span>
              </DefaultButton>
            </div>
          </Fragment>
        );
      })}
    </CServerHeaderWithChildren>
  );
}
