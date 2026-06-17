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

enum RestaurantPrice {
  UNDER_10000 = '~10,000원',
  UNDER_11000 = '~11,000원',
  UNDER_12000 = '~12,000원',
  UNDER_13000 = '~13,000원',
  OVER_13000 = '13,000원~',
}

enum ReviewReportCategory {
  INAPPROPRIATE_CONTENT = '부적절한 내용',
  SPAM = '스팸',
  HATE_SPEECH = '혐오 발언',
  ADVERTISEMENT = '광고',
  FALSE_INFO = '허위 정보',
  ETC = '기타',
}

// User related enums
enum UserState {
  ACTIVE = 'active',
  WITHDRAWAL = 'withdrawal',
}

enum AgreementCategory {
  PERSONAL_INFORMATION = 'personal_information',
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

/**
 * enum 대신할 type literal 시험 삼아 사용
 */
type OpinionCategory = 'withdrawal';

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

// Icon mappings (if needed)
const FoodCategoryIcons: Record<FoodCategory, string> = {
  [FoodCategory.ALL]: '',
  [FoodCategory.KOREAN]: '',
  [FoodCategory.CHINESE]: '',
  [FoodCategory.WESTERN]: '',
  [FoodCategory.JAPANESE]: '',
  [FoodCategory.FAST_FOOD]: '',
  [FoodCategory.SNACK]: '',
  [FoodCategory.ASIAN]: '',
  [FoodCategory.SALAD]: '',
  [FoodCategory.CAFE_AND_DESERT]: '',
};

const RestaurantCategoryIcons: Record<RestaurantCategory, string> = {
  [RestaurantCategory.ALL]: '',
  [RestaurantCategory.KOREAN]: '',
  [RestaurantCategory.CHINESE]: '',
  [RestaurantCategory.WESTERN]: '',
  [RestaurantCategory.JAPANESE]: '',
  [RestaurantCategory.FAST_FOOD]: '',
  [RestaurantCategory.SNACK]: '',
  [RestaurantCategory.ASIAN]: '',
  [RestaurantCategory.BUFFET]: '',
  [RestaurantCategory.SALAD]: '',
  [RestaurantCategory.CAFE_AND_DESERT]: '',
};

const RestaurantKeywordEmoji: Record<RestaurantKeyword, string> = {
  [RestaurantKeyword.ALL]: '',
  [RestaurantKeyword.TASTE]: '',
  [RestaurantKeyword.CLEAN]: '',
  [RestaurantKeyword.KIND]: '',
  [RestaurantKeyword.ATMOSPHERE]: '',
  [RestaurantKeyword.CHEAP]: '',
  [RestaurantKeyword.PARKING]: '',
  [RestaurantKeyword.ROTATION]: '',
  [RestaurantKeyword.LARGE]: '',
  [RestaurantKeyword.WIDE]: '',
  [RestaurantKeyword.WAITING]: '',
};

const PreferenceCategoryToColumnMapping: Record<PreferenceCategory, string> = {
  [PreferenceCategory.BOOKMARK]: 'bookmark',
  [PreferenceCategory.EXCLUDED]: 'excluded',
};
