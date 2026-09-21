import CHeader from '@/shared/ui/c-header';

export default function OptInMarketing() {
  const optInMarketing = {
    desc: `<맛셔너리>의 이벤트 관련 정보 안내 목적으로 이메일을 통한 상품 및 이벤트 정보 송신을 위해 이용하고자 합니다. 마케팅 및 홍보에 활용을 원하지 않을 경우 동의하시지 않으셔도 됩니다. 다만, 동의하지 않을 경우 관련 편의제공(이벤트 안내, 공지사항, 할인행사)안내 등 이용 목적에 따른 혜택에 제한이 있을 수 있습니다.그 밖에 계약과 관련된 불이익은 없습니다.`,
    first: `1. 수집/이용 목적
고객에 대한 편의제공, 귀사 및 제휴업체의 상품·서비스 안내 및 이용권유, 사은·판촉행사 등의 마케팅 활동, 시장조사 및 상품·서비스 개발연구 등을 목적으로 수집·이용`,
    second: `2. 수집항목
이메일주소, 접속 일시, IP주소 등`,
    third: `3. 보유 및 이용기간
동의일로부터 회원 탈퇴 혹은 마케팅 동의 해제 시까지 보유·이용`,
  };
  return (
    <>
      <CHeader title="마케팅 활용 정보 수신 제공" />
      <div className="p-20">
        <p className="text-20 leading-[150%] font-bold text-neutral-bg80">마켓팅 활용 정보 수신 제공</p>
        <p className="mt-[14px] text-14 leading-[170%] font-normal text-neutral-bg40">개정일 : 2023.09.06</p>
        <p className="mt-[20px] text-11 leading-[200%] font-normal text-neutral-bg80">{optInMarketing.desc}</p>
        <br />
        <span className="text-11 leading-[200%] font-normal whitespace-pre-wrap text-neutral-bg80">
          {optInMarketing.first}
        </span>
        <br />
        <br />
        <span className="text-11 leading-[200%] font-normal whitespace-pre-wrap text-neutral-bg80">
          {optInMarketing.second}
        </span>
        <br />
        <br />
        <span className="text-11 leading-[200%] font-normal whitespace-pre-wrap text-neutral-bg80">
          {optInMarketing.third}
        </span>
        <br />
        <br />
        <span className="text-11 leading-[200%] font-normal whitespace-pre-wrap text-neutral-bg80">
          ※ 더 자세한 내용에 대해서는 개인정보처리방침을 참고하시기 바랍니다.
        </span>
      </div>
    </>
  );
}
