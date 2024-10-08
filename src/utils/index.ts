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
