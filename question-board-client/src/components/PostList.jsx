import React, { useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

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
        게시글 목록
      </Typography>
      {posts.length === 0 ? (
        <Typography color="text.secondary">
          등록된 게시글이 없습니다.
        </Typography>
      ) : (
        <List>
          {posts.map((post) => (
            <ListItem
              key={post.id}
              component={Link}
              to={`/posts/${post.id}`}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                mb: 1,
                textDecoration: "none",
                color: "inherit",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              {/* <strong>{post.title}</strong> - {post.userName} */}
              <ListItemText
                primary={post.title}
                secondary={`작성자: ${post.userName}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default PostList;
