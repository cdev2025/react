import React from "react";

function JSXBasic() {
  // JavaScript 영역 : 변수, 함수 정의----
  const name = "React 학습자";
  const age = 25;
  const hobbies = ["독서", "영화감상", "코딩"];
  const user = {
    firstName: "김",
    lastName: "개발자",
  };

  function getGreeting(name) {
    return `안녕하세요, ${name}님!`;
  }
  //JavaScript 영역 ----------------------

  return (
    <div>
      <h2>JSX 표현식 기초</h2>

      {/* 1. 변수 출력 */}
      <p>이름: {name}</p>
      <p>나이: {age}</p>

      {/* 2. 계산 및 연산 */}
      <p>내년 나이: {age + 1}세</p>
      <p>문자열 연결: {user.firstName + user.lastName}</p>

      {/* 3. 함수 호출 */}
      <p>{getGreeting(name)}</p>

      {/* 4. 배열 메서드 사용 */}
      <p>취미: {hobbies.join(", ")}</p>

      {/* 5. 즉시 실행 함수 */}
      <p>현재 시간: {new Date().toLocaleTimeString()}</p>

      {/* JSX 안에 문장은 직접 사용 불가. 표현식만 가능 */}
      {/* if (age > 20) return <p>성인</p> // 문장은 불가 */}
      {/* for(let i=0; i<3; i++) // 반복문도 불가 */}

      {/* undefined, null, false는화면에 렌더링되지 않음 */}
    </div>
  );
}

export default JSXBasic;
