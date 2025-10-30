/**
 * 비동기 처리 실습을 위한 공통 유틸리티 함수들
 * 실무에서도 자주 사용되는 패턴들
 */

/**
 * 지연 함수 : 지정된 시간만큼 기다리는 Promise 반환
 * @param {number} ms - 기다릴 시간 (밀리초)
 * @returns {Promise} - 지정된 시간 후 resolve되는 Promise
 *
 * 사용 예시 : await sleeep(1000); // 1초 대기
 * 실무 활용 : API 호출 간격 조절, 로딩 시뮬레이션
 * */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * API 호출 시뮬레이션 함수
 * @param {any} data - 성공 시 반환할 데이터
 * @param {number} delay - 응답 지연 시간 (기본 : 1초)
 * @param {number} successRate - 성공 확률 (기본: 0.8 = 80%)
 * @returns {Promise} - 성공 또는 실패하는 Promise
 *
 * 개발 중 실제 API 대신 사용, 에러 케이스 테스트
 *
 */
export const mockApi = (data, delay = 1000, successRate = 0.8) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate
        ? resolve(data)
        : reject(new Error("네트워크 오류: API 호출 실패"));
    }, delay);
  });
};
