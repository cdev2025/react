import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "./apiClient";

function PostDetail() {
  /**
   * useParams로 URL 파라미터 추출
   * 라우트: /posts/:id -> URL: /posts/2 -> {id: "2"}
   * !!! 중요 : useParams 값은 항상 문자열 !!!
   */
  const { id } = useParams();
  const [post, setPost] = useState(null); // null은 "데이터 없음" 싱태 구분
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        // 동적 URL : /posts/1, posts/2, ...
        const response = await apiClient.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(`게시글 ${id}번 로딩 실패`);
        console.error(`PostDetail ID ${id} 에러: `, err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // id 변경시마다 재실행

  if (loading) return <p>⏳ 로딩중 ...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!post) return <p>게시글 없음</p>;

  return (
    <div>
      <Link to="/api-demo">◀️ 목록으로</Link>
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <div>
        <strong>다른 게시글: </strong>
        {[1, 2, 3, 4, 5, 100, 101].map((postId) => (
          <Link key={postId} to={`/posts/${postId}`}>
            {" "}
            [{postId}]{" "}
          </Link>
        ))}
        <p>101번은 존재하지 않음 ▶ 에러 메시지 확인 가능</p>
      </div>

      <br />
      <p>useParams + 동적 API 호출로 하나의 컴포넌트가 모든 ID 처리</p>
    </div>
  );
}

export default PostDetail;
