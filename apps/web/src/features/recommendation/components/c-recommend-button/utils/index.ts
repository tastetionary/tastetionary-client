/**
 * enum의 한글 값(예: '한식')을 짧은 ASCII 키(예: 'KOREAN')로 변환한다.
 * 공유 링크에 한글을 그대로 실으면 URL 인코딩 시 글자당 8~9자로 부풀어
 * 카카오 공유 메시지 크기 제한(모바일 10K)을 초과하므로, 키로 축약해 전달한다.
 */
export const enumValuesToKeys = <T extends Record<string, string>>(enumObj: T, values: string[]): string[] => {
  const keyByValue = new Map(Object.entries(enumObj).map(([key, value]) => [value, key]));
  return values.map(value => keyByValue.get(value)).filter((key): key is string => Boolean(key));
};

/**
 * `enumValuesToKeys`로 축약한 키 배열을 다시 원래 한글 값으로 복원한다.
 * 유효하지 않은 키는 제외한다.
 */
export const enumKeysToValues = <T extends Record<string, string>>(enumObj: T, keys: string[]): T[keyof T][] => {
  return keys.map(key => enumObj[key as keyof T]).filter((value): value is T[keyof T] => Boolean(value));
};
