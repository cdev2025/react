import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>useState 기본 예제</h2>
      <p>
        현재 카운터 값: <b>{count}</b>
      </p>
      <button onClick={() => setCount(count - 1)}> -1 감소</button>
      <button onClick={() => setCount(0)}>초기화</button>
      <button onClick={() => setCount(count + 1)}> +1 중가</button>
    </section>
  );
}

export default Counter;
