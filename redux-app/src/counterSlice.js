// counterSlice.js
// Redux Toolkit의 createSlice를 이용해 상태, 액션, 리듀서를 한번에 정의

import { createSlice } from "@reduxjs/toolkit";

// createSlice: 상태 이름(name), 초기값(initialState), reducer 로직 포함
const counterSlice = createSlice({
  name: "counter", // 슬라이스 이름
  initialState: { count: 0 }, // 초기 상태값
  reducers: {
    //count 증가 액션
    increment: (state) => {
      state.count += 1;
    },
    //count 감소 액션
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

// createSlice가 자동으로 액션 함수(increment, decrement)를 생성
export const { increment, decrement } = counterSlice.actions;

// reducer를 export해야 store에서 사용 가능
export default counterSlice.reducer;
