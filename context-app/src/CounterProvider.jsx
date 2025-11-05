// CounterProvider.jsx
// 전역 상태를 제공하는 Context Provider 컴포넌트

import { createContext, useState } from "react";

// 1. Context 생성
// - createContext()를 호출하면 전역으로 데이터를 공유할 수 있는 Context 객체가 만드어집니다.
export const CounterContext = createContext();

// 2. Provider 컴포넌트 정의
// - CounterProvider : 자식 컴포넌트(children) 에게 상태 전달
export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  // 카운트 증가/감소 함수
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  // 3. Provider를 통해 상태와 함수 공유
  // - value 속성에 공유하고 싶은 데이터(상태, 함수 등)을 전달
  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}
