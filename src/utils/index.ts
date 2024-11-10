import { iconToast } from '@/components/Toast';

/** 돈 표시 */
export const getMoneyValue = (money: number, removeCurrency?: boolean) => {
  const commaMoney = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return commaMoney ? `${commaMoney}${removeCurrency ? '' : '원'}` : `${money}`;
};

export const getByteLength = (decimal: number) => {
  return decimal >> 7 || 10 === decimal ? 2 : 1;
};

export const getByte = (str: string) => {
  return str
    ?.split('')
    ?.map(s => s.charCodeAt(0))
    ?.reduce((prev, unicodeDecimalValue) => prev + getByteLength(unicodeDecimalValue), 0);
};

export const getLimitedByteText = (inputText: string, maxByte: number) => {
  const characters = inputText.split('');
  let validText = '';
  let totalByte = 0;

  for (let i = 0; i < characters.length; i += 1) {
    const character = characters[i];
    const decimal = character.charCodeAt(0);
    const byte = getByteLength(decimal); // 글자 한 개가 몇 바이트 길이인지 구해주기

    // 현재까지의 바이트 길이와 더해 최대 바이트 길이를 넘지 않으면
    if (totalByte + byte <= maxByte) {
      totalByte += byte; // 바이트 길이 값을 더해 현재까지의 총 바이트 길이 값을 구함
      validText += character; // 글자를 더해 현재까지의 총 문자열 값을 구함
    } else {
      // 최대 바이트 길이를 넘으면
      break; // for 루프 종료
    }
  }

  return validText;
};

export const copyText = async (text: string, toastMessage?: string) => {
  let success = false;

  if (text) {
    if (navigator?.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(text)
        .then(() => {
          success = true;
          if (toastMessage) iconToast(toastMessage, 'check');
        })
        .catch(() => {
          alert('복사를 다시 시도해주세요.');
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported('copy')) {
        return alert('복사하기가 지원되지 않는 브라우저입니다.');
      }

      // 흐름 3.
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.top = '0px';
      textarea.style.left = '0px';
      textarea.style.position = 'fixed';

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand('copy');
      // 흐름 6.
      document.body.removeChild(textarea);

      success = true;
      if (toastMessage) iconToast(toastMessage, 'check');

      // alert("클립보드에 복사되었습니다.");
    }

    return success;
  }
};
