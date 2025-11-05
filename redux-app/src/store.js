// store.js
// Redux 전역 저장소(Store)를 설정하는 파일
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

// Redux Toolkit의 configureStore를 사용해 스토어 생성
export const store = configureStore({
  reducer: {
    // counter 상태를 counterReducer로 관리
    counter: counterReducer,
  },
});
