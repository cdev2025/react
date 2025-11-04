import React, { useState } from "react";
import BoardList from "../components/BoardList";
import PostList from "../components/PostList";
import { Box, Button, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import PostForm from "../components/PostForm";

function HomePage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedBoardName, setSelectedBoardName] = useState("");
  const [postFormOpen, setPostFormOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 목록 새로고침 트리거

  // BoardList에서 ID + 이름 같이 전달 받기
  const handleSelectBoard = (id, name) => {
    setSelectedBoard(id);
    setSelectedBoardName(name);
  };

  // 게시글 작성 완료 후 목록 새로 고침할 함수 (모달창으로 전달할 함수)
  const handlePostCreated = (newPost) => {
    console.log("새 게시글 등록: ", newPost);
    setRefreshTrigger((prev) => prev + 1); // 트리거 값 변경해서 PostList 새로 고침
  };

  return (
    <Box>
      <BoardList onSelectBoard={handleSelectBoard} />

      {selectedBoard ? (
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

          <PostList boardId={selectedBoard} refreshTrigger={refreshTrigger} />

          {/* 게시글 작성 모달 */}
          <PostForm
            open={postFormOpen}
            onClose={() => setPostFormOpen(false)}
            boardId={selectedBoard}
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
