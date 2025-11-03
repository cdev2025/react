import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";

function BoardList({ onSelectBoard }) {
  const [boards, setBoards] = useState([]); // 데이터
  const [loading, setLoading] = useState(true); // 로딩상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
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

  if (loading) return <p>게시판 목록 불러오는 중....</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div>
      <h2>게시판 목록</h2>
      {boards.length === 0 ? (
        <p>등록된 게시판이 없습니다.</p>
      ) : (
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            padding: 0,
            gap: "20px",
          }}
        >
          {boards.map((board) => (
            <li
              key={board.id}
              onClick={() => onSelectBoard(board.id, board.boardName)}
            >
              {board.boardName} |
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BoardList;
