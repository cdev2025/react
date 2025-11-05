import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  selectedBoardId: null, // 선택된 게시판 ID
  selectedBoardName: "", // 선택된 게시판 이름
  refreshKey: 0, // 목록 새로고침 트리거
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // 게시판 선택 액션
    selectBoard: (state, action) => {
      const { id, name } = action.payload; // dispatch 매개변수로 전달받은 내용이 action.payload
      state.selectedBoardId = id;
      state.selectedBoardName = name;
      state.refreshKey++; // 게시판 변경 시 목록 새로고침 할 수 있게 refreshKey값 변경
    },

    // 게시판 선택 해제
    clearBoard: (state) => {
      state.selectedBoardId = null;
      state.selectedBoardName = "";
    },

    // 목록 새로고침 트리거 (게시글 추가/수정/삭제 후 사용)
    bumpRefresh: (state) => {
      state.refreshKey++;
    },
  },
});

// 액션 생성자 내보내기
export const { selectBoard, clearBoard, bumpRefresh } = boardSlice.actions;

// 리듀서 내보내기
export default boardSlice.reducer;
