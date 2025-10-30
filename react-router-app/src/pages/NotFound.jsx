import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>404 - 페이지 없음</h2>
      <Link to="/">홈으로</Link>
      <button onClick={() => navigate(-1)}>◀️ 뒤로가기</button>
    </div>
  );
}

export default NotFound;
