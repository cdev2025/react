import React from "react";

function HomePage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedBoardName, setSelectedBoardName] = useState("");

  // BoardList에서 ID + 이름 같이 전달 받기
  const handleSelectBoard = (id, name) => {
    setSelectedBoard(id);
    setSelectedBoardName(name);
  };

  return (
    <div>
      <h1>익명 질문 게시판</h1>
      <BoardList onSelectBoard={handleSelectBoard} />
      <hr />
      {selectedBoard ? (
        <>
          <h3>선택된 게시판: {selectedBoardName}</h3>
          <PostList boardId={selectedBoard} />
        </>
      ) : (
        <p>목록에서 게시판을 선택해 주세요.</p>
      )}
    </div>
  );
}

export default HomePage;
