import React, { useState } from "react";

function ConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLevel, setUserLevel] = useState(1);

  return (
    <div>
      <h2>조건부 렌더링</h2>

      {/* 패턴1: 삼항 연산자 */}
      <div>
        <h3>1. 삼항 연산자</h3>
        {isLoggedIn ? (
          <p style={{ color: "green" }}>✅ 로그인 상태입니다.</p>
        ) : (
          <p style={{ color: "red" }}>❌ 로그인이 필요합니다</p>
        )}
      </div>

      {/* 패턴2: && 단축평가 (참일 때만 보여주기)  */}
      <div>
        <h3>2. && 단축 평가</h3>
        {isLoggedIn && <p>환영합니다!!!!</p>}
        {userLevel >= 3 && <p> --- VIP 회원입니다 --- </p>}
      </div>

      {/* 패턴3: 복잡한 조건 (함수로 분리) */}
      <div
        style={{
          backgroundColor: "lightblue",
          fontSize: "18px",
          marginTop: "10px",
          padding: "15px",
        }}
      >
        <h3>3. 복잡한 조건 처리</h3>
        {renderUserStatus()}
      </div>

      {/* 컨트롤 버튼 */}
      <div>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
        <button onClick={() => setUserLevel(userLevel === 1 ? 3 : 1)}>
          레벨 변경 (현재: {userLevel})
        </button>
      </div>
    </div>
  );

  // 복잡한 조건부 로직을 함수로 분리
  function renderUserStatus() {
    if (!isLoggedIn) {
      return <p>로그인 후 이용 가능합니다</p>;
    }

    if (userLevel === 1) {
      return <p>브론즈 회원</p>;
    } else if (userLevel === 2) {
      return <p>실버 회원</p>;
    } else {
      return <p>골드 회원</p>;
    }
  }
}

export default ConditionalDemo;
