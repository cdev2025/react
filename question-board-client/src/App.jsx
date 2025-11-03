import { useState } from "react";
import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

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
    </ThemeProvider>
  );
}

export default App;
