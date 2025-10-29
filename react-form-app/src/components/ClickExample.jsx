import React from "react";

function ClickExample() {
  function handleClick() {
    alert("버튼 클릭 시 실행됩니다!");
  }

  function greet(name) {
    alert(`${name}님 안녕하세요!`);
  }

  return (
    <section>
      <h2>onClick: 함수 전달 vs 함수 호출</h2>

      <div>
        {/* 함수 전달 */}
        <button onClick={handleClick}> 함수 전달</button>

        {/* 함수 호출 - 렌더링 시 즉시 실행 */}
        {/* <button onClick={handleClick()}> 함수 호출 (잘못된 예) </button> */}

        {/* 인자 전달  */}
        <button onClick={() => greet("리액트초보")}>
          인자 전달 (람다 사용)
        </button>
      </div>
    </section>
  );
}

export default ClickExample;
