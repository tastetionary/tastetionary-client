export const toUnicodeEscape = (str: string) => {
  return str
    .split('')
    .map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0'))
    .join('');
};

export const unicodeToText = (unicodeStr: string) => {
  return unicodeStr.replace(/\\u[\dA-Fa-f]{4}/g, match => {
    return String.fromCharCode(parseInt(match.replace('\\u', ''), 16));
  });
};
