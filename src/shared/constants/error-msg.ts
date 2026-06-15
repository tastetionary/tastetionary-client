const ERROR_MSG = {
  NO_REGISTER: 'no data',
  INVALID_ID_OR_PASSWORD: 'identification or password is not matched',
};

const SERVER_ERROR = {
  // input parameter 등 사용자 실수 ( 입력된 정보가 잘못되었습니다. )
  CALLER_WRONG_USAGE_ERROR: 'caller_wrong_usage_error',
  // 사용자는 올바르게 입력 했으나 비즈니스 로직상에서 불가능한 액션의 경우 ( 요청을 처리할 수 없습니다. 다른 옵션을 고려해주세요. )
  CALLER_WRONG_DOMAIN_ERROR: 'caller_wrong_domain_error',
  // 외부 서비스, 시스템 에러 발생 ( 시스템 오류로 인해 요청을 처리할 수 없습니다. 잠시 후에 다시 시도하거나 관리자에게 문의하세요. )
  SUPPLIER_SYSTEM_ERROR: 'supplier_system_error',
  // 내부 도메인 에러, 버그 상황 ( 내부 오류로 인해 요청을 처리할 수 없습니다. 문제가 해결될 때까지 기다려주세요. )
  INTERNAL_DOMAIN_ERROR: 'internal_domain_error',
};

const SERVER_ERROR_MSG = {
  caller_wrong_usage_error: '입력된 정보가 잘못되었습니다.',
  caller_wrong_domain_error: '요청을 처리할 수 없습니다. 다른 옵션을 고려해주세요.',
  supplier_system_error:
    '시스템 오류로 인해 요청을 처리할 수 없습니다. 잠시 후에 다시 시도하거나 관리자에게 문의하세요.',
  internal_domain_error: '내부 오류로 인해 요청을 처리할 수 없습니다. 문제가 해결될 때까지 기다려주세요.',
};

export { ERROR_MSG, SERVER_ERROR, SERVER_ERROR_MSG };
