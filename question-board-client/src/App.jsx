import { useState } from "react";
import {
  AppBar,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetail from "./components/PostDetail";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">익명 질문 게시판</Typography>
        </Toolbar>
      </AppBar>

      {/*  폭이 최대 960px 컨테이너를 만들어서 화면 가운데 정렬 */}
      <Container maxWidth="md" sx={{ mt: 3 }}>
        {/* mt:3 ▶️ margin-top: 24px */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
