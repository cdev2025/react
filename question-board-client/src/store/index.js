import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";

// Redux 스토어 설정
const store = configureStore({
  reducer: {
    board: boardReducer, // board 상태를 관리하는 슬라이스
  },
  // 개발 환경에서 Redux DevTools 자동 활성화
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
