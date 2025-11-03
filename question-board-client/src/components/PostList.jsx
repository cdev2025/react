import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";

function PostList({ boardId }) {
  const [posts, setPosts] = useState([]); // 데이터
  const [loading, setLoading] = useState(true); // 로딩상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    if (!boardId) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await ApiService.get(`/posts?boardId=${boardId}`);
        setPosts(res.data);
      } catch (err) {
        setError("게시글 목록을 불러오지 못했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [boardId]); // boardId가 변경될 때마다 실행

  if (loading) return <p>게시판 목록 불러오는 중....</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div>
      <h3>게시글 목록</h3>
      {posts.length === 0 ? (
        <p>등록된 게시글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong> - {post.userName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
