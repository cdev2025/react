import React, { useEffect, useState } from "react";

function PostList() {
  const [posts, setPosts] = useState([]); // 실제 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태 (UX개선)
  const [error, setError] = useState(""); // 에러 메시지(사용자 안내)

  return (
    <div>
      <h3>게시글 목록</h3>

      <p>useEffect + axios.get + 3가지 상태 관리 기본 패턴</p>
    </div>
  );
}

export default PostList;
