import React, { useState } from "react";
import BoardList from "../components/BoardList";
import PostList from "../components/PostList";
import { Box, Typography } from "@mui/material";

function HomePage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedBoardName, setSelectedBoardName] = useState("");

  // BoardList에서 ID + 이름 같이 전달 받기
  const handleSelectBoard = (id, name) => {
    setSelectedBoard(id);
    setSelectedBoardName(name);
  };

  return (
    <Box>
      <BoardList onSelectBoard={handleSelectBoard} />

      {selectedBoard ? (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            선택된 게시판: {selectedBoardName}
          </Typography>
          <PostList boardId={selectedBoard} />
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
