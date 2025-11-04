import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ApiService from "../api/ApiService";

function PostForm({ open, onClose, boardId, onPostCreated }) {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false); // 로딩상태
  const [error, setError] = useState(null); // 에러 상태

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 클라이언트사이드 유효성 검사
  const validateForm = () => {
    if (!boardId) return "게시판을 먼저 선택하세요.";
    if (!formData.userName.trim()) return "작성자 이름을 입력하세요.";
    if (!formData.password || formData.password.length < 4)
      return "비밀번호는 4자 이상 입력하세요.";
    if (!formData.email || !/^[\w.-]+@[\w.-]+\.\w+$/.test(formData.email))
      return "올바른 이메일 주소를 입력하세요."; // 이메일 정규식 검증
    if (!formData.title.trim()) return "제목을 입력하세요.";
    if (!formData.content.trim()) return "내용을 입력하세요.";
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await ApiService.post(
        `/posts?boardId=${boardId}`,
        formData
      );

      // 성공 시 폼 초기화 및 모달 닫기
      setFormData({
        userName: "",
        password: "",
        email: "",
        title: "",
        content: "",
      });

      onPostCreated(response.data); // 부모 컴포넌트에 새 게시글 데이터 전달
      onClose();
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message || "게시글 등록에 실패했습니다";
      setError(apiMessage);
      console.error("게시글 등록 에러: ", err);
    } finally {
      setLoading(false);
    }
  };

  // 취소 버튼 : 모달 닫기 및 초기화
  const handleClose = () => {
    // 성공 시 폼 초기화 및 모달 닫기
    setFormData({
      userName: "",
      password: "",
      email: "",
      title: "",
      content: "",
    });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>새 게시글 작성</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box>
            <TextField
              name="userName"
              label="작성자 이름"
              value={formData.userName}
              onChange={handleChange}
              required
              fullWidth
              autoFocus
            />
            <TextField
              name="password"
              label="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              helperText="수정/삭제 시 필요합니다. (4자 이상)"
            />
            <TextField
              name="email"
              label="이메일"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="title"
              label="제목"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="content"
              label="내용"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={6}
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            취소
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "등록 중..." : "등록"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PostForm;
