import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiService from "../api/ApiService";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null); // postId에 해당하는 특정 게시글 데이터
  const [replies, setReplies] = useState([]); // 댓글 데이터
  const [loading, setLoading] = useState(true); // 로딩상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [postRes, replyRes] = await Promise.all([
          ApiService.get(`/posts/${postId}`),
          ApiService.get(`/replies?postId=${postId}`),
        ]);
        setPost(postRes.data);
        setReplies(replyRes.data);
      } catch (err) {
        setError("게시글을 불러오지 못했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) fetchData();
  }, [postId]); // postId가 변경될때마다 실행(데이터 로딩)

  if (loading)
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );

  // severity 옵션 : error / warning / info / success
  if (error) return <Alert serverity="error">{error}</Alert>;
  if (!post)
    return <Alert serverity="warning">게시글이 존재하지 않습니다.</Alert>;

  return (
    <Box>
      <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        목록으로 가기
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="right"
            sx={{ mb: 1 }}
          >
            작성자: {post.userName} ( {post.email} )
          </Typography>
          <Typography
            variant="caption"
            align="right"
            sx={{ mb: 2, display: "block" }}
          >
            작성일: {new Date(post.createdAt).toLocaleString()}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {/*  [whiteSpace] "normal" / "pre" / "pre-wrap" */}
            {post.content}
          </Typography>
        </CardContent>
      </Card>

      <Typography> 댓글 ( {replies.length} )</Typography>
      {replies.length === 0 ? (
        <Typography>댓글이 없습니다.</Typography>
      ) : (
        <List>
          {replies.map((reply) => (
            <ListItem key={reply.id} alignItems="flex-start">
              <ListItemText
                primary={reply.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      {reply.userName}
                    </Typography>
                    <br />
                    {reply.content}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default PostDetail;
