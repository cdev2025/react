import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, Box } from "@mui/material";
import ApiService from "../api/ApiService";

// ✅ verifiedPassword prop으로 이미 검증된 비밀번호 받음
function EditPostDialog({ open, onClose, post, verifiedPassword, onUpdated }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && post) {
      setFormData({
        title: post.title || '',
        content: post.content || ''
      });
      setError(null); // 모달 열릴 때 에러 초기화
    }
  }, [open, post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("제목과 내용을 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // ✅ 이미 검증된 비밀번호 사용 - 에러 발생 확률 매우 낮음
      const updateData = {
        userName: post.userName,
        email: post.email,
        password: verifiedPassword, // 이미 PostDetail에서 검증된 비밀번호
        title: formData.title,
        content: formData.content
      };

      console.log("수정 데이터 전송:", updateData);
      await ApiService.put(`/posts/${post.id}`, updateData);
      
      console.log("게시글 수정 완료");
      onUpdated(); // 부모 컴포넌트에서 새로고침 처리
      onClose();
      
    } catch (err) {
      // ✅ 이론적으로는 발생하지 않아야 하지만 예외 처리 유지
      const errorMessage = err?.response?.data?.message || "수정에 실패했습니다.";
      console.error("예상치 못한 수정 에러:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !loading && onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>게시글 수정</DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="title"
              label="제목"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
              autoFocus
            />
            
            <TextField
              name="content"
              label="내용"
              value={formData.content}
              onChange={handleChange}
              required
              multiline
              rows={6}
              fullWidth
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            취소
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? "저장 중..." : "저장"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditPostDialog;
