export const toUnicodeEscape = (str: string) => {
  return str
    .split('')
    .map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0'))
    .join('');
};

export const unicodeToText = (unicodeStr: string) => {
  // 두 번 이스케이프된 `\\u`를 단일 `\u`로 변환
  const singleEscapedStr = unicodeStr.replace(/\\\\u/g, '\\u');
  // 단일 `\uXXXX` 형태로 변환
  return singleEscapedStr.replace(/\\u[\dA-Fa-f]{4}/g, match => {
    return String.fromCharCode(parseInt(match.replace('\\u', ''), 16));
  });
};
