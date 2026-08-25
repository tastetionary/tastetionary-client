// Food related enums
export enum FoodCategory {
  ALL = '전체',
  KOREAN = '한식',
  CHINESE = '중식',
  WESTERN = '양식',
  JAPANESE = '일식',
  FAST_FOOD = '패스트푸드',
  SNACK = '분식',
  ASIAN = '아시아식',
  SALAD = '샐러드',
  CAFE_AND_DESERT = '카페/디저트',
}

export enum FoodKeyword {
  ALL = '전체',
  SPICY = '매콤한',
  SAVORY = '고소한',
  LIGHT = '가벼운',
  COLD = '차가운',
  RICH = '국물이 진한',
  CLEAN = '깔끔한',
  WARM = '따뜻한',
  SWEET = '달콤한',
  SOUR = '상큼한',
  BEST_FOR_HANGOVER = '해장에 제격',
  GREASY = '느끼한',
  FLAVORFUL = '풍미가 있는',
}

// Restaurant related enums
export enum RestaurantCategory {
  ALL = '전체',
  KOREAN = '한식',
  CHINESE = '중식',
  WESTERN = '양식',
  JAPANESE = '일식',
  FAST_FOOD = '패스트푸드',
  SNACK = '분식',
  ASIAN = '아시아식',
  BUFFET = '뷔페',
  SALAD = '샐러드',
  CAFE_AND_DESERT = '카페/디저트',
}

export enum RestaurantKeyword {
  ALL = '전체',
  TASTE = '맛있어요',
  CLEAN = '깨끗해요',
  KIND = '친절해요',
  ATMOSPHERE = '분위기 좋아요',
  CHEAP = '가성비 좋아요',
  PARKING = '주차 가능해요',
  ROTATION = '회전율 좋아요',
  LARGE = '양이 많아요',
  WIDE = '넓고 쾌적해요️',
  WAITING = '웨이팅 있어요',
}

export enum PreferenceCategory {
  /**
   * 북마크 식당
   * @type string
   * @example 'bookmark'
   */
  BOOKMARK = 'bookmark',
  /**
   * 제외 식당
   * @type string
   * @example 'excluded'
   */
  EXCLUDED = 'excluded',
}

export enum WithdrawalTypeEnum {
  /**
   * 사용성이 불편해요
   */
  INCONVENIENT_USAGE = 'inconvenient_usage',
  /**
   * 더이상 서비스가 필요없어요
   */
  NO_LONGER_NEED_SERVICE = 'no_longer_need_service',
  /**
   * 사용빈도가 낮아요
   */
  INFREQUENTLY_USE = 'infrequently_use',
  /**
   * 더 마음에 드는 비슷한 서비스를 찾았어요
   */
  FOUND_SIMILAR_SERVICE = 'found_similar_service',
  /**
   * 컨텐츠의 신뢰성이 떨어져요
   */
  LOW_RELIABILITY_CONTENTS = 'low_reliability_contents',
  /**
   * 개인정보를 삭제하고 싶어요
   */
  WANT_TO_DELETE_PERSONAL_INFORMATION = 'want_to_delete_personal_information',
}
