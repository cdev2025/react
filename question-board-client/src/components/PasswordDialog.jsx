import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Lock } from "@mui/icons-material";

/**
 * 비밀번호 입력을 요청하는 재사용 가능한 모달 컴포넌트
 * @param {boolean} open - 모달 열림/닫힘 상태
 * @param {function} onClose - 모달 닫기 핸들러
 * @param {function} onConfirm - 비밀번호 확인 핸들러 (password를 인자로 받음)
 * @param {string} title - 모달 제목
 * @param {string} message - 안내 메시지
 * @param {string} confirmText - 확인 버튼 텍스트
 * @param {boolean} loading - 로딩 상태
 * @param {string} error - 서버 에러 메시지
 */
function PasswordDialog({
  open,
  onClose,
  onConfirm,
  title = "비밀번호 확인",
  message = "작성 시 입력한 비밀번호를 입력하세요.",
  confirmText = "확인",
  loading = false,
  error = null,
}) {
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState(null);

  // 모달이 열릴 때마다 초기화
  useEffect(() => {
    if (open) {
      setPassword("");
      setClientError(null);
    }
  }, [open]);

  // 비밀번호 입력 처리
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (clientError) setClientError(null); // 클라이언트 에러 초기화
  };

  // 클라이언트 유효성 검사
  const validatePassword = () => {
    if (!password.trim()) {
      setClientError("비밀번호를 입력하세요.");
      return false;
    }
    if (password.length < 4) {
      setClientError("비밀번호는 4자 이상이어야 합니다.");
      return false;
    }
    return true;
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    setClientError(null);
    onConfirm(password); // 부모 컴포넌트에 비밀번호 전달
  };

  // 모달 닫기 처리
  const handleClose = () => {
    if (!loading) {
      setPassword("");
      setClientError(null);
      onClose();
    }
  };

  // Enter 키 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown={loading} // 로딩 중 ESC 키 비활성화
    >
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        <Lock
          sx={{ fontSize: 40, color: "primary.main", mb: 1, display: "block" }}
        />
        {title}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            {message}
          </Typography>

          {/* 클라이언트 에러 표시 */}
          {clientError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {clientError}
            </Alert>
          )}

          {/* 서버 에러 표시 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            type="password"
            label="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyPress}
            fullWidth
            autoFocus
            disabled={loading}
            placeholder="작성 시 입력한 비밀번호"
            helperText="4자 이상 입력하세요"
            error={!!clientError}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
            fullWidth
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !password.trim()}
            fullWidth
            sx={{ ml: 1 }}
          >
            {loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
            {loading ? "확인 중..." : confirmText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PasswordDialog;
