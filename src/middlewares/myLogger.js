/** middleware 구조
 * function middleware(store) {
 *   return function(next) {
 *     return function(action) {
 *       // 하고싶은 작업...
 *     };
 *   };
 * }
 * store: 리덕스 스토어 인스턴스
 * next: 액션을 다음 미들웨어에게 전달하는 함수.
 * action: 현재 처리하고 있는 액션 객체
 */

const myLogger = (store) => (next) => (action) => {
  console.log(action); // 먼저 액션을 출력합니다.
  const result = next(action); // 다음 미들웨어(또는 리듀서)에게 액션을 전달합니다.

  // 업데이트 이후의 상태를 조회합니다.
  console.log("\t", store.getState()); // '\t'는 탭 문자입니다.

  return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
};

export default myLogger;
