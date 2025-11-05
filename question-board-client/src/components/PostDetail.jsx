import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Stack,
  Typography,
} from "@mui/material";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import PasswordDialog from "./PasswordDialog";
import EditPostDialog from "./EditPostDialog";
import { useDispatch } from "react-redux";
import { bumpRefresh } from "../store/boardSlice";

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux 액션사용을 위해 dispatch준비

  const [post, setPost] = useState(null); // postId에 해당하는 특정 게시글 데이터
  const [replies, setReplies] = useState([]); // 댓글 데이터
  const [loading, setLoading] = useState(true); // 로딩상태
  const [error, setError] = useState(null); // 에러 상태

  // 비밀 번호 모달 상태
  const [passwordDialog, setPasswordDialog] = useState({
    open: false,
    type: null, // 'edit' 또는 'delete'
    loading: false,
    error: null,
  });

  // 게시글 수정 모달 상태 관리
  const [editModalOpen, setEditModalOpen] = useState(false); // 수정 모달 열림 여부
  const [verifiedPassword, setVerifiedPassword] = useState(""); // 검증된 비밀번호 저장용 상태

  // 게시글/댓글 조회
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

  // 수정 버튼 클릭
  const handleEditClick = () => {
    setPasswordDialog({
      open: true,
      type: "edit",
      loading: false,
      err: null,
    });
  };

  // 삭제 버튼 클릭
  const handleDeleteClick = () => {
    setPasswordDialog({
      open: true,
      type: "delete",
      loading: false,
      err: null,
    });
  };

  // 수정 시 비밀번호 검증 함수
  // 실제 서버 put api를 이용해 비밀번호가 맞는지 검증 수행함
  const verifyPasswordForEdit = async (password) => {
    try {
      const verifyData = {
        userName: post.userName,
        email: post.email,
        password: password, // 사용자가 입력한 비밀번호
        title: post.title, // 기존 제목 (변경 없음)
        content: post.content, // 기존 내용 (변경 없음)
      };

      // 서버에 PUT 요청 -> 비밀번호가 맞으면 200 OK 반환
      await ApiService.put(`/posts/${post.id}`, verifyData);
      return true; //검증 성공
    } catch (err) {
      throw err; //검증 실패 -> 상위 try/catch로 던짐
    }
  };

  //비밀 번호 확인 처리
  const handlePasswordConfirm = async (password) => {
    const { type } = passwordDialog;

    setPasswordDialog((prev) => ({ ...prev, loading: true, error: null }));

    try {
      if (type === "edit") {
        // 수정 로직 (현재 비밀번호 검증)
        console.log("비밀번호 검증 중... :  비밀번호 :", password);
        await verifyPasswordForEdit(password); // 검증시도

        // 검증 성공시
        setVerifiedPassword(password); // 이후 수정 시 재사용할 비밀번호 저장
        setPasswordDialog({
          open: false,
          type: null,
          loading: false,
          error: null,
        }); // 비밀번호 모달 닫기
        setEditModalOpen(true); // 수정 모달 열기
        console.log("비밀번호 검증 성공 - 수정 모달 열기");
      } else if (type == "delete") {
        // 게시글 삭제 API 호출
        // DELETE /api/posts + body {id, password}
        await ApiService.delete("/posts", {
          data: {
            id: parseInt(postId),
            password,
          },
        });

        alert("게시글이 삭제되었습니다.");
        navigate("/"); // 홈으로 이동
      }

      // 성공시 모달 닫기
      setPasswordDialog({
        open: false,
        type: null,
        loading: false,
        error: null,
      });
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        (type == "delete"
          ? "삭제에 실패했습니다. 비밀번호 확인해주세요."
          : "수정에 실패했습니다.");
    }
  };

  // 수정 완료 처리 로직
  const handlePostUpdated = () => {
    // 화면 새로고침으로 수정된 내용 즉시 반영
    window.location.reload();
    // Redux 목록 상태도 새로고침
    dispatch(bumpRefresh());
  };

  // 비밀 번호 모달 닫기
  const handlePasswordDialogClose = () => {
    if (!passwordDialog.loading) {
      setPasswordDialog({
        open: false,
        type: null,
        loading: false,
        error: null,
      });
    }
  };

  // ================== 이하 화면 렌더링 부분 =====================
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
          <Box>
            <Box>
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
            </Box>

            {/* 수정/삭제 버튼 */}
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Edit />}
                onClick={handleEditClick}
              >
                수정
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Delete />}
                onClick={handleDeleteClick}
              >
                삭제
              </Button>
            </Stack>
          </Box>

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

      {/* 비밀번호 확인 모달 */}
      <PasswordDialog
        open={passwordDialog.open}
        onClose={handlePasswordDialogClose}
        onConfirm={handlePasswordConfirm}
        title={passwordDialog.type === "delete" ? "게시글 삭제" : "게시글 수정"}
        message={
          passwordDialog.type === "delete"
            ? "정말로 이 게시글을 삭제하시겠습니까? \n작성 시 입력한 비밀번호를 입력하세요."
            : "게시글을 수정하려면 작성 시 입력한 비밀번호를 입력하세요."
        }
        confirmText={passwordDialog.type === "delete" ? "삭제" : "수정"}
        loading={passwordDialog.loading}
        error={passwordDialog.error}
      />

      {/* 게시글 수정 모달 (EditPostDialog) */}
      <EditPostDialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        post={post}
        verifiedPassword={verifiedPassword}
        onUpdated={handlePostUpdated}
      />
    </Box>
  );
}

export default PostDetail;
