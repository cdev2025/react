// Counter.jsx
// useSelector, useDispatch를 사용해 Redux 상태 조회 및 액션 실행
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";

export default function Counter() {
  // useSelector : Redux store의 상태 읽음
  const count = useSelector((state) => state.counter.count);

  // useDispatch: 액션을 실행하기 위한 디스패쳐 함수
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>카운트: {count}</h1>
      {/* 전역 상태에 연결된 버튼 */}
      <button onClick={() => dispatch(decrement())}>감소</button>
      <button onClick={() => dispatch(increment())}>증가</button>
    </div>
  );
}
