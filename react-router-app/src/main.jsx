import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 핵심 :BrowserRouter로 전체 앱을 감싸야 라우팅 기능 사용 가능 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
