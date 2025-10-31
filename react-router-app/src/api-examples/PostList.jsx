import React, { useEffect, useState } from "react";
import apiClient from "./apiClient";

function PostList() {
  const [posts, setPosts] = useState([]); // 실제 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태 (UX개선)
  const [error, setError] = useState(""); // 에러 메시지(사용자 안내)

  /**
   * useEffect에서 API 호출  - 표준 패턴
   * 컴포넌트 마운트 시 1회 실행 (의존성 배열이 [])
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");

        // JSONPlaceholder 쿼리 파라미터 활용
        // params 옵션으로 ?_limit=5 자동 생성
        const response = await apiClient.get("/posts", {
          params: { _limit: 5 },
        });

        setPosts(response.data); // response.data에 실제 서버 데이터
      } catch (err) {
        setError("게시글 로딩 실패");
        console.error("PostList 에러: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // 빈 배열: 마운트 시 1회만 실행

  // 조건부 렌더링 우선순위
  // 로딩 -> 에러 -> 데이터 순서로 UI 결정
  if (loading) return <p>⏳ 로딩중 ...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div>
      <h3>게시글 목록</h3>
      <hr />
      {posts.map((post) => (
        <div key={post.id}>
          <h4>제목: {post.title.substring(0, 30)}...</h4>
          <p>{post.body.substring(0, 100)}...</p>
          <hr />
        </div>
      ))}

      <p>useEffect + axios.get + 3가지 상태 관리 기본 패턴</p>
    </div>
  );
}

export default PostList;
