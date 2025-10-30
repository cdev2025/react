import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const names = {
    1: "키보드",
    2: "마우스",
    3: "모니터",
    4: "노트북",
    5: "헤드셋",
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>◀️ 뒤로</button>
      <Link to="/products">목록으로</Link>

      <h2>상품 상세</h2>
      <p>ID : {id}</p>
      <p>상품명 : {names[id] || "없음"}</p>
    </div>
  );
}

export default ProductDetail;
