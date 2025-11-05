// App.jsx
// useContext로 전역 상태를 구독하는 컴포넌트

import { useContext, useState } from "react";
import { CounterContext } from "./CounterProvider";

function App() {
  // CountContext에서 count 상태와 조작 함수를 받아옴.
  const { count, increment, decrement } = useContext(CounterContext);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>카운트: {count}</h1>
      {/* 전역 상태에 연결된 버튼 */}
      <button onClick={decrement}>감소</button>
      <button onClick={increment}>증가</button>
    </div>
  );
}

export default App;
