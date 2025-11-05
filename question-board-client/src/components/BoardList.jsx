import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import { Box, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectBoard } from "../store/boardSlice";

function BoardList() {
  const dispatch = useDispatch();
  const { selectedBoardId } = useSelector((state) => state.board);

  const [boards, setBoards] = useState([]); // 데이터
  const [loading, setLoading] = useState(true); // 로딩상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await ApiService.get("/boards");
        setBoards(res.data);
      } catch (err) {
        setError("게시판 목록을 불러오지 못했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []); // []비어있는 의존성 배열: 마운트될 때 한 번만 실행

  // 게시판 선택 핸들러 (Redux 액션 디스패치)
  const handleBoardClick = (id, name) => {
    dispatch(selectBoard({ id, name }));
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );

  // severity 옵션 : error / warning / info / success
  if (error) return <Alert serverity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        게시판 목록
      </Typography>
      {boards.length === 0 ? (
        <Typography color="text.secondary">
          등록된 게시판이 없습니다.
        </Typography>
      ) : (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {boards.map((board) => (
            <Chip
              key={board.id}
              label={board.boardName}
              onClick={() => handleBoardClick(board.id, board.boardName)}
              color="primary"
              variant="outlined"
              sx={{ cursor: "pointer " }}
            />
            // Chip은 짧은 정보나 상태, 카테고리, 선택된 항목 등을
            // 한 눈에 보기 쉽게 표시하는 작은 UI요소
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default BoardList;
