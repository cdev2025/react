import React, { useState } from "react";
import BoardList from "../components/BoardList";
import PostList from "../components/PostList";
import { Box, Button, Divider, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import PostForm from "../components/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { bumpRefresh } from "../store/boardSlice";

function HomePage() {
  const dispatch = useDispatch();

  // Redux에서 게시판 상태 구독(로컬 상태 완전 제거)
  const { selectedBoardId, selectedBoardName } = useSelector(
    (state) => state.board
  );

  const [postFormOpen, setPostFormOpen] = useState(false);

  // 게시글 작성 완료 후 목록 새로 고침할 함수
  const handlePostCreated = (newPost) => {
    console.log("새 게시글 등록: ", newPost);
    dispatch(bumpRefresh()); // Redux 액션으로 목록 새로고침
  };

  return (
    <Box>
      <BoardList />

      <Divider sx={{ my: 3 }} />

      {/* Redux 상태로 조건부 렌더링 */}
      {selectedBoardId ? (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            선택된 게시판: {selectedBoardName}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={() => setPostFormOpen(true)}
          >
            글쓰기
          </Button>

          {/* PostList도 boardId prop 없이 Redux 직접 구독 */}
          <PostList />

          {/* 게시글 작성 모달 => boardID prop 전달 그대로 둠. 나중에 변경해보세요.*/}
          <PostForm
            open={postFormOpen}
            onClose={() => setPostFormOpen(false)}
            boardId={selectedBoardId}
            onPostCreated={handlePostCreated}
          />
        </Box>
      ) : (
        <Typography color="text.secondary">
          목록에서 게시판을 선택해 주세요.
        </Typography>
      )}
    </Box>
  );
}

export default HomePage;
