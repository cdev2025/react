import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function PostForm({ open, onClose, boardId, onPostCreated }) {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true); // 로딩상태
  const [error, setError] = useState(null); // 에러 상태

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sx" fullWidth>
      <DialogTitle>새 게시글 작성</DialogTitle>

      <DialogContent>
        <Box>
          <TextField name="userName" label="작성자 이름" />
          <TextField name="password" label="비밀번호" />
          <TextField name="email" label="이메일" />
          <TextField name="title" label="제목" />
          <TextField name="content" label="내용" />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default PostForm;
